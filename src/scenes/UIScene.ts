import Phaser from 'phaser';
import { type LevelConfig } from '../types/LevelConfig';

export class UIScene extends Phaser.Scene {
  private scoreText?: Phaser.GameObjects.Text;
  private healthText?: Phaser.GameObjects.Text;
  private score: number = 0;
  private treatsCollected: number = 0;
  private totalTreats: number = 0;
  private health: number = 3;
  private maxHealth: number = 3;
  
  // Health system configuration (kept for future flexibility)
  // private healthDisplay: HealthDisplayType = 'hearts';
  private healthBarGraphics?: Phaser.GameObjects.Graphics;
  
  constructor() {
    super({ key: 'UIScene', active: true });
  }
  
  // Initialize health system based on level config
  initializeHealthSystem(config: LevelConfig) {
    // this.healthDisplay = config.healthDisplay; // Not used - always showing hearts
    this.maxHealth = config.maxHealth;
    this.health = config.maxHealth;
    this.updateHealthDisplay();
  }
  
  create() {
    // Score counter
    this.scoreText = this.add.text(16, 16, '', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 12, y: 8 },
      fontStyle: 'bold'
    });
    
    // Health display
    this.healthText = this.add.text(16, 52, '', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 12, y: 8 },
      fontStyle: 'bold'
    });
    
    this.updateScoreDisplay();
    this.updateHealthDisplay();
  }
  
  setTotalTreats(total: number) {
    this.totalTreats = total;
    this.updateScoreDisplay();
  }
  
  collectTreat() {
    this.treatsCollected++;
    this.updateScoreDisplay();
  }
  
  getTreatsCollected(): number {
    return this.treatsCollected;
  }
  
  addPoints(points: number) {
    this.score += points;
    this.updateScoreDisplay();
    return this.score;
  }
  
  getScore(): number {
    return this.score;
  }
  
  reset() {
    this.score = 0;
    this.treatsCollected = 0;
    this.health = this.maxHealth;
    this.updateScoreDisplay();
    this.updateHealthDisplay();
  }
  
  takeDamage(amount: number = 1): number {
    this.health = Math.max(0, this.health - amount);
    this.updateHealthDisplay();
    
    // Flash effect
    this.cameras.main.flash(200, 255, 0, 0);
    
    return this.health;
  }
  
  // Add health (for potential power-ups later)
  addHealth(amount: number): number {
    this.health = Math.min(this.maxHealth, this.health + amount);
    this.updateHealthDisplay();
    return this.health;
  }
  
  getHealth(): number {
    return this.health;
  }
  
  private updateScoreDisplay() {
    // Extra safety check - only update if text object exists and scene is active
    if (this.scoreText && this.scene.isActive()) {
      try {
        this.scoreText.setText(`🦴 Treats: ${this.treatsCollected}/${this.totalTreats} | Score: ${this.score}`);
      } catch (e) {
        console.warn('Failed to update score display', e);
      }
    }
  }
  
  private updateHealthDisplay() {
    // Extra safety check - only update if text object exists and scene is active
    if (!this.healthText || !this.scene.isActive()) {
      return;
    }
    
    try {
      // Always use hearts! Just change the count based on maxHealth
      // Level 1: 3 hearts (❤️❤️❤️)
      // Levels 2-3: 10 hearts (❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️)
      const hearts = '❤️'.repeat(this.health) + '🖤'.repeat(this.maxHealth - this.health);
      this.healthText.setText(`Health: ${hearts}`);
      
      // Hide health bar if it exists (no longer using it)
      if (this.healthBarGraphics) {
        this.healthBarGraphics.setVisible(false);
      }
    } catch (e) {
      console.warn('Failed to update health display', e);
    }
  }
  
  // Health bar code kept for future reference (currently using hearts for all levels)
  /*
  private drawHealthBar() {
    if (!this.healthBarGraphics) {
      this.healthBarGraphics = this.add.graphics();
    }
    this.healthBarGraphics.clear();
    this.healthBarGraphics.setVisible(true);
    const barX = 90;
    const barY = 60;
    const barWidth = 150;
    const barHeight = 20;
    const healthPercent = this.health / this.maxHealth;
    let barColor: number;
    if (healthPercent >= 0.8) {
      barColor = 0x4CAF50;
    } else if (healthPercent >= 0.4) {
      barColor = 0xFFEB3B;
    } else {
      barColor = 0xF44336;
    }
    this.healthBarGraphics.fillStyle(0x333333, 1);
    this.healthBarGraphics.fillRect(barX, barY, barWidth, barHeight);
    this.healthBarGraphics.fillStyle(barColor, 1);
    this.healthBarGraphics.fillRect(barX, barY, barWidth * healthPercent, barHeight);
    this.healthBarGraphics.lineStyle(2, 0x000000, 1);
    this.healthBarGraphics.strokeRect(barX, barY, barWidth, barHeight);
  }
  */
}

