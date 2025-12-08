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
  private activePointerId: number | null = null;

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
    
    // Add global pointer tracking to catch edge cases
    this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      // If this pointer was controlling this button, release it
      if (this.activePointerId === pointer.id) {
        this.activePointerId = null;
        this.setPressed(false);
      }
    });
    
    // Touch event handlers - track pointer ID for multi-touch
    this.background.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.event) {
        pointer.event.preventDefault(); // Prevent mobile browser defaults
      }
      // Only accept if no other pointer is active on this button
      if (this.activePointerId === null) {
        this.activePointerId = pointer.id;
        this.setPressed(true);
      }
    });
    
    this.background.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      // Only release if this is the pointer that pressed it
      if (this.activePointerId === pointer.id) {
        this.activePointerId = null;
        this.setPressed(false);
      }
    });
    
    this.background.on('pointerout', (pointer: Phaser.Input.Pointer) => {
      // Only release if this is the pointer that pressed it
      if (this.activePointerId === pointer.id) {
        this.activePointerId = null;
        this.setPressed(false);
      }
    });
    
    this.background.on('pointercancel', (pointer: Phaser.Input.Pointer) => {
      // Force release on cancel
      if (this.activePointerId === pointer.id) {
        this.activePointerId = null;
        this.setPressed(false);
      }
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
  
  reset() {
    // Force reset state
    this.isPressed = false;
    this.activePointerId = null;
    this.container.setScale(1.0);
    this.background.setAlpha(0.6);
  }
  
  destroy() {
    this.reset();
    this.container.destroy();
  }
}

