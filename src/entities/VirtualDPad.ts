import Phaser from 'phaser';

/**
 * VirtualDPad - Directional pad for mobile controls
 * 
 * Provides left/right movement controls with visual arrow buttons
 * Returns direction: -1 (left), 0 (none), 1 (right)
 */
export class VirtualDPad {
  private scene: Phaser.Scene;
  private background: Phaser.GameObjects.Arc;
  private leftButton: Phaser.GameObjects.Container;
  private rightButton: Phaser.GameObjects.Container;
  private leftPressed: boolean = false;
  private rightPressed: boolean = false;
  
  private readonly PRESS_SCALE = 1.1;
  private readonly NORMAL_SCALE = 1.0;
  private readonly PRESS_ALPHA = 0.9;
  private readonly NORMAL_ALPHA = 0.6;

  constructor(scene: Phaser.Scene, x: number, y: number, size: number) {
    this.scene = scene;

    // Create background circle
    this.background = this.scene.add.circle(x, y, size, 0x000000, 0.4);
    this.background.setScrollFactor(0);
    this.background.setDepth(10000);

    // Create left button
    this.leftButton = this.createArrowButton(x - size / 2, y, '◄', size * 0.6);
    
    // Create right button
    this.rightButton = this.createArrowButton(x + size / 2, y, '►', size * 0.6);
  }

  private createArrowButton(x: number, y: number, arrow: string, size: number): Phaser.GameObjects.Container {
    const container = this.scene.add.container(x, y);
    container.setScrollFactor(0);
    container.setDepth(10001);

    // Button background
    const bg = this.scene.add.circle(0, 0, size / 2, 0xffffff, this.NORMAL_ALPHA);
    bg.setInteractive();

    // Arrow text
    const text = this.scene.add.text(0, 0, arrow, {
      fontSize: '24px',
      color: '#000000',
      fontStyle: 'bold',
    });
    text.setOrigin(0.5);

    container.add([bg, bg]); // Add bg first so events work
    container.add(text);

    // Store references for event handling
    const isLeft = arrow === '◄';
    
    bg.on('pointerdown', () => {
      if (isLeft) {
        this.leftPressed = true;
      } else {
        this.rightPressed = true;
      }
      bg.setScale(this.PRESS_SCALE);
      bg.setAlpha(this.PRESS_ALPHA);
      text.setScale(this.PRESS_SCALE);
    });

    bg.on('pointerup', () => {
      if (isLeft) {
        this.leftPressed = false;
      } else {
        this.rightPressed = false;
      }
      bg.setScale(this.NORMAL_SCALE);
      bg.setAlpha(this.NORMAL_ALPHA);
      text.setScale(this.NORMAL_SCALE);
    });

    bg.on('pointerout', () => {
      if (isLeft) {
        this.leftPressed = false;
      } else {
        this.rightPressed = false;
      }
      bg.setScale(this.NORMAL_SCALE);
      bg.setAlpha(this.NORMAL_ALPHA);
      text.setScale(this.NORMAL_SCALE);
    });

    return container;
  }

  /**
   * Get current direction input
   * @returns -1 for left, 0 for none, 1 for right
   */
  public getDirection(): number {
    if (this.leftPressed && this.rightPressed) {
      return 0; // Both pressed = cancel out
    }
    if (this.leftPressed) {
      return -1;
    }
    if (this.rightPressed) {
      return 1;
    }
    return 0;
  }

  /**
   * Check if left button is pressed
   */
  public isLeftPressed(): boolean {
    return this.leftPressed;
  }

  /**
   * Check if right button is pressed
   */
  public isRightPressed(): boolean {
    return this.rightPressed;
  }

  /**
   * Clean up resources
   */
  public destroy(): void {
    this.background.destroy();
    this.leftButton.destroy();
    this.rightButton.destroy();
  }
}
