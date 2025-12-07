import Phaser from 'phaser';

export type BadItemType = 'poo';

export class BadItem {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private itemType: BadItemType;
  private stinkLines: Phaser.GameObjects.Graphics[] = [];
  
  constructor(scene: Phaser.Scene, x: number, y: number, type: BadItemType = 'poo') {
    this.itemType = type;
    
    // Create cute poo emoji graphic
    const textureKey = 'bad-poo';
    
    if (!scene.textures.exists(textureKey)) {
      const graphics = scene.add.graphics();
      
      // Cute poo emoji shape (swirl of poop)
      const brown = 0x8B4513; // Saddle brown
      const darkBrown = 0x654321; // Dark brown outline
      
      graphics.fillStyle(brown, 1);
      graphics.lineStyle(2, darkBrown, 1);
      
      // Bottom coil (largest)
      graphics.fillEllipse(16, 24, 20, 10);
      graphics.strokeEllipse(16, 24, 20, 10);
      
      // Middle coil
      graphics.fillEllipse(16, 18, 16, 9);
      graphics.strokeEllipse(16, 18, 16, 9);
      
      // Top coil (smallest)
      graphics.fillEllipse(16, 12, 12, 8);
      graphics.strokeEllipse(16, 12, 12, 8);
      
      // Swirl top point
      graphics.fillCircle(16, 8, 4);
      graphics.strokeCircle(16, 8, 4);
      
      // Cute face
      graphics.fillStyle(0x000000, 1);
      // Eyes (happy expression)
      graphics.fillCircle(12, 16, 2);
      graphics.fillCircle(20, 16, 2);
      
      // Smile
      graphics.lineStyle(2, 0x000000, 1);
      graphics.arc(16, 18, 4, 0, Math.PI, false);
      graphics.strokePath();
      
      // White shine on eyes
      graphics.fillStyle(0xFFFFFF, 1);
      graphics.fillCircle(11, 15, 1);
      graphics.fillCircle(19, 15, 1);
      
      graphics.generateTexture('bad-poo', 32, 28);
      graphics.destroy();
    }
    
    // Create sprite (textureKey already defined above)
    this.sprite = scene.physics.add.sprite(x, y, textureKey);
    this.sprite.setCollideWorldBounds(true);
    
    // Start with gravity disabled (will be enabled for falling items)
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    
    // Add warning pulse animation
    scene.tweens.add({
      targets: this.sprite,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // 💨 Add South Park-style STINK LINES (thin wavy lines rising)
    this.createStinkLines(scene, x, y);
  }
  
  private createStinkLines(scene: Phaser.Scene, x: number, y: number) {
    // Create 3 wavy stink lines rising from the poo
    for (let i = 0; i < 3; i++) {
      const stinkLine = scene.add.graphics();
      stinkLine.lineStyle(1.5, 0x8B7355, 0.6); // Thin brown line, semi-transparent
      
      // Offset each line slightly left/right
      const offsetX = (i - 1) * 6; // -6, 0, +6
      const startY = y - 14; // Above the poo
      
      // Draw simple wavy line using lineTo (zigzag pattern)
      stinkLine.beginPath();
      stinkLine.moveTo(x + offsetX, startY);
      
      // Create wavy path going upward (zigzag)
      for (let wave = 0; wave < 4; wave++) {
        const waveY = startY - (wave * 5);
        const waveX = x + offsetX + (wave % 2 === 0 ? 3 : -3);
        stinkLine.lineTo(waveX, waveY);
      }
      
      stinkLine.strokePath();
      stinkLine.setAlpha(0); // Start invisible
      this.stinkLines.push(stinkLine);
      
      // Animate stink line: fade in, rise, sway, fade out
      const delay = i * 200; // Stagger each line
      
      scene.tweens.add({
        targets: stinkLine,
        alpha: { from: 0, to: 0.6 },
        y: stinkLine.y - 20, // Rise upward
        duration: 2000,
        delay: delay,
        repeat: -1,
        ease: 'Sine.easeOut',
        onRepeat: () => {
          // Reset position when repeating
          stinkLine.y = 0;
        }
      });
      
      // Add sway animation (wiggle side to side)
      scene.tweens.add({
        targets: stinkLine,
        x: { from: stinkLine.x - 2, to: stinkLine.x + 2 },
        duration: 800,
        delay: delay,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }
  
  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }
  
  getType(): BadItemType {
    return this.itemType;
  }
}

