import Phaser from 'phaser';
import { Dog } from '../entities/Dog';
import { Treat } from '../entities/Treat';
import { BadItem } from '../entities/BadItem';
import { Squirrel } from '../entities/Squirrel';
import { UIScene } from './UIScene';
import type { BreedType } from '../types/DogBreeds';

export class GameScene extends Phaser.Scene {
  private dog?: Dog;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private treats: Treat[] = [];
  private badItems: BadItem[] = [];
  private squirrels: Squirrel[] = [];
  private uiScene?: UIScene;
  private isEating: boolean = false;
  private isPaused: boolean = false;
  private pauseText?: Phaser.GameObjects.Text;
  private gameOver: boolean = false;
  
  constructor() {
    super('GameScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Reset game state completely
    this.gameOver = false;
    this.isEating = false;
    this.isPaused = false;
    this.treats = [];
    this.badItems = [];
    this.squirrels = [];
    
    // Get UI scene reference
    this.uiScene = this.scene.get('UIScene') as UIScene;
    
    // Set world bounds
    this.physics.world.setBounds(0, 0, width, height);
    
    // Add sky gradient background
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xE0F6FF, 0xE0F6FF, 1);
    sky.fillRect(0, 0, width, height);
    
    // Create platform textures if they don't exist
    this.createPlatformTextures();
    
    // Create ground platform
    this.platforms = this.physics.add.staticGroup();
    
    // Main ground (grass with texture)
    const ground = this.add.rectangle(width / 2, height - 32, width, 64);
    ground.setFillStyle(0x228B22); // Grass green
    ground.setStrokeStyle(2, 0x1A6B1A); // Darker green outline
    this.platforms.add(ground);
    
    // Add grass texture details on top
    const grassGraphics = this.add.graphics();
    grassGraphics.fillStyle(0x32CD32, 0.6); // Lime green for grass blades
    for (let i = 0; i < width; i += 8) {
      const variation = Phaser.Math.Between(-4, 4);
      grassGraphics.fillRect(i, height - 64 + variation, 4, 8);
    }
    
    // Add dirt layer below grass with texture
    const dirt = this.add.rectangle(width / 2, height - 8, width, 16);
    dirt.setFillStyle(0x8B4513); // Saddle brown
    dirt.setStrokeStyle(1, 0x654321);
    
    // Add some floating platforms with wood texture
    const platform1 = this.add.rectangle(200, height - 150, 200, 32);
    platform1.setFillStyle(0xD2691E); // Chocolate (wood color)
    platform1.setStrokeStyle(3, 0x8B4513); // Darker wood outline
    this.platforms.add(platform1);
    
    const platform2 = this.add.rectangle(500, height - 280, 200, 32);
    platform2.setFillStyle(0xCD853F); // Peru (lighter wood)
    platform2.setStrokeStyle(3, 0xA0522D);
    this.platforms.add(platform2);
    
    const platform3 = this.add.rectangle(700, height - 180, 120, 32);
    platform3.setFillStyle(0xD2691E);
    platform3.setStrokeStyle(3, 0x8B4513);
    this.platforms.add(platform3);
    
    // Add a higher platform for extra challenge
    const platform4 = this.add.rectangle(350, height - 400, 150, 32);
    platform4.setFillStyle(0xCD853F);
    platform4.setStrokeStyle(3, 0xA0522D);
    this.platforms.add(platform4);
    
    // Create treats, bad items, and squirrels
    this.createTreats(width, height);
    this.createBadItems(width, height);
    this.createSquirrels(width, height);
    
    // Calculate and set target score IMMEDIATELY (before any collisions can happen)
    const totalScore = this.treats.reduce((sum, treat) => sum + treat.getPointValue(), 0);
    
    // Update UI with target score synchronously
    this.uiScene?.reset(); // Reset FIRST (clears score to 0)
    this.uiScene?.setTargetScore(totalScore); // THEN set target
    
    // Get selected breed from registry
    const selectedBreed = this.registry.get('selectedBreed') as BreedType || 'pug';
    
    // Create player dog (spawn on ground, away from treats)
    this.dog = new Dog({
      scene: this,
      x: 50,
      y: height - 100,
      breed: selectedBreed
    });
    
    // Set up collision between dog and platforms
    this.physics.add.collider(this.dog.getSprite(), this.platforms);
    
    // Set up treat collection
    this.treats.forEach(treat => {
      this.physics.add.overlap(
        this.dog!.getSprite(),
        treat.getSprite(),
        () => this.collectTreat(treat),
        undefined,
        this
      );
    });
    
    // Set up bad item collision
    this.badItems.forEach(badItem => {
      this.physics.add.overlap(
        this.dog!.getSprite(),
        badItem.getSprite(),
        () => this.hitBadItem(badItem),
        undefined,
        this
      );
    });
    
    // Add instructions text
    const instructions = this.add.text(16, 98, 'Arrow Keys: Move\nUp Arrow: Jump\nCollect treats!\nAvoid poo! 💩', {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 6 }
    });
    instructions.setDepth(100);
    
