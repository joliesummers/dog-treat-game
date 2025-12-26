import Phaser from 'phaser';
import { HighScoreManager } from '../managers/HighScoreManager';

/**
 * HighScoresScene - Display leaderboards
 * 
 * Shows:
 * - Level leaderboards (top 10 per level)
 * - Global leaderboard (top 10 across all levels)
 * - Player statistics
 */
export class HighScoresScene extends Phaser.Scene {
  private currentView: 'global' | 'level' = 'global';
  private currentLevel: number = 1;
  private contentContainer?: Phaser.GameObjects.Container;

  constructor() {
    super('HighScoresScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(0, 0, width, height, 0x1a1a2e, 1)
      .setOrigin(0);

    // === HEADER ===
    this.add.text(width / 2, 40, '🏆 HIGH SCORES 🏆', {
      fontSize: '40px',
      color: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // === VIEW TABS ===
    this.createViewTabs(width);

    // === LEVEL SELECTOR (for level view) ===
    this.createLevelSelector(width);

    // === CONTENT AREA ===
    this.contentContainer = this.add.container(0, 0);
    this.refreshContent();

    // === BACK BUTTON ===
    const backButton = this.add.text(width / 2, height - 40, '← Back to Menu', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    backButton.on('pointerover', () => backButton.setScale(1.1));
    backButton.on('pointerout', () => backButton.setScale(1));
    backButton.on('pointerdown', () => this.goBack());

    // === CLEAR SCORES BUTTON (hidden, for testing) ===
    // Uncomment for testing
    /*
    const clearButton = this.add.text(20, height - 40, 'Clear All Scores', {
      fontSize: '14px',
      color: '#ff4444',
      backgroundColor: '#333333',
      padding: { x: 10, y: 5 }
    }).setOrigin(0, 0.5).setInteractive();

    clearButton.on('pointerdown', () => {
      if (confirm('Clear all high scores?')) {
        HighScoreManager.clearAllScores();
        this.refreshContent();
      }
    });
    */

    // Keyboard shortcuts
    this.input.keyboard?.on('keydown-ESC', () => this.goBack());
    this.input.keyboard?.on('keydown-LEFT', () => this.previousLevel());
    this.input.keyboard?.on('keydown-RIGHT', () => this.nextLevel());
  }

  private createViewTabs(width: number) {
    const tabY = 100;
    const tabSpacing = 200;

    // Global tab
    const globalTab = this.add.text(width / 2 - tabSpacing / 2, tabY, '🌍 Global', {
      fontSize: '22px',
      color: this.currentView === 'global' ? '#FFD700' : '#999999',
      backgroundColor: this.currentView === 'global' ? '#333333' : '#1a1a2e',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    globalTab.on('pointerover', () => globalTab.setScale(1.05));
    globalTab.on('pointerout', () => globalTab.setScale(1));
    globalTab.on('pointerdown', () => {
      this.currentView = 'global';
      this.refreshContent();
      this.scene.restart();
    });

    // Level tab
    const levelTab = this.add.text(width / 2 + tabSpacing / 2, tabY, '📋 Level', {
      fontSize: '22px',
      color: this.currentView === 'level' ? '#FFD700' : '#999999',
      backgroundColor: this.currentView === 'level' ? '#333333' : '#1a1a2e',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    levelTab.on('pointerover', () => levelTab.setScale(1.05));
    levelTab.on('pointerout', () => levelTab.setScale(1));
    levelTab.on('pointerdown', () => {
      this.currentView = 'level';
      this.refreshContent();
      this.scene.restart();
    });
  }

  private createLevelSelector(width: number) {
    if (this.currentView !== 'level') {
      return;
    }

    const selectorY = 150;

    // Previous button
    const prevButton = this.add.text(width / 2 - 100, selectorY, '◀', {
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5).setInteractive();

    prevButton.on('pointerover', () => prevButton.setScale(1.1));
    prevButton.on('pointerout', () => prevButton.setScale(1));
    prevButton.on('pointerdown', () => this.previousLevel());

    // Level display
    this.add.text(width / 2, selectorY, `Level ${this.currentLevel}`, {
      fontSize: '24px',
      color: '#FFD700',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Next button
    const nextButton = this.add.text(width / 2 + 100, selectorY, '▶', {
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5).setInteractive();

    nextButton.on('pointerover', () => nextButton.setScale(1.1));
    nextButton.on('pointerout', () => nextButton.setScale(1));
    nextButton.on('pointerdown', () => this.nextLevel());
  }

  private refreshContent() {
    if (!this.contentContainer) return;

    // Clear existing content
    this.contentContainer.removeAll(true);

    const width = this.cameras.main.width;
    const startY = this.currentView === 'level' ? 200 : 150;

    if (this.currentView === 'global') {
      this.displayGlobalScores(width, startY);
    } else {
      this.displayLevelScores(width, startY);
    }
  }

  private displayGlobalScores(width: number, startY: number) {
    const scores = HighScoreManager.getGlobalScores();

    if (scores.length === 0) {
      const emptyText = this.add.text(width / 2, startY + 100, 'No high scores yet!\n\nPlay some levels to get started!', {
        fontSize: '22px',
        color: '#999999',
        align: 'center'
      }).setOrigin(0.5);
      
      this.contentContainer?.add(emptyText);
      return;
    }

    // Header
    const headerY = startY;
    const header = this.add.text(width / 2, headerY, 'Rank | Player | Level | Score | Time', {
      fontSize: '16px',
      color: '#999999',
      fontFamily: 'monospace'
    }).setOrigin(0.5);
    this.contentContainer?.add(header);

    // Scores
    const lineHeight = 35;
    scores.forEach((entry, index) => {
      const y = headerY + 40 + index * lineHeight;
      const rank = index + 1;
      
      // Rank with medal for top 3
      let rankDisplay = `${rank}.`;
      if (rank === 1) rankDisplay = '🥇';
      else if (rank === 2) rankDisplay = '🥈';
      else if (rank === 3) rankDisplay = '🥉';

      // Format time
      const minutes = Math.floor(entry.time / 60);
      const seconds = Math.floor(entry.time % 60);
      const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      // Stars
      const stars = '⭐'.repeat(entry.stars);

      // Main text
      const scoreText = this.add.text(width / 2, y, 
        `${rankDisplay.padEnd(4)} ${entry.playerName.padEnd(15)} Lvl ${entry.level.toString().padStart(2)} ${entry.score.toString().padStart(5)} ${timeStr.padStart(5)}`,
        {
          fontSize: '16px',
          color: rank <= 3 ? '#FFD700' : '#ffffff',
          fontFamily: 'monospace'
        }
      ).setOrigin(0.5);

      // Stars on the right
      const starsText = this.add.text(width / 2 + 200, y, stars, {
        fontSize: '14px',
        color: '#FFD700'
      }).setOrigin(0, 0.5);

      this.contentContainer?.add([scoreText, starsText]);
    });
  }

  private displayLevelScores(width: number, startY: number) {
    const scores = HighScoreManager.getLevelScores(this.currentLevel);

    if (scores.length === 0) {
      const emptyText = this.add.text(width / 2, startY + 100, `No high scores for Level ${this.currentLevel} yet!\n\nBe the first!`, {
        fontSize: '22px',
        color: '#999999',
        align: 'center'
      }).setOrigin(0.5);
      
      this.contentContainer?.add(emptyText);
      return;
    }

    // Header
    const headerY = startY;
    const header = this.add.text(width / 2, headerY, 'Rank | Player | Score | Treats | Time', {
      fontSize: '16px',
      color: '#999999',
      fontFamily: 'monospace'
    }).setOrigin(0.5);
    this.contentContainer?.add(header);

    // Scores
    const lineHeight = 35;
    scores.forEach((entry, index) => {
      const y = headerY + 40 + index * lineHeight;
      const rank = index + 1;
      
      // Rank with medal for top 3
      let rankDisplay = `${rank}.`;
      if (rank === 1) rankDisplay = '🥇';
      else if (rank === 2) rankDisplay = '🥈';
      else if (rank === 3) rankDisplay = '🥉';

      // Format time
      const minutes = Math.floor(entry.time / 60);
      const seconds = Math.floor(entry.time % 60);
      const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      // Treats
      const treatStr = `${entry.treatsCollected}/${entry.totalTreats}`;

      // Stars
      const stars = '⭐'.repeat(entry.stars);

      // Main text
      const scoreText = this.add.text(width / 2, y,
        `${rankDisplay.padEnd(4)} ${entry.playerName.padEnd(15)} ${entry.score.toString().padStart(5)} ${treatStr.padStart(7)} ${timeStr.padStart(5)}`,
        {
          fontSize: '16px',
          color: rank <= 3 ? '#FFD700' : '#ffffff',
          fontFamily: 'monospace'
        }
      ).setOrigin(0.5);

      // Stars on the right
      const starsText = this.add.text(width / 2 + 200, y, stars, {
        fontSize: '14px',
        color: '#FFD700'
      }).setOrigin(0, 0.5);

      this.contentContainer?.add([scoreText, starsText]);
    });
  }

  private previousLevel() {
    if (this.currentLevel > 1) {
      this.currentLevel--;
      this.scene.restart();
    }
  }

  private nextLevel() {
    if (this.currentLevel < 20) { // Support up to 20 levels
      this.currentLevel++;
      this.scene.restart();
    }
  }

  private goBack() {
    this.scene.stop('HighScoresScene');
    this.scene.start('MenuScene');
  }

  shutdown() {
    this.input.keyboard?.removeAllListeners();
  }
}

