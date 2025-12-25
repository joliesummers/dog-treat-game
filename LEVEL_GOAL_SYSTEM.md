# 🏁 Level Goal System - Design Document

**Date**: December 25, 2024  
**Status**: Planning Phase  
**Goal**: Transition from "collect X treats to win" to "reach the end goal" with treats as optional score boosters

---

## 📊 Current System Analysis

### What We Have Now
- **Win Condition**: Collect X treats out of Y available (e.g., 11/17 treats)
- **Score System**: Points based on treats collected (100 pts each)
- **Level Layout**: Fixed width (5200px - 15600px) but no "end point"
- **Progression**: Unlocks when target treat count reached
- **UI Display**: `🦴 Score: X/Y` (current/target)

### Problems with Current System
1. ❌ **No spatial goal** - Level could be infinite, no sense of "finish line"
2. ❌ **Mandatory treats** - Must collect specific count, feels restrictive
3. ❌ **Score = Win condition** - Score doesn't serve as high score/replay value
4. ❌ **No speedrun potential** - Can't "skip" treats for faster times
5. ❌ **Limited replayability** - Once you hit target treats, level ends

---

## 🎯 New System Design (Mario-Style)

### Core Changes

#### 1. **Goal Object: Dog House** 🏠
- **Visual**: Cute dog house with South Park construction paper style
  - Red/brown wooden panels with grain texture
  - Triangle roof with shingles
  - Dark entrance (black oval)
  - Optional: Dog bowl, paw prints nearby
- **Placement**: At the end of each level (near `levelWidth - 200px`)
- **Collision**: Dog enters → Level Complete!
- **Animation**: 
  - Idle: Gentle scale pulse (breathing effect)
  - On approach: Door sparkles/glows
  - On enter: Dog disappears inside, victory animation

#### 2. **Treats = Optional Score Boosters** 🦴
- **New Role**: Collect for high score, NOT required to win
- **Point Values**:
  - Regular treat: 100 pts
  - Golden treat (rare): 500 pts (1-2 per level)
  - Perfect run bonus: +1000 pts (collect ALL treats)
- **Strategic Placement**: 
  - Easy treats: On main path (safe)
  - Risky treats: Off path, near hazards (high reward)
  - Secret treats: Hidden areas requiring exploration

#### 3. **High Score System** 🏆
- **Components**:
  ```
  Final Score = Treats Collected × 100 
                + Time Bonus (faster = more points)
                + Health Bonus (remaining health × 200)
                + Perfect Run Bonus (+1000 if all treats)
                - Damage Penalty (hits × 50)
  ```
- **Per-Level Leaderboard**: 
  - Best Score
  - Best Time
  - Most Treats Collected
- **Ranking System**:
  - ⭐ Bronze: Reach goal (no requirements)
  - ⭐⭐ Silver: Score > 1000, Time < 2 minutes
  - ⭐⭐⭐ Gold: Score > 2000, Time < 90 seconds, 80%+ treats

#### 4. **Level Complete Screen Updates**
- **Display Stats**:
  - Time: 1:23.45
  - Treats: 14/17 (82%)
  - Health Remaining: 8/10
  - **FINAL SCORE: 2,450**
  - Star Rating: ⭐⭐⭐
  - High Score: 2,450 (NEW RECORD! 🎉)
- **Buttons**:
  - Retry Level (beat your score)
  - Next Level
  - Level Select

---

## 🛠️ Implementation Plan

### Phase 1: Create Goal Entity (1-2 hours)

#### A. New File: `src/entities/GoalHouse.ts`
```typescript
export class GoalHouse {
  private sprite: Phaser.GameObjects.Container;
  private scene: Phaser.Scene;
  private x: number;
  private y: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Draw dog house (South Park style)
    // Add idle animation (pulse)
    // Set up physics body for collision
  }

  public playEnterAnimation(dog: Dog) {
    // Dog enters house
    // Victory animation
    // Return promise when complete
  }

  public getSprite() { return this.sprite; }
}
```

