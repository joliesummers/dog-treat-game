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
      // Create breed-specific dog sprite
      const textureKey = `dog-${breedKey}`;
      
      // Remove old texture if it exists (force regeneration with new design)
      if (this.scene.textures.exists(textureKey)) {
        this.scene.textures.remove(textureKey);
      }
      
      const graphics = this.scene.add.graphics();
      
      if (breedKey === 'pug') {
          // PUG - Stocky, flat face, curly tail, compact
          graphics.fillStyle(this.breed.color, 1);
          
          // Body (shorter, stockier)
          graphics.fillRoundedRect(10, 14, 28, 18, 8);
          
          // Head (round, large relative to body)
          graphics.fillCircle(42, 18, 14);
          
          // Flat face characteristic - add a lighter muzzle area
          graphics.fillStyle(0xE6D4B5, 1); // Lighter tan for muzzle
          graphics.fillCircle(48, 20, 8);
          
          // Small floppy ears (close to head)
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillEllipse(36, 12, 8, 10);
          graphics.fillEllipse(48, 12, 8, 10);
          
          // Curly tail (signature pug curl!)
          graphics.fillCircle(8, 18, 7);
          graphics.fillCircle(6, 14, 5);
          
          // Short legs
          graphics.fillRect(14, 28, 7, 8);
          graphics.fillRect(24, 28, 7, 8);
          graphics.fillRect(30, 28, 7, 8);
          
          // Face details - BIG expressive eyes
          graphics.fillStyle(0x000000, 1);
          graphics.fillCircle(40, 16, 3); // Bigger eyes
          graphics.fillCircle(50, 16, 3);
          
          // White shine in eyes (pug expression)
          graphics.fillStyle(0xFFFFFF, 1);
          graphics.fillCircle(41, 15, 1);
          graphics.fillCircle(51, 15, 1);
          
          // Black nose
          graphics.fillStyle(0x000000, 1);
          graphics.fillCircle(48, 22, 3);
          
          // Mouth (happy pug smile)
          graphics.lineStyle(2, 0x000000, 1);
          graphics.arc(48, 23, 5, 0, Math.PI, false);
          graphics.strokePath();
          
          // Wrinkles on forehead (pug characteristic)
          graphics.lineStyle(1, 0x654321, 0.5);
          graphics.lineBetween(38, 10, 40, 12);
          graphics.lineBetween(46, 10, 48, 12);
          
      } else {
        // GOLDEN RETRIEVER - Athletic, longer snout, fluffy tail
        graphics.fillStyle(this.breed.color, 1); // Golden color
          
          // Body (longer, athletic)
          graphics.fillRoundedRect(8, 14, 36, 18, 6);
          
          // Head (oval, elegant)
          graphics.fillEllipse(46, 18, 14, 12);
          
          // Longer snout (golden characteristic)
          graphics.fillStyle(0xE5C392, 1); // Lighter golden for snout
          graphics.fillEllipse(52, 20, 10, 8);
          
          // Pointed upright ears
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillTriangle(38, 10, 42, 4, 46, 10);
          graphics.fillTriangle(46, 10, 50, 4, 54, 10);
          
          // Fluffy tail (signature golden tail!)
          graphics.fillEllipse(6, 18, 12, 10);
          graphics.fillEllipse(2, 16, 8, 8);
          
          // Longer legs (athletic build)
          graphics.fillRect(12, 28, 6, 10);
          graphics.fillRect(20, 28, 6, 10);
          graphics.fillRect(30, 28, 6, 10);
          graphics.fillRect(38, 28, 6, 10);
          
          // Face details - Friendly golden eyes
          graphics.fillStyle(0x000000, 1);
          graphics.fillCircle(44, 16, 2);
          graphics.fillCircle(52, 16, 2);
          
          // White shine
          graphics.fillStyle(0xFFFFFF, 1);
          graphics.fillCircle(44, 15, 1);
          graphics.fillCircle(52, 15, 1);
          
          // Black nose
          graphics.fillStyle(0x000000, 1);
          graphics.fillCircle(54, 21, 3);
          
          // Happy smile
          graphics.lineStyle(2, 0x000000, 1);
          graphics.arc(54, 22, 4, 0, Math.PI, false);
          graphics.strokePath();
          
          // Fluffy chest fur
          graphics.fillStyle(0xFFE4B5, 0.6); // Light fluffy color
          graphics.fillCircle(20, 24, 6);
          graphics.fillCircle(28, 24, 6);
      }
      
      graphics.generateTexture(textureKey, 60, 40);
      graphics.destroy();
      
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
    
    // 🤮 ENHANCED PUKE EFFECT 🤮
    
    // Main puke emoji - bigger and more dramatic!
    const mainPuke = this.scene.add.text(
      this.sprite.x + 25,
      this.sprite.y - 15,
      '🤮',
      { fontSize: '48px' }
    );
    
    // Animate main puke in an arc
    this.scene.tweens.add({
      targets: mainPuke,
      x: this.sprite.x + 100,
      y: this.sprite.y + 30,
      scaleX: 1.3,
      scaleY: 0.8,
      alpha: 0,
      duration: 900,
      ease: 'Quad.easeOut',
      onComplete: () => {
        mainPuke.destroy();
      }
    });
    
    // Add smaller sick emoji that appears slightly delayed
    const sickEmoji = this.scene.add.text(
      this.sprite.x + 20,
      this.sprite.y - 25,
      '🤢',
      { fontSize: '28px' }
    );
    
    this.scene.tweens.add({
      targets: sickEmoji,
      y: this.sprite.y - 45,
      alpha: 0,
      duration: 600,
      delay: 100,
      ease: 'Sine.easeOut',
      onComplete: () => {
        sickEmoji.destroy();
      }
    });
    
    // Create multi-colored puke particle textures
    const pukeColors = [
      { name: 'puke-green', color: 0x7FFF00, size: 6 },      // Chartreuse green
      { name: 'puke-yellow', color: 0xFFFF00, size: 5 },     // Bright yellow
      { name: 'puke-brown', color: 0x8B4513, size: 4 },      // Saddle brown
      { name: 'puke-tan', color: 0xD2B48C, size: 3 },        // Tan chunks
      { name: 'puke-lime', color: 0x9ACD32, size: 7 }        // Yellow-green
    ];
    
    // Generate textures for each color if they don't exist
    pukeColors.forEach(({ name, color, size }) => {
      if (!this.scene.textures.exists(name)) {
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(color, 1);
        // Make irregular shapes (not perfect circles)
        graphics.fillEllipse(size / 2, size / 2, size, size * 0.8);
        graphics.generateTexture(name, size, size);
        graphics.destroy();
      }
    });
    
    // Create multiple particle emitters for variety
    const particleEmitters: Phaser.GameObjects.Particles.ParticleEmitter[] = [];
    
    // Main spray particles (green/yellow mix)
    const mainSpray = this.scene.add.particles(this.sprite.x + 25, this.sprite.y, 'puke-green', {
      speed: { min: 80, max: 180 },
      angle: { min: -30, max: 30 },
      scale: { start: 1.2, end: 0 },
      alpha: { start: 0.9, end: 0 },
      lifespan: 800,
      quantity: 12,
      gravityY: 250,
      rotate: { min: 0, max: 360 }
    });
    particleEmitters.push(mainSpray);
    
    // Yellow chunks (bigger, slower)
    const yellowChunks = this.scene.add.particles(this.sprite.x + 25, this.sprite.y, 'puke-yellow', {
      speed: { min: 60, max: 140 },
      angle: { min: -20, max: 40 },
      scale: { start: 1.5, end: 0.3 },
      alpha: { start: 1, end: 0 },
      lifespan: 900,
      quantity: 8,
      gravityY: 280,
      rotate: { min: -180, max: 180 }
    });
    particleEmitters.push(yellowChunks);
    
    // Brown bits (smaller, scattered)
    const brownBits = this.scene.add.particles(this.sprite.x + 25, this.sprite.y, 'puke-brown', {
      speed: { min: 50, max: 120 },
      angle: { min: -45, max: 45 },
      scale: { start: 0.8, end: 0 },
      alpha: { start: 0.8, end: 0 },
      lifespan: 700,
      quantity: 10,
      gravityY: 300
    });
    particleEmitters.push(brownBits);
    
    // Lime green splatter (fast, spreads wide)
    const limeSplatter = this.scene.add.particles(this.sprite.x + 25, this.sprite.y, 'puke-lime', {
      speed: { min: 100, max: 200 },
      angle: { min: -50, max: 50 },
      scale: { start: 1, end: 0 },
      alpha: { start: 0.7, end: 0 },
      lifespan: 650,
      quantity: 15,
      gravityY: 200,
      bounce: 0.3 // Some particles bounce!
    });
    particleEmitters.push(limeSplatter);
    
    // Explode all particle systems
    particleEmitters.forEach(emitter => emitter.explode());
    
    // Clean up all particles after animation
    this.scene.time.delayedCall(1000, () => {
      particleEmitters.forEach(emitter => emitter.destroy());
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

