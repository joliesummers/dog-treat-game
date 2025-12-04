import Phaser from 'phaser';

export class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super('LevelCompleteScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Semi-transparent background
    this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);
    
    // Level complete text
    this.add.text(width / 2, height / 2 - 80, 'Level Complete!', {
      fontSize: '48px',
      color: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Success message
    this.add.text(width / 2, height / 2, 'All treats collected! 🎉', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // Instructions
    const restartText = this.add.text(width / 2, height / 2 + 60, 'Press SPACE to play again', {
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
      this.scene.stop('LevelCompleteScene');
      this.scene.stop('UIScene');
      this.scene.start('BreedSelectScene');
    });
  }
}

