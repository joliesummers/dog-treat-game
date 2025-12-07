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
      
      // Draw cute bone shape with ONLY exterior outline!
      const centerX = 16 * scale;
      const centerY = 8 * scale;
      const boneLength = 13 * scale;
      const endRadius = 3 * scale;
      const waistHeight = 1.8 * scale;
      const bulbSpacing = 2.2 * scale;
      
      const leftX = centerX - boneLength/2;
      const rightX = centerX + boneLength/2;
      
      // First, fill all the shapes without outlines
      graphics.lineStyle(0, 0x000000, 0);
      graphics.fillStyle(boneColor, 1);
      
      // Fill all 4 bulbs
      graphics.fillCircle(leftX, centerY - bulbSpacing, endRadius);
      graphics.fillCircle(leftX, centerY + bulbSpacing, endRadius);
      graphics.fillCircle(rightX, centerY - bulbSpacing, endRadius);
      graphics.fillCircle(rightX, centerY + bulbSpacing, endRadius);
      
      // Fill the middle waist connecting them
      graphics.fillRect(
        leftX - endRadius/2,
        centerY - waistHeight,
        boneLength + endRadius,
        waistHeight * 2
      );
      
      // Now trace ONLY the OUTER perimeter as one continuous path
      graphics.lineStyle(2.5 * scale, outlineColor, 1);
      graphics.beginPath();
      
      // Start at the top of the left-top bulb
      graphics.moveTo(leftX, centerY - bulbSpacing - endRadius);
      
      // Outer arc of LEFT-TOP BULB (top, going clockwise around to right side)
      graphics.arc(leftX, centerY - bulbSpacing, endRadius, -Math.PI/2, 0, false);
      
      // Now at right edge of left-top bulb, go inward to waist
      graphics.lineTo(leftX + endRadius, centerY - waistHeight);
      
      // TOP of waist - horizontal line to right side
      graphics.lineTo(rightX - endRadius, centerY - waistHeight);
      
      // Go outward from waist to right-top bulb
      graphics.lineTo(rightX - endRadius, centerY - bulbSpacing);
      
      // Outer arc of RIGHT-TOP BULB (going around clockwise)
      graphics.arc(rightX, centerY - bulbSpacing, endRadius, Math.PI, 0, false);
      
      // Outer arc of RIGHT-BOTTOM BULB (continuing clockwise down right side)
      graphics.arc(rightX, centerY + bulbSpacing, endRadius, 0, Math.PI, false);
      
      // Go inward from right-bottom bulb to waist
      graphics.lineTo(rightX - endRadius, centerY + waistHeight);
      
      // BOTTOM of waist - horizontal line back to left
      graphics.lineTo(leftX + endRadius, centerY + waistHeight);
      
      // Go outward to left-bottom bulb
      graphics.lineTo(leftX + endRadius, centerY + bulbSpacing);
      
      // Outer arc of LEFT-BOTTOM BULB (going around clockwise)
      graphics.arc(leftX, centerY + bulbSpacing, endRadius, 0, Math.PI, false);
      
      // Outer arc of LEFT-TOP BULB (left side, completing back to start)
      graphics.arc(leftX, centerY - bulbSpacing, endRadius, Math.PI, Math.PI * 1.5, false);
      
      // Close the path
      graphics.closePath();
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

