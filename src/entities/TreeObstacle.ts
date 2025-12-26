import Phaser from 'phaser';

/**
 * TreeObstacle - Tall vertical obstacle for World 2: Park
 * Different from Tree entity (which holds squirrels) - this is a solid blocking obstacle
 */
export class TreeObstacle {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, height: 'short' | 'medium' | 'tall' = 'medium') {
    this.scene = scene;

    // Create tree texture based on height
    const textureKey = `tree-obstacle-${height}`;
    if (!scene.textures.exists(textureKey)) {
      this.createTreeTexture(scene, textureKey, height);
    }

    // Create sprite with physics
    this.sprite = scene.physics.add.sprite(x, y, textureKey);
    this.sprite.setOrigin(0.5, 1); // Anchor at bottom center
    
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(true);
    
    // Set collision box (trunk only, not foliage)
    const trunkWidth = this.getTrunkWidth(height);
    const treeHeight = this.getTreeHeight(height);
    body.setSize(trunkWidth, treeHeight);
    body.setOffset((this.sprite.width - trunkWidth) / 2, this.sprite.height - treeHeight);

    // Gentle sway animation
    this.startSwayAnimation();
  }

  private getTrunkWidth(height: 'short' | 'medium' | 'tall'): number {
    return { short: 20, medium: 25, tall: 30 }[height];
  }

  private getTreeHeight(height: 'short' | 'medium' | 'tall'): number {
    return { short: 80, medium: 120, tall: 180 }[height];
  }

  private getFoliageRadius(height: 'short' | 'medium' | 'tall'): number {
    return { short: 35, medium: 50, tall: 65 }[height];
  }

  private createTreeTexture(scene: Phaser.Scene, textureKey: string, height: 'short' | 'medium' | 'tall') {
    const graphics = scene.add.graphics();
    
    const treeHeight = this.getTreeHeight(height);
    const trunkWidth = this.getTrunkWidth(height);
    const foliageRadius = this.getFoliageRadius(height);
    
    const canvasWidth = foliageRadius * 2 + 20;
    const canvasHeight = treeHeight + foliageRadius + 10;
    const centerX = canvasWidth / 2;
    
    // === TRUNK ===
    const trunkColor = 0x8B4513; // Saddle brown
    const trunkShadow = 0x654321; // Dark brown
    
    graphics.fillStyle(trunkColor, 1);
    graphics.fillRect(centerX - trunkWidth / 2, canvasHeight - treeHeight, trunkWidth, treeHeight);
    
    // Trunk texture (vertical lines for bark)
    graphics.lineStyle(1.5, trunkShadow, 0.4);
    for (let i = 0; i < 3; i++) {
      const xOffset = (i - 1) * (trunkWidth / 4);
      graphics.lineBetween(
        centerX + xOffset, 
        canvasHeight - treeHeight,
        centerX + xOffset, 
        canvasHeight
      );
    }
    
    // Trunk outline
    graphics.lineStyle(2, trunkShadow, 1);
    graphics.strokeRect(centerX - trunkWidth / 2, canvasHeight - treeHeight, trunkWidth, treeHeight);
    
    // === FOLIAGE (Layered circles for bushy look) ===
    const foliageColor = 0x2E7D32; // Dark green
    const foliageHighlight = 0x4CAF50; // Lighter green
    const foliageShadow = 0x1B5E20; // Very dark green
    
    const foliageY = canvasHeight - treeHeight;
    
    // Back layer (shadow)
    graphics.fillStyle(foliageShadow, 0.5);
    graphics.fillCircle(centerX + foliageRadius * 0.3, foliageY + foliageRadius * 0.2, foliageRadius * 0.8);
    
    // Main foliage (3 overlapping circles)
    graphics.fillStyle(foliageColor, 1);
    graphics.fillCircle(centerX - foliageRadius * 0.4, foliageY, foliageRadius * 0.7);
    graphics.fillCircle(centerX, foliageY - foliageRadius * 0.3, foliageRadius);
    graphics.fillCircle(centerX + foliageRadius * 0.4, foliageY, foliageRadius * 0.7);
    
    // Highlight layer (top-left for dimension)
    graphics.fillStyle(foliageHighlight, 0.6);
    graphics.fillCircle(centerX - foliageRadius * 0.3, foliageY - foliageRadius * 0.5, foliageRadius * 0.5);
    
    // Foliage outline (subtle)
    graphics.lineStyle(2, foliageShadow, 0.8);
    graphics.strokeCircle(centerX - foliageRadius * 0.4, foliageY, foliageRadius * 0.7);
    graphics.strokeCircle(centerX, foliageY - foliageRadius * 0.3, foliageRadius);
    graphics.strokeCircle(centerX + foliageRadius * 0.4, foliageY, foliageRadius * 0.7);
    
    graphics.generateTexture(textureKey, canvasWidth, canvasHeight);
    graphics.destroy();
  }

  private startSwayAnimation() {
    // Gentle sway in the wind
    this.scene.tweens.add({
      targets: this.sprite,
      angle: 2,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite;
  }

  destroy() {
    this.sprite.destroy();
  }
}

