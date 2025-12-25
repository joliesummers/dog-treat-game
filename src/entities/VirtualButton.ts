import Phaser from 'phaser';

export interface VirtualButtonConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  size: number;
  label: string;
  color?: number;
}

/**
 * VirtualButton - Touch-friendly button for mobile controls
 * 
 * Features:
 * - Semi-transparent circular button
 * - Visual feedback on press (scale, alpha)
 * - Fixed to camera (doesn't scroll)
 * - Always on top (high depth)
 * - Multi-touch compatible
 */
export class VirtualButton {
  private scene: Phaser.Scene;
  private background: Phaser.GameObjects.Arc;
  private labelText: Phaser.GameObjects.Text;
  private isPressed: boolean = false;
  private readonly PRESS_SCALE = 1.15;
  private readonly NORMAL_SCALE = 1.0;
  private readonly PRESS_ALPHA = 0.9;
  private readonly NORMAL_ALPHA = 0.7;

  constructor(config: VirtualButtonConfig) {
    this.scene = config.scene;

    const color = config.color !== undefined ? config.color : 0x8BC34A; // Default green

    // Create background circle
    this.background = this.scene.add.circle(config.x, config.y, config.size / 2, color, this.NORMAL_ALPHA);
    this.background.setScrollFactor(0); // Fixed to camera
    this.background.setDepth(10000); // Always on top
    this.background.setInteractive(); // Enable touch/click

    // Add label text
    this.labelText = this.scene.add.text(config.x, config.y, config.label, {
      fontSize: config.size > 60 ? '28px' : '24px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    this.labelText.setOrigin(0.5);
    this.labelText.setScrollFactor(0);
    this.labelText.setDepth(10001); // Above button background

    // Add pointer events
    this.background.on('pointerdown', this.onPointerDown, this);
    this.background.on('pointerup', this.onPointerUp, this);
    this.background.on('pointerout', this.onPointerUp, this); // Release when pointer leaves
  }

  private onPointerDown(): void {
    this.isPressed = true;
    this.background.setScale(this.PRESS_SCALE);
    this.background.setAlpha(this.PRESS_ALPHA);
    this.labelText.setScale(this.PRESS_SCALE);
  }

  private onPointerUp(): void {
    this.isPressed = false;
    this.background.setScale(this.NORMAL_SCALE);
    this.background.setAlpha(this.NORMAL_ALPHA);
    this.labelText.setScale(this.NORMAL_SCALE);
  }

  /**
   * Check if button is currently pressed
   */
  public isDown(): boolean {
    return this.isPressed;
  }

  /**
   * Clean up resources
   */
  public destroy(): void {
    this.background.destroy();
    this.labelText.destroy();
  }
}
