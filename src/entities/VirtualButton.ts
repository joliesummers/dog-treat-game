import Phaser from 'phaser';

export interface VirtualButtonConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  size: number;
  label: string;
  color?: number;
}

export class VirtualButton {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private background: Phaser.GameObjects.Arc;
  private icon: Phaser.GameObjects.Text;
  private labelText?: Phaser.GameObjects.Text;
  private isPressed: boolean = false;
  private size: number;

  constructor(config: VirtualButtonConfig) {
    this.scene = config.scene;
    this.size = config.size;
    
    // Create container for button elements
    this.container = this.scene.add.container(config.x, config.y);
    this.container.setDepth(10000); // Always on top
    this.container.setScrollFactor(0); // Fixed to camera
    
    // Background circle (semi-transparent)
    const bgColor = config.color || 0x8BC34A; // Default green
    this.background = this.scene.add.circle(0, 0, this.size, bgColor, 0.6);
    this.background.setStrokeStyle(3, 0xFFFFFF, 0.8);
    this.background.setInteractive({ useHandCursor: true });
    
    // Icon/Symbol
    this.icon = this.scene.add.text(0, -8, config.label, {
      fontSize: `${this.size * 0.6}px`,
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Optional label text below icon
    if (config.label.length > 2) {
      // Long label - show just first char as icon
      this.icon.setText(config.label[0]);
      this.labelText = this.scene.add.text(0, this.size * 0.5, config.label, {
        fontSize: '12px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      this.container.add(this.labelText);
    }
    
    // Add to container
    this.container.add([this.background, this.icon]);
    
    // Touch event handlers
    this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.event) {
        pointer.event.preventDefault(); // Prevent mobile browser defaults
      }
      this.setPressed(true);
    });
    
    this.background.on('pointerup', () => {
      this.setPressed(false);
    });
    
    this.background.on('pointerout', () => {
      this.setPressed(false);
    });
  }
  
  private setPressed(pressed: boolean) {
    this.isPressed = pressed;
    
    if (pressed) {
      // Visual feedback - scale up and brighten
      this.container.setScale(1.15);
      this.background.setAlpha(0.9);
    } else {
      // Reset to normal
      this.container.setScale(1.0);
      this.background.setAlpha(0.6);
    }
  }
  
  isDown(): boolean {
    return this.isPressed;
  }
  
  destroy() {
    this.container.destroy();
  }
}

