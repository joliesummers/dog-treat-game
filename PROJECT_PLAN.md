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
- **Technical Tracking**: Phaser 3 limitations and workarounds (see [PHASER_LIMITATIONS.md](./PHASER_LIMITATIONS.md))

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

### ✅ Milestone 8: "Auto-Scroll Chase" - Progressive Difficulty System (COMPLETED)

**Value**: Tension-building mechanics that evolve across levels, themed as "owner chasing escaped dog"

---

#### 🎮 Game Elements Reference

**For detailed game element documentation, see [LEVELS.md](./LEVELS.md)**

**HELPFUL Elements (Collect These!):**
- 🦴 **Treats (Dog Bones)** - Worth 1-3 points based on size
  - Small (1pt): Quick snack, easy to grab
  - Medium (2pt): Better reward, slightly higher
  - Large (3pt): Best reward, usually on high/risky platforms
  - Collect all to win level!
  - Triggers: Gold stars ⭐ + sparkles ✨ particle burst

**HARMFUL Elements (Avoid These!):**
- 💩 **Poo** - Causes damage (-1 heart)
  - Triggers: Dog pukes 🤢 with green streamy particles
  - Triggers: Puking face overlay (X_X eyes)
  - Invincibility: 2 seconds after damage (dog flashes)
  - With stink lines rising (South Park style)

- 🐿️ **Squirrels** - Distract Golden Retriever only (Pug immune)
  - 15% chance per second near Golden
  - Duration: 1.5 seconds
  - Effect: Movement reduced to 50%, jump to 70%
  - Visual: 💭 thought bubble appears
  - **Dangerous on auto-scroll levels** - danger zone catches up!

- 🔴 **Danger Zone** (Levels 2-5 only) - Red gradient on left edge
  - Damage: -1 HP/sec (Levels 2-3), -2 HP/sec (Levels 4-5)
  - Appears when camera auto-scrolls
  - Can't move off-screen past it
  - Must keep moving forward!

- ⬇️ **Falling** - Fall off bottom of screen
  - Level 1: Instant death
  - Levels 2-5: -5 health (unless health < 5, then death)

---

#### 🎯 Core Mechanic: Auto-Scroll "Danger Zone"

**Concept**: Left side of screen slowly scrolls right (like endless runner). If dog gets caught in danger zone = damage/death.

**Thematic Evolution:**
- **Level 1**: No auto-scroll (tutorial level, learn basics)
- **Level 2**: Gentle auto-scroll introduced (danger zone = red gradient edge)
- **Level 3**: Medium scroll (getting harder)
- **Level 4**: Fast scroll (real pressure)
- **Level 5**: Very fast scroll + brutal platforming (World 1 finale!)

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
- ✅ Create abstract health system that supports both hearts (Level 1) and 10 hearts (Levels 2-3)
- ✅ Refactor `UIScene` to display health based on level configuration
- ✅ Add `LevelConfig` type with level-specific settings
- ✅ Test Level 1 still works with refactored system

