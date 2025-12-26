import Phaser from 'phaser';

export class Duck {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private moveSpeed: number = 40; // pixels per second
  private direction: number = 1; // 1 = right, -1 = left
  private patrolDistance: number; // How far to waddle before turning
  private startX: number;
  private isDead: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, patrolDistance: number = 200) {
    this.scene = scene;
    this.startX = x;
    this.patrolDistance = patrolDistance;

    // Create duck texture if it doesn't exist
    if (!scene.textures.exists('duck')) {
      this.createDuckTexture(scene);
    }

    // Create sprite with physics
    this.sprite = scene.physics.add.sprite(x, y, 'duck');
    this.sprite.setCollideWorldBounds(true);
    
    // Duck sits on platform (no gravity)
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(true);
    
    // Set collision box
    body.setSize(this.sprite.width * 0.8, this.sprite.height * 0.9);
    body.setOffset(this.sprite.width * 0.1, this.sprite.height * 0.1);

    // Start waddling animation
    this.startWaddling();
  }

  private createDuckTexture(scene: Phaser.Scene) {
    const graphics = scene.add.graphics();
    
    // === DUCK (South Park construction paper style) ===
    
    // Body (white/cream colored duck)
    const bodyColor = 0xFFFAF0; // Floral white
    const outlineColor = 0xE0C097; // Tan for shading
    const billColor = 0xFFA500; // Orange bill
    const eyeColor = 0x000000; // Black eyes
    
    const centerX = 24;
    const centerY = 24;
    
    // Main body (oval)
    graphics.fillStyle(bodyColor, 1);
    graphics.fillEllipse(centerX, centerY + 4, 20, 16);
    
    // Shading on body (construction paper shadow)
    graphics.fillStyle(outlineColor, 0.3);
    graphics.fillEllipse(centerX + 6, centerY + 8, 12, 10);
    
    // Body outline
    graphics.lineStyle(2, outlineColor, 1);
    graphics.strokeEllipse(centerX, centerY + 4, 20, 16);
    
    // Head (smaller oval)
    graphics.fillStyle(bodyColor, 1);
    graphics.fillCircle(centerX, centerY - 6, 10);
    
    // Head outline
    graphics.lineStyle(2, outlineColor, 1);
    graphics.strokeCircle(centerX, centerY - 6, 10);
    
    // Bill (orange triangle pointing left)
    graphics.fillStyle(billColor, 1);
    graphics.beginPath();
    graphics.moveTo(centerX - 10, centerY - 6); // Tip
    graphics.lineTo(centerX - 4, centerY - 9); // Top
    graphics.lineTo(centerX - 4, centerY - 3); // Bottom
    graphics.closePath();
    graphics.fillPath();
    
    // Bill outline
    graphics.lineStyle(1.5, 0xCC8400, 1);
    graphics.strokeTriangle(
      centerX - 10, centerY - 6,
      centerX - 4, centerY - 9,
      centerX - 4, centerY - 3
    );
    
    // Eye (black dot)
    graphics.fillStyle(eyeColor, 1);
    graphics.fillCircle(centerX - 2, centerY - 8, 2);
    
    // Wing (curved line on body)
    graphics.lineStyle(2, outlineColor, 0.7);
    graphics.beginPath();
    graphics.arc(centerX + 4, centerY + 2, 8, Math.PI * 0.8, Math.PI * 1.6, false);
    graphics.strokePath();
    
    // Feet (orange small ovals at bottom)
    graphics.fillStyle(billColor, 1);
    graphics.fillEllipse(centerX - 6, centerY + 14, 6, 4);
    graphics.fillEllipse(centerX + 6, centerY + 14, 6, 4);
    
    graphics.generateTexture('duck', 48, 48);
    graphics.destroy();
  }

  private startWaddling() {
    // Waddle animation (bounce up and down)
    this.scene.tweens.add({
      targets: this.sprite,
      y: this.sprite.y - 3,
      duration: 300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Slight scale animation for waddle effect
    this.scene.tweens.add({
      targets: this.sprite,
      scaleX: 1.1,
      duration: 300,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  update(delta: number) {
    if (this.isDead) return;

    // Move duck back and forth
    const moveAmount = (this.moveSpeed * delta) / 1000;
    this.sprite.x += moveAmount * this.direction;

    // Check if we've reached patrol boundary
    const distanceFromStart = Math.abs(this.sprite.x - this.startX);
    if (distanceFromStart > this.patrolDistance / 2) {
      // Turn around
      this.direction *= -1;
      this.sprite.setFlipX(this.direction === -1); // Face direction of movement
    }
  }

  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }

  destroy() {
    if (this.isDead) return;
    this.isDead = true;

    // Poof animation
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0,
      scale: 0.5,
      duration: 200,
      ease: 'Back.easeIn',
      onComplete: () => {
        this.sprite.destroy();
      }
    });
  }

  isDying(): boolean {
    return this.isDead;
  }
}

