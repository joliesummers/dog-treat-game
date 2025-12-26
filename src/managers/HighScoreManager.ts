/**
 * HighScoreManager - Manages high scores with player names
 * 
 * Features:
 * - Per-level leaderboards (top 10 scores per level)
 * - Global leaderboard (top 10 across all levels)
 * - Player name storage with scores
 * - Local storage persistence
 * - Score validation and sorting
 */

export interface HighScoreEntry {
  playerName: string;
  score: number;
  level: number;
  time: number;
  treatsCollected: number;
  totalTreats: number;
  stars: number;
  timestamp: number; // Unix timestamp
}

export class HighScoreManager {
  private static readonly MAX_ENTRIES_PER_LEVEL = 10;
  private static readonly MAX_GLOBAL_ENTRIES = 10;
  private static readonly LEVEL_SCORES_PREFIX = 'dogGame_level_';
  private static readonly GLOBAL_SCORES_KEY = 'dogGame_global_scores';
  private static readonly LAST_PLAYER_NAME_KEY = 'dogGame_last_player_name';

  /**
   * Check if a score qualifies for the level leaderboard
   */
  static isHighScore(level: number, score: number): boolean {
    const levelScores = this.getLevelScores(level);
    
    // If we have less than max entries, it's automatically a high score
    if (levelScores.length < this.MAX_ENTRIES_PER_LEVEL) {
      return true;
    }
    
    // Check if score beats the lowest score
    const lowestScore = levelScores[levelScores.length - 1].score;
    return score > lowestScore;
  }

  /**
   * Check if a score qualifies for the global leaderboard
   */
  static isGlobalHighScore(score: number): boolean {
    const globalScores = this.getGlobalScores();
    
    // If we have less than max entries, it's automatically a high score
    if (globalScores.length < this.MAX_GLOBAL_ENTRIES) {
      return true;
    }
    
    // Check if score beats the lowest score
    const lowestScore = globalScores[globalScores.length - 1].score;
    return score > lowestScore;
  }

  /**
   * Add a new high score entry
   */
  static addScore(entry: HighScoreEntry): { levelRank: number | null; globalRank: number | null } {
    const result = {
      levelRank: null as number | null,
      globalRank: null as number | null
    };

    // Save the player name for next time
    this.saveLastPlayerName(entry.playerName);

    // Add to level leaderboard
    if (this.isHighScore(entry.level, entry.score)) {
      const levelScores = this.getLevelScores(entry.level);
      levelScores.push(entry);
      
      // Sort by score (descending), then by time (ascending) for tiebreakers
      levelScores.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.time - b.time;
      });
      
      // Keep only top MAX_ENTRIES_PER_LEVEL
      const trimmedScores = levelScores.slice(0, this.MAX_ENTRIES_PER_LEVEL);
      this.saveLevelScores(entry.level, trimmedScores);
      
