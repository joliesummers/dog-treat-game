# High Score System - Quick Start Guide

## How It Works (Visual Flow)

```
┌─────────────────────────────────────────────────────────────┐
│                      GAME FLOW                              │
└─────────────────────────────────────────────────────────────┘

MAIN MENU
   │
   ├─► [PLAY] ──► Select World ──► Select Breed ──► Play Level
   │                                                      │
   └─► [🏆 HIGH SCORES] ──► View Leaderboards           │
                                                          │
                                                          ▼
                        ┌──────────────────────────────────┐
                        │  Level Complete / Game Over      │
                        │  • Calculate Score               │
                        │  • Check if High Score           │
                        └──────────────────────────────────┘
                                        │
                        ┌───────────────┴───────────────┐
                        │                               │
                   HIGH SCORE?                      NO  │
                        │                               │
                       YES                              │
                        │                               │
                        ▼                               │
        ┌──────────────────────────────┐              │
        │   NAME ENTRY SCENE           │              │
        │   • Enter your name          │              │
        │   • Use keyboard/touch       │              │
        │   • Submit or skip           │              │
        └──────────────────────────────┘              │
                        │                               │
                        ▼                               │
        ┌──────────────────────────────┐              │
        │   SAVE TO LEADERBOARD        │              │
        │   • Level leaderboard        │              │
        │   • Global leaderboard       │              │
        │   • Return rank achieved     │              │
        └──────────────────────────────┘              │
                        │                               │
                        └───────────────┬───────────────┘
                                        │
                                        ▼
                        ┌──────────────────────────────┐
                        │  Show Results & Rankings     │
                        │  • "Global Rank: #5!"        │
                        │  • "Level 3 Rank: #2!"       │
                        │  • Score breakdown           │
                        └──────────────────────────────┘
                                        │
                                        ▼
                        ┌──────────────────────────────┐
                        │  Next Action                 │
                        │  • Retry Level               │
                        │  • Next Level                │
                        │  • Level Select              │
                        └──────────────────────────────┘
```

## Score Calculation Formula

```
FINAL SCORE = Treat Points + Health Bonus + Perfect Bonus + Time Bonus

Where:
  • Treat Points    = treats_collected × 100
  • Health Bonus    = hearts_remaining × 200
  • Perfect Bonus   = 1000 (if all treats collected, else 0)
  • Time Bonus      = max(0, 2000 - time_seconds × 10)
  
Example:
  Level 1 - Collected 15/17 treats, 2 hearts left, 65 seconds
  
  Treat Points:   15 × 100 = 1,500
  Health Bonus:    2 × 200 =   400
  Perfect Bonus:         0 =     0  (didn't get all treats)
  Time Bonus: 2000-650   = 1,350
  ─────────────────────────────────
  FINAL SCORE           = 3,250
```

## Leaderboard Structure

### Per-Level Leaderboard (Top 10)
```
┌────────────────────────────────────────────────────────┐
│              LEVEL 3 HIGH SCORES                       │
├────────────────────────────────────────────────────────┤
│ Rank | Player       | Score | Treats | Time  | Stars  │
├────────────────────────────────────────────────────────┤
│  🥇  | ProDoggo     | 4,250 |  20/20 |  1:24 | ⭐⭐⭐  │
│  🥈  | SpeedRunner  | 4,100 |  19/20 |  1:18 | ⭐⭐⭐  │
│  🥉  | TreatMaster  | 3,950 |  20/20 |  1:45 | ⭐⭐    │
│  4.  | QuickPaws    | 3,800 |  18/20 |  1:30 | ⭐⭐    │
│  5.  | BoneLover    | 3,650 |  17/20 |  1:35 | ⭐⭐    │
│  ...                                                   │
└────────────────────────────────────────────────────────┘
```

### Global Leaderboard (Top 10 Across All Levels)
```
┌────────────────────────────────────────────────────────┐
│                GLOBAL HIGH SCORES                      │
├────────────────────────────────────────────────────────┤
│ Rank | Player       | Level | Score | Time  | Stars  │
├────────────────────────────────────────────────────────┤
│  🥇  | LegendPup    | Lvl 5 | 5,200 |  2:35 | ⭐⭐⭐  │
│  🥈  | TopDog       | Lvl 5 | 5,050 |  2:48 | ⭐⭐⭐  │
│  🥉  | ProGamer     | Lvl 4 | 4,850 |  2:12 | ⭐⭐⭐  │
│  4.  | MasterChef   | Lvl 5 | 4,750 |  2:55 | ⭐⭐    │
│  5.  | SpeedDemon   | Lvl 3 | 4,250 |  1:24 | ⭐⭐⭐  │
│  ...                                                   │
└────────────────────────────────────────────────────────┘
```

