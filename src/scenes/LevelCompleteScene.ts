import Phaser from 'phaser';

export class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super('LevelCompleteScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Semi-transparent background (make it interactive for clicks)
    const background = this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0)
      .setInteractive();
    
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
    const restartText = this.add.text(width / 2, height / 2 + 60, 'Press SPACE or Click to play again', {
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
      this.scene.stop('LevelCompleteScene');
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
}

