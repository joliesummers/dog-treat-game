import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Set camera background to match gradient
    this.cameras.main.setBackgroundColor('#EF5350');
    
    // Animated background - Angry Birds style!
    const sky = this.add.graphics();
    sky.fillGradientStyle(0xFF7043, 0xFF7043, 0xEF5350, 0xEF5350, 1); // Warm red-orange gradient
    sky.fillRect(0, 0, width, height);
    sky.setScrollFactor(0); // Fixed background
    
    // Floating treats animation
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(50, width - 50);
      const y = Phaser.Math.Between(100, height - 100);
      const treat = this.add.circle(x, y, 12, 0xFFFFCC, 0.3);
      
      this.tweens.add({
        targets: treat,
        y: y - 20,
        duration: 2000 + i * 200,
        yoyo: true,
        repeat: -1,
        ease: 'Elastic.easeInOut' // Bouncier!
      });
    }
    
    // Title
    const title = this.add.text(width / 2, height / 3, 'DOG TREAT\nADVENTURE', {
      fontSize: '56px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5);
    
    // Bounce animation for title - MORE BOUNCY!
    this.tweens.add({
      targets: title,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Back.easeInOut' // Overshoot for cartoonish effect
    });
    
    // Subtitle
    this.add.text(width / 2, height / 3 + 90, 'A Retro Platformer', {
      fontSize: '20px',
      color: '#FFD700',
      fontStyle: 'italic'
    }).setOrigin(0.5);
    
    // Play button (larger for touch)
    const playButton = this.add.text(width / 2, height / 2 + 80, 'PLAY', {
      fontSize: '40px',
      color: '#ffffff',
      backgroundColor: '#4CAF50',
      padding: { x: 50, y: 20 },
      fontStyle: 'bold'
    }).setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    
    playButton.on('pointerover', () => {
      playButton.setScale(1.1);
    });
    
    playButton.on('pointerout', () => {
      playButton.setScale(1.0);
    });
    
    playButton.on('pointerdown', () => {
      // Unlock audio context (browser requirement)
      const soundManager = this.sound as Phaser.Sound.WebAudioSoundManager;
      if (soundManager.context) {
        soundManager.context.resume();
      }
      this.scene.start('LevelSelectScene');
    });
    
    // Keyboard control
    const startText = this.add.text(width / 2, height / 2 + 150, 'Tap or Press SPACE to Start', {
      fontSize: '18px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: startText,
      alpha: 0.3,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });
    
    // Start game function
    const startGame = () => {
      // Unlock audio context (browser requirement)
      const soundManager = this.sound as Phaser.Sound.WebAudioSoundManager;
      if (soundManager.context) {
        soundManager.context.resume();
      }
      this.scene.start('LevelSelectScene');
    };
    
    // Add keyboard handlers (using 'on' not 'once' so it works every time)
    const spaceKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey?.on('down', startGame);
    
    // Also listen for ANY key as backup
    this.input.keyboard?.on('keydown', startGame);
    
    // Controls info (detects if mobile)
    const isMobile = this.sys.game.device.input.touch;
    const controlsText = isMobile 
      ? 'Use on-screen controls to move and jump  |  P: Pause'
      : 'Arrows: Move  |  Space/Up: Jump (tap twice for double jump)  |  P: Pause';
    
    this.add.text(width / 2, height - 50, controlsText, {
      fontSize: '14px',
      color: '#cccccc'
    }).setOrigin(0.5);
  }
}

