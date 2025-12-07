import Phaser from 'phaser';
import { LEVEL_CONFIGS } from '../types/LevelConfig';

export class LevelSelectScene extends Phaser.Scene {
  private unlockedLevels: number = 1; // Start with only Level 1 unlocked
  
  constructor() {
    super('LevelSelectScene');
  }
  
  init() {
    // TEMP: Unlock all levels for testing
    this.unlockedLevels = 3;
    localStorage.setItem('unlockedLevels', '3');
    
    // Load unlocked levels from localStorage
    // const saved = localStorage.getItem('unlockedLevels');
    // if (saved) {
    //   this.unlockedLevels = parseInt(saved, 10);
    // } else {
    //   this.unlockedLevels = 1; // Default: only Level 1 unlocked
    // }
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Background - vibrant gradient
    this.cameras.main.setBackgroundColor('#FF7043');
    const sky = this.add.graphics();
    sky.fillGradientStyle(0xFF7043, 0xFF7043, 0xEF5350, 0xEF5350, 1);
    sky.fillRect(0, 0, width, height);
    
    // Title
    this.add.text(width / 2, 60, 'Select Level', {
      fontSize: '40px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    // Create level cards
    const cardSpacing = 280;
    const startX = (width - (cardSpacing * 2)) / 2;
    
    for (let i = 1; i <= 3; i++) {
      const levelConfig = LEVEL_CONFIGS[i];
      const cardX = startX + (i - 1) * cardSpacing;
      const cardY = height / 2 + 20;
      
      this.createLevelCard(i, levelConfig.name, levelConfig.description, cardX, cardY, i <= this.unlockedLevels);
    }
    
    // Instructions
    const instructionText = this.add.text(width / 2, height - 60, 'Click a level or press 1/2/3', {
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
    this.input.keyboard?.on('keydown-ONE', () => this.startLevel(1));
    this.input.keyboard?.on('keydown-TWO', () => this.startLevel(2));
    this.input.keyboard?.on('keydown-THREE', () => this.startLevel(3));
    
    // DEBUG MODE: Press L to unlock all levels for testing
    this.input.keyboard?.on('keydown-L', () => {
      this.unlockedLevels = 3;
      localStorage.setItem('unlockedLevels', '3');
      this.scene.restart(); // Refresh the scene to show unlocked levels
      
      // Visual feedback
      const debugText = this.add.text(width / 2, height - 100, '🔓 ALL LEVELS UNLOCKED (Debug Mode)', {
        fontSize: '20px',
        color: '#FFD700',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4
      }).setOrigin(0.5);
      
      this.tweens.add({
        targets: debugText,
        alpha: 0,
        duration: 2000,
        delay: 1000,
        onComplete: () => debugText.destroy()
      });
    });
  }
  
  private createLevelCard(levelNumber: number, name: string, description: string, x: number, y: number, unlocked: boolean) {
    const cardWidth = 240;
    const cardHeight = 280;
    
    // Card background
    const card = this.add.rectangle(x, y, cardWidth, cardHeight, unlocked ? 0xFFFFFF : 0x666666, 0.9);
    card.setStrokeStyle(4, unlocked ? 0x4CAF50 : 0x333333);
    
    if (unlocked) {
      card.setInteractive({ useHandCursor: true });
      
      // Hover effect
      card.on('pointerover', () => {
        card.setFillStyle(0xFFFFE0); // Light yellow on hover
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
        this.startLevel(levelNumber);
      });
    }
    
    // Level number (big)
    this.add.text(x, y - 80, `${levelNumber}`, {
      fontSize: '64px',
      color: unlocked ? '#4CAF50' : '#999999',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    // Level name
    this.add.text(x, y - 10, name, {
      fontSize: '16px',
      color: unlocked ? '#000000' : '#666666',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: cardWidth - 20 }
    }).setOrigin(0.5);
    
    // Description
    this.add.text(x, y + 30, description, {
      fontSize: '14px',
      color: unlocked ? '#333333' : '#888888',
      align: 'center',
      wordWrap: { width: cardWidth - 20 }
    }).setOrigin(0.5);
    
    // Health system badge
    const levelConfig = LEVEL_CONFIGS[levelNumber];
    const healthBadge = levelConfig.healthDisplay === 'hearts' ? '❤️❤️❤️' : '📊 Health Bar';
    this.add.text(x, y + 70, healthBadge, {
      fontSize: '14px',
      color: unlocked ? '#4CAF50' : '#666666',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Auto-scroll indicator
    if (levelConfig.autoScroll) {
      this.add.text(x, y + 95, '⚡ Auto-Scroll', {
        fontSize: '12px',
        color: unlocked ? '#FF5722' : '#666666',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }
    
    // Locked overlay
    if (!unlocked) {
      this.add.text(x, y + 110, '🔒 LOCKED', {
        fontSize: '16px',
        color: '#999999',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }
  }
  
  private startLevel(levelNumber: number) {
    if (levelNumber > this.unlockedLevels) {
      // Flash locked indicator
      this.cameras.main.flash(200, 255, 0, 0);
      return;
    }
    
    // Store selected level in registry for GameScene to read
    this.registry.set('selectedLevel', levelNumber);
    
    // Transition to breed select
    this.cameras.main.fadeOut(300);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('BreedSelectScene');
    });
  }
}

