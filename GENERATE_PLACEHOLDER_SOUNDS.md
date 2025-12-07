# 🔊 Quick Placeholder Sound Generation

**⚠️ THESE ARE TEMPORARY PLACEHOLDERS - Replace with proper 8-bit sounds later!**

---

## Quick 5-Minute Setup

### Method 1: Auto-Generate Links (Fastest!)

Click each link below - they will auto-load the preset in jsfxr. Then click "Export .WAV":

1. **Jump** → https://sfxr.me/#111111113h3C8CCCwvqJXBWNjJgNCLx96P6TqSBdTjTkKVfedB6SdBBRBm6bX8gWb7eQ1111C5s1AwV6eY8iQggvWi6WK1111111111111111111
   - Save as: `public/assets/audio/jump.wav`

2. **Eat/Pickup** → https://sfxr.me/#111111113PQEm5C4PErbJg5jmfJoqhiAP77xCATdj6CHmJVXQ49JsfVbZx9VPKr4J3mMeL41111fAe12UoaRs74WXXX111111111111111111111111
   - Save as: `public/assets/audio/eat.wav`

3. **Damage/Hit** → https://sfxr.me/#111111118FpbcQ86iTYadwxPa2BdEdPnLwNRt9eFWKJLrJb45zfpZZzzM3qsPrcNAo11111111fxVZBvbJJJJ2XXXXXX11111111111111111111111
   - Save as: `public/assets/audio/damage.wav`

4. **Distract/Blip** → https://sfxr.me/#1111111135NJ1y5r7RmJSsNk3X6Z7Q1fnTSNfKLVRzb9p7FtdAWF7ufH3pCpV6VJCbv1111111rGFAW6Z8FsQTJJJJ11111111111111111111111
   - Save as: `public/assets/audio/distract.wav`

5. **Land** → https://sfxr.me/#111111118FpbcQ86iTYadwxPa2BdEdPnLwNRt9eFWKJLrJb45zfpZZzzM3qsPrcNAo11111111fxVZBvbJJJJ2XXXXXX11111111111111111111111
   - (Same as damage but shorter)
   - Save as: `public/assets/audio/land.wav`

6. **Victory/Powerup** → https://sfxr.me/#111111113nBBjhFTYDTp1kRY2U7mzxF3hvJoSWwbVMoUCJJJJJJJJJ5Ah5s5sYu5g1111111YT8RrwMJJJWWWWWWWW11111111111111111111111111
   - Save as: `public/assets/audio/victory.wav`

7. **Game Over** → https://sfxr.me/#111111118FpbcQ86iTYadwxPa2BdEdPnLwNRt9eFWKJLrJb45zfpZZzzM3qsPrcNAo11111111fxVZBvbJJJJ2XXXXXX11111111111111111111111
   - (Hit sound but longer/sadder)
   - Save as: `public/assets/audio/gameover.wav`

---

## Method 2: Manual Generation (10 minutes)

1. Go to **https://sfxr.me/**
2. For each sound below, click the preset button, then "Export .WAV"

| Sound | Preset Button | Save As |
|-------|---------------|---------|
| Jump | "Jump" | `jump.wav` |
| Eat | "Pickup/Coin" | `eat.wav` |
| Damage | "Hit/Hurt" | `damage.wav` |
| Distract | "Blip/Select" | `distract.wav` |
| Land | "Hit/Hurt" (short) | `land.wav` |
| Victory | "Powerup" | `victory.wav` |
| Game Over | "Hit/Hurt" (long) | `gameover.wav` |

3. Move all `.wav` files to: `public/assets/audio/`

---

## Method 3: Command Line (Advanced)

If you have `sox` installed:

```bash
cd public/assets/audio/

# Jump (quick chirp up)
sox -n jump.wav synth 0.1 sine 400:800

# Eat (quick blip)
sox -n eat.wav synth 0.08 square 600:900

# Damage (thud down)
sox -n damage.wav synth 0.2 noise lowpass 300

# Distract (high chirp)
sox -n distract.wav synth 0.1 sine 800

# Land (soft thud)
sox -n land.wav synth 0.08 noise lowpass 250

# Victory (3-note arpeggio)
sox -n victory.wav synth 0.5 square 400:500:600

# Game Over (sad descend)
sox -n gameover.wav synth 0.6 sawtooth 500:200
```

---

## ⚠️ IMPORTANT - These Are Placeholders!

**Current Status**: PLACEHOLDER SOUNDS (functional but basic)  
**TODO**: Replace with proper retro 8-bit sounds

**Why placeholders?**
- Get the game working NOW
- Test sound system implementation
- Replace with better sounds later

**When to replace:**
- Before major release
- When polishing for World 2
- When adding background music

---

## Files Created

After running any method above, you should have:

```
public/assets/audio/
├── jump.wav        ⚠️ PLACEHOLDER
├── eat.wav         ⚠️ PLACEHOLDER
├── damage.wav      ⚠️ PLACEHOLDER
├── distract.wav    ⚠️ PLACEHOLDER
├── land.wav        ⚠️ PLACEHOLDER
├── victory.wav     ⚠️ PLACEHOLDER
└── gameover.wav    ⚠️ PLACEHOLDER
```

---

## Test Sounds Work

1. Run dev server: `npm run dev`
2. Play the game
3. Jump → Should hear sound
4. Collect bone → Should hear sound
5. Hit poo → Should hear sound

---

**See Also**: `SOUND_EFFECTS.md` for proper sound generation guide

**Last Updated**: December 7, 2024  
**Status**: ⚠️ PLACEHOLDERS - Need proper 8-bit sounds!

