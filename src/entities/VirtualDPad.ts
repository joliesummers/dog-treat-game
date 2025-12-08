import Phaser from 'phaser';

export class VirtualDPad {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private leftZone: Phaser.GameObjects.Rectangle;
  private rightZone: Phaser.GameObjects.Rectangle;
  private leftArrow: Phaser.GameObjects.Text;
  private rightArrow: Phaser.GameObjects.Text;
  private background: Phaser.GameObjects.Graphics;
  
  private leftPressed: boolean = false;
  private rightPressed: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, size: number = 120) {
    this.scene = scene;
    
    // Create container
    this.container = this.scene.add.container(x, y);
    this.container.setDepth(10000);
    this.container.setScrollFactor(0);
    
    // Background (semi-transparent circle)
    this.background = this.scene.add.graphics();
    this.background.fillStyle(0x000000, 0.4);
    this.background.fillCircle(0, 0, size / 2);
    this.background.lineStyle(3, 0xFFFFFF, 0.6);
    this.background.strokeCircle(0, 0, size / 2);
    this.container.add(this.background);
    
    // Left button zone
    this.leftZone = this.scene.add.rectangle(-size / 4, 0, size / 2, size / 2, 0xFFFFFF, 0.0001);
    this.leftZone.setInteractive({ useHandCursor: true });
    
    // Right button zone
    this.rightZone = this.scene.add.rectangle(size / 4, 0, size / 2, size / 2, 0xFFFFFF, 0.0001);
    this.rightZone.setInteractive({ useHandCursor: true });
    
    // Arrow icons
    this.leftArrow = this.scene.add.text(-size / 4, 0, '◄', {
      fontSize: `${size / 3}px`,
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setAlpha(0.7);
    
    this.rightArrow = this.scene.add.text(size / 4, 0, '►', {
      fontSize: `${size / 3}px`,
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setAlpha(0.7);
    
    this.container.add([this.leftZone, this.rightZone, this.leftArrow, this.rightArrow]);
    
    // Touch event handlers for LEFT
    this.leftZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.event) {
        pointer.event.preventDefault();
      }
      this.leftPressed = true;
      this.leftArrow.setScale(1.2);
      this.leftArrow.setAlpha(1.0);
    });
    
    this.leftZone.on('pointerup', () => {
      this.leftPressed = false;
      this.leftArrow.setScale(1.0);
      this.leftArrow.setAlpha(0.7);
    });
    
    this.leftZone.on('pointerout', () => {
      this.leftPressed = false;
      this.leftArrow.setScale(1.0);
      this.leftArrow.setAlpha(0.7);
    });
    
    // Touch event handlers for RIGHT
    this.rightZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.event) {
        pointer.event.preventDefault();
      }
      this.rightPressed = true;
      this.rightArrow.setScale(1.2);
      this.rightArrow.setAlpha(1.0);
    });
    
    this.rightZone.on('pointerup', () => {
      this.rightPressed = false;
      this.rightArrow.setScale(1.0);
      this.rightArrow.setAlpha(0.7);
    });
    
    this.rightZone.on('pointerout', () => {
      this.rightPressed = false;
      this.rightArrow.setScale(1.0);
      this.rightArrow.setAlpha(0.7);
    });
  }
  
  getDirection(): { left: boolean; right: boolean } {
    return {
      left: this.leftPressed,
      right: this.rightPressed
    };
  }
  
  destroy() {
    this.container.destroy();
  }
}

