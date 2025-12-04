# 🐕 Dog Treat Side Scroller - Master Project Plan

**Repository**: https://github.com/joliesummers/dog-treat-game  
**Live Game**: https://joliesummers.github.io/dog-treat-game/  
**Status**: ✅ MVP Complete and Deployed!

---

## Tech Stack

- **Engine**: Phaser 3 (TypeScript)
- **Build**: Vite
- **Assets**: Free pixel art placeholders (OpenGameArt/itch.io for future sprites)
- **Tools**: Tiled map editor (planned for future levels)
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages
- **Testing**: ESLint + TypeScript + Build verification (see [TESTING_ROADMAP.md](./TESTING_ROADMAP.md))

---

## Agile Milestones (Vertical Slices)

### ✅ Milestone 0: "Dev Environment Setup" - Tools & Repository (COMPLETED)

**Value**: Development environment ready, project hosted on GitHub

- ✅ Install Node.js LTS (v20+) and npm
- ✅ Install VS Code (or preferred editor) with TypeScript extensions
- ✅ Set up Git and create GitHub repository
- ✅ Initialize Phaser + TypeScript + Vite project
- ✅ Configure basic project structure and dependencies
- ✅ Create initial README with setup instructions
- ✅ Set up GitHub Actions workflow for automated build/deploy
- ✅ Configure ESLint for code quality
- ✅ Deploy initial "Hello World" to GitHub Pages

**Status**: Complete with CI/CD pipeline, ESLint, and comprehensive documentation

---

### ✅ Milestone 1: "Hello Dog" - Core Movement (COMPLETED)

**Value**: Player can see and control a dog character on screen

- ✅ Set up Phaser + TypeScript + Vite project structure
- ✅ Configure basic game scene with physics
- ✅ Add placeholder dog sprite (brown rectangle with face)
- ✅ Implement left/right keyboard movement with ground friction
- ✅ Implement jump physics with gravity
- ✅ Add basic ground platform
- ✅ Tune movement speed and jump velocity

**Status**: Dog entity with physics-based movement, smooth jumping, and responsive controls

---

### ✅ Milestone 2: "Treat Collector" - Core Game Loop (COMPLETED)

**Value**: Core "eat treat to win" mechanic works

- ✅ Add treat sprite/object on the level (12 treats)
- ✅ Implement collision detection between dog and treat
- ✅ Add "eating" animation with particle effects
- ✅ Display treat counter on UI
- ✅ Add simple win condition (collect all treats)
- ✅ Show basic "Level Complete" screen
- ✅ Add multiple restart methods (SPACE, click, any key)

**Status**: 12 treats strategically placed, collection mechanics with particle burst effects, Level Complete screen

---

### ✅ Milestone 3: "Dangerous Snacks" - Health System (COMPLETED)

**Value**: Risk/reward gameplay with bad items

- ✅ Add "bad item" sprites (chocolate, grapes - 8 total)
- ✅ Implement health points system (start with 3 hearts)
- ✅ Display health UI (heart emojis)
- ✅ Collision with bad items reduces health
- ✅ Add lose condition (health reaches zero)
- ✅ Show "Game Over" screen with restart option
- ✅ Add invincibility frames after taking damage (visual feedback, 2 seconds)
- ✅ Add particle effects for damage

**Status**: 8 bad items (chocolate/grapes), 3-heart system, invincibility frames with flashing, Game Over screen with multiple input methods

---

### ✅ Milestone 4: "Level Design" - First Complete Level (COMPLETED)

**Value**: Full level experience with pacing and challenge

- ⏭️ Integrate Tiled map editor for level design (Deferred to later milestones)
- ✅ Create first level layout with multiple platforms (4 platforms)
- ✅ Add 12 treats strategically placed
- ✅ Add 8 bad items as obstacles
- ✅ Implement level boundaries and fall death
- ✅ Add background layer (sky gradient)
- ✅ Tune jump height, movement speed, treat/obstacle placement
- ✅ Add visual polish (platform colors, depth layers)

**Status**: 4 platforms with varied heights, 12 treats, 8 bad items, fall detection triggers instant game over, sky gradient background, physics tuned for 30-60 second gameplay

