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
      const outlineColor = 0x000000; // BLACK OUTLINE for Angry Birds style!
      
      // Draw realistic dog bone shape (dumbbell/hourglass)
      const boneWidth = 16 * scale;
      const boneHeight = 8 * scale;
      const centerX = 16 * scale;
      const centerY = 8 * scale;
      const endRadius = 4 * scale;
      const waistWidth = 2.5 * scale;
      
      graphics.lineStyle(3 * scale, outlineColor, 1); // Thick outline!
      graphics.fillStyle(boneColor, 1);
      
      // Draw bone as a path (smooth dumbbell shape)
      graphics.beginPath();
      
      // Left end (top knob)
      graphics.arc(centerX - boneWidth/2, centerY - boneHeight/3, endRadius, 0, Math.PI * 2);
      graphics.closePath();
      graphics.fillPath();
      graphics.strokePath();
      
      // Left end (bottom knob)
      graphics.beginPath();
      graphics.arc(centerX - boneWidth/2, centerY + boneHeight/3, endRadius, 0, Math.PI * 2);
      graphics.closePath();
      graphics.fillPath();
      graphics.strokePath();
      
      // Center waist (narrow middle)
      graphics.beginPath();
      graphics.moveTo(centerX - boneWidth/2 + endRadius, centerY - waistWidth/2);
      graphics.lineTo(centerX + boneWidth/2 - endRadius, centerY - waistWidth/2);
      graphics.lineTo(centerX + boneWidth/2 - endRadius, centerY + waistWidth/2);
      graphics.lineTo(centerX - boneWidth/2 + endRadius, centerY + waistWidth/2);
      graphics.closePath();
      graphics.fillPath();
      graphics.strokePath();
      
      // Right end (top knob)
      graphics.beginPath();
      graphics.arc(centerX + boneWidth/2, centerY - boneHeight/3, endRadius, 0, Math.PI * 2);
      graphics.closePath();
      graphics.fillPath();
      graphics.strokePath();
      
      // Right end (bottom knob)
      graphics.beginPath();
      graphics.arc(centerX + boneWidth/2, centerY + boneHeight/3, endRadius, 0, Math.PI * 2);
      graphics.closePath();
      graphics.fillPath();
      graphics.strokePath();
      
      graphics.generateTexture(textureKey, 32 * scale, 16 * scale);
      graphics.destroy();
    }
    
    // Create sprite
    this.sprite = scene.physics.add.sprite(x, y, textureKey);
    this.sprite.setCollideWorldBounds(true);
    
    // Add floating animation - BOUNCIER with Elastic easing!
    scene.tweens.add({
      targets: this.sprite,
      y: y - 15, // Float higher
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Elastic.easeInOut' // Elastic bounce!
    });
    
    // Add sparkle effect with Back easing
    scene.tweens.add({
      targets: this.sprite,
      alpha: 0.7,
      scale: 1.1,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Back.easeInOut' // Overshoot for cartoony effect
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

