package com.mulhimfy.huckline;

import android.content.Intent;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.games.AuthenticationResult;
import com.google.android.gms.games.GamesActivityResultCodes;
import com.google.android.gms.games.PlayGames;
import com.google.android.gms.games.Player;
import com.google.android.gms.tasks.Task;

/**
 * Google Play Games Services v2 (see src/game/services.ts): sign-in state, achievements and
 * leaderboards. The SDK signs players in by itself at launch (HucklineApp initialises it); signIn()
 * is the manual retry for players who skipped that prompt.
 */
@CapacitorPlugin(name = "PlayGames")
public class PlayGamesPlugin extends Plugin {

    @PluginMethod
    public void status(PluginCall call) {
        PlayGames.getGamesSignInClient(getActivity()).isAuthenticated().addOnCompleteListener((task) -> answer(call, task));
    }

    @PluginMethod
    public void signIn(PluginCall call) {
        PlayGames.getGamesSignInClient(getActivity()).signIn().addOnCompleteListener((task) -> answer(call, task));
    }

    @PluginMethod
    public void unlock(PluginCall call) {
        String id = call.getString("id");
        if (id == null || id.isEmpty()) {
            call.reject("missing achievement id");
            return;
        }
        // Queued by the SDK and synced when online; unlocking twice is harmless.
        PlayGames.getAchievementsClient(getActivity()).unlock(id);
        call.resolve();
    }

    @PluginMethod
    public void submitScore(PluginCall call) {
        String id = call.getString("id");
        Long score = call.getLong("score");
        if (id == null || id.isEmpty() || score == null) {
            call.reject("missing leaderboard id or score");
            return;
        }
        PlayGames.getLeaderboardsClient(getActivity()).submitScore(id, score);
        call.resolve();
    }

    @PluginMethod
    public void showAchievements(PluginCall call) {
        PlayGames.getAchievementsClient(getActivity())
            .getAchievementsIntent()
            .addOnSuccessListener((intent) -> startActivityForResult(call, intent, "closed"))
            .addOnFailureListener((e) -> call.reject("achievements unavailable", e));
    }

    @PluginMethod
    public void showLeaderboards(PluginCall call) {
        String id = call.getString("id");
        (id != null && !id.isEmpty()
            ? PlayGames.getLeaderboardsClient(getActivity()).getLeaderboardIntent(id)
            : PlayGames.getLeaderboardsClient(getActivity()).getAllLeaderboardsIntent())
            .addOnSuccessListener((intent) -> startActivityForResult(call, intent, "closed"))
            .addOnFailureListener((e) -> call.reject("leaderboards unavailable", e));
    }

    /** The Play Games screens closed; players can sign out from inside them. */
    @ActivityCallback
    private void closed(PluginCall call, ActivityResult result) {
        JSObject r = new JSObject();
        r.put("signedOut", result.getResultCode() == GamesActivityResultCodes.RESULT_RECONNECT_REQUIRED);
        call.resolve(r);
    }

    /** Resolve with {authenticated, player?}; the player's name is best effort. */
    private void answer(PluginCall call, Task<AuthenticationResult> task) {
        boolean ok = task.isSuccessful() && task.getResult() != null && task.getResult().isAuthenticated();
        JSObject r = new JSObject();
        r.put("authenticated", ok);
        if (!ok) {
            call.resolve(r);
            return;
        }
        PlayGames.getPlayersClient(getActivity())
            .getCurrentPlayer()
            .addOnCompleteListener((p) -> {
                Player player = p.isSuccessful() ? p.getResult() : null;
                if (player != null) r.put("player", player.getDisplayName());
                call.resolve(r);
            });
    }
}
