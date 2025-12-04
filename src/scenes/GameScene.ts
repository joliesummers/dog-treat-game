import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // Add temporary text to verify game is running
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    
    this.add.text(centerX, centerY, 'Dog Treat Game\nComing Soon!', {
      fontSize: '32px',
      color: '#ffffff',
      align: 'center',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    
    this.add.text(centerX, centerY + 80, 'Press SPACE to continue', {
      fontSize: '16px',
      color: '#cccccc',
      align: 'center',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    
    // Add input handler
    this.input.keyboard?.once('keydown-SPACE', () => {
      console.log('Game will start here!');
    });
  }

  update() {
    // Game loop - will be implemented in future milestones
  }
}

