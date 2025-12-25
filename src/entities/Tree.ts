import Phaser from 'phaser';
import { Squirrel } from './Squirrel';

export class Tree {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private squirrels: Squirrel[] = [];
  private x: number;
  private y: number;

  constructor(scene: Phaser.Scene, x: number, y: number, squirrelCount: number = 1) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    // Create container for tree + squirrels
    this.container = scene.add.container(x, y);

    // Draw tree (South Park construction paper style)
    this.drawTree();

    // Add squirrels on top
    for (let i = 0; i < squirrelCount; i++) {
      const squirrelX = i * 30 - ((squirrelCount - 1) * 15); // Space them out
      const squirrelY = -110; // On top of tree
      const squirrel = new Squirrel(scene, x + squirrelX, y + squirrelY, this);
      this.squirrels.push(squirrel);
    }
  }

  private drawTree() {
    const graphics = this.scene.add.graphics();

    // Trunk (brown rectangle - construction paper style)
    graphics.fillStyle(0x8B4513, 1); // Saddle brown
    graphics.fillRect(-15, -40, 30, 80); // Center at 0,0

    // Trunk texture (vertical grain lines)
    graphics.lineStyle(1, 0x654321, 0.3);
    for (let i = 0; i < 5; i++) {
      const lineY = -30 + i * 20;
      graphics.lineBetween(-15, lineY, 15, lineY);
    }

    // Foliage - Three layers of triangles (South Park style)
    // Bottom layer (largest)
    graphics.fillStyle(0x228B22, 1); // Forest green
    graphics.beginPath();
    graphics.moveTo(-50, -40); // Bottom left
    graphics.lineTo(0, -90); // Top point
    graphics.lineTo(50, -40); // Bottom right
    graphics.closePath();
    graphics.fillPath();

    // Middle layer
    graphics.fillStyle(0x32CD32, 1); // Lime green (brighter)
    graphics.beginPath();
    graphics.moveTo(-40, -70);
    graphics.lineTo(0, -115);
    graphics.lineTo(40, -70);
    graphics.closePath();
    graphics.fillPath();

    // Top layer (smallest)
    graphics.fillStyle(0x90EE90, 1); // Light green
    graphics.beginPath();
    graphics.moveTo(-25, -95);
    graphics.lineTo(0, -130);
    graphics.lineTo(25, -95);
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