## Local Storage Structure

```javascript
// Individual level scores
localStorage["dogGame_level_1"] = [
  {
    playerName: "ProDoggo",
    score: 3250,
    level: 1,
    time: 65.42,
    treatsCollected: 15,
    totalTreats: 17,
    stars: 2,
    timestamp: 1703001234567
  },
  // ... up to 10 entries
]

// Global scores
localStorage["dogGame_global_scores"] = [
  {
    playerName: "ProDoggo",
    score: 4250,
    level: 3,
    time: 84.12,
    treatsCollected: 20,
    totalTreats: 20,
    stars: 3,
    timestamp: 1703001234567
  },
  // ... up to 10 entries
]

// Last used name (for convenience)
localStorage["dogGame_last_player_name"] = "ProDoggo"
```

## Key Interactions

### 1. Player Enters Name
```
┌─────────────────────────────┐
│   🏆 HIGH SCORE! 🏆         │
│                             │
│   Score: 3,250              │
│   Level 1                   │
│                             │
│   Enter your name:          │
│   ┌─────────────────────┐  │
│   │ ProDoggo_          │  │ ◄── Blinking cursor
│   └─────────────────────┘  │
│                             │
│   [Q][W][E][R][T][Y][U]    │ ◄── On-screen keyboard
│   [A][S][D][F][G][H][J]    │     (for mobile)
│   [Z][X][C][V][B][N][M]    │
│        [  SPACE  ]          │
│                             │
│      [✓ Submit]             │
│   [Skip (Anonymous)]        │
└─────────────────────────────┘
```

### 2. High Score Result Display
```
┌─────────────────────────────┐
│   LEVEL 3 COMPLETE!         │
│                             │
│      ⭐ ⭐ ⭐                │ ◄── Star rating
│                             │
│   🌍 Global Rank: #5!       │ ◄── NEW!
│   ⭐ Level 3 Rank: #2!      │ ◄── NEW!
│                             │
│   ⏱️ Time: 1:24.32          │
│   🦴 Treats: 20/20 (100%)   │
│   ❤️ Health: 8/10           │
│                             │
│   --- Score Breakdown ---   │
│   Treats: +2000             │
│   Health Bonus: +1600       │
│   Time Bonus: +1156         │
│   🌟 Perfect Run: +1000!    │
│                             │
│   FINAL SCORE: 5,756        │
│                             │
│   [↺ Retry] [▶ Next] [📋]  │
└─────────────────────────────┘
```

## Tips for High Scores

### Maximize Points:
1. **Collect ALL treats** → +1000 Perfect Bonus
2. **Keep full health** → +200 per heart
3. **Complete quickly** → Time bonus decreases over time
4. **Learn the level** → Practice runs help optimize route

### Strategy:
- **Prioritize treats** over speed in easy sections
- **Rush through** danger zones even if you miss treats
- **Know when to skip** low-value treats in dangerous spots
- **Master double-jump** for efficient movement

### Competition:
- Check leaderboards to see target scores
- Beat your previous best times
- Aim for perfect runs on easier levels
- Focus on top 3 for medal rankings

## Player Names

### Allowed Characters:
- Letters: A-Z, a-z
- Numbers: 0-9
- Spaces
- Special: - _ ! .

### Restrictions:
- Maximum 20 characters
- Trimmed whitespace
- Empty = "Anonymous"

### Examples:
✅ ProDoggo
✅ Speed_Runner_99
✅ Top Dog!
✅ Player.One
❌ <script>alert()</script>  (sanitized)
❌ A very very very long name here  (truncated)
```

## Quick Reference

### Keyboard Shortcuts:
- **Name Entry**: Type → ENTER (submit) / ESC (skip)
- **High Scores**: ESC (back) / ← → (navigate levels)
- **Level Complete**: SPACE (next) / R (retry)

### Mobile:
- Touch on-screen keyboard
- Tap buttons to navigate
- All features work on mobile!

---

**Ready to Compete?** 🏆

Start the game, complete levels, and see your name on the leaderboards!

