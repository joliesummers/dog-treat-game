import Phaser from 'phaser';

export class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super('LevelCompleteScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Get current level and unlock next level
    const currentLevel = this.registry.get('selectedLevel') as number || 1;
    const nextLevel = currentLevel + 1;
    
    // Unlock next level if it exists
    if (nextLevel <= 3) {
      const savedUnlocked = localStorage.getItem('unlockedLevels');
      const currentUnlocked = savedUnlocked ? parseInt(savedUnlocked, 10) : 1;
      
      if (nextLevel > currentUnlocked) {
        localStorage.setItem('unlockedLevels', nextLevel.toString());
      }
    }
    
    // Semi-transparent background (make it interactive for clicks)
    const background = this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0)
      .setInteractive();
    
    // Level complete text
    this.add.text(width / 2, height / 2 - 80, `Level ${currentLevel} Complete!`, {
      fontSize: '48px',
      color: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Success message
    const successMsg = nextLevel <= 3 ? 
      `All treats collected! 🎉\n🔓 Level ${nextLevel} Unlocked!` :
      'All treats collected! 🎉\nYou beat the game!';
    
    this.add.text(width / 2, height / 2, successMsg, {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);
    
    // Instructions
    const restartText = this.add.text(width / 2, height / 2 + 60, 'Press SPACE or Click to continue', {
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
    
    // Continue function - return to level select
    const restart = () => {
      this.scene.stop('LevelCompleteScene');
      this.scene.stop('GameScene');
      this.scene.stop('UIScene');
      this.scene.start('LevelSelectScene');
    };
    
    // Add keyboard input handler
    this.input.keyboard?.once('keydown-SPACE', restart);
    
    // Also add click/touch handler as backup
    background.once('pointerdown', restart);
    
    // Alternative: listen for ANY key press
    this.input.keyboard?.once('keydown', restart);
  }
}

