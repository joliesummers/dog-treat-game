import Phaser from 'phaser';

export type BadItemType = 'chocolate' | 'grapes';

export class BadItem {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private itemType: BadItemType;
  
  constructor(scene: Phaser.Scene, x: number, y: number, type: BadItemType = 'chocolate') {
    this.itemType = type;
    
    // Create placeholder bad item graphic
    const graphics = scene.add.graphics();
    
    if (type === 'chocolate') {
      // Brown square for chocolate
      graphics.fillStyle(0x4B2C20, 1);
      graphics.fillRect(0, 0, 24, 24);
      graphics.lineStyle(2, 0x2F1810, 1);
      graphics.strokeRect(0, 0, 24, 24);
      graphics.generateTexture('bad-chocolate', 24, 24);
    } else {
      // Purple circles for grapes
      graphics.fillStyle(0x6B4C9A, 1);
      graphics.fillCircle(8, 12, 8);
      graphics.fillCircle(16, 12, 8);
      graphics.fillCircle(12, 8, 8);
      graphics.generateTexture('bad-grapes', 24, 24);
    }
    graphics.destroy();
    
    // Create sprite
    const textureKey = type === 'chocolate' ? 'bad-chocolate' : 'bad-grapes';
    this.sprite = scene.physics.add.sprite(x, y, textureKey);
    this.sprite.setCollideWorldBounds(true);
    
    // Start with gravity disabled (will be enabled for falling items)
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    
    // Add warning pulse animation
    scene.tweens.add({
      targets: this.sprite,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }
  
  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }
  
  getType(): BadItemType {
    return this.itemType;
  }
}

