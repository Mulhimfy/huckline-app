#!/usr/bin/env bash
# Emulator smoke test for Huckline (runs inside android-emulator-runner): installs the debug APK,
# opens the game, starts the first line, rides with a few thumb gestures, takes screenshots and
# fails on native crashes, uncaught JavaScript errors or an emulator that dies under the game.
set -u
mkdir -p smoke-out
PKG=com.mulhimfy.huckline
A() { timeout 60 adb "$@"; }
alive() { [ "$(timeout 10 adb get-state 2>/dev/null)" = device ]; }
shot() { if alive; then A exec-out screencap -p > "smoke-out/$1.png"; else echo "no screenshot $1: device gone"; fi; }
die() {
  echo "::error::$1"
  alive && A logcat -d > smoke-out/logcat.txt
  ls -la /tmp/android-runner 2>/dev/null | tail -5
  exit 1
}
wait_s() { for _ in $(seq 1 "$1"); do sleep 1; alive || die "emulator died ($2)"; done; }

A install -r smoke.apk || die "install failed"
A logcat -c
A shell am start -n "$PKG/.MainActivity"
wait_s 40 "while the game was starting"
shot 01-home
A shell dumpsys meminfo "$PKG" | grep -E "TOTAL PSS|TOTAL RSS" | head -2
SIZE=$(A shell wm size | grep -oE '[0-9]+x[0-9]+' | tail -1)
X=${SIZE%x*}
Y=${SIZE#*x}
# the game is landscape: long side = width
if [ "$X" -gt "$Y" ]; then W=$X; H=$Y; else W=$Y; H=$X; fi
echo "screen ${W}x${H}"
# RIDE (bottom left)
A shell input tap $((W * 14 / 100)) $((H * 88 / 100))
wait_s 14 "loading the intro"
shot 02-intro
# DROP IN (bottom right)
A shell input tap $((W * 88 / 100)) $((H * 88 / 100))
wait_s 8 "dropping in"
shot 03-ride
for k in 1 2 3; do
  A shell input swipe $((W * 20 / 100)) $((H * 70 / 100)) $((W * 30 / 100)) $((H * 70 / 100)) 400
  A shell input swipe $((W * 80 / 100)) $((H * 70 / 100)) $((W * 80 / 100)) $((H * 69 / 100)) 600
  wait_s 2 "riding"
done
shot 04-ride
wait_s 15 "riding on"
shot 05-later
A shell dumpsys meminfo "$PKG" | grep -E "TOTAL PSS|TOTAL RSS" | head -2
A logcat -d > smoke-out/logcat.txt
if grep -E "FATAL EXCEPTION|AndroidRuntime: Process" smoke-out/logcat.txt; then
  echo "::error::Native crash"
  exit 1
fi
if grep -E "Uncaught|TypeError|ReferenceError" smoke-out/logcat.txt | grep -i -v "safe area"; then
  echo "::error::JavaScript error"
  exit 1
fi
echo "Smoke test passed"
