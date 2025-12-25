# 🌳 World 2: Park Adventure - Implementation Plan

**Status**: IN PROGRESS  
**Started**: December 25, 2024  
**Completion**: ~30% (Level configs added, navigation ready)

---

## ✅ **COMPLETED**

### 1. Navigation System
- ✅ WorldSelectScene created (4 world cards)
- ✅ LevelSelectScene updated (filters by world)
- ✅ MenuScene routes to WorldSelectScene
- ✅ World unlock logic (after Level 5, 10, 15)

### 2. Level Configurations
- ✅ Level 6: Park Entrance (120 px/s, 8k, 30 treats)
- ✅ Level 7: Tree Trail (140 px/s, 9.5k, 35 treats)
- ✅ Level 8: Sprinkler Zone (160 px/s, 11k, 40 treats)
- ✅ Level 9: Light Rain (180 px/s, 12.5k, 45 treats)
- ✅ Level 10: Storm Finale (200 px/s, 14k, 50 treats)

### 3. Documentation
- ✅ WORLDS.md fully updated with World 2 specs
- ✅ Progressive difficulty system documented
- ✅ Themed treats system planned
- ✅ Escalating distractions documented

---

## 🔨 **IN PROGRESS**

### GameScene Refactor (STARTED)
**File**: `src/scenes/GameScene.ts`

**Changes Made**:
- Line ~93: Added `getWorldNumber()` call
- Line ~97: Added `createWorldBackground()` call
- Line ~101: Updated `createPlatformTextures(worldNumber)` signature

**Still Needed**:
- Implement `getWorldNumber(level)` helper method
- Implement `createWorldBackground(worldNumber, width, height)` method
- Implement `createWorldGround(worldNumber, width, height)` method
- Update `createPlatforms()` to accept worldNumber parameter
- Update `createPlatformTextures()` to accept worldNumber parameter

---

## ⏳ **TODO - World 2 Implementation**

### Phase 1: Visual Theme (2-3 hours)

#### A. Helper Methods to Add to GameScene
**Location**: Add at end of GameScene class (before final closing brace)

