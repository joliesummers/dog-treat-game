# High Score System Documentation

## Overview

A comprehensive high score system has been implemented for the Dog Treat Adventure game. Players can now compete on leaderboards, enter their names, and track their progress across levels.

## Features

### 1. **High Score Manager** (`src/managers/HighScoreManager.ts`)
- **Local Storage Integration**: All scores are persisted in browser localStorage
- **Per-Level Leaderboards**: Top 10 scores for each level
- **Global Leaderboard**: Top 10 scores across all levels
- **Player Name Storage**: Remembers last used name for convenience
- **Score Validation**: Automatic sorting and ranking

### 2. **Name Entry Scene** (`src/scenes/NameEntryScene.ts`)
- **Keyboard Input**: Full keyboard support for name entry
- **On-Screen Keyboard**: Mobile-friendly touch keyboard
- **Name Validation**: Max 20 characters, sanitized input
- **Pre-fill Last Name**: Remembers your previous name
- **Skip Option**: Anonymous entry available
- Triggers when player achieves a high score (level or global)

### 3. **High Scores Display** (`src/scenes/HighScoresScene.ts`)
- **Two Views**: Global leaderboard and per-level leaderboards
- **Level Navigation**: Browse scores for all levels
- **Rank Display**: 🥇🥈🥉 medals for top 3
- **Detailed Stats**: Shows score, time, treats collected, and stars
- Accessible from main menu

### 4. **Integration with Game Flow**

#### Level Complete Flow:
1. Player completes level → `GameScene` calculates stats
2. `LevelCompleteScene` checks if score qualifies for leaderboard
3. If yes → `NameEntryScene` appears for name input
4. After name entry → returns to `LevelCompleteScene` with rank display
5. Shows: "🌍 Global Rank: #X!" and "⭐ Level X Rank: #Y!"

#### Game Over Flow:
1. Player loses health → `GameScene` triggers game over with stats
2. `GameOverScene` checks if score still qualifies for leaderboard
3. If yes → `NameEntryScene` appears (even on game over!)
4. After name entry → returns to level select

## How to Use

### For Players:

1. **Playing the Game**:
   - Complete levels and try to get the highest score
   - Score is based on: treats collected, health remaining, time, and perfect bonuses

2. **Entering High Scores**:
   - When you achieve a high score, you'll automatically see the name entry screen
   - Type your name (up to 20 characters)
   - Press ENTER or click "Submit" to save
   - Or click "Skip (Anonymous)" to save as "Anonymous"

3. **Viewing High Scores**:
   - Click "🏆 HIGH SCORES" on the main menu
   - Toggle between "Global" and "Level" views
   - Use ◀ ▶ buttons to browse different levels
   - Press ESC or click "← Back to Menu" to return

### For Developers:

#### Adding High Score Tracking to New Levels:

The system automatically works for all levels. No additional configuration needed!

#### Customizing Score Calculation:

Edit `GameScene.calculateLevelStats()` to modify score components:
- `treatPoints`: Points per treat (currently 100)
- `healthBonus`: Points per remaining health (currently 200)
- `perfectBonus`: Bonus for collecting all treats (currently 1000)
- `timeBonus`: Time-based bonus (currently 2000 - 10*seconds)

#### Adjusting Leaderboard Size:

In `HighScoreManager.ts`:
```typescript
private static readonly MAX_ENTRIES_PER_LEVEL = 10; // Change to desired size
private static readonly MAX_GLOBAL_ENTRIES = 10;    // Change to desired size
```

## API Reference

### HighScoreManager

#### Static Methods:

```typescript
// Check if score qualifies for leaderboard
HighScoreManager.isHighScore(level: number, score: number): boolean
HighScoreManager.isGlobalHighScore(score: number): boolean

// Add a score entry
HighScoreManager.addScore(entry: HighScoreEntry): { levelRank: number | null; globalRank: number | null }

// Get scores
HighScoreManager.getLevelScores(level: number): HighScoreEntry[]
HighScoreManager.getGlobalScores(): HighScoreEntry[]

// Player statistics
HighScoreManager.getPlayerBestScore(level: number, playerName: string): HighScoreEntry | null
HighScoreManager.getPlayerStats(playerName: string): { totalLevelsCompleted, totalScore, averageStars, bestLevel, bestLevelScore }

// Utility
HighScoreManager.getLastPlayerName(): string
HighScoreManager.sanitizePlayerName(name: string): string
HighScoreManager.clearAllScores(): void // For testing/reset
```

#### HighScoreEntry Interface:

```typescript
interface HighScoreEntry {
  playerName: string;
  score: number;
  level: number;
  time: number;
  treatsCollected: number;
  totalTreats: number;
  stars: number;
  timestamp: number; // Unix timestamp
}
```

## Local Storage Keys

The system uses the following localStorage keys:
- `dogGame_level_1`, `dogGame_level_2`, etc. - Level leaderboards
- `dogGame_global_scores` - Global leaderboard
- `dogGame_last_player_name` - Last used player name
- `highScore_level_1`, `highScore_level_2`, etc. - Legacy personal best scores

## Best Practices

1. **Score Balancing**: Adjust score components to reward skilled play
2. **Name Validation**: System automatically sanitizes player names
3. **Timestamp Tracking**: Each entry includes timestamp for potential future features
4. **Graceful Degradation**: System works even if localStorage is unavailable

## Future Enhancements (Optional)

Potential additions you could implement:
- Online leaderboards (requires backend)
- Social sharing of scores
- Daily/weekly challenges
- Achievement system
- Player profiles with avatars
- Score history graphs
- Replay system for top scores

## Testing

To test the high score system:

1. **Manual Testing**:
   - Play through levels and achieve different scores
   - Enter various names (test special characters, long names)
   - Test both level complete and game over high scores
   - Verify leaderboard displays correctly
   - Test on mobile (touch keyboard)

2. **Clear Scores** (for testing):
   Uncomment the "Clear All Scores" button in `HighScoresScene.ts` or run in browser console:
   ```javascript
   localStorage.clear()
   ```

3. **Mock High Scores** (for testing UI):
   Run in browser console:
   ```javascript
   // Add test scores
   for (let i = 1; i <= 10; i++) {
     localStorage.setItem(`dogGame_level_1`, JSON.stringify([
       {playerName: "TestPlayer" + i, score: 5000 - i*100, level: 1, time: 60+i*5, treatsCollected: 15, totalTreats: 20, stars: 3, timestamp: Date.now()}
     ]));
   }
   ```

## Troubleshooting

**Scores not saving?**
- Check browser localStorage is enabled
- Check browser console for errors
- Verify localStorage quota not exceeded

**Name entry not appearing?**
- Check if score actually qualifies for leaderboard
- Verify `NameEntryScene` is registered in `main.ts`
- Check browser console for scene initialization errors

**Leaderboard display issues?**
- Verify localStorage contains valid JSON
- Check if scores are properly sorted
- Test with different screen sizes

## Credits

High score system designed with best practices:
- Local-first data storage
- Mobile-friendly input
- Graceful error handling
- Extensible architecture

