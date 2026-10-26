import Capacitor
import Foundation
import GameKit
import UIKit

/// The storyboard's root view controller: Capacitor's, plus the app's own native plugin.
class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(GameCenterPlugin())
    }

    // Huckline plays in landscape only
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask { .landscape }
    override var prefersHomeIndicatorAutoHidden: Bool { true }
    override var preferredScreenEdgesDeferringSystemGestures: UIRectEdge { .all }
}

/// Game Center: sign-in, achievements and leaderboards. Same JavaScript interface as the Android
/// PlayGamesPlugin (see src/game/services.ts).
@objc(GameCenterPlugin)
public class GameCenterPlugin: CAPPlugin, CAPBridgedPlugin, GKGameCenterControllerDelegate {
    public let identifier = "GameCenterPlugin"
    public let jsName = "GameCenter"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "signIn", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unlock", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "submitScore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showAchievements", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showLeaderboards", returnType: CAPPluginReturnPromise),
    ]

    private var waiting: [CAPPluginCall] = []
    private var handlerSet = false
    private var dashboardCall: CAPPluginCall?

    override public func load() {
        authenticate()
    }

    private func state() -> [String: Any] {
        let p = GKLocalPlayer.local
        return p.isAuthenticated ? ["authenticated": true, "player": p.displayName] : ["authenticated": false]
    }

    /// GameKit calls the handler once at start-up and again whenever the sign-in state changes.
    private func authenticate() {
        if handlerSet { return }
        handlerSet = true
        GKLocalPlayer.local.authenticateHandler = { [weak self] viewController, _ in
            guard let self = self else { return }
            if let vc = viewController {
                DispatchQueue.main.async {
                    self.bridge?.viewController?.present(vc, animated: true)
                }
                return
            }
            let calls = self.waiting
            self.waiting = []
            calls.forEach { $0.resolve(self.state()) }
        }
    }

    @objc func status(_ call: CAPPluginCall) {
        call.resolve(state())
    }

    @objc func signIn(_ call: CAPPluginCall) {
        if GKLocalPlayer.local.isAuthenticated {
            call.resolve(state())
            return
        }
        // the system prompt shows at most once per launch; answer now if it was already declined
        waiting.append(call)
        DispatchQueue.main.asyncAfter(deadline: .now() + 4) { [weak self] in
            guard let self = self else { return }
            if let i = self.waiting.firstIndex(where: { $0 === call }) {
                self.waiting.remove(at: i)
                call.resolve(self.state())
            }
        }
    }

    @objc func unlock(_ call: CAPPluginCall) {
        guard let id = call.getString("id"), !id.isEmpty else {
            call.reject("missing achievement id")
            return
        }
        guard GKLocalPlayer.local.isAuthenticated else {
            call.resolve()
            return
        }
        let a = GKAchievement(identifier: id)
        a.percentComplete = 100
        a.showsCompletionBanner = true
        GKAchievement.report([a]) { _ in }
        call.resolve()
    }

    @objc func submitScore(_ call: CAPPluginCall) {
        guard let id = call.getString("id"), !id.isEmpty, let score = call.getInt("score") else {
            call.reject("missing leaderboard id or score")
            return
        }
        guard GKLocalPlayer.local.isAuthenticated else {
            call.resolve()
            return
        }
        GKLeaderboard.submitScore(score, context: 0, player: GKLocalPlayer.local, leaderboardIDs: [id]) { _ in }
        call.resolve()
    }

    @objc func showAchievements(_ call: CAPPluginCall) {
        present(GKGameCenterViewController(state: .achievements), call)
    }

    @objc func showLeaderboards(_ call: CAPPluginCall) {
        if let id = call.getString("id"), !id.isEmpty {
            present(GKGameCenterViewController(leaderboardID: id, playerScope: .global, timeScope: .allTime), call)
        } else {
            present(GKGameCenterViewController(state: .leaderboards), call)
        }
    }

    private func present(_ vc: GKGameCenterViewController, _ call: CAPPluginCall) {
        guard GKLocalPlayer.local.isAuthenticated else {
            call.resolve(["signedOut": true])
            return
        }
        DispatchQueue.main.async {
            vc.gameCenterDelegate = self
            self.dashboardCall = call
            self.bridge?.viewController?.present(vc, animated: true)
        }
    }

    public func gameCenterViewControllerDidFinish(_ gameCenterViewController: GKGameCenterViewController) {
        gameCenterViewController.dismiss(animated: true)
        dashboardCall?.resolve(["signedOut": false])
        dashboardCall = nil
    }
}
