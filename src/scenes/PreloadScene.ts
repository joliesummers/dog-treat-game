import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Create loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Set clean background
    this.cameras.main.setBackgroundColor('#B2EBF2');
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);
    
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
    });
    
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
    
    // Load sound effects (8-bit retro style)
    // Note: Sounds are optional - game works without them
    this.load.audio('jump', 'assets/audio/jump.wav');
    this.load.audio('eat', 'assets/audio/eat.wav');
    this.load.audio('damage', 'assets/audio/damage.wav');
    this.load.audio('distract', 'assets/audio/distract.wav');
    this.load.audio('land', 'assets/audio/land.wav');
    this.load.audio('victory', 'assets/audio/victory.wav');
    this.load.audio('gameover', 'assets/audio/gameover.wav');
    
    // Background music (optional)
    this.load.audio('menu-music', 'assets/audio/menu-music.wav');
    this.load.audio('game-music', 'assets/audio/game-music.wav');
    
    // Suppress missing audio warnings (files are optional)
    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      if (file.type === 'audio') {
        // Silently skip missing audio files
        return;
      }
    });
  }

  create() {
    this.scene.start('MenuScene');
  }
}

