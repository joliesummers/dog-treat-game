import Phaser from 'phaser';
import type { BreedType } from '../types/DogBreeds';
import { DOG_BREEDS } from '../types/DogBreeds';

export class BreedSelectScene extends Phaser.Scene {
  private selectedBreed: BreedType = 'pug';
  private breedBoxes: Map<BreedType, Phaser.GameObjects.Rectangle> = new Map();
  
  constructor() {
    super('BreedSelectScene');
  }
  
  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Background
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x667eea, 0x667eea, 0x764ba2, 0x764ba2, 1);
    sky.fillRect(0, 0, width, height);
    
    // Title
    this.add.text(width / 2, 60, 'Choose Your Dog!', {
      fontSize: '40px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    // Pug option (left side)
    const pugX = width / 2 - 180;
    const pugY = height / 2;
    this.createBreedOption('pug', pugX, pugY);
    
    // Golden Retriever option (right side)
    const goldenX = width / 2 + 180;
    const goldenY = height / 2;
    this.createBreedOption('golden', goldenX, goldenY);
    
    // Instructions
    const instructionText = this.add.text(width / 2, height - 60, 'Press SPACE or Click to Start', {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Make text blink
    this.tweens.add({
      targets: instructionText,
      alpha: 0.5,
      duration: 800,
      yoyo: true,
      repeat: -1
    });
    
    // Make the whole scene clickable
    const clickZone = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0)
      .setOrigin(0.5)
      .setInteractive();
    
    // Start game function
    const startGame = () => {
      // Store selected breed in registry
      this.registry.set('selectedBreed', this.selectedBreed);
      // Remove all event listeners to prevent duplicates
      this.input.keyboard?.removeAllListeners();
      clickZone.removeAllListeners();
      this.scene.stop('BreedSelectScene');
      // Launch UIScene FIRST, then start GameScene
      this.scene.launch('UIScene');
      this.scene.start('GameScene');
    };
    
    // Add keyboard input (remove any existing listeners first)
    this.input.keyboard?.removeAllListeners('keydown-SPACE');
    this.input.keyboard?.once('keydown-SPACE', startGame);
    
    // Also add click handler
    clickZone.once('pointerdown', startGame);
    
    // Any key as backup
    this.input.keyboard?.once('keydown', startGame);
  }
  
  private createBreedOption(breed: BreedType, x: number, y: number) {
    const breedData = DOG_BREEDS[breed];
    const isSelected = breed === this.selectedBreed;
    
    // Selection box
    const box = this.add.rectangle(x, y, 300, 280, 0x000000, isSelected ? 0.5 : 0.2)
      .setStrokeStyle(4, isSelected ? 0xFFD700 : 0x666666)
      .setInteractive({ useHandCursor: true });
    
    this.breedBoxes.set(breed, box);
    
    // Dog preview
    const dogGraphics = this.add.graphics();
    dogGraphics.fillStyle(breedData.color, 1);
    dogGraphics.fillRect(x - 30, y - 60, 60, 40);
    dogGraphics.fillStyle(0x000000, 1);
    dogGraphics.fillCircle(x + 15, y - 45, 5);
    dogGraphics.fillCircle(x + 15, y - 35, 5);
    
    // Breed name
    this.add.text(x, y, breedData.name, {
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Description
    this.add.text(x, y + 35, breedData.description, {
      fontSize: '14px',
      color: '#cccccc',
      align: 'center',
      wordWrap: { width: 280 }
    }).setOrigin(0.5);
    
    // Stats
    const eatText = breedData.eatSpeed === 0 ? 'Instant' : 'Slow';
    const distractionText = breedData.distractionChance > 0 ? 'Yes!' : 'Focused';
    const statsText = `Speed: ${(breedData.speed * 100).toFixed(0)}%\nJump: ${(breedData.jumpPower * 100).toFixed(0)}%\nEating: ${eatText}\nDistracted: ${distractionText}`;
    this.add.text(x, y + 95, statsText, {
      fontSize: '12px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 6 },
      align: 'left'
    }).setOrigin(0.5);
    
    // Click handler for selection
    box.on('pointerdown', () => {
      this.selectBreed(breed);
    });
    
    // Hover effects
    box.on('pointerover', () => {
      box.setScale(1.05);
    });
    
    box.on('pointerout', () => {
      box.setScale(1.0);
    });
  }
  
  private selectBreed(breed: BreedType) {
    this.selectedBreed = breed;
    
    // Update all boxes
    this.breedBoxes.forEach((box, breedKey) => {
      const isSelected = breedKey === breed;
      box.setAlpha(isSelected ? 0.5 : 0.2);
      box.setStrokeStyle(4, isSelected ? 0xFFD700 : 0x666666);
    });
  }
}

