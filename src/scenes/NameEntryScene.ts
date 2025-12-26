import Phaser from 'phaser';
import { HighScoreManager, type HighScoreEntry } from '../managers/HighScoreManager';

interface LevelStats {
  score: number;
  time: number;
  treatsCollected: number;
  totalTreats: number;
  healthRemaining: number;
  maxHealth: number;
  perfectRun: boolean;
  treatPoints: number;
  healthBonus: number;
  perfectBonus: number;
  timeBonus: number;
}

interface NameEntryData {
  stats: LevelStats;
  level: number;
  stars: number;
  isLevelHighScore: boolean;
  isGlobalHighScore: boolean;
  fromGameOver: boolean; // true if from game over, false if from level complete
}

/**
 * NameEntryScene - Allows players to enter their name for high scores
 * 
 * Shows when a player achieves a high score (level or global)
 * Provides keyboard and on-screen input for name entry
 */
export class NameEntryScene extends Phaser.Scene {
  private inputText: string = '';
  private displayText?: Phaser.GameObjects.Text;
  private cursorBlinkTimer?: Phaser.Time.TimerEvent;
  private showCursor: boolean = true;
  private sceneData?: NameEntryData;
  private readonly MAX_NAME_LENGTH = 20;

  constructor() {
    super('NameEntryScene');
  }

  init(data: NameEntryData) {
    this.sceneData = data;
    
    // Pre-fill with last used name if available
    const lastUsedName = HighScoreManager.getLastPlayerName();
    if (lastUsedName) {
      this.inputText = lastUsedName;
    } else {
      this.inputText = '';
    }
    
    this.showCursor = true;
  }

