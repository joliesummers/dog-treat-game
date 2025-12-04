import Phaser from 'phaser';
import { Dog } from '../entities/Dog';
import { Treat } from '../entities/Treat';
import { BadItem } from '../entities/BadItem';
import { UIScene } from './UIScene';

export class GameScene extends Phaser.Scene {
  private dog?: Dog;
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private treats: Treat[] = [];
  private badItems: BadItem[] = [];
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
    
    // Create treats and bad items
    this.createTreats(width, height);
    this.createBadItems(width, height);
    
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
    
    // Set up bad item collision
    this.badItems.forEach(badItem => {
      this.physics.add.overlap(
        this.dog!.getSprite(),
        badItem.getSprite(),
        () => this.hitBadItem(badItem),
        undefined,
        this
      );
    });
    
    // Add instructions text
    this.add.text(16, 98, 'Arrow Keys: Move\nUp Arrow: Jump\nCollect treats!\nAvoid bad snacks!', {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 6 }
    });
    
    // Add title
    this.add.text(width / 2, 30, 'Dog Treat Game - Milestone 3', {
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
  
  private createBadItems(_width: number, height: number) {
    // Place bad items strategically - avoiding treat positions
    const badItemPositions = [
      { x: 250, y: height - 100, type: 'chocolate' as const },
      { x: 450, y: height - 100, type: 'grapes' as const },
      { x: 350, y: height - 200, type: 'chocolate' as const },
      { x: 540, y: height - 300, type: 'grapes' as const },
      { x: 720, y: height - 200, type: 'chocolate' as const },
      { x: 550, y: height - 100, type: 'grapes' as const },
    ];
    
    badItemPositions.forEach(pos => {
      this.badItems.push(new BadItem(this, pos.x, pos.y, pos.type));
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
  
  private hitBadItem(_badItem: BadItem) {
    // Check if dog can take damage
    if (this.dog && this.dog.takeDamage()) {
      // Take damage in UI
      const health = this.uiScene?.takeDamage() || 0;
      
      // Check lose condition
      if (health <= 0) {
        this.time.delayedCall(500, () => {
          this.scene.launch('GameOverScene');
        });
      }
    }
  }

  update() {
    // Update player
    this.dog?.update();
  }
}