#### B. Visual Design
- **Base**: 120px wide × 100px tall
- **Roof**: Triangle (0xA0522D - sienna brown)
- **Walls**: Rectangle (0xD2691E - chocolate brown)
- **Door**: Oval (0x000000 - black, 40×50px)
- **Details**: 
  - Wood grain lines (1px, 30% alpha)
  - Window (small square, yellow glow)
  - Paw print decal
  - Dog bowl nearby (optional)

### Phase 2: Update Level Config (30 min)

#### Modify `src/types/LevelConfig.ts`
```typescript
export interface LevelConfig {
  // ... existing fields ...
  
  // REMOVE: treatsNeededToWin: number;
  
  // ADD:
  goalPosition: number; // X position of goal (e.g., levelWidth - 200)
  
  // ADD: High Score Targets (for star ratings)
  bronzeScore: number; // Just reach goal
  silverScore: number; // e.g., 1000 pts
  goldScore: number; // e.g., 2000 pts
  
  // ADD: Optional time targets
  silverTime?: number; // seconds (e.g., 120)
  goldTime?: number; // seconds (e.g., 90)
}
```

#### Update Level Configs
```typescript
1: {
  // ... existing ...
  goalPosition: 5000, // 200px before end
  treatCount: 17, // ALL optional now!
  bronzeScore: 0, // Just reach goal
  silverScore: 1000,
  goldScore: 2000,
  silverTime: 90,
  goldTime: 60
}
```

### Phase 3: Update GameScene (2-3 hours)

#### A. Add Goal Entity
```typescript
private goalHouse?: GoalHouse;

create() {
  // ... existing setup ...
  
  // Create goal house at end of level
  const goalX = this.levelConfig.goalPosition || (levelWidth - 200);
  const goalY = height - 64; // On ground
  this.goalHouse = new GoalHouse(this, goalX, goalY);
  
  // Set up collision detection
  this.physics.add.overlap(
    this.dog.getSprite(),
    this.goalHouse.getSprite(),
    this.reachGoal,
    undefined,
    this
  );
}

private reachGoal() {
  if (this.gameOver) return;
  this.gameOver = true;
  
  // Calculate final score
  const stats = this.calculateLevelStats();
  
  // Store in registry for LevelCompleteScene
  this.registry.set('levelStats', stats);
  
  // Play victory animation
  this.goalHouse?.playEnterAnimation(this.dog);
  
  // Launch level complete screen (after animation)
  this.time.delayedCall(1000, () => {
    this.scene.pause('GameScene');
    this.scene.launch('LevelCompleteScene');
  });
}

private calculateLevelStats() {
  const treatsCollected = /* count from uiScene */;
  const timeElapsed = (this.time.now - this.sceneStartTime) / 1000;
  const healthRemaining = this.uiScene?.getHealth() || 0;
  const totalTreats = this.levelConfig.treatCount;
  
  // Calculate score components
  const treatPoints = treatsCollected * 100;
  const healthBonus = healthRemaining * 200;
  const perfectBonus = (treatsCollected === totalTreats) ? 1000 : 0;
  const timeBonus = Math.max(0, 2000 - Math.floor(timeElapsed * 10));
  
  const finalScore = treatPoints + healthBonus + perfectBonus + timeBonus;
  
  return {
    score: finalScore,
    time: timeElapsed,
    treatsCollected,
    totalTreats,
    healthRemaining,
    maxHealth: this.levelConfig.maxHealth,
    perfectRun: treatsCollected === totalTreats
  };
}
```

#### B. Remove Old Win Condition
```typescript
// DELETE: Check for target score win condition
// DELETE: targetScore logic
// DELETE: treatsNeededToWin references
```

### Phase 4: Update UIScene (1 hour)

#### Modify Display
```typescript
// OLD: 🦴 Score: 11/17
// NEW: 🦴 Treats: 11/17 | Score: 1,450

private updateScoreDisplay() {
  const score = this.score; // Calculated dynamically
  const treatsCollected = /* track separately */;
  const totalTreats = /* from config */;
  
  this.scoreText.setText(
    `🦴 Treats: ${treatsCollected}/${totalTreats} | Score: ${score}`
  );
}
```

#### Track Treats Separately
```typescript
private treatsCollected: number = 0;
private totalTreats: number = 0;

collectTreat() {
  this.treatsCollected++;
  this.score += 100; // Treat value
  this.updateScoreDisplay();
}
```

