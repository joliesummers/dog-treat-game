import Phaser from 'phaser';
import { GameConfig } from './config/GameConfig';
import { PreloadScene } from './scenes/PreloadScene';
import { MenuScene } from './scenes/MenuScene';
import { WorldSelectScene } from './scenes/WorldSelectScene';
import { LevelSelectScene } from './scenes/LevelSelectScene';
import { BreedSelectScene } from './scenes/BreedSelectScene';
import { GameScene } from './scenes/GameScene';
import { UIScene } from './scenes/UIScene';
import { LevelCompleteScene } from './scenes/LevelCompleteScene';
import { GameOverScene } from './scenes/GameOverScene';

// Add scenes to game config
const config: Phaser.Types.Core.GameConfig = {
  ...GameConfig,
  scene: [PreloadScene, MenuScene, WorldSelectScene, LevelSelectScene, BreedSelectScene, GameScene, UIScene, LevelCompleteScene, GameOverScene]
};

// Initialize game when DOM is loaded
window.addEventListener('load', () => {
  new Phaser.Game(config);
});
