# 🌍 Dog Treat Adventure - World Design Document

**Purpose**: Detailed world themes, visual design, and cross-world progression system

**See Also**: 
- [PROJECT_PLAN.md](./PROJECT_PLAN.md) - Overall project roadmap
- [LEVELS.md](./LEVELS.md) - Detailed level designs and game elements
- [LEVEL_GOAL_SYSTEM.md](./LEVEL_GOAL_SYSTEM.md) - Goal-based win condition system

---

## 🎨 World System Design (Mario-Inspired)

**Philosophy**: Each "world" has 5 levels with a cohesive theme and visual style, introducing new obstacles and mechanics progressively.

**Core Mechanic**: **Goal-based levels** - Reach the goal object (dog house, gate, etc.) to win. Treats are optional score boosters!

---

## 📊 Progressive Difficulty Philosophy

### **Gradual Escalation (Levels 1-20)**

**Strategy**: Don't dump all obstacles in Level 6! Introduce new elements gradually within each world while keeping proven mechanics from previous worlds.

**Per World Pattern**:
```
Level X+0: Introduce World (keep previous obstacles + 1 new)
Level X+1: Add second new obstacle
Level X+2: Add third new obstacle
Level X+3: Add world-specific mechanic
Level X+4: FINALE - All obstacles + max difficulty
```

**Example - World 2 (Park)**:
- Level 6: Squirrels + Poo + **Ducks** (new moving obstacle)
- Level 7: All previous + **Trees** (new vertical obstacle)
- Level 8: All previous + **Sprinklers** (new timing element)
- Level 9: All previous + **Light Rain** (weather mechanic)
- Level 10: All previous + **Heavy Rain** + max scroll speed

---

## 🦴 Themed Treats System

**Visual Variety + Value Progression**

### **World 1: Backyard** (Current ✅)
- 🦴 **Bone** - Standard treat
- **Value**: 100 pts each
- **Style**: White with South Park paper cutout aesthetic

### **World 2: Park**
- 🎾 **Tennis Ball** - Bright yellow/green fuzzy ball
- 🥏 **Frisbee** - Orange/red flying disc
- **Value**: 100-150 pts (park treats worth more)
- **Mix**: 70% tennis balls, 30% frisbees
- ⭐ **Golden Ball**: 500 pts (rare)

### **World 3: Beach**
- 🐚 **Seashell** - Spiral shell (pink/white)
- 🏐 **Beach Ball** - Colorful striped ball
- **Value**: 150-200 pts (beach treats worth even more)
- **Mix**: 60% seashells, 40% beach balls
- ⭐ **Golden Shell**: 500 pts (rare)

### **World 4: City**
- 🌭 **Hot Dog** - Urban street food
- 🍕 **Pizza Slice** - Classic city food
- **Value**: 200-250 pts (city treats most valuable)
- **Mix**: 50% hot dogs, 50% pizza
- ⭐ **Golden Pizza**: 500 pts (rare)

**Implementation**: Each world uses different treat sprites but same collision logic. Higher point values balance harder difficulty.

---

## 😵 Escalating Distraction System

**Progressive Complexity**: More distraction sources and mechanics as worlds advance.

