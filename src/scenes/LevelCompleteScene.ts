import Phaser from 'phaser';
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

export class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super('LevelCompleteScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Get current level and stats
    const currentLevel = this.registry.get('selectedLevel') as number || 1;
    const stats = this.registry.get('levelStats') as LevelStats;
    const config = getCurrentLevelConfig(currentLevel);
    
    // Calculate star rating
    const stars = this.calculateStars(stats, config);
    
    // Get/update high score
    const highScoreData = this.getHighScore(currentLevel);
    const isNewRecord = stats.score > highScoreData.score;
    if (isNewRecord) {
      this.saveHighScore(currentLevel, stats);
    }
    
    // Unlock next level
    const nextLevel = currentLevel + 1;
    const maxLevels = 5; // Total number of levels available
    
    if (nextLevel <= maxLevels) {
      const savedUnlocked = window.localStorage.getItem('unlockedLevels');
      const currentUnlocked = savedUnlocked ? parseInt(savedUnlocked, 10) : 1;
      
      if (nextLevel > currentUnlocked) {
        window.localStorage.setItem('unlockedLevels', nextLevel.toString());
      }
    }
    
    // Semi-transparent background
    this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0);
    
    // === TITLE ===
    this.add.text(width / 2, 60, `Level ${currentLevel} Complete!`, {
      fontSize: '48px',
      color: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // === STAR RATING ===
    const starY = 120;
    this.showStars(stars, width / 2, starY);
    
    // === SCORE BREAKDOWN ===
    const breakdownY = 180;
    const lineHeight = 24;
    let currentY = breakdownY;
    
    // Time
    const minutes = Math.floor(stats.time / 60);
    const seconds = Math.floor(stats.time % 60);
    const milliseconds = Math.floor((stats.time % 1) * 100);
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    
    this.add.text(width / 2, currentY, `⏱️ Time: ${timeString}`, {
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5);
    currentY += lineHeight;
    
    // Treats
    const treatPercentage = Math.floor((stats.treatsCollected / stats.totalTreats) * 100);
    this.add.text(width / 2, currentY, `🦴 Treats: ${stats.treatsCollected}/${stats.totalTreats} (${treatPercentage}%)`, {
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5);
    currentY += lineHeight;
    
    // Health
    this.add.text(width / 2, currentY, `❤️ Health: ${stats.healthRemaining}/${stats.maxHealth}`, {
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5);
    currentY += lineHeight + 10;
    
    // === SCORE COMPONENTS ===
    this.add.text(width / 2, currentY, '--- Score Breakdown ---', {
      fontSize: '18px',
      color: '#CCCCCC',
      fontStyle: 'italic'
    }).setOrigin(0.5);
    currentY += lineHeight;
    
    this.add.text(width / 2, currentY, `Treats: +${stats.treatPoints}`, {
      fontSize: '18px',
      color: '#90EE90'
    }).setOrigin(0.5);
    currentY += lineHeight - 4;
    
    this.add.text(width / 2, currentY, `Health Bonus: +${stats.healthBonus}`, {
      fontSize: '18px',
      color: '#90EE90'
    }).setOrigin(0.5);
    currentY += lineHeight - 4;
    
    this.add.text(width / 2, currentY, `Time Bonus: +${stats.timeBonus}`, {
      fontSize: '18px',
      color: '#90EE90'
    }).setOrigin(0.5);
    currentY += lineHeight - 4;
    
    if (stats.perfectBonus > 0) {
      this.add.text(width / 2, currentY, `🌟 Perfect Run: +${stats.perfectBonus}!`, {
        fontSize: '18px',
        color: '#FFD700',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      currentY += lineHeight - 4;
    }
    
    currentY += 10;
    
    // === FINAL SCORE ===
    this.add.text(width / 2, currentY, `FINAL SCORE: ${stats.score}`, {
      fontSize: '32px',
      color: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    currentY += 40;
    
    // === HIGH SCORE ===
    if (isNewRecord) {
      this.add.text(width / 2, currentY, '🎉 NEW RECORD! 🎉', {
        fontSize: '24px',
        color: '#FF69B4',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      
      // Pulse animation
      const recordText = this.add.text(width / 2, currentY, '🎉 NEW RECORD! 🎉', {
        fontSize: '24px',
        color: '#FF69B4',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      
      this.tweens.add({
        targets: recordText,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else {
      this.add.text(width / 2, currentY, `Best: ${highScoreData.score}`, {
        fontSize: '20px',
        color: '#CCCCCC'
      }).setOrigin(0.5);
    }
    currentY += 40;
    
    // === BUTTONS ===
    const buttonY = currentY;
    const buttonSpacing = 180;
    
    // Retry button
    const retryButton = this.add.text(width / 2 - buttonSpacing, buttonY, '↺ Retry', {
      fontSize: '22px',
      color: '#ffffff',
      backgroundColor: '#4CAF50',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();
    
    retryButton.on('pointerover', () => retryButton.setScale(1.1));
    retryButton.on('pointerout', () => retryButton.setScale(1));
    retryButton.on('pointerdown', () => this.retryLevel());
    
    // Next Level button (or Level Select if last level)
    const isLastLevel = currentLevel >= maxLevels;
    const nextButtonText = isLastLevel ? '📋 Levels' : '▶ Next';
    const nextButton = this.add.text(width / 2, buttonY, nextButtonText, {
      fontSize: '22px',
      color: '#ffffff',
      backgroundColor: '#2196F3',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();
    
    nextButton.on('pointerover', () => nextButton.setScale(1.1));
    nextButton.on('pointerout', () => nextButton.setScale(1));
    nextButton.on('pointerdown', () => {
      if (isLastLevel) {
        this.toLevelSelect();
      } else {
        this.nextLevel();
      }
    });
    
    // Level Select button
    const levelSelectButton = this.add.text(width / 2 + buttonSpacing, buttonY, '📋 Levels', {
      fontSize: '22px',
      color: '#ffffff',
      backgroundColor: '#666666',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();
    
    levelSelectButton.on('pointerover', () => levelSelectButton.setScale(1.1));
    levelSelectButton.on('pointerout', () => levelSelectButton.setScale(1));
    levelSelectButton.on('pointerdown', () => this.toLevelSelect());
    
    // Add keyboard shortcuts
    this.input.keyboard?.once('keydown-SPACE', () => {
      if (isLastLevel) {
        this.toLevelSelect();
      } else {
        this.nextLevel();
      }
    });
    this.input.keyboard?.once('keydown-R', () => this.retryLevel());
  }
  
  private showStars(count: number, x: number, y: number) {
    const starSpacing = 60;
    const startX = x - starSpacing;
    
    for (let i = 0; i < 3; i++) {
      const starX = startX + i * starSpacing;
      const isFilled = i < count;
      const starColor = isFilled ? 0xFFD700 : 0x333333;
      
      const star = this.add.star(starX, y, 5, 15, 30, starColor, 1);
      
      // Animate filled stars
      if (isFilled) {
        star.setScale(0);
        this.tweens.add({
          targets: star,
          scaleX: 1,
          scaleY: 1,
          duration: 300,
          delay: i * 150,
          ease: 'Back.easeOut'
        });
      }
    }
  }
  
  private calculateStars(stats: LevelStats, config: any): number {
    // Gold: Score >= gold target AND time <= gold time
    if (stats.score >= config.goldScore && stats.time <= config.goldTime) {
      return 3;
    }
    
    // Silver: Score >= silver target AND time <= silver time
    if (stats.score >= config.silverScore && stats.time <= config.silverTime) {
      return 2;
    }
    
    // Bronze: Reached the goal!
    return 1;
  }
  
  private getHighScore(level: number): { score: number; stars: number; time: number } {
    const key = `highScore_level_${level}`;
    const saved = window.localStorage.getItem(key);
    
    if (saved) {
      return JSON.parse(saved);
    }
    
    return { score: 0, stars: 0, time: 999 };
  }
  
  private saveHighScore(level: number, stats: LevelStats) {
    const key = `highScore_level_${level}`;
    const config = getCurrentLevelConfig(level);
    const stars = this.calculateStars(stats, config);
    
    const data = {
      score: stats.score,
      stars: stars,
      time: stats.time
    };
    
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  
  private retryLevel() {
    this.scene.stop('LevelCompleteScene');
    this.scene.stop('GameScene');
    this.scene.stop('UIScene');
    this.scene.start('GameScene');
    this.scene.start('UIScene');
  }
  
  private nextLevel() {
    const currentLevel = this.registry.get('selectedLevel') as number || 1;
    this.registry.set('selectedLevel', currentLevel + 1);
    
    this.scene.stop('LevelCompleteScene');
    this.scene.stop('GameScene');
    this.scene.stop('UIScene');
    this.scene.start('GameScene');
    this.scene.start('UIScene');
  }
  
  private toLevelSelect() {
    this.scene.stop('LevelCompleteScene');
    this.scene.stop('GameScene');
    this.scene.stop('UIScene');
    this.scene.start('LevelSelectScene');
  }
}