  create() {
    if (!this.sceneData) {
      console.error('NameEntryScene: No data provided');
      this.scene.stop();
      return;
    }

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Semi-transparent background
    this.add.rectangle(0, 0, width, height, 0x000000, 0.85)
      .setOrigin(0);

    // === TITLE ===
    const titleText = this.sceneData.isGlobalHighScore 
      ? '🏆 GLOBAL HIGH SCORE! 🏆'
      : '⭐ LEVEL HIGH SCORE! ⭐';
    
    const titleColor = this.sceneData.isGlobalHighScore ? '#FFD700' : '#4CAF50';
    
    const title = this.add.text(width / 2, 60, titleText, {
      fontSize: '36px',
      color: titleColor,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Pulse animation for title
    this.tweens.add({
      targets: title,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // === SCORE DISPLAY ===
    this.add.text(width / 2, 120, `Score: ${this.sceneData.stats.score}`, {
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 150, `Level ${this.sceneData.level}`, {
      fontSize: '20px',
      color: '#cccccc'
    }).setOrigin(0.5);

    // === INSTRUCTION ===
    this.add.text(width / 2, 200, 'Enter your name:', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // === NAME INPUT BOX ===
    const inputBoxY = 250;
    this.add.rectangle(width / 2, inputBoxY, 400, 60, 0x333333, 1)
      .setStrokeStyle(3, 0x4CAF50);

    // Text display with cursor
    this.displayText = this.add.text(width / 2, inputBoxY, '', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.updateDisplayText();

    // Blinking cursor
    this.cursorBlinkTimer = this.time.addEvent({
      delay: 500,
      callback: () => {
        this.showCursor = !this.showCursor;
        this.updateDisplayText();
      },
      loop: true
    });

    // === KEYBOARD INPUT ===
    this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      this.handleKeyPress(event);
    });

    // === ON-SCREEN KEYBOARD (for mobile/touch) ===
    this.createOnScreenKeyboard(width, height);

    // === SUBMIT BUTTON ===
    const submitButton = this.add.text(width / 2, 490, '✓ Submit', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#4CAF50',
      padding: { x: 30, y: 12 }
    }).setOrigin(0.5).setInteractive();

    submitButton.on('pointerover', () => submitButton.setScale(1.1));
    submitButton.on('pointerout', () => submitButton.setScale(1));
    submitButton.on('pointerdown', () => this.submitScore());

    // === SKIP BUTTON ===
    const skipButton = this.add.text(width / 2, 545, 'Skip (Anonymous)', {
      fontSize: '16px',
      color: '#999999',
      backgroundColor: '#333333',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5).setInteractive();

    skipButton.on('pointerover', () => skipButton.setScale(1.05));
    skipButton.on('pointerout', () => skipButton.setScale(1));
    skipButton.on('pointerdown', () => this.submitAsAnonymous());

    // === HINT TEXT ===
    this.add.text(width / 2, height - 30, 'Press ENTER to submit • ESC to skip', {
      fontSize: '14px',
      color: '#666666'
    }).setOrigin(0.5);
  }

  private handleKeyPress(event: KeyboardEvent) {
    // Prevent default to avoid page scrolling
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) {
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      this.submitScore();
      return;
    }

    if (event.key === 'Escape') {
      this.submitAsAnonymous();
      return;
    }

    if (event.key === 'Backspace') {
      if (this.inputText.length > 0) {
        this.inputText = this.inputText.slice(0, -1);
        this.updateDisplayText();
      }
      return;
    }

    // Accept alphanumeric characters, spaces, and some special characters
    if (event.key.length === 1 && this.inputText.length < this.MAX_NAME_LENGTH) {
      const char = event.key;
      // Allow letters, numbers, spaces, and basic punctuation
      if (/[a-zA-Z0-9 \-_!.]/.test(char)) {
        this.inputText += char;
        this.updateDisplayText();
      }
    }
  }

  private updateDisplayText() {
    if (!this.displayText) return;

    const displayName = this.inputText || 'Type your name...';
    const cursor = this.showCursor ? '|' : ' ';
    
    // Show cursor only when there's text or actively typing
    const textToShow = this.inputText.length > 0 
      ? this.inputText + cursor 
      : displayName;

    this.displayText.setText(textToShow);
    
    // Gray out placeholder text
    if (this.inputText.length === 0) {
      this.displayText.setColor('#666666');
    } else {
      this.displayText.setColor('#ffffff');
    }
  }

  private createOnScreenKeyboard(width: number, _height: number) {
    // Simple on-screen keyboard for mobile
    const keyboardY = 330;
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    const keySize = 32;
    const keySpacing = 36;
    
    rows.forEach((row, rowIndex) => {
      const rowWidth = row.length * keySpacing;
      const startX = (width - rowWidth) / 2 + keySize / 2;
      const y = keyboardY + rowIndex * (keySize + 8);

      row.forEach((key, colIndex) => {
        const x = startX + colIndex * keySpacing;
        
        const keyButton = this.add.text(x, y, key, {
          fontSize: '16px',
          color: '#ffffff',
          backgroundColor: '#555555',
          padding: { x: 8, y: 6 }
        }).setOrigin(0.5).setInteractive();

        keyButton.on('pointerover', () => keyButton.setScale(1.1));
        keyButton.on('pointerout', () => keyButton.setScale(1));
        keyButton.on('pointerdown', () => {
          if (key === '⌫') {
            if (this.inputText.length > 0) {
              this.inputText = this.inputText.slice(0, -1);
              this.updateDisplayText();
            }
          } else {
            if (this.inputText.length < this.MAX_NAME_LENGTH) {
              this.inputText += key;
              this.updateDisplayText();
            }
          }
        });
      });
    });

    // Space bar
    const spaceBar = this.add.text(width / 2, keyboardY + 3 * (keySize + 8), 'SPACE', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#555555',
      padding: { x: 60, y: 6 }
    }).setOrigin(0.5).setInteractive();

    spaceBar.on('pointerover', () => spaceBar.setScale(1.1));
    spaceBar.on('pointerout', () => spaceBar.setScale(1));
    spaceBar.on('pointerdown', () => {
      if (this.inputText.length < this.MAX_NAME_LENGTH) {
        this.inputText += ' ';
        this.updateDisplayText();
      }
    });
  }

  private submitScore() {
    if (!this.sceneData) return;

    // Clean up cursor timer
    if (this.cursorBlinkTimer) {
      this.cursorBlinkTimer.remove();
    }

    // Sanitize name
    const playerName = HighScoreManager.sanitizePlayerName(this.inputText);

    // Create high score entry
    const entry: HighScoreEntry = {
      playerName,
      score: this.sceneData.stats.score,
      level: this.sceneData.level,
      time: this.sceneData.stats.time,
      treatsCollected: this.sceneData.stats.treatsCollected,
      totalTreats: this.sceneData.stats.totalTreats,
      stars: this.sceneData.stars,
      timestamp: Date.now()
    };

    // Add to high scores
    const result = HighScoreManager.addScore(entry);

    // Store result in registry for next scene
    this.registry.set('highScoreResult', {
      levelRank: result.levelRank,
      globalRank: result.globalRank,
      playerName
    });

    // Navigate to appropriate scene
    this.scene.stop('NameEntryScene');
    
    if (this.sceneData.fromGameOver) {
      // From game over - go to level select
      this.scene.stop('GameOverScene');
      this.scene.stop('GameScene');
      this.scene.stop('UIScene');
      this.scene.start('LevelSelectScene');
    } else {
      // From level complete - go to level complete scene
      this.scene.start('LevelCompleteScene');
    }
  }

  private submitAsAnonymous() {
    this.inputText = 'Anonymous';
    this.submitScore();
  }

  shutdown() {
    // Clean up
    if (this.cursorBlinkTimer) {
      this.cursorBlinkTimer.remove();
    }
    this.input.keyboard?.removeAllListeners('keydown');
  }
}

