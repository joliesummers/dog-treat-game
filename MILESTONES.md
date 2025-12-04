# Dog Treat Side Scroller Game Plan

## Tech Stack

- **Engine**: Phaser 3 (TypeScript)
- **Build**: Vite
- **Assets**: Free pixel art from OpenGameArt/itch.io
- **Tools**: Tiled map editor for levels

## Agile Milestones (Vertical Slices)

### ✅ Milestone 0: "Dev Environment Setup" - Tools & Repository (COMPLETED)

**Value**: Development environment ready, project hosted on GitHub

- ✅ Install Node.js LTS (v20+) and npm
- ✅ Install VS Code (or preferred editor) with TypeScript extensions
- ✅ Set up Git and create GitHub repository for the game
- ✅ Initialize Phaser + TypeScript + Vite project from template
- ✅ Configure basic project structure and dependencies
- ✅ Create initial README with setup instructions
- ✅ Set up GitHub Actions workflow for automated build/deploy
- ✅ Deploy initial "Hello World" to GitHub Pages
- ✅ **Verification**: Can run `npm run dev` locally and see deployed URL

**Status**: Game is running locally at http://localhost:5173/dog-treat-game/
**Next Step**: Create GitHub repo at https://github.com/joliesummers/dog-treat-game and follow SETUP_GITHUB.md

---

### ✅ Milestone 1: "Hello Dog" - Core Movement (COMPLETED)

**Value**: Player can see and control a dog character on screen

- ✅ Set up new Phaser + TypeScript + Vite project structure
- ✅ Configure basic game scene with physics
- ✅ Add placeholder dog sprite (or find free dog sprite)
- ✅ Implement left/right keyboard movement with ground friction
- ✅ Implement jump physics with gravity
- ✅ Add basic ground platform
- ✅ **Playable test**: Dog runs and jumps smoothly

**Status**: Dog entity created with physics-based movement, jumping, and platform collision!

### ✅ Milestone 2: "Treat Collector" - Core Game Loop (COMPLETED)

**Value**: Core "eat treat to win" mechanic works

- ✅ Add treat sprite/object on the level
- ✅ Implement collision detection between dog and treat
- ✅ Add "eating" animation or effect (sprite disappear, sound)
- ✅ Display treat counter on UI
- ✅ Add simple win condition (collect X treats to finish level)
- ✅ Show basic "Level Complete" screen
- ✅ **Playable test**: Can collect treats and complete the level

**Status**: 10 treats placed in level, collection mechanics working, UI tracking, level complete screen implemented!

### ✅ Milestone 3: "Dangerous Snacks" - Health System (COMPLETED)

**Value**: Risk/reward gameplay with bad items

- ✅ Add "bad item" sprites (chocolate, grapes, etc.)
- ✅ Implement health points system (start with 3 hearts)
- ✅ Display health UI (hearts/bar)
- ✅ Collision with bad items reduces health
- ✅ Add lose condition (health reaches zero)
- ✅ Show "Game Over" screen with restart option
- ✅ Add invincibility frames after taking damage (visual feedback)
- ✅ **Playable test**: Player must avoid bad items or lose

**Status**: Health system implemented with 3 hearts, bad items (chocolate/grapes), invincibility frames, flash damage feedback, and game over screen!

### ✅ Milestone 4: "Level Design" - First Complete Level (COMPLETED)

**Value**: Full level experience with pacing and challenge

- ✅ Integrate Tiled map editor for level design (deferred for later iteration)
- ✅ Create first level layout with multiple platforms
- ✅ Add 12 treats strategically placed
- ✅ Add 8 bad items as obstacles
- ✅ Implement level boundaries and fall death
- ✅ Add background layer (sky gradient)
- ✅ Tune jump height, movement speed, treat/obstacle placement
- ✅ **Playable test**: Balanced level that takes 30-60 seconds to complete

**Status**: Level 1 complete with 4 platforms, varied heights, strategic item placement, fall detection, and tuned physics!

### ✅ Milestone 5: "Pug Power" - Dog Breed Traits (COMPLETED)

**Value**: Unique character with special abilities

- ✅ Create dog stats system (speed, eat_speed, distraction_chance)
- ✅ Implement Pug traits: fast eating, instant collection
- ✅ Add eating animation/delay based on breed
- ✅ Show breed name and stats on start screen
- ✅ Add breed selection screen (even if only 1 breed initially)
- ✅ **Playable test**: Pug feels different from baseline (faster eating)

**Status**: Breed system implemented! Pug has instant eating, breed selection screen shows stats, different breeds have different movement/jump multipliers!

### Milestone 6: "Polish & Juice" - Game Feel (Week 4)

**Value**: Game feels satisfying to play

- [ ] Add sound effects (jump, eat, damage, win/lose)
- [ ] Add particle effects (treat sparkle, damage flash)
- [ ] Implement camera follow/smooth tracking
- [ ] Add start menu with "Play" button
- [ ] Add pause functionality (P key)
- [ ] Improve UI styling (retro pixel font)
- [ ] Add background music (looping 8-bit track)
- [ ] **Playable test**: Game feels responsive and rewarding

### Milestone 7: "More Breeds" - Golden Retriever (Week 5)

**Value**: Replayability with different playstyles

- [ ] Add Golden Retriever sprite
- [ ] Implement distraction mechanic (random chance to pause briefly)
- [ ] Add visual indicator for distraction (thought bubble, animation)
- [ ] Update breed selection screen with 2 choices
- [ ] Balance traits so both breeds are viable
- [ ] **Playable test**: Both breeds offer distinct strategies

### Milestone 8: "Level 2 & 3" - Content Expansion (Week 5-6)

**Value**: Extended gameplay with progression

- [ ] Design 2 additional levels with increasing difficulty
- [ ] Add level selection screen
- [ ] Implement level unlock system (beat 1 to unlock 2)
- [ ] Vary obstacles/layout per level (gaps, moving platforms optional)
- [ ] Add level transition screens
- [ ] **Playable test**: 3-level progression feels rewarding

### Milestone 9: "Deploy & Share" - Production Ready (Week 6)

**Value**: Game is publicly playable

- [ ] Build production bundle with Vite
- [ ] Deploy to itch.io or GitHub Pages
- [ ] Add meta tags for social sharing
- [ ] Create simple landing page with controls instructions
- [ ] Test on different browsers/devices
- [ ] Add analytics (optional: view count, completion rate)
- [ ] **Playable test**: Game runs in production, shareable URL works

## Post-MVP Ideas (Backlog)

- More dog breeds (Chihuahua, Corgi, Husky, etc.)
- Power-ups (speed boost, invincibility)
- Moving obstacles/enemies
- Boss levels
- Leaderboard/scoring system
- Mobile touch controls
- Save progress (LocalStorage)

## Key Files to Create

- `game/` - New game project folder
- `game/src/main.ts` - Phaser game initialization
- `game/src/scenes/GameScene.ts` - Main gameplay scene
- `game/src/entities/Dog.ts` - Player character class
- `game/src/entities/Treat.ts` - Collectible treat class
- `game/src/entities/BadItem.ts` - Harmful item class
- `game/src/config.ts` - Game configuration constants
- `game/assets/` - Sprites, audio, tilemaps

## Learning Resources

- Phaser 3 official examples: https://phaser.io/examples
- Phaser 3 TypeScript template with Vite
- Free assets: OpenGameArt.org, itch.io, Kenney.nl
- Tiled map editor tutorial for Phaser integration