**Phase 2: Auto-Scroll Mechanic (Level 2)**
- ✅ Implement camera auto-scroll (constant left-to-right movement)
- ✅ Add "danger zone" left boundary (red gradient visual)
- ✅ Detect dog entering danger zone (continuous health drain)
- ✅ Tune scroll speed for Level 2 (60 px/sec - noticeable pressure)
- ✅ Add visual warning (⚠️ DANGER ZONE ⚠️ text)
- ✅ Constrain dog to camera left edge (can't go off-screen)

**Phase 3: Content Expansion (Levels 2 & 3)**
- ✅ Design Level 2 layout (6000px, 28 platforms, narrower/wider gaps)
- ✅ Design Level 3 layout (8000px, 35 platforms, tiny/extreme gaps)
- ⏭️ Create "owner chasing dog" sprite for Level 3 danger zone (deferred - optional)
- ✅ Add level selection screen with unlock system
- ✅ Implement level progression (beat level → unlock next)
- ✅ Balance difficulty curve across all 3 levels

**Phase 4: Breed-Specific Strategies**
- ✅ Playtest both breeds on auto-scroll levels (working as designed!)
- ✅ Distraction mechanic already dangerous with auto-scroll
- ✅ Both breeds viable on all levels (different strategies)
- ⏭️ Update breed selection screen with level-specific tips (deferred - optional)

---

#### 🎮 World 1: Backyard Escape - Level Progression

**For detailed level-by-level breakdown, see [LEVELS.md](./LEVELS.md)**

| Level | Health | Auto-Scroll | Danger Zone | Platforms | Length | Difficulty |
|-------|--------|-------------|-------------|-----------|--------|------------|
| **1** | 3 ❤️ | None | Fall = death | 19 wide (120-200px) | 4000px | Tutorial |
| **2** | 10 ❤️ | 60 px/sec | -1 HP/sec | 28 medium (120-160px) | 6000px | Beginner |
| **3** | 10 ❤️ | 100 px/sec | -1 HP/sec | 35 narrow (100-120px) | 8000px | Intermediate |
| **4** | 10 ❤️ | 140 px/sec | -2 HP/sec | 42 tiny (90-110px) | 10000px | Advanced |
| **5** | 12 ❤️ | 180 px/sec | -3 HP/sec | 50 minimal (80-100px) | 12000px | Expert |

**Difficulty Progression Explained:**

**Level 1 - Tutorial: "Safe Backyard"**
- Learn mechanics without pressure
- Wide platforms, forgiving jumps
- No time pressure, explore freely
- 12 treats, 8 poo hazards, 5 squirrels
- **Goal**: Build confidence and muscle memory

**Level 2 - Beginner: "Owner Spots You"**
- Auto-scroll introduces forward pressure
- Narrower platforms, wider gaps
- Must keep moving but pace is gentle
- 18 treats, 12 poo hazards, 8 squirrels
- **Goal**: Learn to manage time pressure

**Level 3 - Intermediate: "Owner Gets Serious"** (CURRENT)
- Faster scroll, precision jumps required
- Tiny platforms, extreme height variation
- Split-second decisions needed
- 24 treats, 16 poo hazards, 10 squirrels
- **Goal**: Master timing and spatial awareness

**Level 4 - Advanced: "Owner Running!"** (PLANNED)
- Very fast scroll (2.33 px/frame @ 60fps)
- Clusters of poo requiring path planning
- Moving squirrels block routes
- 30 treats, 20 poo hazards, 12 squirrels
- **New Challenge**: Poo clusters force risky jumps
- **Goal**: Perfect execution under intense pressure

**Level 5 - Expert: "Escape the Backyard!"** (PLANNED)
- Extreme scroll speed (3 px/frame!)
- Minimal landing space (80-100px platforms)
- Squirrels + poo on same platforms (tight squeezes)
- 36 treats, 24 poo hazards, 15 squirrels
- **New Challenge**: Multiple hazards per platform
- Triple danger zone damage (-3 HP/sec)
- Extra 2 hearts (12 total) to compensate
- **Goal**: World 1 finale - prove mastery!

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

**Status**: ✅ **COMPLETED** - All 4 phases complete! Auto-scroll chase mechanic working across 3 levels.

**Actual Time**: ~6 hours (health refactor: 1.5h, auto-scroll: 2h, level design: 1.5h, debugging: 1h)

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

### ✅ Milestone 10: "South Park Polish" - Visual Style Overhaul (COMPLETED)

**Value**: Game has cohesive "South Park construction paper" aesthetic with flat shapes and gross humor

**Status**: ✅ **COMPLETE** - All visual polish implemented!

**STYLE PIVOT**: Changed from "Angry Birds" thick outlines → **South Park flat construction paper** aesthetic

**Visual Design Goals:**
- Replace blue/purple gradients with bright, saturated colors ✅
- Flat filled shapes with NO external outlines (construction paper look) ✅
- Thin internal details only (1-2px for eyes, nose, mouth) ✅
- Implement "squash & stretch" animations for impact ✅
- Add gross South Park-style effects (puke, stink lines) ✅

**Planned Changes:**

**Color Palette Overhaul:**
- ✅ Enhanced puke effect with multi-color chunks (yellow, green, brown, lime)
- ✅ GameScene Sky: Bright cyan `0x4DD0E1 → 0xB2EBF2` ✨
- ✅ MenuScene: Warm red-orange gradient `0xFF7043 → 0xEF5350` ✨
- ✅ BreedSelectScene: Sunny yellow gradient `0xFFE082 → 0xFFCD56` ✨
- ✅ HTML Background: Soft cyan `#B2EBF2 → #80DEEA` (complements game) ✨
- ✅ Grass: Vibrant green `0x8BC34A`, `0x689F38` ✨
- ✅ Platforms: Warm wood tones (0xD2691E, 0xCD853F) with visible grain ✨
- 🔲 UI elements: Bold yellows, oranges, reds for buttons/text (deferred - current style works)

**Sprite Enhancements:**
- ✅ Dog: South Park flat construction paper style - NO external outlines, flat filled shapes, thin internal details (eyes/nose/mouth = 1-2px), squash on landing, stretch on jump ✨
- ✅ Treats: Redesigned as cute dog bones with smooth integrated shape, tan fill throughout, THIN 1.5px black outline on exterior (South Park style), four rounded bulbs connected by filled waist section, elastic bounce animations ✨
- ✅ Poo: South Park-style stink lines (thin 1.5px wavy lines rising, swaying, fading) ✨
- ✅ Squirrel: South Park flat style + exaggerated bounce (3x higher, faster, Back.easeInOut, squash/stretch, wobble) ✨
- ✅ Platforms: Warm wood texture with visible grain (horizontal streaks, shadow/highlight edges) ✨

**Animation Improvements:**
- ✅ Replaced MenuScene animations with `Elastic.easeInOut` and `Back.easeInOut` ✨
- ✅ MenuScene title: Exaggerated bounce with `Back.easeInOut` (1.1 scale, 1200ms) ✨
- ✅ Treat animations: Elastic floating and scale pulse ✨
- ✅ Dust clouds when dog lands (3-5 random puffs, expand/fade, float up) ✨
- 🔲 Add anticipation: Dog crouches before jumping (deferred - optional)
- 🔲 Add follow-through: Treats lean toward dog before collection (deferred - optional)
- 🔲 Speed lines for fast movement (deferred - optional)

**Particle Effects:**
- ✅ Puke: South Park-style gross vomit - construction paper green (0x8FBC8F), streamy elongated shapes (16x6px), shoots from dog's mouth based on facing direction, heavy arc gravity, NO rotation, green-dominant color balance ✨
- ✅ Puking Face: Dog shows sick expression overlay during vomit (X_X eyes, wide open mouth, green tint) ✨
- ✅ Collect: Replaced bone particles with gold stars ⭐ (5-pointed, rotating) + white sparkles ✨ (spinning bone exit animation) ✨
- ✅ Landing: Dust cloud puffs (3-5 light gray fluffy clouds, expand/fade, spray sideways/up) ✨

**Files to Update:**
1. `src/entities/Dog.ts` - Sprite outline, squash/stretch, dust on landing, enhanced puke
2. `src/entities/Treat.ts` - Outline, elastic animations, star particles
3. `src/entities/BadItem.ts` - Outline, stink lines
4. `src/entities/Squirrel.ts` - Outline, exaggerated bounce
5. `src/scenes/GameScene.ts` - Sky gradient, grass colors, platform rendering
6. `src/scenes/MenuScene.ts` - Background gradient, title animation
7. `src/scenes/BreedSelectScene.ts` - Background gradient, selection animations

**Testing Checklist:**
- [x] All sprites have South Park flat style (no external outlines on dog/squirrel)
- [x] Animations feel bouncy and exaggerated (squash/stretch, elastic easing)
- [x] Color palette is cohesive and saturated (bright cyan, warm tones)
- [x] No blue/purple gradients remain (all replaced with vibrant colors)
- [x] Particle effects use themed graphics (stars ⭐, dust clouds 💨, puke 🤢)
- [x] Game feels more "alive" and cartoony (gross humor, bouncy physics)

**Status**: ✅ **COMPLETE** - All core features implemented! Puke effect ✅, Scene gradients ✅, Bone redesign ✅, Dog South Park style ✅, Stink lines ✅, Puking face ✅, Squirrel bounce ✅, Star particles ⭐ ✅, Dust clouds 💨 ✅, Wood platforms ✅

---

### 🌍 Milestone 11: "World 2: Park Adventure" - New Themed Levels (PLANNED)

**Value**: Fresh environments with unique visual themes and new mechanics, inspired by Super Mario Bros world progression

**Concept**: Each "world" has 4 levels with a cohesive theme and visual style, introducing new obstacles and mechanics

---

#### 🎨 World System Design (Mario-Inspired)

**For detailed world themes and visual design, see [WORLDS.md](./WORLDS.md)**

**World 1: Backyard Escape** (Levels 1-5) 🏡
- Theme: Escaping the backyard from your owner
- Colors: Warm browns (wood platforms), vibrant greens (grass), cyan sky
- Obstacles: Poo 💩 (damage), Squirrels 🐿️ (distract Golden only)
- Difficulty Curve: Tutorial → Beginner → Intermediate → Advanced → Expert
- Status: ✅ Levels 1-3 complete, 📋 Levels 4-5 planned
- Scroll Speed: 0 → 60 → 100 → 140 → 180 px/sec
- Platform Progression: Wide/safe → Narrow/risky → Tiny/brutal → Minimal/expert
- Health Scaling: 3 → 10 → 10 → 10 → 12 hearts
- **Completion Reward**: Unlock Chihuahua breed + World 2

**World 2: Park Adventure** (Levels 6-10) 🌳
- Theme: Running through the local park
- Colors: Bright greens, blue sky, stone paths
- New Obstacles: 
  - 🦆 Ducks (waddle back and forth on platforms)
  - 🌳 Trees (static obstacles you must jump over)
  - 💦 Sprinklers (periodic water bursts that slow you down)
- New Mechanic: **Weather system** (rain makes platforms slippery)
- Platforms: Stone/concrete (gray with texture)
- Scroll Speed: 120 → 140 → 160 → 180 → 200 px/sec (builds on World 1)

**World 3: Beach Boardwalk** (Levels 11-15) 🏖️
- Theme: Chasing treats along the beach
- Colors: Sandy yellows, ocean blues, pier browns
- New Obstacles:
  - 🦀 Crabs (move in patterns)
  - 🌊 Waves (periodic rising water that damages)
  - ☀️ Seagulls (dive bomb from above)
- New Mechanic: **Tide system** (water level rises/falls)
- Platforms: Wooden piers (worn wood, some broken/rickety)
- Scroll Speed: 160 → 180 → 200 → 220 → 240 px/sec

**World 4: City Streets** (Levels 16-20) 🏙️
- Theme: Urban chase through downtown
- Colors: Grays, reds (brick), neon signs
- New Obstacles:
  - 🚗 Cars (moving platforms AND hazards)
  - 🚧 Construction zones (falling debris)
  - 👔 People (slow you down if you bump them)
- New Mechanic: **Traffic lights** (stop/go timing challenges)
- Platforms: Building ledges, awnings, fire escapes
- Scroll Speed: 200 → 220 → 240 → 260 → 280 px/sec (INTENSE!)

---

#### 📊 World 1 Detailed Difficulty Progression

| Element | L1 | L2 | L3 | L4 (Plan) | L5 (Plan) |
|---------|----|----|----|-----------| --------|
| **Treats** | 12 | 18 | 24 | 30 | 36 |
| **Poo Hazards** | 8 | 12 | 16 | 20 | 24 |
| **Squirrels** | 5 | 8 | 10 | 12 | 15 |
| **Platforms** | 19 | 28 | 35 | 42 | 50 |
| **Platform Width** | 120-200px | 120-160px | 100-120px | 90-110px | 80-100px |
| **Gap Distance** | Safe | Risky | Brutal | Precise | Pixel-perfect |
| **Scroll Speed** | 0 | 60 | 100 | 140 | 180 px/sec |
| **Danger Damage** | None | 1/sec | 1/sec | 2/sec | 3/sec |
| **Length** | 4000px | 6000px | 8000px | 10000px | 12000px |
| **Hearts** | 3 | 10 | 10 | 10 | 12 |

**How Difficulty Increases:**
1. **More Obstacles**: Treat count +50%, poo count +50% each level
2. **Narrower Platforms**: -10-20px each level = harder landings
3. **Faster Scroll**: +40 px/sec each level = more pressure
4. **More Danger**: Danger zone damage increases
5. **Longer Levels**: +2000px each level = endurance test
6. **Tighter Spaces**: Poo + squirrels on same platforms (L4-5)

---

#### 📊 Difficulty Escalation Across Worlds

| Factor | World 1 | World 2 | World 3 | World 4 |
|--------|---------|---------|---------|---------|
| **Levels** | 1-5 | 6-10 | 11-15 | 16-20 |
| **Platform Width** | 80-200px | 70-180px | 60-160px | 50-140px |
| **Scroll Speed Range** | 0-180 | 120-200 | 160-240 | 200-280 |
| **Max Health** | 3-12 | 12-15 | 15-18 | 18-20 |
| **Obstacle Types** | 2 | 4 | 5 | 6 |
| **Level Length** | 4-12k px | 8-14k px | 10-16k px | 12-18k px |
| **New Mechanics** | Auto-scroll | Weather | Tides | Traffic |

---

#### 🎮 Implementation Approach (Per World)

**Phase A: Theme & Art**
- Design color palette and visual style
- Create new obstacle sprites (South Park style)
- Add world-specific background elements
- Design platform textures/patterns

**Phase B: Mechanics**
- Implement world-specific hazard behaviors
- Add new mechanic (weather/tides/traffic)
- Balance obstacle difficulty progression
- Test new mechanics feel fair

**Phase C: Level Design**
- Design 4 levels per world
- Progressive difficulty within world
- Strategic treat/hazard placement
- Playtest for pacing

**Phase D: Polish**
- World-specific sound effects
- Transition screens between worlds
- World completion rewards
- Achievement tracking

---

#### 🏆 World Completion Rewards

- **Complete World 1**: Unlock Chihuahua breed (high jumper)
- **Complete World 2**: Unlock Corgi breed (speed runner)
- **Complete World 3**: Unlock Husky breed (tanky, more health)
- **Complete World 4**: Unlock endless mode

---

**Status**: Planned for future expansion

**Estimated Time Per World**: 12-16 hours (theme: 3-4h, mechanics: 4-5h, levels: 4-5h, polish: 2-3h)

---

### 🌟 Milestone 12: "World Builder" - Level Editor (PLANNED)

**Value**: Community-created content, infinite replayability

**Features**:
- In-game level editor (place platforms, treats, hazards)
- Save/load custom levels (JSON format)
- Share levels via URL (Base64 encoded)
- Community level browser
- Leaderboards for custom levels

**Inspiration**: Super Mario Maker

**Status**: Future consideration - after World 2-4 are complete

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

### 🔊 Milestone 10.5: "Sound & Music" - Audio Enhancement (IN PROGRESS)

**Value**: Game feels alive with retro 8-bit sound effects and music

**Status**: 🔧 Sound system implemented, placeholder sounds needed

**Implemented:**
- ✅ Sound system infrastructure (PreloadScene, GameScene, Dog.ts)
- ✅ 7 sound events wired up (jump, land, eat, damage, distract, victory, gameover)
- ✅ Safe playback (won't crash if sounds missing)
- ✅ Volume-balanced (0.2-0.6 range)
- ✅ Sound callbacks in Dog entity
- ✅ SOUND_EFFECTS.md complete guide

**⚠️ PLACEHOLDER SOUNDS NEEDED:**
- 🔲 Generate temporary .wav files (see `GENERATE_PLACEHOLDER_SOUNDS.md`)
- 🔲 Add files to `public/assets/audio/`
- 🔲 Test all 7 sounds in-game
- 📋 **FUTURE**: Replace placeholders with proper 8-bit sounds

**Optional (Future):**
- 📋 Background music - Menu theme
- 📋 Background music - Gameplay theme (speeds up per level?)
- 📋 Music volume control
- 📋 Sound effects toggle

**Files:**
- `SOUND_EFFECTS.md` - Professional sound generation guide
- `GENERATE_PLACEHOLDER_SOUNDS.md` - Quick placeholder setup
- `src/scenes/PreloadScene.ts` - Loads audio files
- `src/scenes/GameScene.ts` - Plays sound effects
- `src/entities/Dog.ts` - Sound callbacks

---

## Post-MVP Ideas (Backlog)

### High Priority
- **More dog breeds** - Chihuahua (jumps high), Corgi (fast runner), Husky (strong/tanky)
- ✅ ~~**Sound effects**~~ - System implemented, needs placeholder files
- **Background music** - Looping 8-bit chiptune track (planned)

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
- `PROJECT_PLAN.md` - This file - master plan and roadmap
- `LEVELS.md` - Detailed level designs and game elements reference
- `WORLDS.md` - World themes, visual design, and progression system
- `TESTING_ROADMAP.md` - Phased testing strategy
- `DEPLOYMENT.md` - Deployment instructions
- `SETUP_GITHUB.md` - GitHub setup guide
- `MILESTONES.md` - Detailed milestone tracking
- `PHASER_LIMITATIONS.md` - Technical challenges and engine suitability assessment

---

## Development Status Summary

**Completed**: 9 out of 10 milestones ✅  
**In Progress**: None - Ready for expansion! 🚀  
**MVP Status**: Complete and deployed with 3-level progression! 🎉  

**Current Focus**: 
1. Visual style overhaul with **"South Park construction paper"** aesthetic (pivot from Angry Birds)
2. Enhanced animations (squash/stretch, elastic easing)
3. Gross humor effects (South Park-style puke, stink lines)
4. Flat filled shapes with thin internal details

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
**Version**: v0.1.0 (MVP) - Milestone 10 @ 85%, Milestone 8 Redesigned  
**Next Review**: After Milestone 10 completion

**Style Evolution**: Pivoted from Angry Birds (thick outlines) → South Park (flat construction paper) for simpler, funnier aesthetic

**Major Changes**:
- ✅ Improved bone/treat graphics with smooth integrated design and thin outlines
- ✅ **Style pivot**: Angry Birds → South Park construction paper aesthetic
- ✅ Dog sprites: Flat fills, NO external outlines, squash/stretch animations
- ✅ Puke effect: Construction paper green, streamy particles from mouth, puking face overlay
- ✅ Stink lines: Thin wavy lines rising from poo
- 📋 **Milestone 8 redesigned** with auto-scroll chase mechanic, expandable health system, and progressive difficulty
- 🎯 New gameplay vision: 3-level progression with evolving mechanics and "escaped dog" theme
- 📊 **NEW**: PHASER_LIMITATIONS.md tracking technical challenges and engine suitability

