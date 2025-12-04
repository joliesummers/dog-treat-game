import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Semi-transparent background
    this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);
    
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
    const restartText = this.add.text(width / 2, height / 2 + 60, 'Press SPACE to try again', {
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
    
    // Add input handler
    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.stop('GameOverScene');
      this.scene.stop('UIScene');
      this.scene.start('BreedSelectScene');
    });
  }
}

