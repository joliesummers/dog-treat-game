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

**Future Enhancement Note**: Health system will be expanded to larger scale (10+ points) with percentage/bar display for Levels 2-3. Current 3-heart system maintained for Level 1 simplicity.

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

### ✅ Milestone 7: "More Breeds" - Golden Retriever (COMPLETED)

**Value**: Replayability with different playstyles

**Implemented Features:**
- ✅ Add Golden Retriever sprite (golden color #F4C542)
- ✅ Implement distraction mechanic (15% chance/second, 1.5s freeze)
- ✅ Add visual indicator (💭 thought bubble with bounce animation)
- ✅ Update breed selection screen (side-by-side with stats)
- ✅ Balance traits for distinct playstyles
- ✅ **Playable test**: Both breeds offer distinct strategies

**Breed Comparison:**

| Trait | Pug | Golden Retriever |
|-------|-----|------------------|
| Speed | 100% | 110% (Faster!) |
| Jump | 95% | 105% (Higher!) |
| Eating | Instant | 200ms delay |
| Distraction | Never | 15% chance/sec |

**Strategy**: Pug = consistent and reliable. Golden = faster but risky!

**Status**: Complete with interactive breed selection UI showing all stats

**Gameplay Enhancements:**
- **Enhanced Distraction**: When distracted, movement reduced to 50% and jump to 70% (impaired control vs full freeze)
- **Falling Bad Items**: Mix of 4 static platform hazards + random falling items every 3-5 seconds
- **Dynamic Challenge**: Must watch both platforms AND sky for incoming chocolate/grapes

**Future Enhancement Note**: Distraction mechanic will gain additional consequence in Levels 2-3 with auto-scroll - being distracted allows the "danger zone" to catch up to the dog, adding strategic risk to Golden Retriever's speed advantage.

---

### 🚧 Milestone 8: "Auto-Scroll Chase" - Progressive Difficulty System (PLANNED)

**Value**: Tension-building mechanics that evolve across levels, themed as "owner chasing escaped dog"

---

#### 🎯 Core Mechanic: Auto-Scroll "Danger Zone"

**Concept**: Left side of screen slowly scrolls right (like endless runner). If dog gets caught in danger zone = damage/death.

**Thematic Evolution:**
- **Level 1**: No auto-scroll (tutorial level, learn basics)
- **Level 2**: Gentle auto-scroll introduced (danger zone = red gradient edge)
- **Level 3**: Faster scroll + owner sprite chasing (visual storytelling!)

---

#### 📊 Health System Overhaul

**Current State (Level 1):**
- ✅ 3 hearts (simple, clear for beginners)
- ✅ Bad items reduce health
- ✅ Fall death = instant game over

**New System (Levels 2-3):**
- 🔲 Expand to **10-point health bar** (percentage-based, more granular)
- 🔲 Multiple damage sources:
  1. **Bad items** (chocolate/grapes) = -2 health
  2. **Danger zone contact** = -1 health per second (continuous drain)
  3. **Fall death** = -5 health (no longer instant death, unless health < 5)
- 🔲 Health UI shows **bar + percentage** instead of hearts (e.g., "Health: 70%")
- 🔲 Color-coded health bar: Green (80-100%), Yellow (40-79%), Red (0-39%)

**Design Rationale:**
- Level 1 keeps 3 hearts for simplicity (gentle onboarding)
- Levels 2-3 introduce complexity gradually
- Health bar allows for more nuanced difficulty tuning

---

#### 🐕 Distraction Mechanic Enhancement

**Current Behavior:**
- Golden Retriever: 15% chance/second to get distracted (1.5s freeze)
- Movement reduced to 50%, jump to 70%

**Enhanced Consequence (Levels 2-3 with auto-scroll):**
- 🔲 While distracted, **danger zone continues advancing**
- 🔲 Dog cannot move forward → gets closer to danger zone
- 🔲 **High risk/high reward**: Golden's speed advantage comes with danger zone pressure
- 🔲 Pug's reliability becomes strategic advantage (no distractions = safer pacing)

**Gameplay Impact:**
- Golden Retriever: Fast but risky (distractions can be deadly with auto-scroll)
- Pug: Slower but consistent (better for auto-scroll levels)
- Breeds now have **level-specific advantages** (replay value!)

---

#### 📋 Implementation Checklist

**Phase 1: Health System Refactor (Level 1 consistency)**
- 🔲 Create abstract health system that supports both hearts (Level 1) and bar (Levels 2-3)
- 🔲 Refactor `UIScene` to display health based on level configuration
- 🔲 Add `LevelConfig` type with `healthSystem: 'hearts' | 'bar'`
- 🔲 Test Level 1 still works with refactored system

**Phase 2: Auto-Scroll Mechanic (Level 2)**
- 🔲 Implement camera auto-scroll (constant left-to-right movement)
- 🔲 Add "danger zone" left boundary (red gradient visual)
- 🔲 Detect dog entering danger zone (continuous health drain)
- 🔲 Tune scroll speed for Level 2 (gentle introduction)
- 🔲 Add visual warning when dog gets too close to edge

**Phase 3: Content Expansion (Levels 2 & 3)**
- 🔲 Design Level 2 layout (longer, auto-scroll enabled, 10-point health)
- 🔲 Design Level 3 layout (faster scroll, more obstacles)
- 🔲 Create "owner chasing dog" sprite for Level 3 danger zone
- 🔲 Add level selection screen with unlock system
- 🔲 Implement level transition screens
- 🔲 Balance difficulty curve across all 3 levels

**Phase 4: Breed-Specific Strategies**
- 🔲 Playtest Golden Retriever on auto-scroll levels (distraction = danger)
- 🔲 Playtest Pug on auto-scroll levels (reliability = advantage)
- 🔲 Update breed selection screen with level-specific tips
- 🔲 Ensure both breeds feel viable on all levels (different strategies)

---

#### 🎮 Level Progression Summary

| Level | Health System | Auto-Scroll | Danger Zone | Theme |
|-------|---------------|-------------|-------------|-------|
| **1** | 3 Hearts | ❌ None | Fall = death | "Tutorial: Learn to Move" |
| **2** | 10-Point Bar | ✅ Gentle (slow) | Red gradient, -1 HP/sec | "Chase Begins: Keep Moving" |
| **3** | 10-Point Bar | ✅ Fast | Owner sprite, -1 HP/sec | "Owner Pursuit: Full Speed!" |

---

#### 🧪 Testing Strategy

**Before Implementation:**
- Add Phase 3 tests from [TESTING_ROADMAP.md](./TESTING_ROADMAP.md)
- Create unit tests for health system abstraction
- Test auto-scroll boundary detection

**Playtesting Focus:**
- Does Level 1 → Level 2 transition teach auto-scroll clearly?
- Is danger zone visually obvious?
- Are distraction consequences fair but challenging?
- Do both breeds feel viable across all levels?

---

**Status**: Planned - Will begin after Milestone 10 (Angry Birds Polish) is complete

**Estimated Time**: 8-12 hours (health refactor: 2-3h, auto-scroll: 3-4h, level design: 3-5h)

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

### 🚧 Milestone 10: "Angry Birds Polish" - Visual Style Overhaul (IN PROGRESS)

**Value**: Game has a cohesive, polished "Angry Birds" aesthetic with bouncy, cartoony animations

**Visual Design Goals:**
- Replace blue/purple gradients with bright, saturated colors
- Add bold black outlines (3-4px) to all sprites for cartoon look
- Implement "squash & stretch" animations for impact
- Create more exaggerated, bouncy movement (elastic easing)
- Add playful particle effects (stars, dust clouds, sparkles)

**Planned Changes:**

**Color Palette Overhaul:**
- ✅ Enhanced puke effect with multi-color chunks (yellow, green, brown, lime)
- ✅ GameScene Sky: Bright cyan `0x4DD0E1 → 0xB2EBF2` ✨
- ✅ MenuScene: Warm red-orange gradient `0xFF7043 → 0xEF5350` ✨
- ✅ BreedSelectScene: Sunny yellow gradient `0xFFE082 → 0xFFCD56` ✨
- ✅ HTML Background: Soft cyan `#B2EBF2 → #80DEEA` (complements game) ✨
- ✅ Grass: Vibrant green `0x8BC34A`, `0x689F38` ✨
- 🔲 Platforms: Warm wood tones with visible grain
- 🔲 UI elements: Bold yellows, oranges, reds for buttons/text

**Sprite Enhancements:**
- 🔲 Dog: Add 3-4px black outline, squash on landing, stretch on jump
- ✅ Treats: Redesigned as cute dog bones with smooth integrated shape, tan fill throughout, 2.5px black outline ONLY on exterior, four rounded bulbs connected by filled waist section, elastic bounce animations ✨
- 🔲 Poo: Stink line animations (wavy lines above)
- 🔲 Squirrel: Bold outline, more exaggerated bounce
- 🔲 Platforms: Slight bounce/shake when dog lands

**Animation Improvements:**
- ✅ Replaced MenuScene animations with `Elastic.easeInOut` and `Back.easeInOut` ✨
- ✅ MenuScene title: Exaggerated bounce with `Back.easeInOut` (1.1 scale, 1200ms) ✨
- ✅ Treat animations: Elastic floating and scale pulse ✨
- 🔲 Add anticipation: Dog crouches before jumping
- 🔲 Add follow-through: Treats lean toward dog before collection
- 🔲 Dust clouds when dog lands
- 🔲 Speed lines for fast movement

**Particle Effects:**
- ✅ Puke: Multi-color chunks (yellow/green/brown/lime) with arc trajectory, multiple emitters, rotation
- 🔲 Collect: Replace generic particles with stars ⭐ and sparkles ✨
- 🔲 Landing: Dust cloud puffs
- 🔲 Damage: Cartoon "impact" effect

**Files to Update:**
1. `src/entities/Dog.ts` - Sprite outline, squash/stretch, dust on landing, enhanced puke
2. `src/entities/Treat.ts` - Outline, elastic animations, star particles
3. `src/entities/BadItem.ts` - Outline, stink lines
4. `src/entities/Squirrel.ts` - Outline, exaggerated bounce
5. `src/scenes/GameScene.ts` - Sky gradient, grass colors, platform rendering
6. `src/scenes/MenuScene.ts` - Background gradient, title animation
7. `src/scenes/BreedSelectScene.ts` - Background gradient, selection animations

**Testing Checklist:**
- [ ] All sprites have visible outlines
- [ ] Animations feel bouncy and exaggerated
- [ ] Color palette is cohesive and saturated
- [ ] No blue/purple gradients remain
- [ ] Particle effects use themed graphics (stars, not circles)
- [ ] Game feels more "alive" and cartoony

**Status**: In Progress - Puke effect ✅, All scene gradients ✅, Treat/bone sprites completely redesigned ✅, Dog/Poo/Squirrel sprites pending, Particle effects pending

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
- **Pixel art sprites** - Replace programmatic graphics with custom pixel art (after Milestone 10)

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

**Completed**: 7 out of 10 milestones ✅  
**In Progress**: Milestone 10 - Angry Birds Polish 🎨  
**MVP Status**: Complete and deployed! 🎉  

**Current Focus**: 
1. Visual style overhaul with "Angry Birds" aesthetic
2. Enhanced animations (squash/stretch, elastic easing)
3. Improved particle effects and visual polish
4. More cohesive, cartoony art style

**Upcoming: Milestone 8 Redesign** 🎯
- **New Vision**: Auto-scroll "chase" mechanic (owner pursuing escaped dog)
- **Health Evolution**: 3 hearts (L1) → 10-point bar (L2-3) with multiple damage sources
- **Progressive Difficulty**: Level 1 (tutorial), Level 2 (gentle auto-scroll), Level 3 (fast chase)
- **Strategic Depth**: Distractions become dangerous with auto-scroll (risk/reward)

**Next Steps After Milestone 10**: 
1. Complete visual polish and share for feedback
2. Begin Milestone 8: Health system refactor + auto-scroll implementation
3. Design Levels 2-3 with progressive difficulty curve

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

**Last Updated**: December 7, 2024  
**Version**: v0.1.0 (MVP) - Milestone 8 Redesigned  
**Next Review**: After Milestone 10 completion

**Major Changes**:
- ✅ Improved bone/treat graphics with smooth integrated design
- 📋 **Milestone 8 redesigned** with auto-scroll chase mechanic, expandable health system, and progressive difficulty
- 🎯 New gameplay vision: 3-level progression with evolving mechanics and "escaped dog" theme

