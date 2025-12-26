import Phaser from 'phaser';

export class Sprinkler {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private waterSpray?: Phaser.GameObjects.Graphics;
  private isActive: boolean = false;
  private cycleTimer: number = 0;
  private onDuration: number; // How long spray is on (ms)
  private offDuration: number; // How long spray is off (ms)
  private damageZone?: Phaser.GameObjects.Zone;

  constructor(scene: Phaser.Scene, x: number, y: number, onDuration: number = 2000, offDuration: number = 3000) {
    this.scene = scene;
    this.onDuration = onDuration;
    this.offDuration = offDuration;

    // Create sprinkler texture if it doesn't exist
    if (!scene.textures.exists('sprinkler')) {
      this.createSprinklerTexture(scene);
    }

    // Create sprite (no physics for the sprinkler itself)
    this.sprite = scene.physics.add.sprite(x, y, 'sprinkler');
    this.sprite.setOrigin(0.5, 1); // Anchor at bottom
    
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(true);
    body.setSize(20, 20);
    
    // Create damage zone (invisible, activated during spray)
    this.damageZone = scene.add.zone(x, y - 50, 80, 100);
    scene.physics.add.existing(this.damageZone);
    const zoneBody = this.damageZone.body as Phaser.Physics.Arcade.Body;
    zoneBody.setAllowGravity(false);
    zoneBody.setImmovable(true);
    this.damageZone.setActive(false); // Start inactive

    // Create water spray graphics (hidden initially)
    this.waterSpray = scene.add.graphics();
    this.waterSpray.setDepth(60); // Above platforms, below dog
    this.waterSpray.setVisible(false);

    // Start cycle with a random offset so sprinklers aren't synchronized
    this.cycleTimer = Phaser.Math.Between(0, this.offDuration);
  }

  private createSprinklerTexture(scene: Phaser.Scene) {
    const graphics = scene.add.graphics();
    
    // === SPRINKLER HEAD (South Park construction paper style) ===
    
    const baseColor = 0x757575; // Gray metal
    const highlightColor = 0x9E9E9E; // Lighter gray
    const nozzleColor = 0x424242; // Dark gray
    
    const centerX = 16;
    const centerY = 24;
    
    // Base (ground mount)
    graphics.fillStyle(baseColor, 1);
    graphics.fillRect(centerX - 8, centerY - 4, 16, 8);
    graphics.lineStyle(1.5, nozzleColor, 1);
    graphics.strokeRect(centerX - 8, centerY - 4, 16, 8);
    
    // Vertical pipe
    graphics.fillStyle(baseColor, 1);
    graphics.fillRect(centerX - 3, centerY - 16, 6, 16);
    graphics.lineStyle(1.5, nozzleColor, 1);
    graphics.strokeRect(centerX - 3, centerY - 16, 6, 16);
    
    // Pipe highlight
    graphics.lineStyle(1, highlightColor, 0.8);
    graphics.lineBetween(centerX - 2, centerY - 15, centerX - 2, centerY - 5);
    
    // Sprinkler head (rounded top)
    graphics.fillStyle(highlightColor, 1);
    graphics.fillRoundedRect(centerX - 6, centerY - 20, 12, 8, 3);
    graphics.lineStyle(1.5, nozzleColor, 1);
    graphics.strokeRoundedRect(centerX - 6, centerY - 20, 12, 8, 3);
    
    // Nozzle holes (small dots)
    graphics.fillStyle(nozzleColor, 1);
    graphics.fillCircle(centerX - 4, centerY - 16, 1.5);
    graphics.fillCircle(centerX, centerY - 16, 1.5);
    graphics.fillCircle(centerX + 4, centerY - 16, 1.5);
    
    graphics.generateTexture('sprinkler', 32, 32);
    graphics.destroy();
  }

  update(delta: number) {
    this.cycleTimer += delta;

    if (this.isActive) {
      // Currently spraying
      if (this.cycleTimer >= this.onDuration) {
        this.turnOff();
        this.cycleTimer = 0;
      }
    } else {
      // Currently off
      if (this.cycleTimer >= this.offDuration) {
        this.turnOn();
        this.cycleTimer = 0;
      }
    }
  }

  private turnOn() {
    this.isActive = true;
    
    // Activate damage zone
    if (this.damageZone) {
      this.damageZone.setActive(true);
    }

    // Show water spray animation
    if (this.waterSpray) {
      this.waterSpray.setVisible(true);
      this.animateWaterSpray();
    }

    // Spin animation on sprinkler head
    this.scene.tweens.add({
      targets: this.sprite,
      angle: 360,
      duration: this.onDuration,
      ease: 'Linear'
    });
  }

  private turnOff() {
    this.isActive = false;
    
    // Deactivate damage zone
    if (this.damageZone) {
      this.damageZone.setActive(false);
    }

    // Hide water spray
    if (this.waterSpray) {
      this.waterSpray.setVisible(false);
      this.waterSpray.clear();
    }

    // Reset rotation
    this.sprite.setAngle(0);
  }

  private animateWaterSpray() {
    if (!this.waterSpray || !this.isActive) return;

    const x = this.sprite.x;
    const y = this.sprite.y - 20;

    this.waterSpray.clear();

    // Draw water droplets (particle-like effect)
    this.waterSpray.fillStyle(0x4DD0E1, 0.7); // Light blue water
    
    // Create arc spray pattern
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI / 3) * (i / particleCount); // Arc from -90° to +60°
      const distance = Phaser.Math.Between(20, 70);
      const px = x + Math.cos(angle) * distance;
      const py = y + Math.sin(angle) * distance;
      const size = Phaser.Math.Between(2, 5);
      
      this.waterSpray.fillCircle(px, py, size);
    }

    // Continue animation if still active
    if (this.isActive) {
      this.scene.time.delayedCall(50, () => this.animateWaterSpray());
    }
  }

  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }

  getDamageZone(): Phaser.GameObjects.Zone | undefined {
    return this.damageZone;
  }

  isCurrentlyActive(): boolean {
    return this.isActive;
  }

  destroy() {
    if (this.waterSpray) {
      this.waterSpray.destroy();
    }
    if (this.damageZone) {
      this.damageZone.destroy();
    }
    this.sprite.destroy();
  }
}

