import Phaser from 'phaser';
import { LEVEL_CONFIGS } from '../types/LevelConfig';

export class LevelSelectScene extends Phaser.Scene {
  private unlockedLevels: number = 1; // Start with only Level 1 unlocked
  
  constructor() {
    super('LevelSelectScene');
  }
  
  init() {
    // Load unlocked levels from localStorage
    const saved = window.localStorage.getItem('unlockedLevels');
    if (saved) {
      this.unlockedLevels = parseInt(saved, 10);
    } else {
      this.unlockedLevels = 1; // Default: only Level 1 unlocked
    }
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
    
    // Create level cards (5 levels in World 1)
    const cardSpacing = 160;
    const cardsPerRow = 5;
    const startX = (width - (cardSpacing * (cardsPerRow - 1))) / 2;
    
    for (let i = 1; i <= 5; i++) {
      const levelConfig = LEVEL_CONFIGS[i];
      const cardX = startX + (i - 1) * cardSpacing;
      const cardY = height / 2 + 20;
      
      this.createLevelCard(i, levelConfig.name, levelConfig.description, cardX, cardY, i <= this.unlockedLevels);
    }
    
    // Instructions
    const instructionText = this.add.text(width / 2, height - 60, 'Tap a level or press 1/2/3/4/5', {
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
    this.input.keyboard?.on('keydown-FOUR', () => this.startLevel(4));
    this.input.keyboard?.on('keydown-FIVE', () => this.startLevel(5));
    
    // DEBUG MODE: Press L to unlock all levels for testing
    this.input.keyboard?.on('keydown-L', () => {
      this.unlockedLevels = 5;
      window.localStorage.setItem('unlockedLevels', '5');
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
    const cardWidth = 140;
    const cardHeight = 300; // Increased for stars + high score
    
    // Get high score data
    const highScoreData = this.getHighScore(levelNumber);
    const hasPlayed = highScoreData.score > 0;
    
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
    this.add.text(x, y - 120, `${levelNumber}`, {
      fontSize: '56px',
      color: unlocked ? '#4CAF50' : '#999999',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    // Star rating (if played)
    if (unlocked && hasPlayed) {
      this.showStars(highScoreData.stars, x, y - 50);
    }
    
    // Level name
    this.add.text(x, y - 15, name, {
      fontSize: '14px',
      color: unlocked ? '#000000' : '#666666',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: cardWidth - 20 }
    }).setOrigin(0.5);
    
    // Description
    this.add.text(x, y + 20, description, {
      fontSize: '11px',
      color: unlocked ? '#333333' : '#888888',
      align: 'center',
      wordWrap: { width: cardWidth - 20 },
      lineSpacing: 2
    }).setOrigin(0.5);
    
    // High score (if played)
    if (unlocked && hasPlayed) {
      this.add.text(x, y + 65, `Best: ${highScoreData.score}`, {
        fontSize: '12px',
        color: '#FFD700',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      
      // Best time
      const minutes = Math.floor(highScoreData.time / 60);
      const seconds = Math.floor(highScoreData.time % 60);
      const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      this.add.text(x, y + 82, `⏱️ ${timeString}`, {
        fontSize: '11px',
        color: '#666666'
      }).setOrigin(0.5);
    }
    
    // Health system badge
    const levelConfig = LEVEL_CONFIGS[levelNumber];
    const healthBadge = levelConfig.healthDisplay === 'hearts' ? '❤️❤️❤️' : '📊 HP';
    this.add.text(x, y + 105, healthBadge, {
      fontSize: '12px',
      color: unlocked ? '#4CAF50' : '#666666',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Auto-scroll indicator
    if (levelConfig.autoScroll) {
      this.add.text(x, y + 125, '⚡ Auto-Scroll', {
        fontSize: '11px',
        color: unlocked ? '#FF5722' : '#666666',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }
    
    // Locked overlay
    if (!unlocked) {
      this.add.text(x, y + 140, '🔒 LOCKED', {
        fontSize: '14px',
        color: '#999999',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }
  }
  
  private showStars(count: number, x: number, y: number) {
    const starSpacing = 35;
    const startX = x - starSpacing;
    
    for (let i = 0; i < 3; i++) {
      const starX = startX + i * starSpacing;
      const isFilled = i < count;
      const starColor = isFilled ? 0xFFD700 : 0x333333;
      const starSize = isFilled ? 12 : 10;
      
      this.add.star(starX, y, 5, starSize * 0.6, starSize, starColor, 1);
    }
  }
  
  private getHighScore(level: number): { score: number; stars: number; time: number } {
    const key = `highScore_level_${level}`;
    const saved = window.localStorage.getItem(key);
    
    if (saved) {
      return JSON.parse(saved);
    }
    
    return { score: 0, stars: 0, time: 999 };
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

