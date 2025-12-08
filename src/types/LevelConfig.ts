// Level configuration types for progressive difficulty system

export type HealthDisplayType = 'hearts' | 'bar';

export interface LevelConfig {
  levelNumber: number;
  name: string;
  
  // Health System
  healthDisplay: HealthDisplayType;
  maxHealth: number;
  
  // Auto-Scroll Settings
  autoScroll: boolean;
  scrollSpeed: number; // pixels per second (0 = no scroll)
  
  // Danger Zone (for auto-scroll levels)
  dangerZoneEnabled: boolean;
  dangerZoneDamagePerSecond: number;
  
  // Level Layout
  levelWidth: number;
  platformCount: number;
  treatCount: number;
  badItemCount: number;
  
  // Theme/Visuals
  theme: string;
  description: string;
}

// Predefined level configurations
export const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  1: {
    levelNumber: 1,
    name: 'Tutorial: Learn to Move',
    
    healthDisplay: 'hearts',
    maxHealth: 3,
    
    autoScroll: false,
    scrollSpeed: 0,
    
    dangerZoneEnabled: false,
    dangerZoneDamagePerSecond: 0,
    
    levelWidth: 5200,
    platformCount: 25,
    treatCount: 16,
    badItemCount: 10,
    
    theme: 'Backyard Escape',
    description: 'Learn the basics! Collect bones, avoid poo.'
  },
  
  2: {
    levelNumber: 2,
    name: 'Chase Begins: Keep Moving',
    
    healthDisplay: 'bar',
    maxHealth: 10,
    
    autoScroll: true,
    scrollSpeed: 60, // Noticeable pressure - doubled!
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 1,
    
    levelWidth: 7800,
    platformCount: 36,
    treatCount: 23,
    badItemCount: 16,
    
    theme: 'Neighborhood Chase',
    description: 'The owner is coming! Keep moving forward!'
  },
  
  3: {
    levelNumber: 3,
    name: 'Owner Pursuit',
    
    healthDisplay: 'bar',
    maxHealth: 10,
    
    autoScroll: true,
    scrollSpeed: 100, // FAST! Doubled from 50!
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 1, // More dangerous
    
    levelWidth: 10400,
    platformCount: 46,
    treatCount: 29,
    badItemCount: 21,
    
    theme: 'Park Sprint',
    description: 'Full speed chase! Can you outrun your owner?'
  },
  
  4: {
    levelNumber: 4,
    name: 'Advanced: Owner Running!',
    
    healthDisplay: 'bar',
    maxHealth: 10,
    
    autoScroll: true,
    scrollSpeed: 140, // Very fast! (2.33 px/frame)
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 2, // DOUBLED damage!
    
    levelWidth: 13000,
    platformCount: 55,
    treatCount: 35,
    badItemCount: 26,
    
    theme: 'Backyard Sprint',
    description: 'Poo clusters ahead! Navigate carefully at high speed!'
  },
  
  5: {
    levelNumber: 5,
    name: 'Expert: Escape the Backyard!',
    
    healthDisplay: 'bar',
    maxHealth: 12, // Extra 2 hearts for compensation!
    
    autoScroll: true,
    scrollSpeed: 180, // EXTREME! (3 px/frame)
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 3, // TRIPLE damage!
    
    levelWidth: 15600,
    platformCount: 65,
    treatCount: 40,
    badItemCount: 31,
    
    theme: 'Backyard Finale',
    description: 'World 1 finale! Prove your mastery!'
  }
};

// Helper to get current level config (defaults to level 1)
export function getCurrentLevelConfig(levelNumber: number = 1): LevelConfig {
  return LEVEL_CONFIGS[levelNumber] || LEVEL_CONFIGS[1];
}

