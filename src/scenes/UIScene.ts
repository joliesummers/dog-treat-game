import Phaser from 'phaser';

export class UIScene extends Phaser.Scene {
  private treatsText?: Phaser.GameObjects.Text;
  private healthText?: Phaser.GameObjects.Text;
  private treatsCollected: number = 0;
  private treatsTotal: number = 0;
  private health: number = 3;
  private maxHealth: number = 3;
  
  constructor() {
    super({ key: 'UIScene', active: true });
  }
  
  create() {
    // Treats counter
    this.treatsText = this.add.text(16, 16, '', {
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
    
    this.updateTreatsDisplay();
    this.updateHealthDisplay();
  }
  
  setTreatsTotal(total: number) {
    this.treatsTotal = total;
    this.updateTreatsDisplay();
  }
  
  incrementTreats() {
    this.treatsCollected++;
    this.updateTreatsDisplay();
    return this.treatsCollected;
  }
  
  getTreatsCollected(): number {
    return this.treatsCollected;
  }
  
  getTreatsTotal(): number {
    return this.treatsTotal;
  }
  
  reset() {
    this.treatsCollected = 0;
    this.health = this.maxHealth;
    this.updateTreatsDisplay();
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
  
  private updateTreatsDisplay() {
    // Extra safety check - only update if text object exists and scene is active
    if (this.treatsText && this.scene.isActive()) {
      try {
        this.treatsText.setText(`🦴 Treats: ${this.treatsCollected}/${this.treatsTotal}`);
      } catch (e) {
        console.warn('Failed to update treats display', e);
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