    // Add title with breed name
    const breedName = this.dog.getBreed().name;
    const title = this.add.text(width / 2, 30, `${breedName} - Level 1`, {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    title.setDepth(100);
    
    // Set up pause functionality
    this.input.keyboard?.on('keydown-P', () => {
      this.togglePause();
    });
    
    // Camera follow player
    this.cameras.main.startFollow(this.dog!.getSprite(), false, 0.1, 0.1);
  }
  
  private togglePause() {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      this.physics.pause();
      
      // Show pause overlay
      const width = this.cameras.main.width;
      const height = this.cameras.main.height;
      
      if (!this.pauseText) {
        const pauseOverlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
        pauseOverlay.setScrollFactor(0);
        pauseOverlay.setDepth(1000);
        
        this.pauseText = this.add.text(width / 2, height / 2, 'PAUSED\n\nPress P to Resume', {
          fontSize: '40px',
          color: '#ffffff',
          fontStyle: 'bold',
          align: 'center'
        }).setOrigin(0.5);
        this.pauseText.setScrollFactor(0);
        this.pauseText.setDepth(1001);
      } else {
        this.pauseText.setVisible(true);
      }
    } else {
      this.physics.resume();
      if (this.pauseText) {
        this.pauseText.setVisible(false);
      }
    }
  }
  
  private createTreats(width: number, height: number) {
    // Balanced gameplay - 50% fewer treats (~15 treats, ~25 points)
    // Mix of sizes: small (1pt), medium (2pt), large (3pt)
    const treatPositions = [
      // Ground level treats - easy starter points (4 treats)
      { x: 150, y: height - 100, size: 1 },
      { x: 290, y: height - 100, size: 1 },
      { x: 520, y: height - 100, size: 2 },
      { x: width - 80, y: height - 100, size: 1 },
      
      // First platform - varied sizes (3 treats)
      { x: 170, y: height - 200, size: 2 },
      { x: 210, y: height - 200, size: 1 },
      { x: 250, y: height - 200, size: 3 },
      
      // Second platform (high up!) - big rewards (3 treats)
      { x: 460, y: height - 330, size: 3 },
      { x: 500, y: height - 330, size: 2 },
      { x: 540, y: height - 330, size: 2 },
      
      // Highest platform - JACKPOT! (2 treats)
      { x: 340, y: height - 450, size: 3 },
      { x: 380, y: height - 450, size: 3 },
      
      // Third platform (2 treats)
      { x: 690, y: height - 230, size: 2 },
      { x: 730, y: height - 230, size: 1 },
      
      // Mid-air collection challenge (1 treat)
      { x: 400, y: height - 200, size: 2 },
    ];
    
    treatPositions.forEach(pos => {
      const treat = new Treat(this, pos.x, pos.y, pos.size);
      this.treats.push(treat);
    });
  }
  
  private createBadItems(width: number, height: number) {
    // Bad items positioned away from squirrels (8 total)
    const staticBadItemPositions = [
      // Platform hazards - spread out more
      { x: 230, y: height - 200, type: 'poo' as const },  // Platform 1 right side
      { x: 420, y: height - 330, type: 'poo' as const },  // Platform 2 left side
      { x: 380, y: height - 450, type: 'poo' as const },  // Highest platform right
      { x: 750, y: height - 230, type: 'poo' as const },  // Platform 3 far right
      // Ground hazards
      { x: 200, y: height - 100, type: 'poo' as const },
      { x: 400, y: height - 100, type: 'poo' as const },
      { x: 600, y: height - 100, type: 'poo' as const },
      { x: width - 100, y: height - 100, type: 'poo' as const },
    ];
    
    staticBadItemPositions.forEach(pos => {
      const badItem = new BadItem(this, pos.x, pos.y, pos.type);
      this.badItems.push(badItem);
      // Make static items collide with platforms
      if (this.platforms) {
        this.physics.add.collider(badItem.getSprite(), this.platforms);
      }
    });
    
    // Start falling bad items spawner
    this.startFallingBadItems(width);
  }
  
  private createSquirrels(_width: number, height: number) {
    // Squirrels positioned away from bad items
    const squirrelPositions = [
      { x: 140, y: height - 180 },  // Platform 1 left side (away from poo at 230)
      { x: 560, y: height - 310 },  // Platform 2 right side (away from poo at 420)
      { x: 300, y: height - 430 },  // Highest platform left (away from poo at 380)
      { x: 660, y: height - 210 },  // Platform 3 left side (away from poo at 750)
    ];
    
    squirrelPositions.forEach(pos => {
      this.squirrels.push(new Squirrel(this, pos.x, pos.y));
    });
    
    // Store squirrel positions in registry for Dog to access
    this.registry.set('squirrels', squirrelPositions);
  }
  
