export interface DogBreedStats {
  name: string;
  speed: number;           // Movement speed multiplier
  jumpPower: number;       // Jump velocity multiplier
  eatSpeed: number;        // How fast they eat treats (ms delay)
  distractionChance: number; // Chance per second to get distracted (0-1)
  description: string;
  color: number;           // Placeholder color until we have sprites
}

export const DOG_BREEDS: { [key: string]: DogBreedStats } = {
  pug: {
    name: 'Pug',
    speed: 1.0,
    jumpPower: 0.95,
    eatSpeed: 0,  // Instant eating!
    distractionChance: 0.0,  // Never distracted - focused on treats!
    description: 'Fast eater, loves treats!',
    color: 0xD4A574  // Fawn color
  },
  golden: {
    name: 'Golden Retriever',
    speed: 1.1,
    jumpPower: 1.05,
    eatSpeed: 200,  // Slight delay
    distractionChance: 0.15,  // 15% chance per second to get distracted
    description: 'Fast and jumpy, but easily distracted!',
    color: 0xF4C542  // Golden color
  }
};

export type BreedType = keyof typeof DOG_BREEDS;

