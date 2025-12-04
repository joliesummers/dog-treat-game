import Phaser from 'phaser';

export interface DogConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture?: string;
}

export class Dog {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private scene: Phaser.Scene;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  
  // Movement constants
  private readonly MOVE_SPEED = 200;
  private readonly JUMP_VELOCITY = -500;
  private readonly DRAG = 800;
  
  // State
  private isJumping = false;

  constructor(config: DogConfig) {
    this.scene = config.scene;
    
    // Create sprite - using placeholder rectangle for now
    if (config.texture) {
      this.sprite = this.scene.physics.add.sprite(config.x, config.y, config.texture);
    } else {
      // Create placeholder graphics
      const graphics = this.scene.add.graphics();
      graphics.fillStyle(0x8B4513, 1); // Brown color for dog
      graphics.fillRect(0, 0, 48, 32);
      graphics.generateTexture('dog-placeholder', 48, 32);
      graphics.destroy();
      
      this.sprite = this.scene.physics.add.sprite(config.x, config.y, 'dog-placeholder');
    }
    
    // Set up physics
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setDrag(this.DRAG, 0);
    this.sprite.setMaxVelocity(this.MOVE_SPEED * 1.5, 1000);
    
    // Set up input
    if (this.scene.input.keyboard) {
      this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
  }

  update() {
    if (!this.cursors) return;
    
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    
    // Check if on ground
    const onGround = body.touching.down;
    
    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-this.MOVE_SPEED);
      this.sprite.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(this.MOVE_SPEED);
      this.sprite.setFlipX(false);
    }
    
    // Jump
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && onGround) {
      this.sprite.setVelocityY(this.JUMP_VELOCITY);
      this.isJumping = true;
    }
    
    // Update jump state
    if (onGround && this.isJumping) {
      this.isJumping = false;
    }
  }
  
  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }
  
  getX(): number {
    return this.sprite.x;
  }
  
  getY(): number {
    return this.sprite.y;
  }
}

