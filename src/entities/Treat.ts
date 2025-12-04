import Phaser from 'phaser';

export class Treat {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private scene: Phaser.Scene;
  private size: number; // 1, 2, or 3
  private pointValue: number;
  
  constructor(scene: Phaser.Scene, x: number, y: number, size: number = 2) {
    this.scene = scene;
    this.size = Math.max(1, Math.min(3, size)); // Clamp between 1-3
    
    // Point values based on size (simple 1-2-3 scale)
    const pointValues = {
      1: 1,   // Small treat = 1 point
      2: 2,   // Medium treat = 2 points
      3: 3    // Large treat = 3 points
    };
    this.pointValue = pointValues[this.size as keyof typeof pointValues];
    
    // Create bone-shaped treat graphic with size-appropriate dimensions
    const scale = this.size; // 1, 2, or 3
    const textureKey = `treat-size-${this.size}`;
    
    // Only generate texture once
    if (!scene.textures.exists(textureKey)) {
      const graphics = scene.add.graphics();
      const boneColor = 0xFFE4B5; // Moccasin color for bone
      const outlineColor = 0xD2B48C; // Tan outline
      
      // Draw bone shape (two circles connected by rectangle)
      const width = 12 * scale;
      const height = 8 * scale;
      const centerX = 16 * scale;
      const centerY = 12 * scale;
      
      graphics.fillStyle(boneColor, 1);
      graphics.lineStyle(2, outlineColor, 1);
      
      // Left circle (bone end)
      graphics.fillCircle(centerX - width/2, centerY - height/3, height/2);
      graphics.strokeCircle(centerX - width/2, centerY - height/3, height/2);
      graphics.fillCircle(centerX - width/2, centerY + height/3, height/2);
      graphics.strokeCircle(centerX - width/2, centerY + height/3, height/2);
      
      // Center bar
      graphics.fillRect(centerX - width/2, centerY - height/4, width, height/2);
      graphics.strokeRect(centerX - width/2, centerY - height/4, width, height/2);
      
      // Right circle (bone end)
      graphics.fillCircle(centerX + width/2, centerY - height/3, height/2);
      graphics.strokeCircle(centerX + width/2, centerY - height/3, height/2);
      graphics.fillCircle(centerX + width/2, centerY + height/3, height/2);
      graphics.strokeCircle(centerX + width/2, centerY + height/3, height/2);
      
      graphics.generateTexture(textureKey, 32 * scale, 24 * scale);
      graphics.destroy();
    }
    
    // Create sprite
    this.sprite = scene.physics.add.sprite(x, y, textureKey);
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
    // Create particle burst effect (more particles for larger treats)
    const particleCount = 8 * this.size;
    const textureKey = `treat-size-${this.size}`;
    
    const particles = this.scene.add.particles(this.sprite.x, this.sprite.y, textureKey, {
      speed: { min: 50, max: 150 },
      scale: { start: 0.8, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: 400,
      quantity: particleCount,
      blendMode: 'ADD'
    });
    
    particles.explode();
    
    // Play collection animation
    this.scene.tweens.add({
      targets: this.sprite,
      scale: 1.5,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.sprite.destroy();
        particles.destroy();
      }
    });
  }
  
  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }
  
  getPointValue(): number {
    return this.pointValue;
  }
  
  getSize(): number {
    return this.size;
  }
}

