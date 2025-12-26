import Phaser from 'phaser';

export class Treat {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private scene: Phaser.Scene;
  private size: number; // 1, 2, or 3
  private pointValue: number;
  private treatType: 'bone' | 'tennis-ball' | 'frisbee';
  
  constructor(scene: Phaser.Scene, x: number, y: number, size: number = 2, treatType: 'bone' | 'tennis-ball' | 'frisbee' = 'bone') {
    this.scene = scene;
    this.size = Math.max(1, Math.min(3, size)); // Clamp between 1-3
    this.treatType = treatType;
    
    // Point values based on size (simple 1-2-3 scale)
    const pointValues = {
      1: 1,   // Small treat = 1 point
      2: 2,   // Medium treat = 2 points
      3: 3    // Large treat = 3 points
    };
    this.pointValue = pointValues[this.size as keyof typeof pointValues];
    
    // Create treat graphic based on type and size
    const scale = this.size; // 1, 2, or 3
    const textureKey = `treat-${treatType}-${this.size}`;
    
    // Only generate texture once
    if (!scene.textures.exists(textureKey)) {
      switch (treatType) {
        case 'tennis-ball':
          this.createTennisBallTexture(scene, textureKey, scale);
          break;
        case 'frisbee':
          this.createFrisbeeTexture(scene, textureKey, scale);
          break;
        case 'bone':
        default:
          this.createBoneTexture(scene, textureKey, scale);
          break;
      }
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
  
  private createBoneTexture(scene: Phaser.Scene, textureKey: string, scale: number) {
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
      
      // Now trace ONLY the OUTER perimeter as one continuous path (THIN South Park style)
      graphics.lineStyle(1.5 * scale, outlineColor, 1);
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
  
  private createTennisBallTexture(scene: Phaser.Scene, textureKey: string, scale: number) {
    const graphics = scene.add.graphics();
    const ballColor = 0xCCFF00; // Bright tennis ball yellow-green
    const shadowColor = 0xA0CC00; // Darker yellow-green for shadow
    const lineColor = 0xFFFFFF; // White lines
    
    const centerX = 12 * scale;
    const centerY = 12 * scale;
    const radius = 10 * scale;
    
    // Main ball fill
    graphics.fillStyle(ballColor, 1);
    graphics.fillCircle(centerX, centerY, radius);
    
    // Add subtle shadow on bottom-right (construction paper style)
    graphics.fillStyle(shadowColor, 0.3);
    graphics.fillCircle(centerX + radius * 0.3, centerY + radius * 0.3, radius * 0.6);
    
    // Softer outline (darker yellow-green, not black)
    graphics.lineStyle(2 * scale, shadowColor, 0.8);
    graphics.strokeCircle(centerX, centerY, radius);
    
    // Curved white lines (tennis ball pattern) - thicker and more visible
    graphics.lineStyle(3 * scale, lineColor, 1);
    graphics.beginPath();
    graphics.arc(centerX, centerY - radius * 0.3, radius * 0.8, Math.PI * 0.2, Math.PI * 0.8, false);
    graphics.strokePath();
    
    graphics.beginPath();
    graphics.arc(centerX, centerY + radius * 0.3, radius * 0.8, Math.PI * 1.2, Math.PI * 1.8, false);
    graphics.strokePath();
    
    // Add highlight spot (construction paper shine)
    graphics.fillStyle(0xFFFFFF, 0.4);
    graphics.fillCircle(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.3);
    
    graphics.generateTexture(textureKey, 24 * scale, 24 * scale);
    graphics.destroy();
  }
  
  private createFrisbeeTexture(scene: Phaser.Scene, textureKey: string, scale: number) {
    const graphics = scene.add.graphics();
    const frisbeeColor = 0xFF1744; // Bright red/pink
    const rimColor = 0xD81B60; // Darker pink for rim
    const highlightColor = 0xFF5177; // Lighter pink for highlight
    
    const centerX = 16 * scale;
    const centerY = 8 * scale;
    const outerRadiusX = 14 * scale;
    const outerRadiusY = 6 * scale;
    const rimRadiusX = 12 * scale;
    const rimRadiusY = 5 * scale;
    const centerRadiusX = 3 * scale;
    const centerRadiusY = 2 * scale;
    
    // Main frisbee disc
    graphics.fillStyle(frisbeeColor, 1);
    graphics.fillEllipse(centerX, centerY, outerRadiusX, outerRadiusY);
    
    // Darker rim/edge (shows depth)
    graphics.lineStyle(3 * scale, rimColor, 1);
    graphics.strokeEllipse(centerX, centerY, outerRadiusX, outerRadiusY);
    
    // Inner concentric rings (typical frisbee detail)
    graphics.lineStyle(1.5 * scale, rimColor, 0.5);
    graphics.strokeEllipse(centerX, centerY, rimRadiusX, rimRadiusY);
    graphics.strokeEllipse(centerX, centerY, rimRadiusX * 0.7, rimRadiusY * 0.7);
    
    // Center grip circle
    graphics.fillStyle(rimColor, 1);
    graphics.fillEllipse(centerX, centerY, centerRadiusX, centerRadiusY);
    
    // Top highlight (construction paper shine)
    graphics.fillStyle(highlightColor, 0.6);
    graphics.fillEllipse(centerX - outerRadiusX * 0.3, centerY - outerRadiusY * 0.3, 
                         outerRadiusX * 0.4, outerRadiusY * 0.4);
    
    // Bottom shadow (construction paper depth)
    graphics.fillStyle(rimColor, 0.3);
    graphics.fillEllipse(centerX + outerRadiusX * 0.2, centerY + outerRadiusY * 0.4, 
                         outerRadiusX * 0.5, outerRadiusY * 0.3);
    
    graphics.generateTexture(textureKey, 32 * scale, 16 * scale);
    graphics.destroy();
  }
  
  collect() {
    // Create STAR particle textures if they don't exist
    if (!this.scene.textures.exists('star-particle')) {
      const graphics = this.scene.add.graphics();
      graphics.fillStyle(0xFFD700, 1); // Gold star
      graphics.lineStyle(1, 0xFFFFFF, 1); // White outline for sparkle
      
      // Draw 5-pointed star
      const centerX = 8;
      const centerY = 8;
      const outerRadius = 7;
      const innerRadius = 3;
      
      graphics.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const innerAngle = ((i * 2 + 1) * Math.PI) / 5 - Math.PI / 2;
        
        const outerX = centerX + Math.cos(outerAngle) * outerRadius;
        const outerY = centerY + Math.sin(outerAngle) * outerRadius;
        const innerX = centerX + Math.cos(innerAngle) * innerRadius;
        const innerY = centerY + Math.sin(innerAngle) * innerRadius;
        
        if (i === 0) {
          graphics.moveTo(outerX, outerY);
        } else {
          graphics.lineTo(outerX, outerY);
        }
        graphics.lineTo(innerX, innerY);
      }
      graphics.closePath();
      graphics.fillPath();
      graphics.strokePath();
      
      graphics.generateTexture('star-particle', 16, 16);
      graphics.destroy();
    }
    
    // Create SPARKLE texture (smaller, white)
    if (!this.scene.textures.exists('sparkle-particle')) {
      const graphics = this.scene.add.graphics();
      graphics.fillStyle(0xFFFFFF, 1);
      graphics.fillCircle(4, 4, 3);
      graphics.generateTexture('sparkle-particle', 8, 8);
      graphics.destroy();
    }
    
    // Star burst effect (more stars for larger treats)
    const starCount = 6 * this.size;
    const starParticles = this.scene.add.particles(this.sprite.x, this.sprite.y, 'star-particle', {
      speed: { min: 80, max: 180 },
      scale: { start: 1.2, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: 500,
      quantity: starCount,
      rotate: { start: 0, end: 360 }, // Stars spin!
      blendMode: 'ADD'
    });
    
    // Sparkle burst (small white sparkles)
    const sparkleCount = 10 * this.size;
    const sparkles = this.scene.add.particles(this.sprite.x, this.sprite.y, 'sparkle-particle', {
      speed: { min: 40, max: 120 },
      scale: { start: 0.8, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: 400,
      quantity: sparkleCount,
      blendMode: 'ADD'
    });
    
    starParticles.explode();
    sparkles.explode();
    
    // Play collection animation
    this.scene.tweens.add({
      targets: this.sprite,
      scale: 1.5,
      alpha: 0,
      rotation: Math.PI * 2, // Spin as it disappears!
      duration: 200,
      ease: 'Back.easeIn',
      onComplete: () => {
        this.sprite.destroy();
        starParticles.destroy();
        sparkles.destroy();
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
  
  getTreatType(): string {
    return this.treatType;
  }
}

