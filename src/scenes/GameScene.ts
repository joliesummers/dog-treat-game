import Phaser from 'phaser';
import { Dog } from '../entities/Dog';
import { Treat } from '../entities/Treat';
import { UIScene } from './UIScene';

export class GameScene extends Phaser.Scene {
  private dog?: Dog;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private treats: Treat[] = [];
  private uiScene?: UIScene;
  
  constructor() {
    super('GameScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Get UI scene reference
    this.uiScene = this.scene.get('UIScene') as UIScene;
    
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
    
    // Create treats
    this.createTreats(width, height);
    
    // Create player dog
    this.dog = new Dog({
      scene: this,
      x: 100,
      y: height - 200
    });
    
    // Set up collision between dog and platforms
    this.physics.add.collider(this.dog.getSprite(), this.platforms);
    
    // Set up treat collection
    this.treats.forEach(treat => {
      this.physics.add.overlap(
        this.dog!.getSprite(),
        treat.getSprite(),
        () => this.collectTreat(treat),
        undefined,
        this
      );
    });
    
    // Add instructions text
    this.add.text(16, 60, 'Arrow Keys: Move\nUp Arrow: Jump\nCollect all treats!', {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 6 }
    });
    
    // Add title
    this.add.text(width / 2, 30, 'Dog Treat Game - Milestone 2', {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Update UI with total treats
    this.uiScene?.setTreatsTotal(this.treats.length);
    this.uiScene?.reset();
  }
  
  private createTreats(_width: number, height: number) {
    // Place treats on platforms and around the level
    const treatPositions = [
      { x: 150, y: height - 100 },
      { x: 300, y: height - 100 },
      { x: 200, y: height - 200 },
      { x: 500, y: height - 300 },
      { x: 580, y: height - 300 },
      { x: 650, y: height - 200 },
      { x: 700, y: height - 200 },
      { x: 400, y: height - 100 },
      { x: 600, y: height - 100 },
      { x: 750, y: height - 100 },
    ];
    
    treatPositions.forEach(pos => {
      this.treats.push(new Treat(this, pos.x, pos.y));
    });
  }
  
  private collectTreat(treat: Treat) {
    // Remove from array
    const index = this.treats.indexOf(treat);
    if (index > -1) {
      this.treats.splice(index, 1);
    }
    
    // Play collection animation
    treat.collect();
    
    // Update UI
    const collected = this.uiScene?.incrementTreats() || 0;
    const total = this.uiScene?.getTreatsTotal() || 0;
    
    // Check win condition
    if (collected >= total) {
      this.time.delayedCall(500, () => {
        this.scene.launch('LevelCompleteScene');
      });
    }
  }

  update() {
    // Update player
    this.dog?.update();
  }
}

