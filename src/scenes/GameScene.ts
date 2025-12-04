import Phaser from 'phaser';
import { Dog } from '../entities/Dog';

export class GameScene extends Phaser.Scene {
  private dog?: Dog;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  
  constructor() {
    super('GameScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Create ground platform
    this.platforms = this.physics.add.staticGroup();
    
    // Main ground
    const ground = this.add.rectangle(width / 2, height - 32, width, 64, 0x228B22);
    this.platforms.add(ground);
    
    // Add some floating platforms
    const platform1 = this.add.rectangle(200, height - 150, 200, 32, 0x228B22);
    this.platforms.add(platform1);
    
    const platform2 = this.add.rectangle(500, height - 250, 200, 32, 0x228B22);
    this.platforms.add(platform2);
    
    const platform3 = this.add.rectangle(650, height - 150, 150, 32, 0x228B22);
    this.platforms.add(platform3);
    
    // Create player dog
    this.dog = new Dog({
      scene: this,
      x: 100,
      y: height - 200
    });
    
    // Set up collision between dog and platforms
    this.physics.add.collider(this.dog.getSprite(), this.platforms);
    
    // Add instructions text
    this.add.text(16, 16, 'Arrow Keys: Move\nUp Arrow: Jump', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 10 }
    });
    
    // Add title
    this.add.text(width / 2, 40, 'Dog Treat Game - Milestone 1', {
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  update() {
    // Update player
    this.dog?.update();
  }
}