```typescript
private getWorldNumber(level: number): number {
  if (level >= 16) return 4; // City
  if (level >= 11) return 3; // Beach
  if (level >= 6) return 2;  // Park
  return 1; // Backyard
}

private createWorldBackground(world: number, width: number, height: number) {
  const sky = this.add.graphics();
  
  switch (world) {
    case 1: // Backyard - Cyan
      sky.fillGradientStyle(0x4DD0E1, 0x4DD0E1, 0xB2EBF2, 0xB2EBF2, 1);
      break;
    case 2: // Park - Blue/Green
      sky.fillGradientStyle(0x64B5F6, 0x64B5F6, 0x81C784, 0x81C784, 1);
      break;
    case 3: // Beach - Orange/Blue
      sky.fillGradientStyle(0xFFB74D, 0xFFB74D, 0x42A5F5, 0x42A5F5, 1);
      break;
    case 4: // City - Gray
      sky.fillGradientStyle(0x90A4AE, 0x90A4AE, 0x607D8B, 0x607D8B, 1);
      break;
  }
  
  sky.fillRect(0, 0, width, height);
  sky.setScrollFactor(0.5);
  
  // Add world-specific background elements
  if (world === 2) {
    this.createParkBackgroundElements(width, height);
  }
}

private createParkBackgroundElements(width: number, height: number) {
  // Park benches, lamp posts, tree silhouettes
  for (let i = 0; i < width; i += 400) {
    // Lamp post
    const lampX = i + 200;
    const lamp = this.add.graphics();
    lamp.fillStyle(0x424242, 0.3);
    lamp.fillRect(lampX, height - 150, 8, 80);
    lamp.fillCircle(lampX + 4, height - 150, 15);
    lamp.setScrollFactor(0.7); // Parallax
    
    // Tree silhouette
    const treeX = i + 100;
    const tree = this.add.graphics();
    tree.fillStyle(0x2E7D32, 0.2);
    tree.fillEllipse(treeX, height - 100, 60, 80);
    tree.setScrollFactor(0.6);
  }
}

private createWorldGround(world: number, width: number, height: number) {
  this.platforms = this.physics.add.staticGroup();
  
  const ground = this.add.rectangle(width / 2, height - 32, width, 64);
  
  switch (world) {
    case 1: // Backyard - Grass
      ground.setFillStyle(0x8BC34A);
      ground.setStrokeStyle(3, 0x558B2F);
      this.createGrassTexture(width, height);
      break;
    case 2: // Park - Concrete path
      ground.setFillStyle(0x9E9E9E);
      ground.setStrokeStyle(3, 0x616161);
      this.createConcreteTexture(width, height);
      break;
    case 3: // Beach - Sand
      ground.setFillStyle(0xFFD54F);
      ground.setStrokeStyle(3, 0xFFB300);
      break;
    case 4: // City - Asphalt
      ground.setFillStyle(0x424242);
      ground.setStrokeStyle(3, 0x212121);
      break;
  }
  
  this.platforms.add(ground);
}

private createGrassTexture(width: number, height: number) {
  const graphics = this.add.graphics();
  graphics.fillStyle(0x689F38, 0.7);
  for (let i = 0; i < width; i += 8) {
    const variation = Phaser.Math.Between(-4, 4);
    graphics.fillRect(i, height - 64 + variation, 4, 8);
  }
}

private createConcreteTexture(width: number, height: number) {
  const graphics = this.add.graphics();
  // Concrete cracks
  graphics.lineStyle(1, 0x757575, 0.5);
  for (let i = 0; i < width; i += 150) {
    const crackX = i + Phaser.Math.Between(0, 100);
    graphics.lineBetween(crackX, height - 50, crackX + 30, height - 20);
  }
  // Moss spots
  graphics.fillStyle(0x66BB6A, 0.3);
  for (let i = 0; i < width; i += 200) {
    graphics.fillCircle(i + Phaser.Math.Between(0, 150), height - 40, 6);
  }
}
```

#### B. Update createPlatformTextures Method
**Change signature** from:
```typescript
private createPlatformTextures() {
```

**To**:
```typescript
private createPlatformTextures(world: number = 1) {
  if (world === 1) {
    // Existing wood texture code
  } else if (world === 2) {
    // Stone/concrete platforms
    if (!this.textures.exists('stone-texture')) {
      const graphics = this.add.graphics();
      graphics.fillStyle(0x9E9E9E, 1);
      graphics.fillRect(0, 0, 200, 32);
      // Add stone texture (cracks, spots)
      graphics.lineStyle(1, 0x757575, 0.6);
      for (let i = 0; i < 10; i++) {
        const x = Phaser.Math.Between(0, 200);
        const y = Phaser.Math.Between(0, 32);
        graphics.lineBetween(x, y, x + 20, y);
      }
      graphics.generateTexture('stone-texture', 200, 32);
      graphics.destroy();
    }
  }
}
```

#### C. Update createPlatforms Method
**Add worldNumber parameter**:
```typescript
private createPlatforms(levelWidth: number, height: number, platformCount: number, world: number = 1) {
  // ... existing code ...
  
  // Change texture key based on world
  const textureKey = world === 2 ? 'stone-texture' : 'wood-texture';
  
  // ... use textureKey when creating platforms ...
}
```

---

### Phase 2: Goal Objects (1-2 hours)

#### A. Create ParkGate Entity
**New File**: `src/entities/ParkGate.ts`