      // Find the rank (1-based)
      result.levelRank = trimmedScores.findIndex(e => 
        e.score === entry.score && 
        e.time === entry.time && 
        e.timestamp === entry.timestamp
      ) + 1;
    }

    // Add to global leaderboard
    if (this.isGlobalHighScore(entry.score)) {
      const globalScores = this.getGlobalScores();
      globalScores.push(entry);
      
      // Sort by score (descending), then by time (ascending) for tiebreakers
      globalScores.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.time - b.time;
      });
      
      // Keep only top MAX_GLOBAL_ENTRIES
      const trimmedScores = globalScores.slice(0, this.MAX_GLOBAL_ENTRIES);
      this.saveGlobalScores(trimmedScores);
      
      // Find the rank (1-based)
      result.globalRank = trimmedScores.findIndex(e => 
        e.score === entry.score && 
        e.time === entry.time && 
        e.timestamp === entry.timestamp
      ) + 1;
    }

    return result;
  }

  /**
   * Get high scores for a specific level
   */
  static getLevelScores(level: number): HighScoreEntry[] {
    const key = this.LEVEL_SCORES_PREFIX + level;
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      return [];
    }
    
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse level scores:', e);
      return [];
    }
  }

  /**
   * Get global high scores (across all levels)
   */
  static getGlobalScores(): HighScoreEntry[] {
    const stored = localStorage.getItem(this.GLOBAL_SCORES_KEY);
    
    if (!stored) {
      return [];
    }
    
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse global scores:', e);
      return [];
    }
  }

  /**
   * Get the player's best score for a level
   */
  static getPlayerBestScore(level: number, playerName: string): HighScoreEntry | null {
    const levelScores = this.getLevelScores(level);
    const playerScores = levelScores.filter(e => e.playerName === playerName);
    
    if (playerScores.length === 0) {
      return null;
    }
    
    // Return the highest scoring entry
    return playerScores[0]; // Already sorted by score descending
  }

  /**
   * Get the last used player name (for convenience)
   */
  static getLastPlayerName(): string {
    return localStorage.getItem(this.LAST_PLAYER_NAME_KEY) || '';
  }

  /**
   * Save the last used player name
   */
  static saveLastPlayerName(name: string): void {
    localStorage.setItem(this.LAST_PLAYER_NAME_KEY, name);
  }

  /**
   * Clear all high scores (for testing/reset)
   */
  static clearAllScores(): void {
    // Clear level scores
    for (let i = 1; i <= 20; i++) { // Support up to 20 levels
      localStorage.removeItem(this.LEVEL_SCORES_PREFIX + i);
    }
    
    // Clear global scores
    localStorage.removeItem(this.GLOBAL_SCORES_KEY);
  }

  /**
   * Get player rank in level leaderboard
   */
  static getPlayerLevelRank(level: number, playerName: string): number | null {
    const levelScores = this.getLevelScores(level);
    const index = levelScores.findIndex(e => e.playerName === playerName);
    
    return index === -1 ? null : index + 1;
  }

  /**
   * Get player rank in global leaderboard
   */
  static getPlayerGlobalRank(playerName: string): number | null {
    const globalScores = this.getGlobalScores();
    const index = globalScores.findIndex(e => e.playerName === playerName);
    
    return index === -1 ? null : index + 1;
  }

  /**
   * Private: Save level scores to local storage
   */
  private static saveLevelScores(level: number, scores: HighScoreEntry[]): void {
    const key = this.LEVEL_SCORES_PREFIX + level;
    localStorage.setItem(key, JSON.stringify(scores));
  }

  /**
   * Private: Save global scores to local storage
   */
  private static saveGlobalScores(scores: HighScoreEntry[]): void {
    localStorage.setItem(this.GLOBAL_SCORES_KEY, JSON.stringify(scores));
  }

  /**
   * Validate and sanitize player name
   */
  static sanitizePlayerName(name: string): string {
    // Trim whitespace
    name = name.trim();
    
    // Limit to 20 characters
    if (name.length > 20) {
      name = name.substring(0, 20);
    }
    
    // If empty after trim, use default
    if (name.length === 0) {
      name = 'Anonymous';
    }
    
    return name;
  }

  /**
   * Get level statistics for a player
   */
  static getPlayerStats(playerName: string): {
    totalLevelsCompleted: number;
    totalScore: number;
    averageStars: number;
    bestLevel: number | null;
    bestLevelScore: number;
  } {
    const stats = {
      totalLevelsCompleted: 0,
      totalScore: 0,
      averageStars: 0,
      bestLevel: null as number | null,
      bestLevelScore: 0
    };

    let totalStars = 0;
    const completedLevels = new Set<number>();

    // Check all levels
    for (let level = 1; level <= 20; level++) {
      const levelScores = this.getLevelScores(level);
      const playerScore = levelScores.find(e => e.playerName === playerName);
      
      if (playerScore) {
        completedLevels.add(level);
        stats.totalScore += playerScore.score;
        totalStars += playerScore.stars;
        
        if (playerScore.score > stats.bestLevelScore) {
          stats.bestLevel = level;
          stats.bestLevelScore = playerScore.score;
        }
      }
    }

    stats.totalLevelsCompleted = completedLevels.size;
    stats.averageStars = completedLevels.size > 0 ? totalStars / completedLevels.size : 0;

    return stats;
  }
}

