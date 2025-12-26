import Phaser from 'phaser';

export type RainIntensity = 'none' | 'light' | 'heavy';

export class RainSystem {
  private scene: Phaser.Scene;
  private intensity: RainIntensity;
  private rainParticles: Phaser.GameObjects.Graphics[] = [];
  private particleCount: number = 0;
  private updateTimer: number = 0;
  private readonly UPDATE_INTERVAL: number = 16; // ~60fps
  private puddles: Phaser.GameObjects.Graphics[] = [];

  constructor(scene: Phaser.Scene, intensity: RainIntensity = 'none') {
    this.scene = scene;
    this.intensity = intensity;

    if (intensity !== 'none') {
      this.startRain();
      this.createPuddles();
    }
  }

  private startRain() {
    const camera = this.scene.cameras.main;
    
    // Particle count based on intensity
    this.particleCount = this.intensity === 'light' ? 50 : 100;

    // Create rain drop graphics
    for (let i = 0; i < this.particleCount; i++) {
      const drop = this.scene.add.graphics();
      drop.setScrollFactor(1); // Scrolls with camera
      drop.setDepth(1000); // Above everything
      drop.setAlpha(this.intensity === 'light' ? 0.4 : 0.6);
      
      // Random starting position
      drop.x = Phaser.Math.Between(0, camera.width * 2);
      drop.y = Phaser.Math.Between(-camera.height, camera.height);
      
      // Store velocity data on the drop
      (drop as any).vy = this.intensity === 'light' ? 300 : 500; // pixels per second
      (drop as any).vx = this.intensity === 'light' ? 20 : 40; // slight diagonal
      
      this.rainParticles.push(drop);
    }
  }

  private createPuddles() {
    const camera = this.scene.cameras.main;
    const levelWidth = this.scene.physics.world.bounds.width;
    const groundY = camera.height - 64; // Ground level

    // Create puddles on the ground
    const puddleCount = this.intensity === 'light' ? 10 : 20;
    
    for (let i = 0; i < puddleCount; i++) {
      const puddle = this.scene.add.graphics();
      const x = Phaser.Math.Between(100, levelWidth - 100);
      const width = Phaser.Math.Between(40, 80);
      const height = Phaser.Math.Between(8, 12);
      
      // Draw puddle (ellipse with shine)
      puddle.fillStyle(0x4DD0E1, 0.4); // Light blue, semi-transparent
      puddle.fillEllipse(x, groundY, width, height);
      
      // Shine highlight
      puddle.fillStyle(0xFFFFFF, 0.2);
      puddle.fillEllipse(x - width * 0.2, groundY - height * 0.2, width * 0.4, height * 0.4);
      
      puddle.setDepth(10); // Above ground, below obstacles
      puddle.setScrollFactor(1);
      
      // Subtle pulse animation
      this.scene.tweens.add({
        targets: puddle,
        alpha: 0.3,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      
      this.puddles.push(puddle);
    }
  }

  update(delta: number) {
    if (this.intensity === 'none') return;

    this.updateTimer += delta;
    if (this.updateTimer < this.UPDATE_INTERVAL) return;
    this.updateTimer = 0;

    const camera = this.scene.cameras.main;
    const cameraX = camera.scrollX;
    const cameraY = camera.scrollY;
    const cameraWidth = camera.width;
    const cameraHeight = camera.height;

    // Update each rain drop
    this.rainParticles.forEach(drop => {
      // Clear previous frame
      drop.clear();

      // Move drop
      const velocity = (drop as any).vy;
      const horizontalVelocity = (drop as any).vx;
      drop.y += (velocity * this.UPDATE_INTERVAL) / 1000;
      drop.x += (horizontalVelocity * this.UPDATE_INTERVAL) / 1000;

      // Draw rain drop (thin line)
      const dropLength = this.intensity === 'light' ? 15 : 25;
      drop.lineStyle(1, 0xFFFFFF, 0.8);
      drop.lineBetween(0, 0, horizontalVelocity * 0.3, dropLength);

      // Reset if off screen (bottom or right)
      if (drop.y > cameraY + cameraHeight + 50) {
        drop.y = cameraY - 50;
        drop.x = Phaser.Math.Between(cameraX - 100, cameraX + cameraWidth + 100);
      }

      // Wrap horizontally if moved too far right
      if (drop.x > cameraX + cameraWidth + 200) {
        drop.x = cameraX - 100;
      }
    });
  }

  getSlipperinessFactor(): number {
    // Returns a factor to multiply movement by
    // 1.0 = normal, <1.0 = slippery
    switch (this.intensity) {
      case 'light':
        return 0.85; // 15% slipperier
      case 'heavy':
        return 0.7; // 30% slipperier
      default:
        return 1.0;
    }
  }

  getIntensity(): RainIntensity {
    return this.intensity;
  }

  setIntensity(intensity: RainIntensity) {
    if (this.intensity === intensity) return;

    // Clean up old rain
    this.destroy();

    // Start new rain
    this.intensity = intensity;
    if (intensity !== 'none') {
      this.startRain();
      this.createPuddles();
    }
  }

  destroy() {
    // Clean up all graphics
    this.rainParticles.forEach(drop => drop.destroy());
    this.rainParticles = [];
    
    this.puddles.forEach(puddle => puddle.destroy());
    this.puddles = [];
  }
}

