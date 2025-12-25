# 🔊 Audio Format Fix

## Problem: 8-bit Audio Not Playing

**Current Issue**: jsfxr exported 8-bit PCM audio, but Phaser/Web Audio API requires 16-bit

**Error**: `❌ Jump sound NOT found!` (sounds load but fail to decode)

---

## Solution 1: Re-export from jsfxr (16-bit)

Unfortunately, **jsfxr.me only exports 8-bit** by default.

**Try sfxr.me alternatives that export 16-bit:**

1. Go to: **https://sfbgames.itch.io/chiptone** (better alternative!)
2. Or: **https://labbed.itch.io/labchirp**
3. These export proper 16-bit .wav files

---

## Solution 2: Use Free Sound Pack (FASTEST!)

**Download pre-made 8-bit sound pack:**

1. Go to: https://opengameart.org/content/512-sound-effects-8-bit-style
2. Download the pack
3. Extract and rename:
   - Find a jump sound → rename to `jump.wav`
   - Find an eat/pickup sound → rename to `eat.wav`
   - Find a hit/damage sound → rename to `damage.wav`
   - Find a blip sound → rename to `distract.wav`
   - Copy damage.wav → `land.wav`
   - Find a powerup sound → rename to `victory.wav`
   - Find a death sound → rename to `gameover.wav`
4. Move to `public/assets/audio/`

---

## Solution 3: Convert Existing Files

If you have `ffmpeg` installed:

```bash
cd public/assets/audio/

for file in *.wav; do
  ffmpeg -i "$file" -acodec pcm_s16le -ar 44100 "temp_$file"
  mv "temp_$file" "$file"
done
```

---

## Solution 4: Try MP3 Instead

Phaser supports MP3 (usually better browser support):

1. Go back to jsfxr
2. Export as **MP3** instead of WAV
3. Update PreloadScene.ts to load .mp3 files:

```typescript
this.load.audio('jump', 'assets/audio/jump.mp3');
// etc...
```

---

## Temporary Workaround: Skip Sounds

The game **works perfectly without sounds**! You can:
1. Keep playing without audio
2. Add sounds later when you have proper 16-bit files
3. Focus on gameplay first, audio polish second

---

**Recommended**: Try Solution 2 (free sound pack) - fastest and guaranteed to work!


