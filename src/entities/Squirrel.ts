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

  public checkProximity(dogX: number, dogY: number, triggerDistance: number, canDistract: boolean): boolean {
    // Only check if perched and dog is distractable breed
    if (this.state !== 'perched' || !canDistract) {
      return false;
    }

    const distance = Phaser.Math.Distance.Between(
      this.sprite.x, this.sprite.y,
      dogX, dogY
    );

    if (distance < triggerDistance) {
      this.showWarning();
      return true;
    }

    return false;
  }

  private showWarning() {
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
        this.jumpToward(dog.x, dog.y);
      }
    });
  }

  private jumpToward(targetX: number, targetY: number) {
    this.state = 'jumping';

    // Calculate arc path
    const startX = this.sprite.x;
    const startY = this.sprite.y;
    const arcHeight = 150; // Jump 150px high

    // Create parabolic arc tween
    this.jumpTween = this.scene.tweens.add({
      targets: this.sprite,
      x: targetX,
      y: targetY,
      duration: 1500, // 1.5 seconds travel time
      ease: 'Sine.easeInOut',
      onUpdate: (tween) => {
        // Parabolic arc calculation
        const progress = tween.progress;
        const parabola = 4 * progress * (1 - progress); // 0 at start/end, 1 at middle
        this.sprite.y = Phaser.Math.Linear(startY, targetY, progress) - (parabola * arcHeight);
      },
      onComplete: () => {
        this.land();
      }
    });

    // Rotate squirrel during jump
    this.scene.tweens.add({
      targets: this.sprite,
      angle: targetX > startX ? 360 : -360,
      duration: 1500,
      ease: 'Linear'
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