```typescript
import Phaser from 'phaser';
import type { Dog } from './Dog';

export class ParkGate {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private sprite: Phaser.GameObjects.Graphics;
  private x: number;
  private y: number;
  private isActivated: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.container = scene.add.container(x, y);
    this.container.setDepth(50);

    this.sprite = scene.add.graphics();
    this.drawParkGate();
    this.container.add(this.sprite);

    this.startIdleAnimation();
    this.setupPhysics();
  }

  private drawParkGate() {
    const g = this.sprite;

    // Gate posts (metal)
    g.fillStyle(0x424242, 1);
    g.fillRect(-50, -100, 10, 100); // Left post
    g.fillRect(40, -100, 10, 100);  // Right post

    // Gate bars (horizontal metal bars)
    g.fillStyle(0x616161, 1);
    for (let i = 0; i < 5; i++) {
      const y = -90 + i * 20;
      g.fillRect(-50, y, 100, 4);
    }

    // EXIT sign on top
    g.fillStyle(0x4CAF50, 1); // Green background
    g.fillRect(-40, -120, 80, 20);
    
    // EXIT text (use scene.add.text for actual text)
  }

  private startIdleAnimation() {
    // Gentle sway
    this.scene.tweens.add({
      targets: this.container,
      angle: 1,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private setupPhysics() {
    this.scene.physics.world.enable(this.container);
    const body = this.container.body as Phaser.Physics.Arcade.Body;
    body.setSize(100, 100);
    body.setOffset(-50, -50);
    body.setImmovable(true);
    body.setAllowGravity(false);
  }

  public showApproachEffect() {
    if (this.isActivated) return;
    this.isActivated = true;
    // Gate opening animation
  }

  public playEnterAnimation(dog: Dog): Promise<void> {
    return new Promise((resolve) => {
      // Dog runs through gate
      const dogSprite = dog.getSprite();
      this.scene.tweens.add({
        targets: dogSprite,
        x: this.x,
        alpha: 0,
        duration: 800,
        onComplete: () => resolve()
      });
    });
  }

  public getContainer(): Phaser.GameObjects.Container {
    return this.container;
  }

  public destroy() {
    this.container.destroy();
  }
}
```

#### B. Update GameScene to Use World-Specific Goals
**In create() method**, replace:
```typescript
this.goalHouse = new GoalHouse(this, goalX, goalY);
```

**With**:
```typescript
if (worldNumber === 1) {
  this.goalHouse = new GoalHouse(this, goalX, goalY);
} else if (worldNumber === 2) {
  this.goalHouse = new ParkGate(this, goalX, goalY) as any; // Cast for compatibility
}
```

---

### Phase 3: New Treats (30 min)

#### Tennis Ball & Frisbee Sprites
**Update Treat.ts or create variants**

Option 1: Modify `Treat.ts` to accept world parameter
Option 2: Create `TennisBall.ts` and `Frisbee.ts` entities

**Tennis Ball** (yellow/green, 100-150 pts):
```typescript
graphics.fillStyle(0xFFEB3B, 1); // Yellow
graphics.fillCircle(16, 16, 14);
graphics.lineStyle(2, 0xCDDC39, 1); // Green-yellow line
graphics.arc(16, 16, 14, 0, Math.PI);
```

**Frisbee** (orange/red, 150 pts):
```typescript
graphics.fillStyle(0xFF5722, 1); // Orange
graphics.fillEllipse(16, 16, 28, 10);
graphics.lineStyle(1, 0xBF360C, 1); // Dark orange ring
graphics.strokeEllipse(16, 16, 24, 8);
```

---

### Phase 4: New Obstacles (3-4 hours)

#### A. Duck Entity
**New File**: `src/entities/Duck.ts`

**Behavior**:
- Waddles left (2s) → pause (0.5s) → right (2s) → repeat
- South Park construction paper style
- Yellow body, orange bill, waddle animation
- Collision: Damage + 1s distraction (Golden only)

#### B. TreeObstacle Entity
**New File**: `src/entities/TreeObstacle.ts`

