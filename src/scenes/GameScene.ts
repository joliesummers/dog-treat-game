import Phaser from 'phaser';
import { Dog } from '../entities/Dog';
import { Treat } from '../entities/Treat';
import { BadItem } from '../entities/BadItem';
import { Squirrel } from '../entities/Squirrel';
import { UIScene } from './UIScene';
import type { BreedType } from '../types/DogBreeds';
import { getCurrentLevelConfig, type LevelConfig } from '../types/LevelConfig';

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
  
  // Level configuration
  private levelConfig: LevelConfig;
  private currentLevel: number = 1; // Start with Level 1 (tutorial)
  
  // Auto-scroll system
  private scrollSpeed: number = 0; // pixels per second
  private dangerZoneGraphics?: Phaser.GameObjects.Graphics;
  private dangerZoneX: number = 0; // Left edge of danger zone
  private dangerZoneDamageTimer: number = 0; // Track damage timing
  private readonly DANGER_ZONE_DAMAGE_INTERVAL = 1000; // Damage every 1 second
  
  constructor() {
    super('GameScene');
    this.levelConfig = getCurrentLevelConfig(1);
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
    
    // Get selected level from registry (set by LevelSelectScene)
    const selectedLevel = this.registry.get('selectedLevel') as number;
    if (selectedLevel) {
      this.currentLevel = selectedLevel;
    }
    
    // Get UI scene reference and initialize health system
    this.uiScene = this.scene.get('UIScene') as UIScene;
    
    // Initialize health system based on current level config
    this.levelConfig = getCurrentLevelConfig(this.currentLevel);
    this.uiScene.initializeHealthSystem(this.levelConfig);
    
    // Set level width based on config
    const levelWidth = this.levelConfig.levelWidth;
    
    // Set world bounds to extended level size
    this.physics.world.setBounds(0, 0, levelWidth, height);
    
    // Add sky gradient background - Angry Birds style! (extended for full level)
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x4DD0E1, 0x4DD0E1, 0xB2EBF2, 0xB2EBF2, 1); // Bright cyan to light turquoise
    sky.fillRect(0, 0, levelWidth, height);
    sky.setScrollFactor(0.5); // Parallax effect for sky
    
    // Create platform textures if they don't exist
    this.createPlatformTextures();
    
    // Create ground platform
    this.platforms = this.physics.add.staticGroup();
    
    // Main ground (grass with texture) - extended for full level
    const ground = this.add.rectangle(levelWidth / 2, height - 32, levelWidth, 64);
    ground.setFillStyle(0x8BC34A); // Vibrant Android green
    ground.setStrokeStyle(3, 0x558B2F); // Darker saturated green outline
    this.platforms.add(ground);
    
    // Add grass texture details on top
    const grassGraphics = this.add.graphics();
    grassGraphics.fillStyle(0x689F38, 0.7); // Darker vibrant green for grass blades
    for (let i = 0; i < levelWidth; i += 8) {
      const variation = Phaser.Math.Between(-4, 4);
      grassGraphics.fillRect(i, height - 64 + variation, 4, 8);
    }
    
    // Add dirt layer below grass with texture
    const dirt = this.add.rectangle(levelWidth / 2, height - 8, levelWidth, 16);
    dirt.setFillStyle(0x8B4513); // Saddle brown
    dirt.setStrokeStyle(1, 0x654321);
    
    // Get platform layout based on current level
    const platformData = this.getPlatformLayout(this.currentLevel, height);
    
    platformData.forEach(p => {
      // Create wood texture platform with grain
      const textureKey = `wood-platform-${p.w}x${p.h}`;
      
      if (!this.textures.exists(textureKey)) {
        const graphics = this.add.graphics();
        
        // Base wood color
        graphics.fillStyle(p.color, 1);
        graphics.fillRect(0, 0, p.w, p.h);
        
        // Add wood grain lines (horizontal streaks)
        graphics.lineStyle(1, p.color === 0xD2691E ? 0xA0522D : 0x8B4513, 0.4);
        for (let i = 0; i < 8; i++) {
          const y = Phaser.Math.Between(2, p.h - 2);
          const startX = Phaser.Math.Between(0, p.w * 0.1);
          const endX = Phaser.Math.Between(p.w * 0.8, p.w);
          graphics.lineBetween(startX, y, endX, y);
        }
        
        // Add darker top edge (shadow/depth)
        graphics.lineStyle(2, 0x654321, 0.5);
        graphics.lineBetween(0, 0, p.w, 0);
        
        // Add lighter bottom edge (highlight)
        graphics.lineStyle(1, p.color === 0xD2691E ? 0xF4A460 : 0xDEB887, 0.6);
        graphics.lineBetween(0, p.h - 1, p.w, p.h - 1);
        
        graphics.generateTexture(textureKey, p.w, p.h);
        graphics.destroy();
      }
      
      const platform = this.add.image(p.x, p.y, textureKey);
      if (this.platforms) {
        this.platforms.add(platform);
      }
    });
    
    // Create treats, bad items, and squirrels based on level config
    this.createTreats(this.currentLevel, levelWidth, height);
    this.createBadItems(this.currentLevel, levelWidth, height);
    this.createSquirrels(this.currentLevel, levelWidth, height);
    
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
    
    // Camera follow player with bounds for extended level
    this.cameras.main.setBounds(0, 0, levelWidth, height);
    
    // Initialize auto-scroll system based on level config
    this.scrollSpeed = this.levelConfig.scrollSpeed;
    
    if (this.scrollSpeed > 0) {
      // For auto-scroll levels: DON'T follow dog - camera scrolls independently!
      // Dog must keep up with camera or fall into danger zone
      console.log('Auto-scroll enabled at ' + this.scrollSpeed + ' px/sec');
    } else {
      // For non-scroll levels: Normal follow
      this.cameras.main.startFollow(this.dog!.getSprite(), false, 0.1, 0.1);
    }
    
    // Create danger zone visual if enabled
    if (this.levelConfig.dangerZoneEnabled) {
      this.createDangerZone();
    }
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
  
  private createTreats(_level: number, levelWidth: number, height: number) {
    // TODO: Use level parameter for level-specific treat placement
    // Extended level with MANY more treats! (~60 treats for longer gameplay)
    // Mix of sizes: small (1pt), medium (2pt), large (3pt)
    const treatPositions = [
      // Section 1: Starting area (0-800)
      { x: 100, y: height - 100, size: 1 },
      { x: 200, y: height - 200, size: 2 },
      { x: 280, y: height - 200, size: 1 },
      { x: 380, y: height - 450, size: 3 }, // High platform reward!
      { x: 500, y: height - 330, size: 2 },
      { x: 580, y: height - 330, size: 2 },
      { x: 650, y: height - 100, size: 1 },
      { x: 700, y: height - 230, size: 2 },
      { x: 780, y: height - 100, size: 1 },
      
      // Section 2: Mid-level (800-1600)
      { x: 850, y: height - 100, size: 1 },
      { x: 920, y: height - 250, size: 2 },
      { x: 1000, y: height - 250, size: 1 },
      { x: 1120, y: height - 400, size: 3 }, // High platform
      { x: 1200, y: height - 400, size: 2 },
      { x: 1300, y: height - 100, size: 1 },
      { x: 1380, y: height - 300, size: 2 },
      { x: 1450, y: height - 300, size: 1 },
      { x: 1550, y: height - 230, size: 2 },
      
      // Section 3: Long stretch (1600-2400)
      { x: 1700, y: height - 100, size: 1 },
      { x: 1770, y: height - 370, size: 3 },
      { x: 1850, y: height - 370, size: 2 },
      { x: 1970, y: height - 470, size: 3 }, // Very high!
      { x: 2050, y: height - 470, size: 3 },
      { x: 2150, y: height - 100, size: 1 },
      { x: 2220, y: height - 270, size: 2 },
      { x: 2300, y: height - 270, size: 1 },
      { x: 2420, y: height - 100, size: 1 },
      
      // Section 4: Challenge zone (2400-3200)
      { x: 2550, y: height - 100, size: 1 },
      { x: 2620, y: height - 330, size: 2 },
      { x: 2700, y: height - 330, size: 1 },
      { x: 2870, y: height - 430, size: 3 },
      { x: 2950, y: height - 430, size: 2 },
      { x: 3000, y: height - 100, size: 1 },
      { x: 3070, y: height - 250, size: 2 },
      { x: 3150, y: height - 250, size: 1 },
      { x: 3280, y: height - 370, size: 3 },
      
      // Section 5: Final stretch! (3200-4000)
      { x: 3400, y: height - 100, size: 1 },
      { x: 3520, y: height - 300, size: 2 },
      { x: 3600, y: height - 300, size: 2 },
      { x: 3680, y: height - 100, size: 1 },
      { x: 3770, y: height - 230, size: 3 },
      { x: 3850, y: height - 230, size: 2 },
      { x: 3920, y: height - 100, size: 1 },
      { x: levelWidth - 80, y: height - 350, size: 3 }, // Victory treat!
    ];
    
    treatPositions.forEach(pos => {
      const treat = new Treat(this, pos.x, pos.y, pos.size);
      this.treats.push(treat);
    });
  }
  
  private createBadItems(_level: number, levelWidth: number, height: number) {
    // TODO: Use level parameter for level-specific bad item placement
    // Poo hazards across extended level (~28 hazards, reduced by 20%)
    const staticBadItemPositions = [
      // Section 1 (0-800)
      { x: 230, y: height - 200, type: 'poo' as const },
      { x: 400, y: height - 100, type: 'poo' as const },
      { x: 460, y: height - 330, type: 'poo' as const },
      { x: 750, y: height - 230, type: 'poo' as const },
      
      // Section 2 (800-1600)
      { x: 900, y: height - 100, type: 'poo' as const },
      { x: 1150, y: height - 400, type: 'poo' as const },
      { x: 1250, y: height - 100, type: 'poo' as const },
      { x: 1400, y: height - 300, type: 'poo' as const },
      { x: 1600, y: height - 230, type: 'poo' as const },
      
      // Section 3 (1600-2400)
      { x: 1650, y: height - 100, type: 'poo' as const },
      { x: 1800, y: height - 370, type: 'poo' as const },
      { x: 2000, y: height - 470, type: 'poo' as const },
      { x: 2100, y: height - 100, type: 'poo' as const },
      { x: 2250, y: height - 270, type: 'poo' as const },
      
      // Section 4 (2400-3200)
      { x: 2500, y: height - 100, type: 'poo' as const },
      { x: 2660, y: height - 330, type: 'poo' as const },
      { x: 2900, y: height - 430, type: 'poo' as const },
      { x: 3020, y: height - 100, type: 'poo' as const },
      { x: 3100, y: height - 250, type: 'poo' as const },
      { x: 3320, y: height - 370, type: 'poo' as const },
      
      // Section 5 (3200-4000) - Final gauntlet!
      { x: 3480, y: height - 100, type: 'poo' as const },
      { x: 3560, y: height - 300, type: 'poo' as const },
      { x: 3650, y: height - 100, type: 'poo' as const },
      { x: 3800, y: height - 230, type: 'poo' as const },
      { x: 3900, y: height - 100, type: 'poo' as const },
      { x: levelWidth - 150, y: height - 100, type: 'poo' as const },
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
    this.startFallingBadItems(levelWidth);
  }
  
  private createSquirrels(_level: number, _levelWidth: number, height: number) {
    // MORE squirrels across extended level for distractions! (~15 squirrels)
    const squirrelPositions = [
      // Section 1 (0-800)
      { x: 140, y: height - 180 },
      { x: 320, y: height - 430 },
      { x: 560, y: height - 310 },
      { x: 680, y: height - 210 },
      
      // Section 2 (800-1600)
      { x: 950, y: height - 230 },
      { x: 1180, y: height - 380 },
      { x: 1420, y: height - 280 },
      
      // Section 3 (1600-2400)
      { x: 1800, y: height - 350 },
      { x: 2020, y: height - 450 },
      { x: 2280, y: height - 250 },
      
      // Section 4 (2400-3200)
      { x: 2700, y: height - 310 },
      { x: 2920, y: height - 410 },
      { x: 3120, y: height - 230 },
      
      // Section 5 (3200-4000)
      { x: 3580, y: height - 280 },
      { x: 3880, y: height - 210 },
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

  private getPlatformLayout(level: number, height: number) {
    const layouts: Record<number, Array<{x: number, y: number, w: number, h: number, color: number}>> = {
      // LEVEL 1: Tutorial - Safe, forgiving jumps, wide platforms
      1: [
        // Section 1 (0-800) - Easy introduction
        { x: 200, y: height - 150, w: 200, h: 32, color: 0xD2691E },
        { x: 500, y: height - 280, w: 200, h: 32, color: 0xCD853F },
        { x: 700, y: height - 180, w: 120, h: 32, color: 0xD2691E },
        { x: 350, y: height - 400, w: 150, h: 32, color: 0xCD853F },
        
        // Section 2 (800-1600)
        { x: 900, y: height - 200, w: 180, h: 32, color: 0xD2691E },
        { x: 1100, y: height - 350, w: 200, h: 32, color: 0xCD853F },
        { x: 1350, y: height - 250, w: 150, h: 32, color: 0xD2691E },
        { x: 1550, y: height - 180, w: 140, h: 32, color: 0xCD853F },
        
        // Section 3 (1600-2400)
        { x: 1750, y: height - 320, w: 160, h: 32, color: 0xD2691E },
        { x: 1950, y: height - 420, w: 180, h: 32, color: 0xCD853F },
        { x: 2200, y: height - 220, w: 200, h: 32, color: 0xD2691E },
        { x: 2450, y: height - 150, w: 120, h: 32, color: 0xCD853F },
        
        // Section 4 (2400-3200)
        { x: 2600, y: height - 280, w: 180, h: 32, color: 0xD2691E },
        { x: 2850, y: height - 380, w: 160, h: 32, color: 0xCD853F },
        { x: 3050, y: height - 200, w: 200, h: 32, color: 0xD2691E },
        { x: 3300, y: height - 320, w: 150, h: 32, color: 0xCD853F },
        
        // Section 5 (3200-4000) - Final stretch!
        { x: 3500, y: height - 250, w: 180, h: 32, color: 0xD2691E },
        { x: 3750, y: height - 180, w: 200, h: 32, color: 0xCD853F },
        { x: 3950, y: height - 300, w: 160, h: 32, color: 0xD2691E },
      ],
      
      // LEVEL 2: Challenge - Auto-scroll pressure, wider gaps, narrower platforms
      2: [
        // Section 1 (0-1000) - Gradual intro to pressure
        { x: 250, y: height - 180, w: 160, h: 32, color: 0xD2691E },
        { x: 520, y: height - 300, w: 140, h: 32, color: 0xCD853F },
        { x: 800, y: height - 200, w: 120, h: 32, color: 0xD2691E },
        { x: 450, y: height - 420, w: 130, h: 32, color: 0xCD853F },
        
        // Section 2 (1000-2000) - Wider gaps, keep moving!
        { x: 1100, y: height - 250, w: 140, h: 32, color: 0xD2691E },
        { x: 1380, y: height - 380, w: 120, h: 32, color: 0xCD853F },
        { x: 1600, y: height - 220, w: 150, h: 32, color: 0xD2691E },
        { x: 1850, y: height - 350, w: 130, h: 32, color: 0xCD853F },
        
        // Section 3 (2000-3000) - Vertical challenges
        { x: 2100, y: height - 450, w: 120, h: 32, color: 0xD2691E },
        { x: 2320, y: height - 280, w: 140, h: 32, color: 0xCD853F },
        { x: 2580, y: height - 400, w: 130, h: 32, color: 0xD2691E },
        { x: 2820, y: height - 220, w: 150, h: 32, color: 0xCD853F },
        
        // Section 4 (3000-4000) - Quick succession
        { x: 3050, y: height - 300, w: 120, h: 32, color: 0xD2691E },
        { x: 3250, y: height - 420, w: 130, h: 32, color: 0xCD853F },
        { x: 3470, y: height - 250, w: 140, h: 32, color: 0xD2691E },
        { x: 3700, y: height - 370, w: 120, h: 32, color: 0xCD853F },
        
        // Section 5 (4000-5000) - Endurance test        { x: 4000, y: height - 280, w: 130, h: 32, color: 0xD2691E },
        { x: 4220, y: height - 410, w: 120, h: 32, color: 0xCD853F },
        { x: 4430, y: height - 230, w: 150, h: 32, color: 0xD2691E },
        { x: 4680, y: height - 350, w: 130, h: 32, color: 0xCD853F },
        
        // Section 6 (5000-6000) - Final sprint
        { x: 4950, y: height - 450, w: 120, h: 32, color: 0xD2691E },
        { x: 5180, y: height - 270, w: 140, h: 32, color: 0xCD853F },
        { x: 5420, y: height - 380, w: 130, h: 32, color: 0xD2691E },
        { x: 5670, y: height - 220, w: 150, h: 32, color: 0xCD853F },
        { x: 5900, y: height - 340, w: 140, h: 32, color: 0xD2691E },
      ],
      
      // LEVEL 3: Expert - Fast auto-scroll, precise jumps, narrow platforms, extreme variation
      3: [
        // Section 1 (0-1000) - Immediate pressure
        { x: 200, y: height - 220, w: 110, h: 32, color: 0xD2691E },
        { x: 420, y: height - 380, w: 100, h: 32, color: 0xCD853F },
        { x: 630, y: height - 250, w: 120, h: 32, color: 0xD2691E },
        { x: 850, y: height - 450, w: 100, h: 32, color: 0xCD853F },
        
        // Section 2 (1000-2000) - Precision jumps
        { x: 1050, y: height - 300, w: 110, h: 32, color: 0xD2691E },
        { x: 1250, y: height - 470, w: 100, h: 32, color: 0xCD853F },
        { x: 1450, y: height - 240, w: 120, h: 32, color: 0xD2691E },
        { x: 1660, y: height - 400, w: 100, h: 32, color: 0xCD853F },
        { x: 1860, y: height - 280, w: 110, h: 32, color: 0xD2691E },
        
        // Section 3 (2000-3000) - Rapid height changes
        { x: 2080, y: height - 450, w: 100, h: 32, color: 0xCD853F },
        { x: 2270, y: height - 220, w: 120, h: 32, color: 0xD2691E },
        { x: 2480, y: height - 480, w: 100, h: 32, color: 0xCD853F },
        { x: 2680, y: height - 260, w: 110, h: 32, color: 0xD2691E },
        { x: 2880, y: height - 420, w: 100, h: 32, color: 0xCD853F },
        
        // Section 4 (3000-4000) - Extreme challenges
        { x: 3100, y: height - 320, w: 100, h: 32, color: 0xD2691E },
        { x: 3290, y: height - 490, w: 100, h: 32, color: 0xCD853F },
        { x: 3480, y: height - 240, w: 110, h: 32, color: 0xD2691E },
        { x: 3680, y: height - 440, w: 100, h: 32, color: 0xCD853F },
        { x: 3870, y: height - 290, w: 120, h: 32, color: 0xD2691E },
        
        // Section 5 (4000-5000) - No mercy
        { x: 4090, y: height - 460, w: 100, h: 32, color: 0xCD853F },
        { x: 4280, y: height - 250, w: 110, h: 32, color: 0xD2691E },
        { x: 4470, y: height - 420, w: 100, h: 32, color: 0xCD853F },
        { x: 4660, y: height - 280, w: 120, h: 32, color: 0xD2691E },
        { x: 4860, y: height - 480, w: 100, h: 32, color: 0xCD853F },
        
        // Section 6 (5000-6000) - Brutal endurance
        { x: 5070, y: height - 310, w: 110, h: 32, color: 0xD2691E },
        { x: 5270, y: height - 470, w: 100, h: 32, color: 0xCD853F },
        { x: 5470, y: height - 260, w: 120, h: 32, color: 0xD2691E },
        { x: 5680, y: height - 430, w: 100, h: 32, color: 0xCD853F },
        { x: 5880, y: height - 300, w: 110, h: 32, color: 0xD2691E },
        
        // Section 7 (6000-7000) - Almost there
        { x: 6100, y: height - 450, w: 100, h: 32, color: 0xCD853F },
        { x: 6300, y: height - 240, w: 120, h: 32, color: 0xD2691E },
        { x: 6510, y: height - 400, w: 100, h: 32, color: 0xCD853F },
        { x: 6710, y: height - 270, w: 110, h: 32, color: 0xD2691E },
        { x: 6910, y: height - 460, w: 100, h: 32, color: 0xCD853F },
        
        // Section 8 (7000-8000) - Final gauntlet!
        { x: 7120, y: height - 320, w: 110, h: 32, color: 0xD2691E },
        { x: 7330, y: height - 480, w: 100, h: 32, color: 0xCD853F },
        { x: 7540, y: height - 260, w: 120, h: 32, color: 0xD2691E },
        { x: 7750, y: height - 420, w: 100, h: 32, color: 0xCD853F },
        { x: 7950, y: height - 300, w: 130, h: 32, color: 0xD2691E }, // Wider final platform!
      ]
    };
    
    return layouts[level] || layouts[1];
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
  
  private createDangerZone() {
    // Create danger zone visual (red gradient on left edge)
    this.dangerZoneGraphics = this.add.graphics();
    this.dangerZoneGraphics.setDepth(1000); // Always on top
    this.dangerZoneGraphics.setScrollFactor(0); // Fixed to camera
    this.updateDangerZoneVisual();
  }
  
  private updateDangerZoneVisual() {
    if (!this.dangerZoneGraphics) return;
    
    this.dangerZoneGraphics.clear();
    
    const dangerWidth = 80; // Width of danger zone gradient
    const height = this.cameras.main.height;
    
    // Draw red gradient from left edge
    for (let i = 0; i < dangerWidth; i++) {
      const alpha = 1 - (i / dangerWidth); // Fade from 1 to 0
      this.dangerZoneGraphics.fillStyle(0xFF0000, alpha * 0.7);
      this.dangerZoneGraphics.fillRect(i, 0, 1, height);
    }
    
    // Add warning text
    const warningText = this.add.text(20, height / 2, '⚠️ DANGER ZONE ⚠️', {
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    });
    warningText.setScrollFactor(0);
    warningText.setDepth(1001);
    warningText.setRotation(-Math.PI / 2); // Vertical text
  }
  
  private updateAutoScroll(delta: number) {
    // Move camera right at scroll speed
    const scrollAmount = (this.scrollSpeed * delta) / 1000;
    this.dangerZoneX += scrollAmount;
    
    // Force camera to scroll right by moving its position
    // This overrides the follow behavior to create constant forward pressure
    const camera = this.cameras.main;
    const targetScrollX = camera.scrollX + scrollAmount;
    const maxScrollX = camera.worldView.width - camera.width;
    
    // Apply the scroll (capped at world bounds)
    camera.scrollX = Math.min(targetScrollX, maxScrollX);
    
    // If dog is too far to the left of camera, it will get caught by danger zone!
  }
  
  private checkDangerZoneCollision(time: number) {
    if (!this.dog) return;
    
    const dogX = this.dog.getSprite().x;
    const cameraLeftEdge = this.cameras.main.scrollX;
    const dangerZoneRight = cameraLeftEdge + 80; // Danger zone width
    
    // Check if dog is in danger zone
    if (dogX < dangerZoneRight) {
      // Apply damage at intervals
      if (time - this.dangerZoneDamageTimer >= this.DANGER_ZONE_DAMAGE_INTERVAL) {
        this.dangerZoneDamageTimer = time;
        
        // Take danger zone damage
        const damageAmount = this.levelConfig.dangerZoneDamagePerSecond;
        const health = this.uiScene?.takeDamage(damageAmount) || 0;
        
        // Visual feedback
        this.cameras.main.shake(100, 0.005);
        
        // Check lose condition
        if (health <= 0 && !this.gameOver) {
          this.triggerGameOver();
        }
      }
    }
  }

  update(time: number, delta: number) {
    // Don't update if paused or game over
    if (this.isPaused || this.gameOver) return;
    
    // Auto-scroll camera if enabled
    if (this.scrollSpeed > 0) {
      this.updateAutoScroll(delta);
    }
    
    // Check danger zone collision if enabled
    if (this.levelConfig.dangerZoneEnabled && this.dog) {
      this.checkDangerZoneCollision(time);
    }
    
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

