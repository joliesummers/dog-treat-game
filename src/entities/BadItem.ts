import Phaser from 'phaser';

export type BadItemType = 'poo';

export class BadItem {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private itemType: BadItemType;
  
  constructor(scene: Phaser.Scene, x: number, y: number, type: BadItemType = 'poo') {
    this.itemType = type;
    
    // Create cute poo emoji graphic
    const textureKey = 'bad-poo';
    
    if (!scene.textures.exists(textureKey)) {
      const graphics = scene.add.graphics();
      
      // Cute poo emoji shape (swirl of poop)
      const brown = 0x8B4513; // Saddle brown
      const darkBrown = 0x654321; // Dark brown outline
      
      graphics.fillStyle(brown, 1);
      graphics.lineStyle(2, darkBrown, 1);
      
      // Bottom coil (largest)
      graphics.fillEllipse(16, 24, 20, 10);
      graphics.strokeEllipse(16, 24, 20, 10);
      
      // Middle coil
      graphics.fillEllipse(16, 18, 16, 9);
      graphics.strokeEllipse(16, 18, 16, 9);
      
      // Top coil (smallest)
      graphics.fillEllipse(16, 12, 12, 8);
      graphics.strokeEllipse(16, 12, 12, 8);
      
      // Swirl top point
      graphics.fillCircle(16, 8, 4);
      graphics.strokeCircle(16, 8, 4);
      
      // Cute face
      graphics.fillStyle(0x000000, 1);
      // Eyes (happy expression)
      graphics.fillCircle(12, 16, 2);
      graphics.fillCircle(20, 16, 2);
      
      // Smile
      graphics.lineStyle(2, 0x000000, 1);
      graphics.arc(16, 18, 4, 0, Math.PI, false);
      graphics.strokePath();
      
      // White shine on eyes
      graphics.fillStyle(0xFFFFFF, 1);
      graphics.fillCircle(11, 15, 1);
      graphics.fillCircle(19, 15, 1);
      
      graphics.generateTexture('bad-poo', 32, 28);
      graphics.destroy();
    }
    
    // Create sprite (textureKey already defined above)
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

