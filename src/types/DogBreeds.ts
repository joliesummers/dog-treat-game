export interface DogBreedStats {
  name: string;
  speed: number;           // Movement speed multiplier
  jumpPower: number;       // Jump velocity multiplier
  eatSpeed: number;        // How fast they eat treats (ms delay)
  description: string;
  color: number;           // Placeholder color until we have sprites
}

export const DOG_BREEDS: { [key: string]: DogBreedStats } = {
  pug: {
    name: 'Pug',
    speed: 1.0,
    jumpPower: 0.95,
    eatSpeed: 0,  // Instant eating!
    description: 'Fast eater, loves treats!',
    color: 0xD4A574  // Fawn color
  },
  // Placeholder for future breeds
  golden: {
    name: 'Golden Retriever',
    speed: 1.1,
    jumpPower: 1.05,
    eatSpeed: 200,  // Slight delay
    description: 'Gets distracted easily',
    color: 0xF4C542  // Golden color
  }
};

export type BreedType = keyof typeof DOG_BREEDS;