---

### ✅ Milestone 5: "Pug Power" - Dog Breed Traits (COMPLETED)

**Value**: Unique character with special abilities

- ✅ Create dog stats system (speed, eat_speed, distraction_chance, jumpPower)
- ✅ Implement Pug traits: instant eating (eatSpeed: 0)
- ✅ Add eating delay system based on breed
- ✅ Show breed name and stats on selection screen
- ✅ Add breed selection screen with visual preview
- ✅ Store selected breed in game registry

**Status**: Breed system with stat multipliers (speed, jump, eatSpeed), Pug with instant eating, breed selection screen showing stats, breed data structure ready for Golden Retriever

---

### ✅ Milestone 6: "Polish & Juice" - Game Feel (COMPLETED)

**Value**: Game feels satisfying to play

- ⏭️ Add sound effects (jump, eat, damage, win/lose) - Deferred for Phase 2
- ✅ Add particle effects (treat sparkle on collect, red particles on damage)
- ✅ Implement camera follow with smooth tracking (lerp 0.1)
- ✅ Add start menu with "Play" button and animations
- ✅ Add pause functionality (P key with overlay)
- ✅ Improve UI styling with depth layers
- ⏭️ Add background music (looping 8-bit track) - Deferred for Phase 2
- ✅ Add blinking text animations
- ✅ Multiple input methods (keyboard + mouse/touch)

**Status**: Animated main menu with floating treats, pause overlay, particle effects for collect/damage, smooth camera follow, responsive input handling on all screens

---

### 🚧 Milestone 7: "More Breeds" - Golden Retriever (PENDING)

**Value**: Replayability with different playstyles

**Planned Features:**
- Add Golden Retriever sprite (golden color placeholder)
- Implement distraction mechanic (random chance to pause briefly)
- Add visual indicator for distraction (thought bubble or animation pause)
- Update breed selection screen with 2 choices
- Balance traits so both breeds are viable
- **Playable test**: Both breeds offer distinct strategies

**Testing**: Before starting, add Phase 2 tests from [TESTING_ROADMAP.md](./TESTING_ROADMAP.md)

**Status**: Not started - Ready for implementation after user testing

---

### 🚧 Milestone 8: "Level 2 & 3" - Content Expansion (PENDING)

**Value**: Extended gameplay with progression

**Planned Features:**
- Design 2 additional levels with increasing difficulty
- Add level selection screen
- Implement level unlock system (beat 1 to unlock 2)
- Vary obstacles/layout per level (gaps, moving platforms optional)
- Add level transition screens
- **Playable test**: 3-level progression feels rewarding

**Testing**: Before starting, add Phase 3 tests from [TESTING_ROADMAP.md](./TESTING_ROADMAP.md)

**Status**: Not started - Consider after Milestone 7 and user feedback

---

### ✅ Milestone 9: "Deploy & Share" - Production Ready (COMPLETED)

**Value**: Game is publicly playable

- ✅ Build production bundle with Vite
- ✅ Deploy to GitHub Pages (automated via GitHub Actions)
- ✅ Add meta tags for social sharing (Open Graph, Twitter cards)
- ✅ Create comprehensive README with controls instructions
- ✅ Add .nvmrc for Node version consistency
- ✅ Test builds successfully in CI/CD
- ⏭️ Add analytics (optional: view count, completion rate) - Deferred
- ✅ Document deployment process (DEPLOYMENT.md)

**Status**: Deployed with automated CI/CD, ESLint in pipeline, meta tags for sharing, comprehensive documentation (README, DEPLOYMENT, TESTING_ROADMAP, PROJECT_PLAN)

**Live URL**: https://joliesummers.github.io/dog-treat-game/

---

## Testing Strategy

**See**: [TESTING_ROADMAP.md](./TESTING_ROADMAP.md) for detailed phased approach

### Current Testing (MVP - v0.1.0)
- ✅ **TypeScript Compilation** - `tsc` ensures no type errors
- ✅ **ESLint** - Code quality and consistency checks  
- ✅ **Build Verification** - `npm run build` confirms production builds work
- ✅ **CI/CD Pipeline** - All tests run automatically on every push

