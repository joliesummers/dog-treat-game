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
    
    // Set world bounds
    this.physics.world.setBounds(0, 0, width, height);
    
    // Add sky gradient background
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xE0F6FF, 0xE0F6FF, 1);
    sky.fillRect(0, 0, width, height);
    
    // Create ground platform
    this.platforms = this.physics.add.staticGroup();
    
    // Main ground (grass)
    const ground = this.add.rectangle(width / 2, height - 32, width, 64, 0x228B22);
    this.platforms.add(ground);
    
    // Add dirt layer below grass
    this.add.rectangle(width / 2, height - 8, width, 16, 0x8B4513);
    
    // Add some floating platforms with varied heights for challenge
    const platform1 = this.add.rectangle(200, height - 150, 200, 32, 0x8B7355);
    this.platforms.add(platform1);
    
    const platform2 = this.add.rectangle(500, height - 280, 200, 32, 0x8B7355);
    this.platforms.add(platform2);
    
    const platform3 = this.add.rectangle(700, height - 180, 120, 32, 0x8B7355);
    this.platforms.add(platform3);
    
    // Add a higher platform for extra challenge
    const platform4 = this.add.rectangle(350, height - 400, 150, 32, 0x8B7355);
    this.platforms.add(platform4);
    
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
    const instructions = this.add.text(16, 98, 'Arrow Keys: Move\nUp Arrow: Jump\nCollect treats!\nAvoid bad snacks!', {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 6 }
    });
    instructions.setDepth(100);
    
    // Add title with shadow for better visibility
    const title = this.add.text(width / 2, 30, 'Dog Treat Adventure - Level 1', {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    title.setDepth(100);
    
    // Update UI with total treats
    this.uiScene?.setTreatsTotal(this.treats.length);
    this.uiScene?.reset();
  }
  
  private createTreats(width: number, height: number) {
    // Strategically place treats to guide player through the level
    const treatPositions = [
      // Ground level treats
      { x: 120, y: height - 100 },
      { x: 250, y: height - 100 },
      { x: width - 100, y: height - 100 },
      
      // First platform
      { x: 150, y: height - 200 },
      { x: 250, y: height - 200 },
      
      // Second platform (highest)
      { x: 450, y: height - 330 },
      { x: 550, y: height - 330 },
      
      // High platform challenge
      { x: 350, y: height - 450 },
      
      // Third platform
      { x: 680, y: height - 230 },
      { x: 720, y: height - 230 },
      
      // Mid-air collection challenges
      { x: 370, y: height - 200 },
      { x: 600, y: height - 150 },
    ];
    
    treatPositions.forEach(pos => {
      this.treats.push(new Treat(this, pos.x, pos.y));
    });
  }
  
  private createBadItems(width: number, height: number) {
    // Place bad items as obstacles between treats
    const badItemPositions = [
      // Ground level hazards
      { x: 180, y: height - 100, type: 'chocolate' as const },
      { x: 400, y: height - 100, type: 'grapes' as const },
      { x: width - 200, y: height - 100, type: 'chocolate' as const },
      
      // Platform hazards
      { x: 200, y: height - 200, type: 'grapes' as const },
      { x: 500, y: height - 330, type: 'chocolate' as const },
      { x: 400, y: height - 450, type: 'grapes' as const },
      { x: 700, y: height - 230, type: 'chocolate' as const },
      
      // Challenging placement
      { x: 300, y: height - 150, type: 'grapes' as const },
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
    
    // Check if dog fell off the world
    if (this.dog && this.dog.getY() > this.cameras.main.height + 50) {
      // Instant game over if fell off
      this.uiScene?.takeDamage();
      this.uiScene?.takeDamage();
      this.uiScene?.takeDamage();
      this.time.delayedCall(100, () => {
        this.scene.launch('GameOverScene');
      });
    }
  }
}

