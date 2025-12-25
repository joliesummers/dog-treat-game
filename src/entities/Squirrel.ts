import Phaser from 'phaser';
import type { Tree } from './Tree';

export class Squirrel {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private tree: Tree;
  private state: 'perched' | 'warning' | 'jumping' | 'landed' = 'perched';
  private warningIndicator?: Phaser.GameObjects.Text;
  private jumpTween?: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, x: number, y: number, tree: Tree) {
    this.scene = scene;
    this.tree = tree;

    // Create squirrel texture if doesn't exist
    const textureKey = 'squirrel';
    if (!scene.textures.exists(textureKey)) {
      this.createTexture();
    }

    // Create as physics sprite for jump mechanics
    this.sprite = scene.physics.add.sprite(x, y, textureKey);
    this.sprite.setDepth(100); // Above platforms
    
    // Disable gravity while perched (don't fall off tree!)
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(true);

    // Start in perched state with idle animation
    this.startIdleAnimation();
  }

  private createTexture() {
    const graphics = this.scene.add.graphics();
    
    // Body (brown oval)
    graphics.fillStyle(0x8B4513, 1); // Saddle brown
    graphics.fillEllipse(16, 20, 12, 16);
    
    // Head (circle)
    graphics.fillCircle(16, 10, 8);
    
    // Ears (triangles)
    graphics.fillTriangle(12, 6, 10, 2, 14, 4);
    graphics.fillTriangle(20, 6, 18, 4, 22, 2);
    
    // Bushy tail (big fluffy curve)
    graphics.fillStyle(0xA0522D, 1); // Sienna for tail
    graphics.fillEllipse(8, 24, 14, 18);
    graphics.fillEllipse(6, 20, 10, 14);
    graphics.fillEllipse(4, 16, 8, 10);
    
    // Belly (lighter color)
    graphics.fillStyle(0xD2B48C, 1); // Tan
    graphics.fillEllipse(16, 22, 6, 10);
    
    // Face details
    graphics.fillStyle(0x000000, 1);
    // Eyes
    graphics.fillCircle(13, 9, 2);
    graphics.fillCircle(19, 9, 2);
    // Nose
    graphics.fillCircle(16, 12, 1);
    
    // White eye shine
    graphics.fillStyle(0xFFFFFF, 1);
    graphics.fillCircle(13, 8, 1);
    graphics.fillCircle(19, 8, 1);
    
    graphics.generateTexture('squirrel', 32, 36);
    graphics.destroy();
  }

  private startIdleAnimation() {
    // Gentle wobble while perched
    this.scene.tweens.add({
      targets: this.sprite,
      scaleX: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  public checkProximity(dogX: number, dogY: number, triggerDistance: number, canDistract: boolean, squirrelIndex: number = 0, isPassed: boolean = false): boolean {
    // Only check if perched and dog is distractable breed
    if (this.state !== 'perched' || !canDistract) {
      return false;
    }

    const distance = Phaser.Math.Distance.Between(
      this.sprite.x, this.sprite.y,
      dogX, dogY
    );

    // First squirrel on tree: Jump when dog approaches
    // Additional squirrels: Jump when dog passes (is beyond the tree)
    const shouldJump = squirrelIndex === 0 
      ? distance < triggerDistance  // First squirrel jumps on approach
      : isPassed && distance < triggerDistance * 1.5; // Others jump after passing

    if (shouldJump) {
      this.triggerJump(dogX, dogY);
      return true;
    }

    return false;
  }

  private triggerJump(_dogX: number, _dogY: number) {
    if (this.state !== 'perched') return;

    // Choose random arc type for variety
    const arcTypes: Array<'steep' | 'normal' | 'shallow' | 'fast' | 'backwards'> = 
      ['steep', 'normal', 'shallow', 'fast', 'backwards'];
    const arcType = arcTypes[Math.floor(Math.random() * arcTypes.length)];

    this.showWarning(arcType);
  }

  private showWarning(arcType: 'steep' | 'normal' | 'shallow' | 'fast' | 'backwards') {
    this.state = 'warning';

    // Stop idle animation
    this.scene.tweens.killTweensOf(this.sprite);

    // Squirrel shakes rapidly
    this.scene.tweens.add({
      targets: this.sprite,
      x: this.sprite.x + 3,
      duration: 50,
      yoyo: true,
      repeat: 5
    });

    // Show "!" indicator
    this.warningIndicator = this.scene.add.text(
      this.sprite.x,
      this.sprite.y - 40,
      '!',
      { fontSize: '24px', color: '#FF0000', fontStyle: 'bold' }
    );

    // Wait 500ms then jump
    this.scene.time.delayedCall(500, () => {
      if (this.warningIndicator) {
        this.warningIndicator.destroy();
      }
      // Get dog's CURRENT position for jump target
      const dog = this.scene.registry.get('dogSprite') as Phaser.Physics.Arcade.Sprite;
      if (dog) {
        this.jumpToward(dog.x, dog.y, arcType);
      }
    });
  }

  private jumpToward(targetX: number, targetY: number, arcType: 'steep' | 'normal' | 'shallow' | 'fast' | 'backwards') {
    this.state = 'jumping';
    
    // Enable gravity for the jump
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(true);
    body.setImmovable(false);

    // Arc configurations with varying trajectories
    const arcConfigs = {
      steep: { duration: 1800, height: 200, offsetMultiplier: 0.7 },     // High arc, less forward
      normal: { duration: 1500, height: 150, offsetMultiplier: 1.0 },    // Standard arc
      shallow: { duration: 1200, height: 100, offsetMultiplier: 1.3 },   // Fast & low, overshoots
      fast: { duration: 900, height: 120, offsetMultiplier: 1.1 },       // Very fast
      backwards: { duration: 1500, height: 150, offsetMultiplier: -0.8 } // Jump backwards!
    };

    const config = arcConfigs[arcType];
    
    // Calculate arc path with offset multiplier
    const startX = this.sprite.x;
    const startY = this.sprite.y;
    const deltaX = targetX - startX;
    const finalX = startX + (deltaX * config.offsetMultiplier);

    // Rotate squirrel during jump
    const rotationDirection = finalX > startX ? 360 : -360;
    this.scene.tweens.add({
      targets: this.sprite,
      angle: rotationDirection,
      duration: config.duration,
      ease: 'Linear'
    });

    // Create parabolic arc tween
    this.jumpTween = this.scene.tweens.add({
      targets: this.sprite,
      x: finalX,
      y: targetY,
      duration: config.duration,
      ease: 'Sine.easeInOut',
      onUpdate: (tween) => {
        // Parabolic arc calculation
        const progress = tween.progress;
        const parabola = 4 * progress * (1 - progress); // 0 at start/end, 1 at middle
        this.sprite.y = Phaser.Math.Linear(startY, targetY, progress) - (parabola * config.height);
      },
      onComplete: () => {
        this.land();
      }
    });
  }

  private land() {
    this.state = 'landed';
    this.sprite.angle = 0;

    // Despawn after 2 seconds
    this.scene.time.delayedCall(2000, () => {
      this.destroy();
    });
  }

  public getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }

  public getState(): string {
    return this.state;
  }

  public destroy() {
    if (this.jumpTween) {
      this.jumpTween.stop();
    }
    if (this.warningIndicator) {
      this.warningIndicator.destroy();
    }
    this.tree.removeSquirrel(this);
    this.sprite.destroy();
  }
}