**Philosophy**: Add tests when they help you move faster. Playtest > Unit Tests for games.

### Future Testing Phases

| Phase | Trigger | Add | Time |
|-------|---------|-----|------|
| Phase 1 | After 10 players | Unit tests for core logic | 2-3h |
| Phase 2 | Before Milestone 7 | Breed system tests | 2-3h |
| Phase 3 | Before Milestone 8 | Level/integration tests | 3-4h |
| Phase 4 | Polish for wide release | Performance/visual tests | 4-6h |

---

## Critical Bug Fixes Applied

Throughout development, 6 critical bugs were identified and fixed:

1. **Game Over input not responding** - Added multiple input methods (SPACE, click, any key)
2. **Multiple game over triggers** - Added `gameOver` flag and physics pause on end conditions
3. **Treats not resetting on restart** - Properly stop and reset GameScene state arrays
4. **Menu SPACE key not working on return visits** - Fixed event listener management (`.on` instead of `.once`)
5. **Breed Select SPACE key not working** - Cleaned up duplicate listeners, used `.once` with cleanup
6. **UIScene race condition crash** - Added 100ms delay for UI updates and safety checks

All fixes committed in separate commits for traceability.

---

## Post-MVP Ideas (Backlog)

### High Priority
- **More dog breeds** - Chihuahua (jumps high), Corgi (fast runner), Husky (strong/tanky)
- **Sound effects** - Jump, eat, damage, win/lose
- **Background music** - Looping 8-bit chiptune track

### Medium Priority
- **Power-ups** - Speed boost, invincibility star, magnet for treats
- **Moving obstacles** - Bouncing balls, sliding chocolate bars
- **Save progress** - LocalStorage for level unlocks and best times
- **Leaderboard** - Time-based scoring system

### Low Priority
- **Boss levels** - Special challenge levels with unique mechanics
- **Mobile touch controls** - Virtual joystick for mobile play
- **Achievements** - Complete all levels, no-damage run, speed runs
- **Visual polish** - Replace placeholders with pixel art sprites

---

## Key Project Files

### Source Code
- `src/main.ts` - Phaser game initialization
- `src/config/GameConfig.ts` - Game configuration constants
- `src/scenes/` - All game scenes (Menu, BreedSelect, Game, UI, LevelComplete, GameOver, Preload)
- `src/entities/` - Game entities (Dog, Treat, BadItem)
- `src/types/` - TypeScript types and breed definitions

### Configuration
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Build configuration
- `eslint.config.js` - Linting rules (ESLint v9)
- `tsconfig.json` - TypeScript compiler options
- `.github/workflows/deploy.yml` - CI/CD pipeline

### Documentation
- `README.md` - Project overview and quick start
- `PROJECT_PLAN.md` - This file - master plan
- `TESTING_ROADMAP.md` - Phased testing strategy
- `DEPLOYMENT.md` - Deployment instructions
- `SETUP_GITHUB.md` - GitHub setup guide
- `MILESTONES.md` - Detailed milestone tracking

---

## Development Status Summary

**Completed**: 7 out of 9 milestones ✅  
**MVP Status**: Complete and deployed! 🎉  
**Next Steps**: 
1. Share with 5-10 players for feedback
2. Fix any critical bugs that emerge
3. Decide: Add Golden Retriever (Milestone 7) OR Add more levels (Milestone 8)

**Recommendation**: Get user feedback before adding more features. Focus on what players want most!

---

## Learning Resources

- **Phaser 3**: https://phaser.io/examples
- **TypeScript + Phaser**: https://phaser.io/tutorials/making-your-first-phaser-3-game
- **Free Assets**: 
  - OpenGameArt.org
  - itch.io (game assets section)
  - Kenney.nl (large asset packs)
- **Tiled Map Editor**: https://www.mapeditor.org/
- **Game Development**: 
  - "The Art of Game Design" by Jesse Schell
  - "Game Programming Patterns" by Robert Nystrom

---

**Last Updated**: December 2024  
**Version**: v0.1.0 (MVP)  
**Next Review**: After first user testing session

