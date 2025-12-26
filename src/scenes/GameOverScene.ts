import Phaser from 'phaser';
import { HighScoreManager } from '../managers/HighScoreManager';
import { getCurrentLevelConfig } from '../types/LevelConfig';

interface LevelStats {
  score: number;
  time: number;
  treatsCollected: number;
  totalTreats: number;
  healthRemaining: number;
  maxHealth: number;
  perfectRun: boolean;
  treatPoints: number;
  healthBonus: number;
  perfectBonus: number;
  timeBonus: number;
}

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Get current level and stats (if available)
    const currentLevel = this.registry.get('selectedLevel') as number || 1;
    const stats = this.registry.get('levelStats') as LevelStats | undefined;
    const config = getCurrentLevelConfig(currentLevel);
    
    // Check if player achieved a high score despite game over
    if (stats) {
      const isLevelHighScore = HighScoreManager.isHighScore(currentLevel, stats.score);
      const isGlobalHighScore = HighScoreManager.isGlobalHighScore(stats.score);
      
      if (isLevelHighScore || isGlobalHighScore) {
        // Calculate stars (will be 0 or 1 since they didn't complete)
        const stars = this.calculateStars(stats, config);
        
        this.scene.pause('GameOverScene');
        this.scene.launch('NameEntryScene', {
          stats,
          level: currentLevel,
          stars,
          isLevelHighScore,
          isGlobalHighScore,
          fromGameOver: true
        });
        return; // Don't show the rest yet
      }
    }
    
    // Semi-transparent background (make it interactive for clicks)
    const background = this.add.rectangle(0, 0, width, height, 0x000000, 0.8)
      .setOrigin(0)
      .setInteractive();
    
    // Game Over text
    this.add.text(width / 2, height / 2 - 80, 'Game Over', {
      fontSize: '48px',
      color: '#FF4444',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Message
    this.add.text(width / 2, height / 2, 'Too many bad snacks! 💔', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // Instructions
    const restartText = this.add.text(width / 2, height / 2 + 60, 'Tap or Press SPACE to try again', {
      fontSize: '18px',
      color: '#cccccc'
    }).setOrigin(0.5);
    
    // Blinking effect for restart text
    this.tweens.add({
      targets: restartText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1
    });
    
    // Restart function
    const restart = () => {
      this.scene.stop('GameOverScene');
      this.scene.stop('GameScene');
      this.scene.stop('UIScene');
      this.scene.start('BreedSelectScene');
    };
    
    // Add keyboard input handler
    this.input.keyboard?.once('keydown-SPACE', restart);
    
    // Also add click/touch handler as backup
    background.once('pointerdown', restart);
    
    // Alternative: listen for ANY key press
    this.input.keyboard?.once('keydown', restart);
  }
  
  private calculateStars(_stats: LevelStats, _config: any): number {
    // For game over, player gets 0 stars (didn't complete)
    // But we still want to track their score in case it's high
    return 0;
  }
}