### Phase 5: Update LevelCompleteScene (2 hours)

#### Major Redesign
```typescript
create() {
  // Get stats from registry
  const stats = this.registry.get('levelStats');
  
  // Get/update high score from localStorage
  const highScore = this.getHighScore(currentLevel);
  const isNewRecord = stats.score > highScore;
  if (isNewRecord) {
    this.saveHighScore(currentLevel, stats);
  }
  
  // Calculate star rating
  const stars = this.calculateStars(stats);
  
  // Display breakdown
  this.showScoreBreakdown(stats);
  this.showStarRating(stars);
  this.showHighScore(highScore, isNewRecord);
  
  // Buttons: Retry | Next Level | Level Select
}

private showScoreBreakdown(stats) {
  // Time: 1:23.45
  // Treats: 14/17 (82%)
  // Health Bonus: +1,600
  // Perfect Bonus: -
  // Time Bonus: +850
  // FINAL SCORE: 2,450
}

private calculateStars(stats) {
  const config = getCurrentLevelConfig(currentLevel);
  
  if (stats.score >= config.goldScore && 
      stats.time <= config.goldTime) {
    return 3;
  } else if (stats.score >= config.silverScore &&
             stats.time <= config.silverTime) {
    return 2;
  }
  return 1; // Bronze (reached goal)
}
```

### Phase 6: Update Level Select (1 hour)

#### Show Stars on Completed Levels
```typescript
// Level card display
// Show star rating (⭐⭐⭐ or ⭐⭐ or ⭐)
// Show high score: "Best: 2,450"
// Show best time: "Best: 1:23.45"
```

---

## 📏 Level Length & Difficulty Updates

### Updated Level Metrics (World 1)

| Level | Length | Platforms | Treats | Goal Position | Target Time (Gold) |
|-------|--------|-----------|--------|---------------|-------------------|
| **1** | 5,200px | 25 | 17 | 5,000px | 60s |
| **2** | 7,800px | 36 | 23 | 7,600px | 90s |
| **3** | 10,400px | 46 | 29 | 10,200px | 120s |
| **4** | 13,000px | 55 | 35 | 12,800px | 150s |
| **5** | 15,600px | 65 | 40 | 15,400px | 180s |

**Difficulty Scaling**:
- **Length**: +2,600px per level
- **Speed**: Progressive scroll speed increase
- **Treats**: Bonus points, not required
- **Goal**: Always 200px before level end (visual endpoint)

---

## 🌍 WORLDS.md Updates

### World 1: Backyard Escape

**UPDATED: Win Condition**
- OLD: Collect X treats to win
- NEW: Reach dog house at end of level

**UPDATED: Scoring System**
- Treats = Optional score boosters (100 pts each)
- Golden treats = Rare (500 pts, 1 per level)
- Perfect run = All treats collected (+1000 bonus)
- Time bonus = Faster completion = more points
- Health bonus = Remaining health × 200 pts

**UPDATED: Replayability**
- Bronze ⭐: Reach goal (always achievable)
- Silver ⭐⭐: Score > 1000, Time < 2 min
- Gold ⭐⭐⭐: Score > 2000, Time < 90s, 80%+ treats

**UPDATED: Progression Metrics**
| Metric | L1 | L2 | L3 | L4 | L5 |
|--------|----|----|----|----|-----|
| **Length** | 5.2k | 7.8k | 10.4k | 13k | 15.6k |
| **Goal Position** | 5k | 7.6k | 10.2k | 12.8k | 15.4k |
| **Treats (Optional)** | 17 | 23 | 29 | 35 | 40 |
| **Gold Time** | 60s | 90s | 120s | 150s | 180s |
| **Gold Score** | 2k | 2.5k | 3k | 3.5k | 4k |

### World 2-4: Park, Beach, City (Future)

**Same System Applied**:
- Goal object changes per theme:
  - World 2 (Park): Dog gate / Park exit sign
  - World 3 (Beach): Beach umbrella / Lifeguard station
  - World 4 (City): Home front door / Doggy daycare entrance
- Longer levels with more treats
- Higher score targets for star ratings
- Faster time requirements