  private startFallingBadItems(width: number) {
    // Spawn falling bad items every 3-5 seconds
    this.time.addEvent({
      delay: Phaser.Math.Between(3000, 5000),
      callback: () => {
        if (this.gameOver) return;
        
        // Random x position
        const x = Phaser.Math.Between(100, width - 100);
        
        // Spawn at top of screen (always poo now)
        const fallingItem = new BadItem(this, x, -30, 'poo');
        this.badItems.push(fallingItem);
        
        // Enable gravity for falling
        const body = fallingItem.getSprite().body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(true);
        
        // Set up collision with platforms (will bounce/stop)
        if (this.platforms) {
          this.physics.add.collider(fallingItem.getSprite(), this.platforms);
        }
        
        // Set up collision with player
        this.physics.add.overlap(
          this.dog!.getSprite(),
          fallingItem.getSprite(),
          () => this.hitBadItem(fallingItem),
          undefined,
          this
        );
        
        // Destroy if falls off screen
        this.time.delayedCall(10000, () => {
          if (fallingItem.getSprite().active) {
            const index = this.badItems.indexOf(fallingItem);
            if (index > -1) {
              this.badItems.splice(index, 1);
            }
            fallingItem.getSprite().destroy();
          }
        });
      },
      loop: true
    });
  }
  
  private collectTreat(treat: Treat) {
    // Check if this treat was already collected
    if (!this.treats.includes(treat)) {
      return;
    }
    
    if (this.isEating) return; // Prevent double-collection during eat delay
    
    // Get eat speed from dog breed
    const eatSpeed = this.dog?.getEatSpeed() || 0;
    
    if (eatSpeed > 0) {
      this.isEating = true;
      // Pause dog briefly while eating
      const dogSprite = this.dog?.getSprite();
      if (dogSprite) {
        const originalVelocity = dogSprite.body?.velocity.x || 0;
        dogSprite.setVelocityX(originalVelocity * 0.3); // Slow down
      }
    }
    
    // Delay based on breed eat speed
    this.time.delayedCall(eatSpeed, () => {
      // Get point value before removing treat
      const points = treat.getPointValue();
      
      // Remove from array
      const index = this.treats.indexOf(treat);
      if (index > -1) {
        this.treats.splice(index, 1);
      }
      
      // Play collection animation
      treat.collect();
      
      // Update UI with points
      const currentScore = this.uiScene?.addPoints(points) || 0;
      const targetScore = this.uiScene?.getTargetScore() || 0;
      
      this.isEating = false;
      
    // Check win condition (reached target score)
    if (currentScore >= targetScore && !this.gameOver) {
      this.gameOver = true;
      this.physics.pause();
      this.time.delayedCall(500, () => {
        this.scene.launch('LevelCompleteScene');
      });
    }
    });
  }
  
  private hitBadItem(_badItem: BadItem) {
    // Don't process if game is already over
    if (this.gameOver) return;
    
    // Check if dog can take damage
    if (this.dog && this.dog.takeDamage()) {
      // Take damage in UI
      const health = this.uiScene?.takeDamage() || 0;
      
      // Check lose condition
      if (health <= 0 && !this.gameOver) {
        this.triggerGameOver();
      }
    }
  }
  
  private triggerGameOver() {
    this.gameOver = true;
    this.physics.pause();
    this.time.delayedCall(500, () => {
      this.scene.launch('GameOverScene');
    });
  }

  private createPlatformTextures() {
    // Create wood grain texture pattern (simple horizontal lines)
    if (!this.textures.exists('wood-texture')) {
      const graphics = this.add.graphics();
      graphics.fillStyle(0xD2691E, 1);
      graphics.fillRect(0, 0, 32, 32);
      // Add wood grain lines
      graphics.lineStyle(1, 0x8B4513, 0.5);
      for (let i = 0; i < 32; i += 4) {
        graphics.lineBetween(0, i, 32, i);
      }
      graphics.generateTexture('wood-texture', 32, 32);
      graphics.destroy();
    }
  }

  update() {
    // Don't update if paused or game over
    if (this.isPaused || this.gameOver) return;
    
    // Update player
    this.dog?.update();
    
    // Check if dog fell off the world
    if (this.dog && this.dog.getY() > this.cameras.main.height + 50) {
      // Instant game over if fell off
      if (!this.gameOver) {
        this.uiScene?.takeDamage();
        this.uiScene?.takeDamage();
        this.uiScene?.takeDamage();
        this.triggerGameOver();
      }
    }
  }
}

