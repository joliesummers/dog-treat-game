# 🔊 Sound Effects Guide

**How to Generate & Add Retro 8-bit Sounds**

---

## 🎵 Sound Effect List

### Required Sounds (7 total)

| Sound | File Name | When It Plays | Style |
|-------|-----------|---------------|-------|
| Jump | `jump.wav` | Dog jumps | Quick "boing" upward pitch |
| Eat Treat | `eat.wav` | Collect bone | Satisfying "nom" crunch |
| Hit Poo | `damage.wav` | Touch poo | Gross "splat" + low tone |
| Squirrel | `distract.wav` | Golden distracted | Playful "chirp" |
| Land | `land.wav` | Dog lands | Soft "thud" |
| Level Win | `victory.wav` | Complete level | Victory fanfare (3 notes up) |
| Game Over | `gameover.wav` | Lose all health | Sad descending tone |

---

## 🎮 Method 1: Generate with jsfxr (Recommended!)

**Website**: https://sfxr.me/ or http://www.superflashbros.net/as3sfxr/

### Step-by-Step:

1. **Open jsfxr** in your browser
2. **Select preset** or customize
3. **Click "Export .WAV"**
4. **Save to**: `public/assets/audio/[filename].wav`

### Preset Settings for Each Sound:

#### 1. Jump (`jump.wav`)
```
Preset: "Jump"
OR Manual:
- Wave: Square
- Attack: 0.0
- Sustain: 0.1
- Decay: 0.2
- Frequency: 0.5 → 0.7 (upward)
- Vibrato: None
```

#### 2. Eat Treat (`eat.wav`)
```
Preset: "Pickup/Coin"
OR Manual:
- Wave: Square
- Attack: 0.0
- Sustain: 0.05
- Decay: 0.1
- Frequency: 0.6 → 0.8 (quick up)
- Vibrato: Light
```

#### 3. Hit Poo / Damage (`damage.wav`)
```
Preset: "Hit/Hurt"
OR Manual:
- Wave: Noise (for splat effect)
- Attack: 0.0
- Sustain: 0.1
- Decay: 0.3
- Frequency: 0.4 → 0.2 (downward)
- Low-pass filter: Heavy
```

#### 4. Squirrel Distract (`distract.wav`)
```
Preset: "Blip/Select"
OR Manual:
- Wave: Sine
- Attack: 0.0
- Sustain: 0.08
- Decay: 0.1
- Frequency: 0.7 (high pitch)
- Vibrato: Fast + Light
```

#### 5. Land (`land.wav`)
```
Preset: "Hit/Hurt" (short version)
OR Manual:
- Wave: Noise
- Attack: 0.0
- Sustain: 0.05
- Decay: 0.1
- Frequency: 0.3 (low thud)
- Low-pass filter: Medium
```

#### 6. Victory (`victory.wav`)
```
Preset: "Powerup"
OR Manual:
- Wave: Square
- Attack: 0.0
- Sustain: 0.15
- Decay: 0.2
- Frequency: 0.5 → 0.6 → 0.7 (3-note arpeggio)
- Vibrato: None
```

#### 7. Game Over (`gameover.wav`)
```
Preset: "Hit/Hurt" (long version)
OR Manual:
- Wave: Sawtooth
- Attack: 0.0
- Sustain: 0.3
- Decay: 0.5
- Frequency: 0.6 → 0.2 (sad descending)
- Vibrato: Slow wobble
```

---

## 🎼 Method 2: Free Sound Packs

### Recommended Sources:

**OpenGameArt.org**
- Search: "8-bit sound effects"
- Filter: CC0 or CC-BY
- Download pack, rename files

**Freesound.org**
- Search: "retro game sounds"
- Filter: CC0 license
- Download individual files

**itch.io**
- Search: "8-bit sfx pack"
- Many free asset packs available

**BeepBox.co**
- Create custom chiptune melodies
- Export as .wav
- Great for background music!

---

## 📁 File Organization

Place all sound files here:
```
public/assets/audio/
├── jump.wav
├── eat.wav
├── damage.wav
├── distract.wav
├── land.wav
├── victory.wav
├── gameover.wav
├── menu-music.wav (optional)
└── game-music.wav (optional)
```

**File Format**: `.wav` (recommended) or `.mp3`  
**Sample Rate**: 44100 Hz or 22050 Hz  
**Bit Depth**: 16-bit  
**Channels**: Mono (smaller file size)

---

## 🎵 Background Music (Optional)

### Menu Music
- **Style**: Upbeat, playful, looping
- **Length**: 30-60 seconds
- **Tempo**: 120-140 BPM
- **Instruments**: Chiptune synths, simple melody

### Game Music
- **Style**: Energetic platformer theme
- **Length**: 60-90 seconds loop
- **Tempo**: 140-160 BPM (matches action)
- **Progression**: Could speed up slightly per level

### Create with BeepBox:
1. Go to https://beepbox.co
2. Select "8-bit" theme
3. Create simple melody
4. Export as .wav
5. Save to `public/assets/audio/`

---

## ✅ Quick Start (5 Minutes)

**Fastest Way to Get Started:**

1. Go to https://sfxr.me/
2. Click these presets:
   - "Jump" → Export → Save as `jump.wav`
   - "Pickup" → Export → Save as `eat.wav`
   - "Hit" → Export → Save as `damage.wav`
   - "Blip" → Export → Save as `distract.wav`
   - "Hit" (short) → Export → Save as `land.wav`
   - "Powerup" → Export → Save as `victory.wav`
   - "Hit" (long, low) → Export → Save as `gameover.wav`
3. Move all files to `public/assets/audio/`
4. Sounds will automatically load in game!

---

## 🔧 Testing Sounds

Once files are added:

1. **Run dev server**: `npm run dev`
2. **Open browser console** (F12)
3. **Check for errors**: "Failed to load audio"
4. **Play game**: Trigger each sound effect
5. **Adjust volume** if needed (in code)

---

## 📊 Sound Volume Guidelines

Recommended volume levels (0.0 - 1.0):
- Jump: 0.3
- Eat: 0.4
- Damage: 0.5
- Distract: 0.3
- Land: 0.2
- Victory: 0.6
- Game Over: 0.5
- Background Music: 0.2

---

**Next**: After adding sound files, the game will automatically play them!  
**See**: `src/scenes/PreloadScene.ts` for how sounds are loaded  
**See**: `src/scenes/GameScene.ts` for where sounds are triggered

---

**Last Updated**: December 7, 2024  
**Status**: Awaiting sound file generation

