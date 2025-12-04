import Phaser from 'phaser';

export class Treat {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private scene: Phaser.Scene;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    
    // Create placeholder treat graphic (bone-colored circle)
    const graphics = scene.add.graphics();
    graphics.fillStyle(0xFFFFCC, 1); // Light yellow color for treat
    graphics.fillCircle(12, 12, 12);
    graphics.lineStyle(2, 0xCCCC88, 1);
    graphics.strokeCircle(12, 12, 12);
    graphics.generateTexture('treat-placeholder', 24, 24);
    graphics.destroy();
    
    // Create sprite
    this.sprite = scene.physics.add.sprite(x, y, 'treat-placeholder');
    this.sprite.setCollideWorldBounds(true);
    
    // Add floating animation
    scene.tweens.add({
      targets: this.sprite,
      y: y - 10,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Add sparkle effect
    scene.tweens.add({
      targets: this.sprite,
      alpha: 0.7,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }
  
  collect() {
    // Play collection animation
    this.scene.tweens.add({
      targets: this.sprite,
      scale: 1.5,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.sprite.destroy();
      }
    });
  }
  
  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }
}

