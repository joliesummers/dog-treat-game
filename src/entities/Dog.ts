import Phaser from 'phaser';
import type { DogBreedStats, BreedType } from '../types/DogBreeds';
import { DOG_BREEDS } from '../types/DogBreeds';

export interface DogConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture?: string;
  breed?: BreedType;
}

export class Dog {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private scene: Phaser.Scene;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private breed: DogBreedStats;
  
  // Base movement constants (modified by breed stats)
  private readonly BASE_MOVE_SPEED = 220;
  private readonly BASE_JUMP_VELOCITY = -550;
  private readonly DRAG = 900;
  
  private MOVE_SPEED: number;
  private JUMP_VELOCITY: number;
  
  // State
  private isJumping = false;
  private isInvincible = false;
  private isDistracted = false;
  private distractionIndicator?: Phaser.GameObjects.Text;
  private chasingSquirrel = false;
  private targetSquirrelX?: number;

  constructor(config: DogConfig) {
    this.scene = config.scene;
    
    // Set breed
    const breedKey = config.breed || 'pug';
    this.breed = DOG_BREEDS[breedKey];
    
    // Apply breed stats to movement
    this.MOVE_SPEED = this.BASE_MOVE_SPEED * this.breed.speed;
    this.JUMP_VELOCITY = this.BASE_JUMP_VELOCITY * this.breed.jumpPower;
    
    // Create sprite - using placeholder rectangle for now
    if (config.texture) {
      this.sprite = this.scene.physics.add.sprite(config.x, config.y, config.texture);
    } else {
      // Create cute pixel-style dog sprite with breed color
      const textureKey = `dog-${breedKey}`;
      if (!this.scene.textures.exists(textureKey)) {
        const graphics = this.scene.add.graphics();
        
        // Body (rounded rectangle)
        graphics.fillStyle(this.breed.color, 1);
        graphics.fillRoundedRect(8, 12, 32, 20, 6);
        
        // Head (circle)
        graphics.fillCircle(40, 16, 12);
        
        // Ears (floppy for Pug, perky for Golden)
        if (breedKey === 'pug') {
          // Floppy ears
          graphics.fillEllipse(38, 8, 6, 10);
          graphics.fillEllipse(48, 8, 6, 10);
        } else {
          // Pointed ears
          graphics.fillTriangle(35, 6, 38, 2, 41, 6);
          graphics.fillTriangle(45, 6, 48, 2, 51, 6);
        }
        
        // Tail (curly for Pug, fluffy for Golden)
        graphics.fillCircle(6, 16, 6);
        
        // Legs (4 small rectangles)
        graphics.fillRect(12, 28, 6, 8);
        graphics.fillRect(22, 28, 6, 8);
        graphics.fillRect(28, 28, 6, 8);
        graphics.fillRect(34, 28, 6, 8);
        
        // Face details
        graphics.fillStyle(0x000000, 1);
        // Eyes
        graphics.fillCircle(38, 14, 2);
        graphics.fillCircle(46, 14, 2);
        // Nose
        graphics.fillCircle(42, 20, 3);
        // Mouth smile
        graphics.lineStyle(2, 0x000000, 1);
        graphics.arc(42, 20, 4, 0, Math.PI, false);
        graphics.strokePath();
        
        graphics.generateTexture(textureKey, 56, 36);
        graphics.destroy();
      }
      
      this.sprite = this.scene.physics.add.sprite(config.x, config.y, textureKey);
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
    
    // Random distraction check (only if breed has distraction chance)
    if (!this.isDistracted && this.breed.distractionChance > 0) {
      // Check once per second (roughly 1/60 each frame)
      const distractionRoll = Math.random();
      if (distractionRoll < (this.breed.distractionChance / 60)) {
        this.getDistracted();
      }
    }
    
    // Horizontal movement (slower if distracted, auto-chase if chasing squirrel)
    if (this.chasingSquirrel && this.targetSquirrelX !== undefined) {
      // Auto-chase the squirrel
      const direction = this.targetSquirrelX > this.sprite.x ? 1 : -1;
      this.sprite.setVelocityX(this.MOVE_SPEED * 1.2 * direction); // Chase faster!
      this.sprite.setFlipX(direction < 0);
    } else {
      // Normal player control (slower if distracted)
      const moveMultiplier = this.isDistracted ? 0.5 : 1.0;
      
      if (this.cursors.left.isDown) {
        this.sprite.setVelocityX(-this.MOVE_SPEED * moveMultiplier);
        this.sprite.setFlipX(true);
      } else if (this.cursors.right.isDown) {
        this.sprite.setVelocityX(this.MOVE_SPEED * moveMultiplier);
        this.sprite.setFlipX(false);
      }
    }
    
    // Jump (weaker if distracted)
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && onGround) {
      const jumpMultiplier = this.isDistracted ? 0.7 : 1.0;
      this.sprite.setVelocityY(this.JUMP_VELOCITY * jumpMultiplier);
      this.isJumping = true;
    }
    
    // Update jump state
    if (onGround && this.isJumping) {
      this.isJumping = false;
    }
  }
  
  private getDistracted() {
    if (this.isDistracted) return;
    
    this.isDistracted = true;
    this.chasingSquirrel = true;
    
    // Find nearest squirrel - get from scene registry
    const squirrels = this.scene.registry.get('squirrels') as Array<{ x: number, y: number }> || [];
    
    if (squirrels.length > 0) {
      // Find closest squirrel
      let nearestSquirrel = squirrels[0];
      let minDistance = Infinity;
      
      squirrels.forEach(squirrel => {
        const distance = Phaser.Math.Distance.Between(
          this.sprite.x, this.sprite.y,
          squirrel.x, squirrel.y
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestSquirrel = squirrel;
        }
      });
      
      this.targetSquirrelX = nearestSquirrel.x;
    }
    
    // Show thought bubble indicator with squirrel emoji
    this.distractionIndicator = this.scene.add.text(
      this.sprite.x,
      this.sprite.y - 60,
      '🐿️!',
      { fontSize: '32px' }
    );
    
    // Animate the thought bubble
    this.scene.tweens.add({
      targets: this.distractionIndicator,
      y: this.sprite.y - 70,
      alpha: 0.7,
      duration: 300,
      yoyo: true,
      repeat: 5
    });
    
    // End distraction after 1.5 seconds
    this.scene.time.delayedCall(1500, () => {
      this.isDistracted = false;
      this.chasingSquirrel = false;
      this.targetSquirrelX = undefined;
      if (this.distractionIndicator) {
        this.distractionIndicator.destroy();
        this.distractionIndicator = undefined;
      }
    });
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
  
  takeDamage() {
    if (this.isInvincible) return false;
    
    // Start invincibility
    this.isInvincible = true;
    
    // Create damage particle effect
    const particles = this.scene.add.particles(this.sprite.x, this.sprite.y, 'dog-placeholder', {
      speed: { min: 20, max: 80 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 0.8, end: 0 },
      tint: 0xFF0000,
      lifespan: 600,
      quantity: 5,
      blendMode: 'ADD'
    });
    
    particles.explode();
    
    this.scene.time.delayedCall(600, () => {
      particles.destroy();
    });
    
    // Visual feedback - flashing
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
      repeat: 10
    });
    
    // Reset invincibility after 2 seconds
    this.scene.time.delayedCall(2000, () => {
      this.isInvincible = false;
    });
    
    return true;
  }
  
  isCurrentlyInvincible(): boolean {
    return this.isInvincible;
  }
  
  getBreed(): DogBreedStats {
    return this.breed;
  }
  
  getEatSpeed(): number {
    return this.breed.eatSpeed;
  }
}

