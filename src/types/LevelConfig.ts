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
    
    levelWidth: 4000,
    platformCount: 19,
    treatCount: 12,
    badItemCount: 8,
    
    theme: 'Backyard Escape',
    description: 'Learn the basics! Collect bones, avoid poo.'
  },
  
  2: {
    levelNumber: 2,
    name: 'Chase Begins: Keep Moving',
    
    healthDisplay: 'bar',
    maxHealth: 10,
    
    autoScroll: true,
    scrollSpeed: 30, // Gentle introduction
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 1,
    
    levelWidth: 6000,
    platformCount: 28,
    treatCount: 18,
    badItemCount: 12,
    
    theme: 'Neighborhood Chase',
    description: 'The owner is coming! Keep moving forward!'
  },
  
  3: {
    levelNumber: 3,
    name: 'Owner Pursuit: Full Speed!',
    
    healthDisplay: 'bar',
    maxHealth: 10,
    
    autoScroll: true,
    scrollSpeed: 50, // Faster!
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 2, // More dangerous
    
    levelWidth: 8000,
    platformCount: 35,
    treatCount: 24,
    badItemCount: 16,
    
    theme: 'Park Sprint',
    description: 'Full speed chase! Can you outrun your owner?'
  }
};

// Helper to get current level config (defaults to level 1)
export function getCurrentLevelConfig(levelNumber: number = 1): LevelConfig {
  return LEVEL_CONFIGS[levelNumber] || LEVEL_CONFIGS[1];
}

