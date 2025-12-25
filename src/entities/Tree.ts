import Phaser from 'phaser';
import { Squirrel } from './Squirrel';

export class Tree {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private squirrels: Squirrel[] = [];
  private x: number;
  private y: number;
  private height: number;

  constructor(scene: Phaser.Scene, x: number, y: number, squirrelCount: number = 1, treeHeight: 'small' | 'medium' | 'large' = 'medium') {
    this.scene = scene;
    this.x = x;
    this.y = y;
    
    // Set tree height based on size
    const heights = { small: 100, medium: 130, large: 160 };
    this.height = heights[treeHeight];

    // Create container for tree + squirrels
    this.container = scene.add.container(x, y);

    // Draw tree (South Park construction paper style)
    this.drawTree(treeHeight);

    // Add squirrels on top (adjusted for tree height)
    const squirrelY = -this.height + 20; // 20px from top
    for (let i = 0; i < squirrelCount; i++) {
      const squirrelX = i * 30 - ((squirrelCount - 1) * 15); // Space them out
      const squirrel = new Squirrel(scene, x + squirrelX, y + squirrelY, this);
      this.squirrels.push(squirrel);
    }
  }

  private drawTree(size: 'small' | 'medium' | 'large') {
    const graphics = this.scene.add.graphics();
    
    // Scale factors based on size
    const scales = {
      small: 0.7,
      medium: 1.0,
      large: 1.3
    };
    const scale = scales[size];

    // Trunk (brown rectangle - construction paper style)
    const trunkWidth = 30 * scale;
    const trunkHeight = 80 * scale;
    graphics.fillStyle(0x8B4513, 1); // Saddle brown
    graphics.fillRect(-trunkWidth/2, -40, trunkWidth, trunkHeight);

    // Trunk texture (vertical grain lines)
    graphics.lineStyle(1, 0x654321, 0.3);
    for (let i = 0; i < 5; i++) {
      const lineY = -30 + i * 20 * scale;
      graphics.lineBetween(-trunkWidth/2, lineY, trunkWidth/2, lineY);
    }

    // Foliage - Three layers of triangles (South Park style)
    const baseWidth = 50 * scale;
    const baseHeight = 50 * scale;
    
    // Bottom layer (largest)
    graphics.fillStyle(0x228B22, 1); // Forest green
    graphics.beginPath();
    graphics.moveTo(-baseWidth, -40);
    graphics.lineTo(0, -40 - baseHeight);
    graphics.lineTo(baseWidth, -40);
    graphics.closePath();
    graphics.fillPath();

    // Middle layer
    graphics.fillStyle(0x32CD32, 1); // Lime green (brighter)
    graphics.beginPath();
    graphics.moveTo(-baseWidth * 0.8, -40 - baseHeight * 0.6);
    graphics.lineTo(0, -40 - baseHeight * 1.5);
    graphics.lineTo(baseWidth * 0.8, -40 - baseHeight * 0.6);
    graphics.closePath();
    graphics.fillPath();

    // Top layer (smallest)
    graphics.fillStyle(0x90EE90, 1); // Light green
    graphics.beginPath();
    graphics.moveTo(-baseWidth * 0.5, -40 - baseHeight * 1.1);
    graphics.lineTo(0, -40 - baseHeight * 1.8);
    graphics.lineTo(baseWidth * 0.5, -40 - baseHeight * 1.1);
    graphics.closePath();
    graphics.fillPath();

    // Add to container
    this.container.add(graphics);
  }

  public getSquirrels(): Squirrel[] {
    return this.squirrels;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public removeSquirrel(squirrel: Squirrel) {
    const index = this.squirrels.indexOf(squirrel);
    if (index > -1) {
      this.squirrels.splice(index, 1);
    }
  }

  public destroy() {
    this.squirrels.forEach(s => s.destroy());
    this.squirrels = [];
    this.container.destroy();
  }
}

