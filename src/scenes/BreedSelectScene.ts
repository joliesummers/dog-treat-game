import Phaser from 'phaser';
import type { BreedType } from '../types/DogBreeds';
import { DOG_BREEDS } from '../types/DogBreeds';

export class BreedSelectScene extends Phaser.Scene {
  private selectedBreed: BreedType = 'pug';
  
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
    this.add.text(width / 2, 80, 'Choose Your Dog!', {
      fontSize: '40px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    // Pug option
    const pugY = height / 2 - 40;
    this.createBreedOption('pug', width / 2, pugY);
    
    // Instructions
    this.add.text(width / 2, height - 60, 'Press SPACE to Start', {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Input
    this.input.keyboard?.on('keydown-SPACE', () => {
      // Store selected breed in registry
      this.registry.set('selectedBreed', this.selectedBreed);
      this.scene.stop('BreedSelectScene');
      this.scene.start('GameScene');
      this.scene.launch('UIScene');
    });
  }
  
  private createBreedOption(breed: BreedType, x: number, y: number) {
    const breedData = DOG_BREEDS[breed];
    
    // Dog preview
    const dogGraphics = this.add.graphics();
    dogGraphics.fillStyle(breedData.color, 1);
    dogGraphics.fillRect(x - 30, y - 20, 60, 40);
    dogGraphics.fillStyle(0x000000, 1);
    dogGraphics.fillCircle(x + 15, y - 5, 5);
    dogGraphics.fillCircle(x + 15, y + 5, 5);
    
    // Breed name
    this.add.text(x, y + 50, breedData.name, {
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // Description
    this.add.text(x, y + 85, breedData.description, {
      fontSize: '16px',
      color: '#cccccc'
    }).setOrigin(0.5);
    
    // Stats
    const statsText = `Speed: ${(breedData.speed * 100).toFixed(0)}%  Jump: ${(breedData.jumpPower * 100).toFixed(0)}%  Eating: ${breedData.eatSpeed === 0 ? 'Instant' : 'Normal'}`;
    this.add.text(x, y + 115, statsText, {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
  }
}

