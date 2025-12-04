import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Semi-transparent background (make it interactive for clicks)
    const background = this.add.rectangle(0, 0, width, height, 0x000000, 0.8)
      .setOrigin(0)
      .setInteractive();
    
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
    const restartText = this.add.text(width / 2, height / 2 + 60, 'Press SPACE or Click to try again', {
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
      this.scene.stop('GameOverScene');
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

