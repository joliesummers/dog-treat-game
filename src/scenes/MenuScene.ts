import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Animated background
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x4A90E2, 0x4A90E2, 0x7B68EE, 0x7B68EE, 1);
    sky.fillRect(0, 0, width, height);
    
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
        ease: 'Sine.easeInOut'
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
    
    // Bounce animation for title
    this.tweens.add({
      targets: title,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Subtitle
    this.add.text(width / 2, height / 3 + 90, 'A Retro Platformer', {
      fontSize: '20px',
      color: '#FFD700',
      fontStyle: 'italic'
    }).setOrigin(0.5);
    
    // Play button
    const playButton = this.add.text(width / 2, height / 2 + 80, 'PLAY', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#4CAF50',
      padding: { x: 40, y: 15 },
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
      this.scene.start('BreedSelectScene');
    });
    
    // Keyboard control
    const startText = this.add.text(width / 2, height / 2 + 150, 'Press SPACE or Click PLAY to Start', {
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
      this.scene.start('BreedSelectScene');
    };
    
    // Add keyboard handlers (using 'on' not 'once' so it works every time)
    const spaceKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey?.on('down', startGame);
    
    // Also listen for ANY key as backup
    this.input.keyboard?.on('keydown', startGame);
    
    // Controls info
    this.add.text(width / 2, height - 50, 'Arrow Keys: Move  |  Up: Jump  |  P: Pause', {
      fontSize: '14px',
      color: '#cccccc'
    }).setOrigin(0.5);
  }
}

