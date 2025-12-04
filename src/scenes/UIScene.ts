import Phaser from 'phaser';

export class UIScene extends Phaser.Scene {
  private scoreText?: Phaser.GameObjects.Text;
  private healthText?: Phaser.GameObjects.Text;
  private score: number = 0;
  private targetScore: number = 0;
  private health: number = 3;
  private maxHealth: number = 3;
  
  constructor() {
    super({ key: 'UIScene', active: true });
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
  
  takeDamage(): number {
    this.health = Math.max(0, this.health - 1);
    this.updateHealthDisplay();
    
    // Flash effect
    this.cameras.main.flash(200, 255, 0, 0);
    
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
    if (this.healthText && this.scene.isActive()) {
      try {
        const hearts = '❤️'.repeat(this.health) + '🖤'.repeat(this.maxHealth - this.health);
        this.healthText.setText(`Health: ${hearts}`);
      } catch (e) {
        console.warn('Failed to update health display', e);
      }
    }
  }
}

