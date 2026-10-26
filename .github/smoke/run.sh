#!/usr/bin/env bash
# Emulator smoke test for Huckline (runs inside android-emulator-runner): installs the debug APK,
# opens the game, starts the first line, rides with a few thumb gestures, takes screenshots and
# fails on native crashes or uncaught JavaScript errors.
set -u
mkdir -p smoke-out
PKG=com.mulhimfy.huckline
adb install -r smoke.apk
adb logcat -c
adb shell am start -n "$PKG/.MainActivity"
sleep 40
adb exec-out screencap -p > smoke-out/01-home.png
SIZE=$(adb shell wm size | grep -oE '[0-9]+x[0-9]+' | tail -1)
A=${SIZE%x*}
B=${SIZE#*x}
# the game is landscape: long side = width
if [ "$A" -gt "$B" ]; then W=$A; H=$B; else W=$B; H=$A; fi
# RIDE (bottom left)
adb shell input tap $((W * 14 / 100)) $((H * 88 / 100))
sleep 14
adb exec-out screencap -p > smoke-out/02-intro.png
# DROP IN (bottom right)
adb shell input tap $((W * 88 / 100)) $((H * 88 / 100))
sleep 8
adb exec-out screencap -p > smoke-out/03-ride.png
for k in 1 2 3; do
  adb shell input swipe $((W * 20 / 100)) $((H * 70 / 100)) $((W * 30 / 100)) $((H * 70 / 100)) 400
  adb shell input swipe $((W * 80 / 100)) $((H * 70 / 100)) $((W * 80 / 100)) $((H * 69 / 100)) 600
  sleep 2
done
adb exec-out screencap -p > smoke-out/04-ride.png
sleep 15
adb exec-out screencap -p > smoke-out/05-later.png
adb logcat -d > smoke-out/logcat.txt
if grep -E "FATAL EXCEPTION|AndroidRuntime: Process" smoke-out/logcat.txt; then
  echo "::error::Native crash"
  exit 1
fi
if grep -E "Uncaught|TypeError|ReferenceError" smoke-out/logcat.txt | grep -i -v "safe area" ; then
  echo "::error::JavaScript error"
  exit 1
fi
echo "Smoke test passed"
