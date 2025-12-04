import Phaser from 'phaser';
import { GameConfig } from './config/GameConfig';
import { PreloadScene } from './scenes/PreloadScene';
import { GameScene } from './scenes/GameScene';

// Add scenes to game config
const config: Phaser.Types.Core.GameConfig = {
  ...GameConfig,
  scene: [PreloadScene, GameScene]
};

// Initialize game when DOM is loaded
window.addEventListener('load', () => {
  new Phaser.Game(config);
});
