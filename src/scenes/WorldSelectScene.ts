import Phaser from 'phaser';

interface WorldInfo {
  number: number;
  name: string;
  theme: string;
  color: number;
  icon: string;
  unlockLevel: number; // Which level unlocks this world
  levelRange: { start: number; end: number };
  breedUnlock: string;
}

export class WorldSelectScene extends Phaser.Scene {
  private unlockedWorlds: number = 1;
  
  private worlds: WorldInfo[] = [
    {
      number: 1,
      name: 'Backyard Escape',
      theme: 'Escape from your owner!',
      color: 0x8BC34A, // Green
      icon: '🏡',
      unlockLevel: 0, // Always unlocked
      levelRange: { start: 1, end: 5 },
      breedUnlock: 'Chihuahua'
    },
    {
      number: 2,
      name: 'Park Adventure',
      theme: 'Run through the park!',
      color: 0x4CAF50, // Park green
      icon: '🌳',
      unlockLevel: 5, // Unlock after beating Level 5
      levelRange: { start: 6, end: 10 },
      breedUnlock: 'Corgi'
    },
    {
      number: 3,
      name: 'Beach Boardwalk',
      theme: 'Chase treats on the beach!',
      color: 0xFFB74D, // Sandy orange
      icon: '🏖️',
      unlockLevel: 10, // Unlock after beating Level 10
      levelRange: { start: 11, end: 15 },
      breedUnlock: 'Husky'
    },
    {
      number: 4,
      name: 'City Streets',
      theme: 'Urban escape to home!',
      color: 0x78909C, // Urban gray
      icon: '🏙️',
      unlockLevel: 15, // Unlock after beating Level 15
      levelRange: { start: 16, end: 20 },
      breedUnlock: 'Endless Mode'
    }
  ];
  
  constructor() {
    super('WorldSelectScene');
  }
  
