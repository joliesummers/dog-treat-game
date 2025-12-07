import Phaser from 'phaser';

export class Squirrel {
  private sprite: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Create cute squirrel sprite
    const textureKey = 'squirrel';
    
    if (!scene.textures.exists(textureKey)) {
      const graphics = scene.add.graphics();
      
      // Body (brown oval)
      graphics.fillStyle(0x8B4513, 1); // Saddle brown
      graphics.fillEllipse(16, 20, 12, 16);
      
      // Head (circle)
      graphics.fillCircle(16, 10, 8);
      
      // Ears (triangles)
      graphics.fillTriangle(12, 6, 10, 2, 14, 4);
      graphics.fillTriangle(20, 6, 18, 4, 22, 2);
      
      // Bushy tail (big fluffy curve)
      graphics.fillStyle(0xA0522D, 1); // Sienna for tail
      graphics.fillEllipse(8, 24, 14, 18);
      graphics.fillEllipse(6, 20, 10, 14);
      graphics.fillEllipse(4, 16, 8, 10);
      
      // Belly (lighter color)
      graphics.fillStyle(0xD2B48C, 1); // Tan
      graphics.fillEllipse(16, 22, 6, 10);
      
      // Face details
      graphics.fillStyle(0x000000, 1);
      // Eyes
      graphics.fillCircle(13, 9, 2);
      graphics.fillCircle(19, 9, 2);
      // Nose
      graphics.fillCircle(16, 12, 1);
      
      // White eye shine
      graphics.fillStyle(0xFFFFFF, 1);
      graphics.fillCircle(13, 8, 1);
      graphics.fillCircle(19, 8, 1);
      
      graphics.generateTexture(textureKey, 32, 36);
      graphics.destroy();
    }
    
    this.sprite = scene.add.image(x, y, textureKey);
    
    // Add EXAGGERATED South Park-style bounce animation!
    scene.tweens.add({
      targets: this.sprite,
      y: y - 15, // Much higher bounce (was 5px)
      scaleY: 1.15, // Stretch vertically
      scaleX: 0.95, // Compress horizontally
      duration: 600, // Faster (was 800ms)
      yoyo: true,
      repeat: -1,
      ease: 'Back.easeInOut' // Overshoot for cartoony effect!
    });
    
    // Add secondary squash/stretch cycle (offset timing for more life)
    scene.tweens.add({
      targets: this.sprite,
      scaleX: 1.1, // Wobble side to side
      duration: 400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  getSprite(): Phaser.GameObjects.Image {
    return this.sprite;
  }

  getX(): number {
    return this.sprite.x;
  }

  getY(): number {
    return this.sprite.y;
  }

  destroy() {
    this.sprite.destroy();
  }
}

