import Phaser from 'phaser';
import type { DogBreedStats, BreedType } from '../types/DogBreeds';
import { DOG_BREEDS } from '../types/DogBreeds';

export interface DogConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture?: string;
  breed?: BreedType;
  onJump?: () => void;
  onLand?: () => void;
  onDistracted?: () => void;
}

export class Dog {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private scene: Phaser.Scene;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey?: Phaser.Input.Keyboard.Key;
  private breed: DogBreedStats;
  
  // Base movement constants (modified by breed stats)
  private readonly BASE_MOVE_SPEED = 220;
  private readonly BASE_JUMP_VELOCITY = -550;
  private readonly DRAG = 900;
  
  private MOVE_SPEED: number;
  private JUMP_VELOCITY: number;
  
  // Sound callbacks
  private onJump?: () => void;
  private onLand?: () => void;
  private onDistracted?: () => void;
  
  // State
  private isJumping = false;
  private hasDoubleJumped = false;
  private canJumpAgain = true; // Can we accept another jump input?
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
    
    // Set sound callbacks
    this.onJump = config.onJump;
    this.onLand = config.onLand;
    this.onDistracted = config.onDistracted;
    
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
          // PUG - South Park construction paper style (NO external outlines)
          
          // Body (shorter, stockier) - flat fill, no outline
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillRoundedRect(10, 14, 28, 18, 8);
          
          // Head (round, large relative to body) - flat fill
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillCircle(42, 18, 14);
          
          // Flat face characteristic - add a lighter muzzle area
          graphics.fillStyle(0xE6D4B5, 1); // Lighter tan for muzzle
          graphics.fillCircle(48, 20, 8);
          
          // Small floppy ears (close to head) - flat fill
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillEllipse(36, 12, 8, 10);
          graphics.fillEllipse(48, 12, 8, 10);
          
          // Curly tail (signature pug curl!) - flat fill
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillCircle(8, 18, 7);
          graphics.fillCircle(6, 14, 5);
          
          // Short legs - flat fill
          graphics.fillStyle(this.breed.color, 1);
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
        // GOLDEN RETRIEVER - South Park construction paper style (NO external outlines)
          
          // Body (longer, athletic) - flat fill, no outline
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillRoundedRect(8, 14, 36, 18, 6);
          
          // Head (oval, elegant) - flat fill
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillEllipse(46, 18, 14, 12);
          
          // Longer snout (golden characteristic) - flat fill
          graphics.fillStyle(0xE5C392, 1); // Lighter golden for snout
          graphics.fillEllipse(52, 20, 10, 8);
          
          // Pointed upright ears - flat fill
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillTriangle(38, 10, 42, 4, 46, 10);
          graphics.fillTriangle(46, 10, 50, 4, 54, 10);
          
          // Fluffy tail (signature golden tail!) - flat fill
          graphics.fillStyle(this.breed.color, 1);
          graphics.fillEllipse(6, 18, 12, 10);
          graphics.fillEllipse(2, 16, 8, 8);
          