**Behavior**:
- Static vertical obstacle (100px height)
- Dog must jump over
- Blocks movement (can't walk through)
- Brown trunk, green foliage

#### C. Sprinkler Entity
**New File**: `src/entities/Sprinkler.ts`

**Behavior**:
- 3s ON (spray), 2s OFF cycle
- Blue water particles
- 0.5x movement speed in spray zone
- 80px radius effect

---

### Phase 5: Weather System (1-2 hours)

#### Rain Particles & Slippery Physics
**Add to GameScene**:

```typescript
private createRainEffect(level: number) {
  if (level < 9) return; // Rain starts at Level 9
  
  const intensity = level === 9 ? 0.7 : 1.0; // Light vs Heavy
  
  // Rain particles
  const emitter = this.add.particles(0, 0, 'raindrop', {
    x: { min: 0, max: this.cameras.main.width },
    y: -50,
    speedY: { min: 300, max: 500 },
    lifespan: 2000,
    quantity: intensity === 0.7 ? 3 : 6,
    scale: 0.3
  });
  
  emitter.setScrollFactor(0);
  
  // Apply slippery physics to dog
  // Reduce traction multiplier in Dog.ts
}
```

---

### Phase 6: GameScene Integration (1-2 hours)

#### Spawn Obstacles Based on World & Level

**Add to GameScene.create()**:
```typescript
if (worldNumber === 2) {
  // Spawn ducks (Level 6+)
  this.createDucks(this.currentLevel);
  
  // Spawn tree obstacles (Level 7+)
  if (this.currentLevel >= 7) {
    this.createTreeObstacles(this.currentLevel);
  }
  
  // Spawn sprinklers (Level 8+)
  if (this.currentLevel >= 8) {
    this.createSprinklers(this.currentLevel);
  }
  
  // Add rain (Level 9+)
  if (this.currentLevel >= 9) {
    this.createRainEffect(this.currentLevel);
  }
}
```

---

## 📋 **Implementation Checklist**

### Visual Theme
- [ ] Add `getWorldNumber()` helper
- [ ] Add `createWorldBackground()` method
- [ ] Add `createParkBackgroundElements()` method
- [ ] Add `createWorldGround()` method
- [ ] Add `createConcreteTexture()` method
- [ ] Update `createPlatformTextures()` signature
- [ ] Add stone/concrete platform textures
- [ ] Update `createPlatforms()` to use world textures

### Goal Objects
- [ ] Create `ParkGate.ts` entity
- [ ] Update GameScene to use ParkGate for World 2
- [ ] Test gate collision & animation

### Treats
- [ ] Add tennis ball sprite variant
- [ ] Add frisbee sprite variant
- [ ] Update treat spawning for World 2

### Obstacles
- [ ] Create `Duck.ts` entity
- [ ] Create `TreeObstacle.ts` entity
- [ ] Create `Sprinkler.ts` entity
- [ ] Add duck spawning logic
- [ ] Add tree obstacle spawning logic
- [ ] Add sprinkler spawning logic
- [ ] Test all obstacle collisions

### Weather
- [ ] Create rain particle system
- [ ] Implement slippery platform physics
- [ ] Add visual rain effects (puddles, fog)

### Testing
- [ ] Test Level 6 (ducks only)
- [ ] Test Level 7 (ducks + trees)
- [ ] Test Level 8 (ducks + trees + sprinklers)
- [ ] Test Level 9 (all + light rain)
- [ ] Test Level 10 (all + heavy rain, max difficulty)

---

## 🚀 **Next Steps**

1. Start with **Phase 1** (Visual Theme) - Get park looking different
2. Move to **Phase 2** (Park Gate) - New goal object
3. Implement **Phase 3** (Treats) - Quick visual update
4. Tackle **Phase 4** (Obstacles) - Main gameplay content
5. Add **Phase 5** (Weather) - Polish and difficulty
6. Integrate everything in **Phase 6**
7. Test thoroughly

**Estimated Total Time**: 8-10 hours

---

## 📝 **Files to Create**
- `src/entities/ParkGate.ts`
- `src/entities/Duck.ts`
- `src/entities/TreeObstacle.ts`
- `src/entities/Sprinkler.ts`

## 📝 **Files to Modify**
- `src/scenes/GameScene.ts` (major refactor)
- `src/entities/Treat.ts` (add variants)
- `src/entities/Dog.ts` (slippery physics)

---

**Good luck with World 2 implementation!** 🌳🦆💦