  init() {
    // Calculate which worlds are unlocked based on level progression
    const unlockedLevels = parseInt(window.localStorage.getItem('unlockedLevels') || '1', 10);
    
    if (unlockedLevels >= 15) {
      this.unlockedWorlds = 4; // All worlds
    } else if (unlockedLevels >= 10) {
      this.unlockedWorlds = 3; // Worlds 1-3
    } else if (unlockedLevels >= 5) {
      this.unlockedWorlds = 2; // Worlds 1-2
    } else {
      this.unlockedWorlds = 1; // Only World 1
    }
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Background gradient
    this.cameras.main.setBackgroundColor('#FF7043');
    const sky = this.add.graphics();
    sky.fillGradientStyle(0xFF7043, 0xFF7043, 0xEF5350, 0xEF5350, 1);
    sky.fillRect(0, 0, width, height);
    
    // Title
    this.add.text(width / 2, 50, 'SELECT WORLD', {
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    // Create world cards (4 across)
    const cardSpacing = 200;
    const totalWidth = cardSpacing * 3; // 4 cards, 3 gaps
    const startX = (width - totalWidth) / 2;
    const cardY = height / 2 + 20;
    
    this.worlds.forEach((world, index) => {
      const cardX = startX + (index * cardSpacing);
      const unlocked = world.number <= this.unlockedWorlds;
      
      this.createWorldCard(world, cardX, cardY, unlocked);
    });
    
    // Instructions
    const instructionText = this.add.text(width / 2, height - 60, 'Select a world to begin your adventure!', {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Blink animation
    this.tweens.add({
      targets: instructionText,
      alpha: 0.5,
      duration: 800,
      yoyo: true,
      repeat: -1
    });
    
    // Keyboard shortcuts
    this.input.keyboard?.on('keydown-ONE', () => this.selectWorld(1));
    this.input.keyboard?.on('keydown-TWO', () => this.selectWorld(2));
    this.input.keyboard?.on('keydown-THREE', () => this.selectWorld(3));
    this.input.keyboard?.on('keydown-FOUR', () => this.selectWorld(4));
  }
  
  private createWorldCard(world: WorldInfo, x: number, y: number, unlocked: boolean) {
    const cardWidth = 180;
    const cardHeight = 320;
    
    // Get completion stats for this world
    const stats = this.getWorldStats(world);
    
    // Card background
    const card = this.add.rectangle(x, y, cardWidth, cardHeight, unlocked ? 0xFFFFFF : 0x555555, 0.9);
    card.setStrokeStyle(4, unlocked ? world.color : 0x333333);
    
    if (unlocked) {
      card.setInteractive({ useHandCursor: true });
      
      // Hover effect
      card.on('pointerover', () => {
        card.setFillStyle(0xFFFFE0);
        this.tweens.add({
          targets: card,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 200,
          ease: 'Back.easeOut'
        });
      });
      
      card.on('pointerout', () => {
        card.setFillStyle(0xFFFFFF);
        this.tweens.add({
          targets: card,
          scaleX: 1,
          scaleY: 1,
          duration: 200
        });
      });
      
      card.on('pointerdown', () => {
        this.selectWorld(world.number);
      });
    }
    
    // World icon (big emoji)
    this.add.text(x, y - 120, world.icon, {
      fontSize: '64px'
    }).setOrigin(0.5);
    
    // World number
    this.add.text(x, y - 70, `WORLD ${world.number}`, {
      fontSize: '20px',
      color: unlocked ? '#000000' : '#888888',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // World name
    this.add.text(x, y - 45, world.name, {
      fontSize: '16px',
      color: unlocked ? '#333333' : '#666666',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: cardWidth - 20 }
    }).setOrigin(0.5);
    
    // Theme description
    this.add.text(x, y - 15, world.theme, {
      fontSize: '12px',
      color: unlocked ? '#666666' : '#555555',
      align: 'center',
      wordWrap: { width: cardWidth - 20 }
    }).setOrigin(0.5);
    
    if (unlocked) {
      // Star rating (if played)
      if (stats.totalStars > 0) {
        const starText = '⭐'.repeat(Math.min(3, Math.ceil(stats.averageStars)));
        this.add.text(x, y + 20, starText, {
          fontSize: '24px'
        }).setOrigin(0.5);
        
        this.add.text(x, y + 45, `${stats.totalStars}★ Total`, {
          fontSize: '14px',
          color: '#FFD700',
          fontStyle: 'bold'
        }).setOrigin(0.5);
      }
      
      // Completion status
      const completionText = `${stats.completedLevels}/${world.levelRange.end - world.levelRange.start + 1} Levels`;
      this.add.text(x, y + 70, completionText, {
        fontSize: '14px',
        color: stats.completedLevels === 5 ? '#4CAF50' : '#666666',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      
      // Completion checkmark
      if (stats.completedLevels === 5) {
        this.add.text(x, y + 90, '✓ Complete!', {
          fontSize: '14px',
          color: '#4CAF50',
          fontStyle: 'bold'
        }).setOrigin(0.5);
      }
      
      // Breed unlock indicator
      this.add.text(x, y + 115, `🏆 ${world.breedUnlock}`, {
        fontSize: '12px',
        color: stats.completedLevels === 5 ? '#FFD700' : '#999999'
      }).setOrigin(0.5);
      
      // Play button
      const playButton = this.add.text(x, y + 140, 'PLAY', {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: world.color.toString(16),
        padding: { x: 20, y: 8 },
        fontStyle: 'bold'
      }).setOrigin(0.5).setInteractive();
      
      playButton.on('pointerover', () => playButton.setScale(1.1));
      playButton.on('pointerout', () => playButton.setScale(1));
      playButton.on('pointerdown', () => this.selectWorld(world.number));
      
    } else {
      // Locked overlay
      this.add.text(x, y + 30, '🔒', {
        fontSize: '48px'
      }).setOrigin(0.5);
      
      this.add.text(x, y + 80, 'LOCKED', {
        fontSize: '18px',
        color: '#999999',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      
      // Unlock requirement
      const unlockText = world.unlockLevel > 0 
        ? `Beat Level ${world.unlockLevel}\nto unlock!`
        : '';
      
      this.add.text(x, y + 110, unlockText, {
        fontSize: '12px',
        color: '#888888',
        align: 'center'
      }).setOrigin(0.5);
    }
  }
  
  private getWorldStats(world: WorldInfo): { completedLevels: number; totalStars: number; averageStars: number } {
    let completedLevels = 0;
    let totalStars = 0;
    
    const unlockedLevels = parseInt(window.localStorage.getItem('unlockedLevels') || '1', 10);
    
    // Check each level in this world
    for (let level = world.levelRange.start; level <= world.levelRange.end; level++) {
      // Level is completed if next level is unlocked
      if (level < unlockedLevels || (level === unlockedLevels && level <= 5)) {
        completedLevels++;
      }
      
      // Get stars for this level
      const highScoreKey = `highScore_level_${level}`;
      const saved = window.localStorage.getItem(highScoreKey);
      if (saved) {
        const data = JSON.parse(saved);
        totalStars += data.stars || 0;
      }
    }
    
    const averageStars = completedLevels > 0 ? totalStars / completedLevels : 0;
    
    return { completedLevels, totalStars, averageStars };
  }
  
  private selectWorld(worldNumber: number) {
    if (worldNumber > this.unlockedWorlds) {
      // Flash locked indicator
      this.cameras.main.flash(200, 255, 0, 0);
      return;
    }
    
    // Store selected world in registry
    this.registry.set('selectedWorld', worldNumber);
    
    // Transition to level select for this world
    this.cameras.main.fadeOut(300);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('LevelSelectScene');
    });
  }
}

