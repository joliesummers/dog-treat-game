import Phaser from 'phaser';
import type { Dog } from './Dog';

export class GoalHouse {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private sprite: Phaser.GameObjects.Graphics;
  private glowCircle?: Phaser.GameObjects.Arc;
  private x: number;
  private y: number;
  private isActivated: boolean = false;
  private worldNumber: number;

  constructor(scene: Phaser.Scene, x: number, y: number, worldNumber: number = 1) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.worldNumber = worldNumber;

    // Create container for goal + effects
    this.container = scene.add.container(x, y);
    this.container.setDepth(50); // Above platforms, below dog

    // Draw the goal object (world-specific)
    this.sprite = scene.add.graphics();
    this.drawGoalObject();
    this.container.add(this.sprite);

    // Add glow circle (hidden initially)
    this.glowCircle = scene.add.circle(0, -30, 80, 0xFFD700, 0);
    this.glowCircle.setDepth(49); // Behind goal
    this.container.add(this.glowCircle);

    // Create idle animation (gentle breathing)
    this.startIdleAnimation();

    // Set up physics body for collision detection
    this.setupPhysics();
  }

  private drawGoalObject() {
    const g = this.sprite;
    
    switch (this.worldNumber) {
      case 2:
        // Park: Ornate Park Gate
        this.drawParkGate(g);
        break;
      case 3:
        // Beach: Beach Umbrella
        this.drawBeachUmbrella(g);
        break;
      case 4:
        // City: Front Door
        this.drawFrontDoor(g);
        break;
      case 1:
      default:
        // Backyard: Dog House
        this.drawDogHouse(g);
        break;
    }
  }
  
  private drawParkGate(g: Phaser.GameObjects.Graphics) {
    // === ORNATE PARK GATE (South Park construction paper style) ===
    
    // Left pillar
    g.fillStyle(0x757575, 1); // Gray stone
    g.fillRect(-70, -90, 20, 130);
    
    // Stone texture on left pillar
    g.fillStyle(0x616161, 0.3);
    for (let i = 0; i < 6; i++) {
      g.fillRect(-68, -85 + i * 20, 16, 2);
    }
    
    // Right pillar
    g.fillStyle(0x757575, 1);
    g.fillRect(50, -90, 20, 130);
    
    // Stone texture on right pillar
    g.fillStyle(0x616161, 0.3);
    for (let i = 0; i < 6; i++) {
      g.fillRect(52, -85 + i * 20, 16, 2);
    }
    
    // Pillar caps (decorative tops)
    g.fillStyle(0x616161, 1);
    g.fillRect(-75, -92, 30, 5);
    g.fillRect(45, -92, 30, 5);
    
    // Top archway (simplified curved arch)
    g.fillStyle(0x4CAF50, 1); // Green arch
    g.beginPath();
    g.moveTo(-50, -70);
    g.lineTo(-40, -90);
    g.lineTo(-10, -105);
    g.lineTo(20, -90);
    g.lineTo(30, -70);
    g.lineTo(30, -60);
    g.lineTo(-50, -60);
    g.closePath();
    g.fillPath();
    
    // Iron gate bars (vertical)
    g.lineStyle(3, 0x424242, 1);
    for (let i = -40; i <= 20; i += 15) {
      g.lineBetween(i, -60, i, 40);
    }
    
    // Horizontal crossbars
    g.lineStyle(4, 0x424242, 1);
    g.lineBetween(-50, -20, 30, -20);
    g.lineBetween(-50, 10, 30, 10);
    
    // Decorative spikes on top
    g.fillStyle(0x424242, 1);
    for (let i = -40; i <= 20; i += 15) {
      g.beginPath();
      g.moveTo(i - 3, -60);
      g.lineTo(i, -75);
      g.lineTo(i + 3, -60);
      g.closePath();
      g.fillPath();
    }
    
    // Welcome sign
    g.fillStyle(0x8BC34A, 1); // Green sign
    g.fillRect(-30, -50, 40, 20);
    g.lineStyle(2, 0x558B2F, 1);
    g.strokeRect(-30, -50, 40, 20);
    
    // "PARK" text placeholder (simple rectangles)
    g.fillStyle(0xFFFFFF, 1);
    g.fillRect(-24, -45, 3, 10); // P
    g.fillRect(-18, -45, 3, 10); // A
    g.fillRect(-12, -45, 3, 10); // R
    g.fillRect(-6, -45, 3, 10);  // K
    
    // Ground bushes
    g.fillStyle(0x4CAF50, 0.6);
    g.fillEllipse(-80, 35, 25, 15);
    g.fillEllipse(60, 35, 25, 15);
  }
  
  private drawBeachUmbrella(g: Phaser.GameObjects.Graphics) {
    // Beach umbrella - placeholder for World 3
    // TODO: Full implementation for World 3
    this.drawDogHouse(g);
  }
  
  private drawFrontDoor(g: Phaser.GameObjects.Graphics) {
    // City front door - placeholder for World 4
    // TODO: Full implementation for World 4
    this.drawDogHouse(g);
  }

  private drawDogHouse(g: Phaser.GameObjects.Graphics) {
    // === ROOF (Triangle) ===
    g.fillStyle(0xA0522D, 1); // Sienna brown
    g.beginPath();
    g.moveTo(-70, -40); // Bottom left
    g.lineTo(0, -100); // Top peak
    g.lineTo(70, -40); // Bottom right
    g.closePath();
    g.fillPath();

    // Roof shingles (horizontal lines for texture)
    g.lineStyle(2, 0x8B4513, 0.4);
    for (let i = 0; i < 4; i++) {
      const y = -95 + i * 15;
      const width = 60 - i * 12;
      g.lineBetween(-width, y, width, y);
    }

    // === WALLS (Rectangle) ===
    g.fillStyle(0xD2691E, 1); // Chocolate brown
    g.fillRect(-60, -40, 120, 80); // Main body

    // Wood grain texture (vertical planks)
    g.lineStyle(1.5, 0xA0522D, 0.3);
    for (let i = -40; i < 60; i += 20) {
      g.lineBetween(i, -40, i, 40);
    }

    // Horizontal support beams
    g.lineStyle(2, 0x8B4513, 0.4);
    g.lineBetween(-60, -10, 60, -10);
    g.lineBetween(-60, 20, 60, 20);

    // === DOOR (Oval entrance) ===
    g.fillStyle(0x000000, 1); // Black
    g.fillEllipse(0, 0, 30, 40);

    // Door highlight (top curve)
    g.lineStyle(2, 0x333333, 0.6);
    g.beginPath();
    g.arc(0, 0, 15, Math.PI, 0, false);
    g.strokePath();

    // === GROUND BASE (Platform under house) ===
    g.fillStyle(0x8B4513, 1); // Saddle brown
    g.fillRect(-65, 40, 130, 8); // Base platform

    // === DECORATIVE DETAILS ===
    
    // Paw prints near entrance
    this.drawPawPrint(g, -45, 30, 0.6);
    this.drawPawPrint(g, 45, 25, 0.6);

    // Dog bowl (left side)
    g.fillStyle(0xFF4444, 1); // Red bowl
    g.fillEllipse(-80, 35, 12, 6);
    g.fillStyle(0xCC0000, 1); // Darker red inside
    g.fillEllipse(-80, 35, 8, 4);

    // Bone decoration (right side)
    g.fillStyle(0xF5DEB3, 1); // Wheat color
    // Bone ends
    g.fillCircle(75, 30, 4);
    g.fillCircle(90, 30, 4);
    // Bone middle
    g.fillRect(77, 28, 11, 4);

    // Window (small, top right)
    g.fillStyle(0xFFFF99, 0.8); // Yellow glow
    g.fillRect(30, -25, 15, 12);
    // Window cross
    g.lineStyle(1.5, 0x8B4513, 1);
    g.lineBetween(37.5, -25, 37.5, -13); // Vertical
    g.lineBetween(30, -19, 45, -19); // Horizontal

    // Roof peak decoration (small triangle cap)
    g.fillStyle(0x8B4513, 1);
    g.beginPath();
    g.moveTo(-8, -100);
    g.lineTo(0, -108);
    g.lineTo(8, -100);
    g.closePath();
    g.fillPath();
  }

  private drawPawPrint(g: Phaser.GameObjects.Graphics, x: number, y: number, scale: number = 1) {
    g.fillStyle(0x8B4513, 0.3); // Brown, transparent
    
    // Main pad
    g.fillEllipse(x, y, 8 * scale, 10 * scale);
    
    // Toe pads
    const toeOffsets = [
      { dx: -4, dy: -6 },
      { dx: -1, dy: -7 },
      { dx: 2, dy: -7 },
      { dx: 5, dy: -6 }
    ];
    
    toeOffsets.forEach(offset => {
      g.fillCircle(x + offset.dx * scale, y + offset.dy * scale, 3 * scale);
    });
  }

  private startIdleAnimation() {
    // Gentle breathing effect
    this.scene.tweens.add({
      targets: this.container,
      scaleY: 1.02,
      scaleX: 0.99,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private setupPhysics() {
    // Add physics body to container for collision detection
    this.scene.physics.world.enable(this.container);
    const body = this.container.body as Phaser.Physics.Arcade.Body;
    
    // Set collision box (centered on door entrance)
    body.setSize(80, 60);
    body.setOffset(-40, -30);
    body.setImmovable(true);
    body.setAllowGravity(false);
  }

  public showApproachEffect() {
    if (this.isActivated) return;
    this.isActivated = true;

    // Glow circle pulse
    if (this.glowCircle) {
      this.scene.tweens.add({
        targets: this.glowCircle,
        alpha: 0.3,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // Door sparkle effect (simple particle)
    this.createSparkles();

    // Play a gentle chime sound (if audio working)
    try {
      if (this.scene.sound.get('collect')) {
        this.scene.sound.play('collect', { volume: 0.3 });
      }
    } catch {
      // Silently fail if sound not available
    }
  }

  private createSparkles() {
    // Create simple sparkle particles around door
    const sparkleCount = 8;
    for (let i = 0; i < sparkleCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkleCount;
      const distance = 40;
      const sparkleX = Math.cos(angle) * distance;
      const sparkleY = Math.sin(angle) * distance - 30;

      const sparkle = this.scene.add.star(
        sparkleX,
        sparkleY,
        5,
        3,
        6,
        0xFFD700,
        1
      );
      this.container.add(sparkle);

      // Twinkle animation
      this.scene.tweens.add({
        targets: sparkle,
        alpha: 0,
        scale: 1.5,
        duration: 800,
        delay: i * 100,
        repeat: -1,
        yoyo: true,
        ease: 'Sine.easeInOut'
      });
    }
  }

  public playEnterAnimation(dog: Dog): Promise<void> {
    return new Promise((resolve) => {
      // Stop all existing animations
      this.scene.tweens.killTweensOf(this.container);
      
      const dogSprite = dog.getSprite();

      // Dog walks into house
      this.scene.tweens.add({
        targets: dogSprite,
        x: this.x,
        y: this.y,
        alpha: 0, // Fade out as entering
        duration: 800,
        ease: 'Power2.easeIn',
        onComplete: () => {
          // House celebration bounce
          this.scene.tweens.add({
            targets: this.container,
            scaleY: 1.2,
            scaleX: 0.9,
            duration: 200,
            yoyo: true,
            repeat: 2,
            ease: 'Back.easeOut',
            onComplete: () => {
              resolve();
            }
          });
        }
      });

      // Victory particles burst
      this.createVictoryBurst();
    });
  }

  private createVictoryBurst() {
    // Create star burst effect
    const burstCount = 12;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount;
      const distance = 100;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance - 50;

      const star = this.scene.add.star(0, -50, 5, 4, 8, 0xFFD700, 1);
      this.container.add(star);

      this.scene.tweens.add({
        targets: star,
        x: endX,
        y: endY,
        alpha: 0,
        scale: 0.5,
        duration: 1000,
        ease: 'Power2.easeOut',
        onComplete: () => star.destroy()
      });
    }
  }

  public getContainer(): Phaser.GameObjects.Container {
    return this.container;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public destroy() {
    this.scene.tweens.killTweensOf(this.container);
    this.container.destroy();
  }
}

