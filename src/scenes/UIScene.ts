import Phaser from 'phaser';
import { type LevelConfig, type HealthDisplayType } from '../types/LevelConfig';

export class UIScene extends Phaser.Scene {
  private scoreText?: Phaser.GameObjects.Text;
  private healthText?: Phaser.GameObjects.Text;
  private score: number = 0;
  private targetScore: number = 0;
  private health: number = 3;
  private maxHealth: number = 3;
  
  // Health system configuration
  private healthDisplay: HealthDisplayType = 'hearts';
  private healthBarGraphics?: Phaser.GameObjects.Graphics;
  
  constructor() {
    super({ key: 'UIScene', active: true });
  }
  
  // Initialize health system based on level config
  initializeHealthSystem(config: LevelConfig) {
    this.healthDisplay = config.healthDisplay;
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
  
  setTargetScore(target: number) {
    this.targetScore = target;
    this.updateScoreDisplay();
  }
  
  addPoints(points: number) {
    this.score += points;
    this.updateScoreDisplay();
    return this.score;
  }
  
  getScore(): number {
    return this.score;
  }
  
  getTargetScore(): number {
    return this.targetScore;
  }
  
  reset() {
    this.score = 0;
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
        this.scoreText.setText(`🦴 Score: ${this.score}/${this.targetScore}`);
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
      if (this.healthDisplay === 'hearts') {
        // Classic heart display (Level 1)
        const hearts = '❤️'.repeat(this.health) + '🖤'.repeat(this.maxHealth - this.health);
        this.healthText.setText(`Health: ${hearts}`);
        
        // Hide health bar if it exists
        if (this.healthBarGraphics) {
          this.healthBarGraphics.setVisible(false);
        }
      } else {
        // Health bar display (Levels 2-3)
        this.healthText.setText(`Health:`);
        this.drawHealthBar();
      }
    } catch (e) {
      console.warn('Failed to update health display', e);
    }
  }
  
  private drawHealthBar() {
    // Create graphics object if it doesn't exist
    if (!this.healthBarGraphics) {
      this.healthBarGraphics = this.add.graphics();
    }
    
    this.healthBarGraphics.clear();
    this.healthBarGraphics.setVisible(true);
    
    const barX = 90; // Position after "Health: " text
    const barY = 60;
    const barWidth = 150;
    const barHeight = 20;
    
    // Calculate health percentage
    const healthPercent = this.health / this.maxHealth;
    
    // Determine bar color based on health
    let barColor: number;
    if (healthPercent >= 0.8) {
      barColor = 0x4CAF50; // Green (80-100%)
    } else if (healthPercent >= 0.4) {
      barColor = 0xFFEB3B; // Yellow (40-79%)
    } else {
      barColor = 0xF44336; // Red (0-39%)
    }
    
    // Draw background (dark gray)
    this.healthBarGraphics.fillStyle(0x333333, 1);
    this.healthBarGraphics.fillRect(barX, barY, barWidth, barHeight);
    
    // Draw health bar (colored)
    this.healthBarGraphics.fillStyle(barColor, 1);
    this.healthBarGraphics.fillRect(barX, barY, barWidth * healthPercent, barHeight);
    
    // Draw border (black)
    this.healthBarGraphics.lineStyle(2, 0x000000, 1);
    this.healthBarGraphics.strokeRect(barX, barY, barWidth, barHeight);
    
    // Draw percentage text
    const percentText = `${Math.round(healthPercent * 100)}%`;
    if (!this.healthText) return;
    
    // Create or update percentage text
    const existingPercentText = this.children.getByName('healthPercent') as Phaser.GameObjects.Text;
    if (existingPercentText) {
      existingPercentText.setText(percentText);
    } else {
      this.add.text(barX + barWidth + 10, barY + 2, percentText, {
        fontSize: '16px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setName('healthPercent');
    }
  }
}