### **World 1: Simple Distractions**
- 🐿️ **Squirrels**: Golden Retriever only
  - **Effect**: 1.5s distraction (slow movement, can't jump)
  - **Behavior**: Jump from trees in parabolic arcs
  - **Difficulty**: Varies by level (trigger distance, count)

### **World 2: Moderate Distractions**
- 🐿️ **Squirrels**: Still present (carried forward)
- 🦆 **Ducks**: Golden Retriever only
  - **Effect**: 1.0s distraction (shorter but more frequent)
  - **Behavior**: Waddle back & forth on platforms
- 💦 **Sprinklers**: ALL breeds affected
  - **Effect**: 0.5x speed while in spray zone
  - **Behavior**: Periodic bursts (3s on, 2s off)

### **World 3: Complex Distractions**
- **All previous** +
- 🕊️ **Seagulls**: Golden Retriever only
  - **Effect**: 2.0s distraction if hit (longest!)
  - **Behavior**: Dive bomb with warning shadow
- 🌊 **Waves**: ALL breeds
  - **Effect**: Push dog backward (environmental)
  - **Behavior**: Rises/falls with tide cycle

### **World 4: Expert Distractions**
- **All previous** +
- 🚦 **Traffic Lights**: ALL breeds (gameplay rhythm)
  - **Effect**: Must time movements with lights
  - **Behavior**: Red/yellow/green cycles
- 👔 **People**: ALL breeds
  - **Effect**: 1.0s slowdown on bump
  - **Behavior**: Walk in patterns on sidewalks
- 🚗 **Cars**: ALL breeds (audio + visual)
  - **Effect**: Honking creates screen shake
  - **Behavior**: Move on green lights

**Breed Balance**: Pug remains immune to animal distractions but affected by environmental hazards (rain, waves, traffic).

---

## 🎯 Goal Objects Per World

**Win Condition**: Reach the goal object at the end of each level!

### **World 1: Backyard** ✅
- 🏠 **Dog House**
- **Design**: Brown wood, shingles, door, paw prints, dog bowl
- **Position**: 200px before level end
- **Animation**: Sparkle on approach, dog enters, celebration

### **World 2: Park**
- 🚪 **Park Gate / Exit Sign**
- **Design**: Metal gate with "PARK EXIT" sign, trees framing sides
- **Position**: 200px before level end
- **Animation**: Gate opens, dog runs through, victory

### **World 3: Beach**
- ⛱️ **Beach Umbrella Setup**
- **Design**: Colorful umbrella, beach towel, cooler
- **Position**: 200px before level end
- **Animation**: Dog dives under umbrella, relaxes, celebration

### **World 4: City**
- 🏠 **Home Front Door**
- **Design**: Apartment door with welcome mat, house number
- **Position**: 200px before level end
- **Animation**: Door opens, dog rushes in, SAFE AT LAST!

---

## 📐 Cross-World Difficulty Metrics

**Progressive Scaling Across All 20 Levels**

| Metric | World 1 (L1-5) | World 2 (L6-10) | World 3 (L11-15) | World 4 (L16-20) |
|--------|----------------|-----------------|------------------|------------------|
| **Scroll Speed** | 0-180 px/s | 120-200 px/s | 160-240 px/s | 200-280 px/s |
| **Platform Width** | 200-80px | 180-70px | 160-60px | 140-50px |
| **Platform Gap** | Easy | Moderate | Hard | Expert |
| **Max Health** | 3-12 ❤️ | 12-15 ❤️ | 15-18 ❤️ | 18-20 ❤️ |
| **Level Length** | 5.2k-15.6k | 8k-14k | 10k-16k | 12k-18k |
| **Obstacle Types** | 2 | 4-5 | 6-7 | 8-9 |
| **Distraction Sources** | 1 | 2-3 | 4-5 | 6-7 |
| **Treat Count** | 17-40 | 30-50 | 35-55 | 40-60 |
| **Treat Value** | 100 pts | 100-150 pts | 150-200 pts | 200-250 pts |
| **Gold Star Score** | 2k-4k | 5k-7k | 8k-10k | 11k-15k |
| **Gold Time Target** | 60-180s | 150-210s | 180-240s | 210-270s |

**Formula**: Each metric increases ~10-20% per world to maintain smooth difficulty curve.

---

## 🏡 World 1: Backyard Escape

**Theme**: Escaping the backyard from your owner  
**Levels**: 1-5  
**Status**: ✅ **COMPLETE**

### Visual Style
- **Colors**: Warm browns (wood platforms), vibrant greens (grass), cyan sky
- **Aesthetic**: South Park construction paper style
- **Background**: Bright cyan gradient sky (`0x4DD0E1 → 0xB2EBF2`)
- **Platforms**: Warm wood texture with visible grain (horizontal streaks)
- **Grass**: Vibrant green tufts (`0x8BC34A`, `0x689F38`)

### Obstacles
- 💩 **Poo** (damage) - Static hazards on platforms
- 🐿️ **Squirrels** (distract Golden only) - Jump from trees in varied arcs

### Mechanics
- **Auto-scroll "Danger Zone"**: Owner chases from behind
- **Camera follow**: Smooth follow with minimum scroll speed
- **Tree-based squirrels**: Perched, visible, jump with warning

### Level-by-Level Breakdown

**Level 1: Tutorial**
- No auto-scroll
- Wide platforms (200px)
- Poo only (10 hazards)
- 3 hearts health
- Teaches: Movement, jumping, collecting treats

**Level 2: Chase Begins**
- Gentle scroll (60 px/s)
- Introduce squirrels (4 trees)
- 10 hearts (health bar)
- 5-second countdown before scroll

**Level 3: Owner Pursuit**
- Fast scroll (100 px/s)
- More squirrels (8 trees)
- Narrower platforms

**Level 4: Advanced**
- Very fast scroll (140 px/s)
- Squirrel clusters (10 trees)
- Danger zone: 2 HP/sec

**Level 5: Expert Finale**
- EXTREME scroll (180 px/s)
- Maximum squirrels (15 trees, 2/tree)
- 12 hearts (extra compensation)
- Danger zone: 3 HP/sec
- Longest level (15,600px)

### Progression Metrics
| Metric | L1 | L2 | L3 | L4 | L5 |
|--------|----|----|----|----|-----|
| **Scroll Speed** | 0 | 60 | 100 | 140 | 180 |
| **Platform Width** | 200px | 180px | 150px | 120px | 80px |
| **Health** | 3 | 10 | 10 | 10 | 12 |
| **Length** | 5.2k | 7.8k | 10.4k | 13k | 15.6k |
| **Trees** | 0 | 4 | 8 | 10 | 15 |
| **Gold Score** | 2k | 2.5k | 3k | 3.5k | 4k |
| **Gold Time** | 60s | 90s | 120s | 150s | 180s |

### Completion Reward
- 🏆 Unlock **Chihuahua** breed (super jump: 120% height)
- 🌍 Unlock **World 2: Park Adventure**
- 🎖️ Achievement: "Backyard Master"

---

## 🌳 World 2: Park Adventure

**Theme**: Running through the local park  
**Levels**: 6-10  
**Status**: 📋 **PLANNED** (Next to implement!)

### Visual Style
- **Colors**: Bright greens (lush trees), blue sky, stone/concrete paths
- **Aesthetic**: South Park construction paper (consistent)
- **Background**: Blue sky with tree silhouettes, park benches, lamp posts
- **Platforms**: Stone/concrete (gray with texture, cracks, moss details)
- **Grass**: Lush park grass with small flowers
- **Ambient**: Birds chirping, leaves rustling

### Obstacles (Introduced Gradually)

**Carried Forward from World 1**:
- 💩 **Poo** - Still present as base hazard
- 🐿️ **Squirrels** - Continue from World 1

**NEW - Level 6**:
- 🦆 **Ducks** - Waddle back & forth on platforms
  - **Behavior**: Move left (2s) → pause (0.5s) → move right (2s) → repeat
  - **Collision**: Damage + 1.0s distraction (Golden only)
  - **Visual**: Yellow body, orange bill, waddle animation
  - **Count**: Start with 3-4, increase to 8-10 by Level 10

**NEW - Level 7**:
- 🌳 **Tree Obstacles** - Tall static vertical obstacles
  - **Behavior**: Must jump over (100px height)
  - **Collision**: Block path (can't walk through)
  - **Visual**: Brown trunk, green foliage
  - **Placement**: Strategic (force high jumps)

**NEW - Level 8**:
- 💦 **Sprinklers** - Periodic water bursts
  - **Behavior**: 3 seconds ON (spray), 2 seconds OFF
  - **Effect**: 0.5x movement speed while in spray zone
  - **Visual**: Blue water particles, 80px radius
  - **Sound**: Hissing water sound
  - **Count**: 4-6 per level

**NEW - Level 9**:
- 🌧️ **Light Rain** (Weather mechanic intro)
  - **Effect**: Platforms become slippery
  - **Gameplay**: Reduced traction (harder to stop/turn)
  - **Visual**: Rain particle effects, puddles on platforms
  - **Applies to**: Entire level

**NEW - Level 10**:
- ⛈️ **Heavy Rain** (Weather mechanic advanced)
  - **Effect**: Very slippery platforms + reduced visibility
  - **Gameplay**: Slide on landing, momentum continues
  - **Visual**: Intense rain, darker sky, fog

### New Mechanic: Weather System

**Rain Effects**:
- **Light Rain**: 0.7x traction (moderate slip)
- **Heavy Rain**: 0.4x traction (significant slip)
- **Puddles**: Extra slippery spots (0.2x traction)

**Visual Indicators**:
- Rain particles falling from sky
- Puddles forming on platforms
- Darker sky gradient
- Lightning flashes (aesthetic)

**Gameplay Impact**:
- Jump landings slide forward
- Harder to stop precisely
- Requires anticipation
- Golden's speed makes it trickier

### Level-by-Level Breakdown

**Level 6: Park Entrance**
- Scroll: 120 px/s (faster than World 1 start)
- Introduce ducks (4 waddling)
- Keep squirrels (6 trees)
- Poo clusters
- Length: 8,000px

**Level 7: Tree Trail**
- Scroll: 140 px/s
- Add tree obstacles (5 trees to jump over)
- Ducks (5) + Squirrels (7 trees)
- Narrower platforms (180px → 150px)
- Length: 9,500px

**Level 8: Sprinkler Zone**
- Scroll: 160 px/s
- Add sprinklers (5 zones)
- All previous obstacles
- Timing challenge (must time runs between sprays)
- Length: 11,000px

**Level 9: Light Rain**
- Scroll: 180 px/s
- Introduce light rain (slippery)
- All previous obstacles
- Platforms: 120px wide
- Length: 12,500px

**Level 10: Storm Finale**
- Scroll: 200 px/s (FASTEST YET!)
- Heavy rain + all obstacles
- Maximum density
- Platforms: 70px wide (NARROW!)
- 15 hearts health
- Length: 14,000px

### Progression Metrics
| Metric | L6 | L7 | L8 | L9 | L10 |
|--------|----|----|----|-----|-----|
| **Scroll Speed** | 120 | 140 | 160 | 180 | 200 |
| **Platform Width** | 180px | 150px | 130px | 120px | 70px |
| **Health** | 12 | 13 | 14 | 14 | 15 |
| **Length** | 8k | 9.5k | 11k | 12.5k | 14k |
| **Obstacle Types** | 3 | 4 | 5 | 5 | 5 |
| **Gold Score** | 5k | 5.5k | 6k | 6.5k | 7k |
| **Gold Time** | 150s | 165s | 180s | 195s | 210s |

### Treats
- 🎾 Tennis balls (100 pts)
- 🥏 Frisbees (150 pts)
- ⭐ Golden ball (500 pts, 1 per level)
- **Count**: 30-50 per level

### Goal Object
- 🚪 **Park Exit Gate**
- Metal gate with "PARK EXIT" sign
- Trees and lamp posts framing the gate
- Gate opens when dog approaches
- Victory: Dog runs through, gate closes behind

### Completion Reward
- 🏆 Unlock **Corgi** breed (speed runner: 125% speed, 90% jump)
- 🌍 Unlock **World 3: Beach Boardwalk**
- 🎖️ Achievement: "Park Ranger"

---

## 🏖️ World 3: Beach Boardwalk

**Theme**: Chasing treats along the beach and pier  
**Levels**: 11-15  
**Status**: 📋 **PLANNED**

### Visual Style
- **Colors**: Sandy yellows, ocean blues, pier browns, sunset oranges
- **Aesthetic**: South Park construction paper (consistent)
- **Background**: Ocean waves animation, seagulls, beach umbrellas, setting sun
- **Platforms**: Wooden pier planks (worn, some broken/rickety appearance)
- **Sand**: Textured sand dunes, beach grass
- **Ambient**: Wave sounds, seagull calls, wind

### Obstacles (Progressive Introduction)

**Carried Forward**:
- Previous world obstacles (selectively - not all!)
- Focus shifts to beach-specific hazards

**NEW - Level 11**:
- 🦀 **Crabs** - Move in patterns
  - **Behavior**: Left (1s) → Right (1s) → Pause (0.5s) → Reverse
  - **Collision**: Damage only (no distraction)
  - **Visual**: Red shell, sideways walk, pincer snap
  - **Pattern recognition challenge**

**NEW - Level 12**:
- 🌊 **Waves** - Periodic rising water
  - **Behavior**: Tide rises (5s) → High (2s) → Recedes (5s) → Low (2s)
  - **Effect**: Water = damage zone + pushes backward
  - **Visual**: Blue water rising, foam/spray
  - **Warning**: Water line starts rising (react!)

**NEW - Level 13**:
- 🕊️ **Seagulls** - Dive bomb from above (NEW DIMENSION!)
  - **Behavior**: Circle overhead → Warning shadow → DIVE
  - **Effect**: 2.0s distraction if hit (longest!)
  - **Visual**: Bird sprite, shadow below, dive animation
  - **Audio**: Squawk warning

**NEW - Level 14+**:
- 🌊 **Tide System** (Full mechanic)
  - **Low Tide**: More platforms visible, easier
  - **High Tide**: Water rises, some platforms submerged
  - **Cycle**: 30-second rhythm
  - **Strategy**: Time movements with tide

### New Mechanic: Tide System

**Tide Cycle** (30 seconds total):
1. **Low Tide** (10s): All platforms safe
2. **Rising** (5s): Water level increasing
3. **High Tide** (10s): Bottom platforms submerged
4. **Receding** (5s): Water level decreasing
5. **Repeat**

**Visual Indicators**:
- Water level animation
- Platform color change when submerged
- Foam/spray particles
- Tide gauge UI element

**Gameplay Impact**:
- Must plan route based on tide timing
- Some treats only accessible at low tide
- High tide forces upper route
- Adds rhythm/timing element

### Level-by-Level Breakdown

**Level 11: Boardwalk Start**
- Scroll: 160 px/s
- Introduce crabs (6 moving)
- Keep ducks from previous world (3)
- Sandy platforms
- Length: 10,000px

**Level 12: Wave Zone**
- Scroll: 180 px/s
- Add waves (periodic rising water)
- Crabs (8) + Previous obstacles
- Must time runs between waves
- Length: 11,500px

**Level 13: Seagull Attack**
- Scroll: 200 px/s
- Add seagulls (4 diving)
- Crabs + Waves
- **First aerial threat!**
- Length: 13,000px

**Level 14: Tide Pools**
- Scroll: 220 px/s
- Full tide system (30s cycle)
- All previous obstacles
- Route changes with tide
- Length: 14,500px

**Level 15: Sunset Storm**
- Scroll: 240 px/s (INSANE!)
- Fast tide cycles (20s)
- All obstacles + rain
- Platforms: 60px (VERY NARROW!)
- 18 hearts health
- Length: 16,000px

### Progression Metrics
| Metric | L11 | L12 | L13 | L14 | L15 |
|--------|-----|-----|-----|-----|-----|
| **Scroll Speed** | 160 | 180 | 200 | 220 | 240 |
| **Platform Width** | 160px | 140px | 120px | 100px | 60px |
| **Health** | 15 | 16 | 16 | 17 | 18 |
| **Length** | 10k | 11.5k | 13k | 14.5k | 16k |
| **Obstacle Types** | 4 | 5 | 6 | 6 | 7 |
| **Gold Score** | 8k | 8.5k | 9k | 9.5k | 10k |
| **Gold Time** | 180s | 195s | 210s | 225s | 240s |

### Treats
- 🐚 Seashells (150 pts)
- 🏐 Beach balls (200 pts)
- ⭐ Golden shell (500 pts)
- **Count**: 35-55 per level

### Goal Object
- ⛱️ **Beach Umbrella & Towel Setup**
- Colorful striped umbrella
- Beach towel laid out
- Cooler with drinks
- Victory: Dog dives under umbrella, relaxes

### Completion Reward
- 🏆 Unlock **Husky** breed (tanky: +5 max health, 90% speed)
- 🌍 Unlock **World 4: City Streets**
- 🎖️ Achievement: "Beach Bum"

---

## 🏙️ World 4: City Streets

**Theme**: Urban chase through downtown  
**Levels**: 16-20  
**Status**: 📋 **PLANNED** (FINALE WORLD!)

### Visual Style
- **Colors**: Grays (concrete), reds (brick), neon signs, yellow taxi cabs
- **Aesthetic**: South Park construction paper (consistent)
- **Background**: Building skyline, fire escapes, street lights, traffic
- **Platforms**: Building ledges, awnings, fire escape stairs, car roofs
- **Ground**: Asphalt streets, sidewalks, crosswalks
- **Ambient**: City sounds, car horns, sirens, footsteps

### Obstacles (Expert Level)

**Carried Forward**:
- Strategic selection from previous worlds
- Focus on urban-specific hazards

**NEW - Level 16**:
- 🚗 **Cars** - Moving platforms AND hazards
  - **Behavior**: Move horizontally at traffic speed
  - **Safe**: Jump on roof (moving platform)
  - **Danger**: Touch side/front = damage
  - **Visual**: Yellow cabs, various colors
  - **Speed**: Matches traffic light state

**NEW - Level 17**:
- 🚧 **Construction Debris** - Falling hazards
  - **Behavior**: Random spawn from above, fall straight down
  - **Warning**: Shadow appears 1s before fall
  - **Effect**: Heavy damage if hit
  - **Visual**: Bricks, tools, planks
  - **Requires**: Quick reactions

**NEW - Level 18**:
- 👔 **People/Pedestrians** - Crowd navigation
  - **Behavior**: Walk in patterns on sidewalks
  - **Effect**: Bump = 1.0s slowdown (all breeds)
  - **Visual**: Various people sprites
  - **Density**: Increases in later levels

**NEW - Level 19+**:
- 🚦 **Traffic Light System** (Full mechanic)
  - **Red Light**: Cars stopped (safe platforms)
  - **Yellow**: Cars starting (warning - 2s)
  - **Green**: Cars zoom by (hazards + risky platforms)
  - **Cycle**: 10 seconds per light
  - **Strategy**: Time movements with lights

### New Mechanic: Traffic Light System

**Traffic Cycle** (30 seconds):
1. **Green** (10s): Cars moving fast, dangerous
2. **Yellow** (2s): Cars slowing, warning
3. **Red** (10s): Cars stopped, safe platforms
4. **Yellow** (2s): Cars starting, warning
5. **Green** (6s): Cars accelerating
6. **Repeat**

**Visual Indicators**:
- Traffic lights visible at intersections
- Car brake lights (red = stopping)
- Horn sounds (warning)
- UI timer showing light state

**Gameplay Impact**:
- Must cross streets during red lights
- Cars as moving platforms during red
- Jump timing critical during yellow/green
- Complex rhythm game element

### Level-by-Level Breakdown

**Level 16: Downtown Entry**
- Scroll: 200 px/s
- Introduce cars (5 moving)
- Previous obstacles reduced
- City aesthetic debut
- Length: 12,000px

**Level 17: Construction Zone**
- Scroll: 220 px/s
- Add falling debris (random)
- Cars + Previous obstacles
- Requires quick reflexes
- Length: 13,500px

**Level 18: Rush Hour**
- Scroll: 240 px/s
- Add pedestrians (8 walking)
- Cars + Debris
- Crowd navigation challenge
- Length: 15,000px

**Level 19: Traffic Chaos**
- Scroll: 260 px/s
- Full traffic light system
- All obstacles synced to lights
- Complex timing
- Length: 16,500px

**Level 20: FINAL ESCAPE**
- Scroll: 280 px/s (MAXIMUM!)
- All obstacles active
- Fast traffic cycles (20s)
- Platforms: 50px (NARROWEST!)
- 20 hearts health (MAX!)
- Length: 18,000px (LONGEST!)
- **ULTIMATE CHALLENGE**

### Progression Metrics
| Metric | L16 | L17 | L18 | L19 | L20 |
|--------|-----|-----|-----|-----|-----|
| **Scroll Speed** | 200 | 220 | 240 | 260 | 280 |
| **Platform Width** | 140px | 120px | 100px | 80px | 50px |
| **Health** | 18 | 18 | 19 | 19 | 20 |
| **Length** | 12k | 13.5k | 15k | 16.5k | 18k |
| **Obstacle Types** | 5 | 6 | 7 | 8 | 9 |
| **Gold Score** | 11k | 12k | 13k | 14k | 15k |
| **Gold Time** | 210s | 225s | 240s | 255s | 270s |

### Treats
- 🌭 Hot dogs (200 pts)
- 🍕 Pizza slices (250 pts)
- ⭐ Golden pizza (500 pts)
- **Count**: 40-60 per level

### Goal Object
- 🏠 **Home Front Door**
- Apartment door with house number
- Welcome mat ("Home Sweet Home")
- Door opens when approached
- Victory: Dog rushes inside, SAFE AT LAST!
- **Special**: Credits roll after Level 20!

### Completion Reward
- 🏆 Unlock **Endless Mode** (procedurally generated levels!)
- 🎖️ Achievement: "City Slicker"
- 🎖️ Achievement: "Dog Treat Master" (beat all 20 levels!)
- 🎬 **Credits Scene** with full stats
- 🎮 **Endless Mode** menu unlocked

---

## 🏆 Breed Unlock System

**Progression Rewards**: Each world unlocks a new dog breed

| Unlock | Requirement | Breed | Special Trait | Strategy |
|--------|-------------|-------|---------------|----------|
| **Start** | - | **Pug** | Instant eating, no distractions | Safe & consistent |
| **Start** | - | **Golden Retriever** | 110% speed, 105% jump, distracted | Fast but risky |
| **World 1** | Beat Level 5 | **Chihuahua** | 120% jump height | Vertical routes |
| **World 2** | Beat Level 10 | **Corgi** | 125% speed, 90% jump | Speed runner |
| **World 3** | Beat Level 15 | **Husky** | +5 max health, 90% speed | Tank damage |
| **World 4** | Beat Level 20 | **Endless Mode** | Infinite levels! | Ultimate test |

**Breed Strategy Table**:
- **Pug**: Beginner-friendly, reliable (immune to distractions)
- **Golden**: Intermediate, skill-based (fast but gets distracted)
- **Chihuahua**: Advanced, vertical play (reach high treats/platforms)
- **Corgi**: Expert, speedruns (maximize time bonuses)
- **Husky**: Expert, aggressive (tank through obstacles)

---

## 🎨 Visual Consistency Guidelines

**All Worlds Must Maintain:**
1. **South Park aesthetic** - Flat construction paper style
2. **No external outlines** on sprites (except treats/UI elements)
3. **Thin internal details** (1.5-2px for features)
4. **Bright saturated colors** (no muddy tones)
5. **Exaggerated animations** (squash/stretch, elastic easing)
6. **Gross humor** (puke, stink lines when appropriate)

**World-Specific Allowed:**
- Color palettes (warm/cool/sunset/urban)
- Platform textures (wood/stone/sand/concrete)
- Background elements (trees/waves/buildings)
- Obstacle designs (ducks/crabs/cars)
- Treat visuals (bones/balls/shells/food)

---

## 🎮 World Implementation Approach

**Recommended Development Phases Per World:**

### Phase A: Theme & Art (3-4 hours)
- Design color palette
- Create obstacle sprites (South Park style)
- Add world-specific background elements
- Design platform textures/patterns
- Update scene gradients
- Create themed treats

### Phase B: Mechanics (4-5 hours)
- Implement world-specific hazard behaviors
- Add new mechanic (weather/tides/traffic)
- Create obstacle collision logic
- Balance obstacle difficulty
- Test mechanics feel fair

### Phase C: Level Design (4-5 hours)
- Design 5 levels per world
- Progressive difficulty within world
- Strategic treat/hazard placement
- Signature moments per level
- Playtest for pacing

### Phase D: Goal Object (1-2 hours)
- Create goal sprite (South Park style)
- Add approach animation
- Add entrance/victory animation
- Test collision detection

### Phase E: Breed Unlock (1-2 hours)
- Create breed sprite
- Implement breed stats
- Create unlock screen/animation
- Test breed balance

### Phase F: Polish (2-3 hours)
- World-specific particle effects
- Transition screens between worlds
- World completion rewards
- Achievement tracking
- Sound effects (if implemented)

**Total Time Per World**: 14-18 hours

---

## 📐 Level Design Formulas

### Platform Count Per Level
```
platforms = baseCount + (levelNumber * 7)
Example: Level 1 = 25, Level 20 = 158
```

### Obstacle Count Per Level
```
treats = baseTreats + (worldNumber * 10) + (levelInWorld * 4)
hazards = 8 + (levelNumber * 3)
Example: Level 16 treats = 30 + 40 + 0 = 70
```

### Scroll Speed Per Level
```
scrollSpeed = (levelNumber - 1) * 40 px/sec
But minimum increases per world:
World 1: 0-180, World 2: 120-200, etc.
```

### Platform Width Reduction
```
minWidth = 200 - (levelNumber * 6)
maxWidth = 120 - (levelNumber * 3)
Example: Level 20 = 80px-60px platforms
```

### Star Rating Thresholds
```
goldScore = 2000 + (levelNumber * 650)
goldTime = 60 + (levelNumber * 10)
Example: Level 20 = 15,000 score, 270s time
```

---

## 🚀 Implementation Priority

**Current Status**:
- ✅ **World 1**: COMPLETE (5 levels, goal system, squirrels, auto-scroll)
- 📋 **World 2**: NEXT (Ready to implement)
- 📋 **World 3**: After World 2
- 📋 **World 4**: Final world

**Next Steps**:
1. Implement World 2 (Park) - Complete all 5 levels
2. Test & balance World 2 difficulty
3. Implement World 3 (Beach) - Complete all 5 levels
4. Test & balance World 3 difficulty
5. Implement World 4 (City) - Complete all 5 levels
6. Implement Endless Mode
7. Final polish & testing

---

## 📊 Success Metrics

**Per World Completion**:
- All 5 levels playable ✅
- Progressive difficulty feels natural ✅
- New mechanics are fun and clear ✅
- Visual theme is cohesive ✅
- Goal object works correctly ✅
- Breed unlock triggers ✅
- Star ratings are achievable ✅

**Overall Game Completion**:
- 20 levels total ✅
- 6 dog breeds unlocked ✅
- Smooth difficulty curve (1→20) ✅
- Each world feels unique ✅
- Endless mode unlocked ✅
- Credits scene plays ✅

---

**Last Updated**: December 25, 2024  
**Current Focus**: World 2 implementation  
**Next Milestone**: Complete Park Adventure (Levels 6-10)
