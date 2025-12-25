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
  scrollStartDelay: number; // seconds to wait before auto-scroll starts
  
  // Danger Zone (for auto-scroll levels)
  dangerZoneEnabled: boolean;
  dangerZoneDamagePerSecond: number;
  
  // Level Layout
  levelWidth: number;
  platformCount: number;
  treatCount: number; // Total treats available in level (all optional for score)
  badItemCount: number;
  
  // Goal System
  goalPosition: number; // X position of goal house (reach to win!)
  
  // Star Rating Targets
  bronzeScore: number; // Just reach goal (always 0)
  silverScore: number; // Score target for ⭐⭐
  goldScore: number; // Score target for ⭐⭐⭐
  silverTime: number; // Time target (seconds) for ⭐⭐
  goldTime: number; // Time target (seconds) for ⭐⭐⭐
  
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
    scrollStartDelay: 0, // No auto-scroll
    
    dangerZoneEnabled: false,
    dangerZoneDamagePerSecond: 0,
    
    levelWidth: 5200,
    platformCount: 25,
    treatCount: 17, // All optional for score!
    badItemCount: 10,
    
    goalPosition: 5000, // 200px before end
    bronzeScore: 0, // Just reach goal
    silverScore: 1000,
    goldScore: 2000,
    silverTime: 90, // 1.5 minutes
    goldTime: 60, // 1 minute
    
    theme: 'Backyard Escape',
    description: 'Learn the basics! Reach the dog house!'
  },
  
  2: {
    levelNumber: 2,
    name: 'Chase Begins: Keep Moving',
    
    healthDisplay: 'bar',
    maxHealth: 10,
    
    autoScroll: true,
    scrollSpeed: 60, // Noticeable pressure - doubled!
    scrollStartDelay: 5, // 5 second grace period before owner starts chasing
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 1,
    
    levelWidth: 7800,
    platformCount: 36,
    treatCount: 23, // All optional for score!
    badItemCount: 16,
    
    goalPosition: 7600, // 200px before end
    bronzeScore: 0, // Just reach goal
    silverScore: 1500,
    goldScore: 2500,
    silverTime: 120, // 2 minutes
    goldTime: 90, // 1.5 minutes
    
    theme: 'Neighborhood Chase',
    description: 'The owner is coming! Reach the dog house!'
  },
  
  3: {
    levelNumber: 3,
    name: 'Owner Pursuit',
    
    healthDisplay: 'bar',
    maxHealth: 10,
    
    autoScroll: true,
    scrollSpeed: 100, // FAST! Doubled from 50!
    scrollStartDelay: 5, // 5 second grace period
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 1, // More dangerous
    
    levelWidth: 10400,
    platformCount: 46,
    treatCount: 29, // All optional for score!
    badItemCount: 21,
    
    goalPosition: 10200, // 200px before end
    bronzeScore: 0, // Just reach goal
    silverScore: 2000,
    goldScore: 3000,
    silverTime: 150, // 2.5 minutes
    goldTime: 120, // 2 minutes
    
    theme: 'Park Sprint',
    description: 'Full speed chase! Reach the dog house fast!'
  },
  
  4: {
    levelNumber: 4,
    name: 'Advanced: Owner Running!',
    
    healthDisplay: 'bar',
    maxHealth: 10,
    
    autoScroll: true,
    scrollSpeed: 140, // Very fast! (2.33 px/frame)
    scrollStartDelay: 5, // 5 second grace period
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 2, // DOUBLED damage!
    
    levelWidth: 13000,
    platformCount: 55,
    treatCount: 35, // All optional for score!
    badItemCount: 26,
    
    goalPosition: 12800, // 200px before end
    bronzeScore: 0, // Just reach goal
    silverScore: 2500,
    goldScore: 3500,
    silverTime: 180, // 3 minutes
    goldTime: 150, // 2.5 minutes
    
    theme: 'Backyard Sprint',
    description: 'High speed challenge! Reach the safety of the dog house!'
  },
  
  5: {
    levelNumber: 5,
    name: 'Expert: Escape the Backyard!',
    
    healthDisplay: 'bar',
    maxHealth: 12, // Extra 2 hearts for compensation!
    
    autoScroll: true,
    scrollSpeed: 180, // EXTREME! (3 px/frame)
    scrollStartDelay: 5, // 5 second grace period
    
    dangerZoneEnabled: true,
    dangerZoneDamagePerSecond: 3, // TRIPLE damage!
    
    levelWidth: 15600,
    platformCount: 65,
    treatCount: 40, // All optional for score!
    badItemCount: 31,
    
    goalPosition: 15400, // 200px before end
    bronzeScore: 0, // Just reach goal
    silverScore: 3000,
    goldScore: 4000,
    silverTime: 210, // 3.5 minutes
    goldTime: 180, // 3 minutes
    
    theme: 'Backyard Finale',
    description: 'World 1 finale! Reach the dog house to escape!'
  }
};

// Helper to get current level config (defaults to level 1)
export function getCurrentLevelConfig(levelNumber: number = 1): LevelConfig {
  return LEVEL_CONFIGS[levelNumber] || LEVEL_CONFIGS[1];
}

