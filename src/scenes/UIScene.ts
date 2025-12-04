import Phaser from 'phaser';

export class UIScene extends Phaser.Scene {
  private treatsText?: Phaser.GameObjects.Text;
  private treatsCollected: number = 0;
  private treatsTotal: number = 0;
  
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
    
    this.updateTreatsDisplay();
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
    this.updateTreatsDisplay();
  }
  
  private updateTreatsDisplay() {
    if (this.treatsText) {
      this.treatsText.setText(`🦴 Treats: ${this.treatsCollected}/${this.treatsTotal}`);
    }
  }
}