          // Longer legs (athletic build) - flat fill
          graphics.fillStyle(this.breed.color, 1);
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
      this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
  }

  update(virtualInput?: { left: boolean; right: boolean; jump: boolean }) {
    if (!this.cursors && !virtualInput) return;
    
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
      
      // Check keyboard OR virtual input
      const leftPressed = (this.cursors?.left.isDown || false) || (virtualInput?.left || false);
      const rightPressed = (this.cursors?.right.isDown || false) || (virtualInput?.right || false);
      
      if (leftPressed) {
        this.sprite.setVelocityX(-this.MOVE_SPEED * moveMultiplier);
        this.sprite.setFlipX(true);
      } else if (rightPressed) {
        this.sprite.setVelocityX(this.MOVE_SPEED * moveMultiplier);
        this.sprite.setFlipX(false);
      }
    }
    
    // Jump system - SIMPLIFIED for reliability
    // Check keyboard OR virtual input
    const jumpKeyDown = (this.cursors?.up.isDown || false) || 
                       (this.spaceKey?.isDown || false) || 
                       (virtualInput?.jump || false);
    const distractionMultiplier = this.isDistracted ? 0.7 : 1.0;
    
    // When jump key is pressed AND we can jump again
    if (jumpKeyDown && this.canJumpAgain) {
      // First jump - on ground
      if (onGround) {
        this.sprite.setVelocityY(this.JUMP_VELOCITY * distractionMultiplier);
        this.isJumping = true;
        this.hasDoubleJumped = false; // Reset double jump
        this.canJumpAgain = false; // Don't allow another jump until key is released
        
        // Play jump sound
        this.onJump?.();
        
        // STRETCH animation
        this.scene.tweens.add({
          targets: this.sprite,
          scaleY: 1.2,
          scaleX: 0.9,
          duration: 100,
          yoyo: true,
          ease: 'Quad.easeOut'
        });
      }
      // Second jump - double jump in air
      else if (this.isJumping && !this.hasDoubleJumped && this.breed.canDoubleJump) {
        this.sprite.setVelocityY(this.JUMP_VELOCITY * this.breed.doubleJumpPower * distractionMultiplier);
        this.hasDoubleJumped = true;
        this.canJumpAgain = false; // Don't allow triple jump
        
        // Play jump sound
        this.onJump?.();
        
        // SPIN animation for double jump
        this.scene.tweens.add({
          targets: this.sprite,
          scaleY: 1.15,
          scaleX: 1.15,
          angle: this.sprite.angle + 360,
          duration: 200,
          ease: 'Cubic.easeOut',
          onComplete: () => {
            this.sprite.setAngle(0);
          }
        });
        
        // Air puff particles
        this.createAirPuff();
      }
    }
    
    // Reset jump ability when key is released
    if (!jumpKeyDown) {
      this.canJumpAgain = true;
    }
    
    // Track if we've left the ground (prevents false landing detection immediately after jump)
    if (!onGround && this.isJumping) {
      // We're in the air - stay in jumping state
    }
    
    // Update jump state and add SQUASH animation on landing
    // Only reset if we're on ground AND upward velocity is near zero (actually landing, not just starting jump)
    if (onGround && this.isJumping && body.velocity.y >= -10) {
      this.isJumping = false;
      this.hasDoubleJumped = false; // Reset double jump on landing
      
      // Play land sound
      this.onLand?.();
      
      // SQUASH animation on landing (compress vertically, expand horizontally)
      this.scene.tweens.add({
        targets: this.sprite,
        scaleY: 0.8,
        scaleX: 1.1,
        duration: 150,
        yoyo: true,
        ease: 'Back.easeOut'
      });
      
      // 💨 DUST CLOUD PUFFS on landing!
      this.createDustClouds();
    }
  }
  
  private getDistracted() {
    if (this.isDistracted) return;
    
    this.isDistracted = true;
    this.chasingSquirrel = true;
    
    // Play distraction sound
    this.onDistracted?.();
    
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
      }
    });
  }
  
  // PUBLIC: Force distraction (called when hitting squirrel - applies to ALL breeds)
  public forceDistraction() {
    this.getDistracted();
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
    
    // 🤮 ENHANCED PUKE EFFECT - FROM DOG'S MOUTH! 🤮
    
    // Calculate mouth position based on breed
    // Pug mouth: texture (48, 23), offset from center (30, 20) = (18, 3)
    // Golden mouth: texture (54, 22), offset from center (30, 20) = (24, 2)
    const mouthOffsetX = this.breed.name === 'Pug' ? 18 : 24;
    const mouthOffsetY = this.breed.name === 'Pug' ? 3 : 2;
    
    // Adjust for sprite flip
    const facingDirection = this.sprite.flipX ? -1 : 1;
    const mouthX = this.sprite.x + (mouthOffsetX * facingDirection);
    const mouthY = this.sprite.y + mouthOffsetY;
    
    // Pure particle puke effect - no emojis, just chunks from mouth!
    
    // Create South Park-style puke textures (construction paper green, streamy)
    const pukeColors = [
      { name: 'puke-green', color: 0x8FBC8F, size: 10, width: 16 },     // Light construction paper green
      { name: 'puke-yellow', color: 0xF0E68C, size: 8, width: 12 },     // Khaki/pale yellow
      { name: 'puke-brown', color: 0x8B7355, size: 10, width: 14 },     // Light brown chunks
      { name: 'puke-tan', color: 0xD2B48C, size: 6, width: 10 },        // Tan
      { name: 'puke-lime', color: 0x9ACD32, size: 9, width: 14 }        // Yellow-green lime
    ];
    
    // Generate STREAMY textures (elongated, not round)
    pukeColors.forEach(({ name, color, size, width }) => {
      if (!this.scene.textures.exists(name)) {
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(color, 1);
        // Make STREAMY elongated shapes (horizontal ellipses for stream effect)
        graphics.fillEllipse(width / 2, size / 2, width, size * 0.6);
        graphics.generateTexture(name, width, size);
        graphics.destroy();
      }
    });
    
    // GROSS South Park-style stream of vomit - heavy, chunky, arcing forward!
    // MORE DARK GREEN, LESS BROWN
    const particleEmitters: Phaser.GameObjects.Particles.ParticleEmitter[] = [];
    
    // Calculate direction based on which way dog is facing
    const sprayDirection = facingDirection > 0 ? 0 : 180; // 0 = right, 180 = left
    
    // Main chunky stream (DARK GREEN dominant) - FROM MOUTH!
    const mainStream = this.scene.add.particles(mouthX, mouthY, 'puke-green', {
      speed: { min: 120, max: 200 },
      angle: { min: sprayDirection - 15, max: sprayDirection + 15 }, // Tight forward arc
      scale: { start: 1.5, end: 0.8 }, // Stays chunky, doesn't disappear
      alpha: { start: 1, end: 0.3 },
      lifespan: 600,
      quantity: 25, // Increased for more green
      gravityY: 400, // Heavy gravity for arc
      rotate: 0 // No rotation - just gross chunks
    });
    particleEmitters.push(mainStream);
    
    // Dark olive splatter (ALSO GREEN) - FROM MOUTH!
    const oliveSplatter = this.scene.add.particles(mouthX, mouthY, 'puke-lime', {
      speed: { min: 130, max: 190 },
      angle: { min: sprayDirection - 18, max: sprayDirection + 18 },
      scale: { start: 1.4, end: 0.7 },
      alpha: { start: 0.95, end: 0.4 },
      lifespan: 620,
      quantity: 22, // Increased for more green
      gravityY: 430,
      rotate: 0
    });
    particleEmitters.push(oliveSplatter);
    
    // Murky yellow-green liquid - FROM MOUTH!
    const yellowLiquid = this.scene.add.particles(mouthX, mouthY, 'puke-yellow', {
      speed: { min: 110, max: 180 },
      angle: { min: sprayDirection - 12, max: sprayDirection + 12 },
      scale: { start: 1.3, end: 0.6 },
      alpha: { start: 0.9, end: 0.3 },
      lifespan: 650,
      quantity: 10, // Reduced slightly
      gravityY: 420,
      rotate: 0
    });
    particleEmitters.push(yellowLiquid);
    
    // Brown chunks (accent only, less dominant) - FROM MOUTH!
    const brownChunks = this.scene.add.particles(mouthX, mouthY, 'puke-brown', {
      speed: { min: 100, max: 160 },
      angle: { min: sprayDirection - 10, max: sprayDirection + 10 },
      scale: { start: 1.8, end: 1.0 }, // Large chunky blobs
      alpha: { start: 1, end: 0.5 },
      lifespan: 700,
      quantity: 8, // Reduced from 15 - now just accent chunks
      gravityY: 450, // Very heavy
      rotate: 0
    });
    particleEmitters.push(brownChunks);
    
    // Explode all particle systems
    particleEmitters.forEach(emitter => emitter.explode());
    
    // Clean up all particles after animation
    this.scene.time.delayedCall(1000, () => {
      particleEmitters.forEach(emitter => emitter.destroy());
    });
    
    // 🤮 PUKING FACE OVERLAY - Change dog's expression to sick/puking! 🤮
    const pukeGraphics = this.scene.add.graphics();
    pukeGraphics.setDepth(1000); // On top of everything
    
    // Position relative to dog sprite (centered on face area)
    const faceX = this.sprite.x;
    const faceY = this.sprite.y - 2;
    
    // Green tint overlay on face (dog feels sick!)
    pukeGraphics.fillStyle(0x9ACD32, 0.3); // Yellow-green tint
    pukeGraphics.fillCircle(faceX + (this.sprite.flipX ? -12 : 12), faceY, 14);
    
    // Squinted/sick eyes (X_X style)
    pukeGraphics.lineStyle(2, 0x000000, 1);
    // Left eye - squinted X
    const leftEyeX = faceX + (this.sprite.flipX ? -18 : 8);
    const eyeY = faceY - 2;
    pukeGraphics.lineBetween(leftEyeX - 2, eyeY - 2, leftEyeX + 2, eyeY + 2);
    pukeGraphics.lineBetween(leftEyeX - 2, eyeY + 2, leftEyeX + 2, eyeY - 2);
    
    // Right eye - squinted X
    const rightEyeX = faceX + (this.sprite.flipX ? -6 : 20);
    pukeGraphics.lineBetween(rightEyeX - 2, eyeY - 2, rightEyeX + 2, eyeY + 2);
    pukeGraphics.lineBetween(rightEyeX - 2, eyeY + 2, rightEyeX + 2, eyeY - 2);
    
    // Wide open mouth (puking!)
    pukeGraphics.lineStyle(2, 0x000000, 1);
    pukeGraphics.fillStyle(0x000000, 0.8);
    const mouthCenterX = faceX + (this.sprite.flipX ? -8 : 18);
    pukeGraphics.fillEllipse(mouthCenterX, faceY + 6, 6, 8); // Wide open oval mouth
    
    // Animate the puke face overlay
    this.scene.tweens.add({
      targets: pukeGraphics,
      alpha: { from: 1, to: 0 },
      scaleX: { from: 1, to: 1.1 },
      scaleY: { from: 1, to: 1.1 },
      duration: 800,
      ease: 'Quad.easeOut',
      onComplete: () => {
        pukeGraphics.destroy();
      }
    });
    
    // Visual feedback - flashing (green tint for sick feeling)
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.3,
      tint: 0x9ACD32, // Green sick tint
      duration: 100,
      yoyo: true,
      repeat: 10,
      onComplete: () => {
        this.sprite.clearTint(); // Remove tint after flashing
      }
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
  
  private createDustClouds() {
    // Create dust cloud texture if it doesn't exist
    if (!this.scene.textures.exists('dust-cloud')) {
      const graphics = this.scene.add.graphics();
      graphics.fillStyle(0xD3D3D3, 0.6); // Light gray, semi-transparent
      
      // Draw fluffy cloud shape (irregular ellipses)
      graphics.fillEllipse(8, 6, 12, 8);
      graphics.fillEllipse(4, 8, 8, 6);
      graphics.fillEllipse(12, 8, 8, 6);
      
      graphics.generateTexture('dust-cloud', 16, 12);
      graphics.destroy();
    }
    
    // Spawn 3-5 dust puffs at dog's feet
    const dustCount = Phaser.Math.Between(3, 5);
    const footY = this.sprite.y + 18; // At dog's feet
    
    for (let i = 0; i < dustCount; i++) {
      const offsetX = Phaser.Math.Between(-10, 10);
      
      const dust = this.scene.add.particles(
        this.sprite.x + offsetX, 
        footY, 
        'dust-cloud', 
        {
          speed: { min: 20, max: 50 },
          angle: { min: -120, max: -60 }, // Spray sideways and up
          scale: { start: 0.5, end: 1.2 }, // Puff expands
          alpha: { start: 0.6, end: 0 },
          lifespan: 300,
          quantity: 1,
          gravityY: -50 // Float up slightly
        }
      );
      
      dust.explode();
      
      // Clean up after animation
      this.scene.time.delayedCall(400, () => {
        dust.destroy();
      });
    }
  }
  
  private createAirPuff() {
    // Create air puff texture if it doesn't exist (lighter/whiter than dust)
    if (!this.scene.textures.exists('air-puff')) {
      const graphics = this.scene.add.graphics();
      graphics.fillStyle(0xFFFFFF, 0.7); // White, more opaque
      
      // Draw circular puff
      graphics.fillCircle(8, 8, 8);
      graphics.fillCircle(12, 6, 6);
      graphics.fillCircle(4, 6, 6);
      
      graphics.generateTexture('air-puff', 16, 16);
      graphics.destroy();
    }
    
    // Spawn air puffs around dog (360 degree burst!)
    const puffCount = 8;
    
    for (let i = 0; i < puffCount; i++) {
      const angle = (360 / puffCount) * i;
      
      const airPuff = this.scene.add.particles(
        this.sprite.x, 
        this.sprite.y, 
        'air-puff', 
        {
          speed: { min: 60, max: 100 },
          angle: { min: angle - 10, max: angle + 10 }, // Radial burst
          scale: { start: 0.8, end: 1.5 }, // Expand outward
          alpha: { start: 0.8, end: 0 },
          lifespan: 400,
          quantity: 1,
          gravityY: 0 // No gravity - pure air burst!
        }
      );
      
      airPuff.explode();
      
      // Clean up after animation
      this.scene.time.delayedCall(500, () => {
        airPuff.destroy();
      });
    }
  }
}