---

## ✅ Implementation Checklist

### Phase 1: Core Goal System
- [ ] Create `GoalHouse.ts` entity
- [ ] Draw South Park style dog house sprite
- [ ] Add idle/approach/enter animations
- [ ] Set up physics collision detection

### Phase 2: Config Updates
- [ ] Update `LevelConfig.ts` interface
- [ ] Remove `treatsNeededToWin` field
- [ ] Add `goalPosition` field
- [ ] Add star rating targets (bronze/silver/gold)
- [ ] Update all 5 level configs

### Phase 3: GameScene Refactor
- [ ] Instantiate goal house at end of level
- [ ] Add overlap detection (dog + goal)
- [ ] Implement `reachGoal()` method
- [ ] Create `calculateLevelStats()` method
- [ ] Remove old treat-based win condition
- [ ] Remove target score logic
- [ ] Track treats collected separately

### Phase 4: UIScene Updates
- [ ] Change display: `Treats: X/Y | Score: Z`
- [ ] Track `treatsCollected` separately from `score`
- [ ] Update score calculation (dynamic)
- [ ] Remove target score references

### Phase 5: LevelCompleteScene Redesign
- [ ] Get stats from registry
- [ ] Calculate star rating (1-3 stars)
- [ ] Show score breakdown (treats, health, time bonuses)
- [ ] Display high score + "NEW RECORD!" if beat
- [ ] Save/load high scores from localStorage
- [ ] Add "Retry" button (replay for better score)
- [ ] Show star animation (⭐⭐⭐)

### Phase 6: Level Select Updates
- [ ] Display star rating per level
- [ ] Show high score per level
- [ ] Show best time per level
- [ ] Visual indicator for incomplete levels

### Phase 7: Testing & Balancing
- [ ] Test Level 1 (tutorial balance)
- [ ] Test Levels 2-5 (progression difficulty)
- [ ] Verify star thresholds are achievable
- [ ] Test high score persistence
- [ ] Test treat collection tracking
- [ ] Verify goal collision detection

### Phase 8: Polish
- [ ] Goal house sparkle particles
- [ ] Victory music/sound (when audio works)
- [ ] Dog enter house animation
- [ ] Score counting animation
- [ ] Star reveal animation

---

## 🎮 Gameplay Impact Analysis

### Pros ✅
1. **Clear spatial goal** - Players know where to go
2. **Optional treats** - Can skip risky treats, speedrun focus
3. **Replayability** - High score chase, star ratings
4. **Strategic depth** - Risk/reward for off-path treats
5. **Faster levels** - Can reach goal without all treats
6. **Mario-like feel** - Familiar goal-based progression

### Cons ⚠️
1. **Complexity** - More systems to implement
2. **Balancing** - Need to tune star thresholds
3. **Testing** - More edge cases to cover

### Mitigations
- Start with generous star thresholds
- Playtest thoroughly with both breeds
- Adjust based on telemetry (if added)

---

## 📊 Estimated Implementation Time

| Phase | Time | Status |
|-------|------|--------|
| **Phase 1**: Goal Entity | 1-2h | ⏳ Pending |
| **Phase 2**: Config Updates | 0.5h | ⏳ Pending |
| **Phase 3**: GameScene Refactor | 2-3h | ⏳ Pending |
| **Phase 4**: UIScene Updates | 1h | ⏳ Pending |
| **Phase 5**: LevelComplete Redesign | 2h | ⏳ Pending |
| **Phase 6**: LevelSelect Updates | 1h | ⏳ Pending |
| **Phase 7**: Testing & Balance | 2h | ⏳ Pending |
| **Phase 8**: Polish | 1-2h | ⏳ Pending |
| **TOTAL** | **10-14 hours** | ⏳ Not Started |

---

## 🚀 Rollout Plan

1. **Implement for World 1** (Levels 1-5) first
2. **Test & balance** star thresholds
3. **Update WORLDS.md** with new system
4. **Apply to future worlds** (2-4) when implemented

---

**Last Updated**: December 25, 2024  
**Next Step**: Begin Phase 1 - Create GoalHouse entity  
**Target**: Complete World 1 implementation (Levels 1-5)

