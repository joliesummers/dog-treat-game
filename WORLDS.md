# 🌍 Dog Treat Adventure - World Design Document

**Purpose**: Detailed world themes, visual design, and cross-world progression system

**See Also**: 
- [PROJECT_PLAN.md](./PROJECT_PLAN.md) - Overall project roadmap
- [LEVELS.md](./LEVELS.md) - Detailed level designs and game elements

---

## 🎨 World System Design (Mario-Inspired)

**Philosophy**: Each "world" has 5 levels with a cohesive theme and visual style, introducing new obstacles and mechanics progressively.

---

## 🏡 World 1: Backyard Escape

**Theme**: Escaping the backyard from your owner  
**Levels**: 1-5  
**Status**: Levels 1-3 ✅ Complete | Levels 4-5 📋 Planned

### Visual Style
- **Colors**: Warm browns (wood platforms), vibrant greens (grass), cyan sky
- **Aesthetic**: South Park construction paper style
- **Background**: Bright cyan gradient sky (`0x4DD0E1 → 0xB2EBF2`)
- **Platforms**: Warm wood texture with visible grain (horizontal streaks)
- **Grass**: Vibrant green tufts (`0x8BC34A`, `0x689F38`)

### Obstacles
- 💩 **Poo** (damage) - Static hazards on platforms
- 🐿️ **Squirrels** (distract Golden only) - Bounce in place

### Difficulty Curve
- **Tutorial** (L1): No auto-scroll, wide platforms, learn basics
- **Beginner** (L2): Gentle auto-scroll introduced (60 px/sec)
- **Intermediate** (L3): Faster scroll (100 px/sec), precision required
- **Advanced** (L4): Very fast scroll (140 px/sec), poo clusters
- **Expert** (L5): Extreme scroll (180 px/sec), multi-hazard platforms

### Progression Metrics
| Metric | Range |
|--------|-------|
| **Scroll Speed** | 0 → 180 px/sec |
| **Platform Width** | 200px → 80px |
| **Health** | 3 → 12 hearts |
| **Length** | 4000px → 12000px |
| **Danger Damage** | None → 3 HP/sec |

### Completion Reward
- 🏆 Unlock **Chihuahua** breed (high jumper)
- 🌍 Unlock **World 2: Park Adventure**
- 🎖️ Achievement: "Backyard Master"

**See [LEVELS.md](./LEVELS.md) for detailed level-by-level breakdown.**

---

## 🌳 World 2: Park Adventure

**Theme**: Running through the local park  
**Levels**: 6-10  
**Status**: 📋 Planned

### Visual Style
- **Colors**: Bright greens (trees), blue sky, stone/concrete paths
- **Aesthetic**: South Park construction paper (consistent)
- **Background**: Blue sky with tree silhouettes, park benches
- **Platforms**: Stone/concrete (gray with texture, cracks, moss)
- **Grass**: Lush park grass with flowers

### New Obstacles
- 🦆 **Ducks** - Waddle back and forth on platforms (moving hazards)
- 🌳 **Trees** - Static tall obstacles you must jump over (vertical challenge)
- 💦 **Sprinklers** - Periodic water bursts that slow you down (timing challenge)

### New Mechanic: Weather System
- **Rain**: Makes platforms slippery (reduced traction)
- **Visual**: Rain particles falling, puddles on platforms
- **Gameplay**: Harder to stop/turn, longer jumps slide

### Difficulty Curve
- Builds on World 1 skills
- Scroll speed: 120 → 200 px/sec
- Introduces moving obstacles (ducks)
- Timing-based hazards (sprinklers)

### Progression Metrics
| Metric | Range |
|--------|-------|
| **Scroll Speed** | 120 → 200 px/sec |
| **Platform Width** | 180px → 70px |
| **Health** | 12 → 15 hearts |
| **Length** | 8000px → 14000px |
| **Obstacle Types** | 4 (poo, squirrels, ducks, sprinklers) |

### Completion Reward
- 🏆 Unlock **Corgi** breed (speed runner)
- 🌍 Unlock **World 3: Beach Boardwalk**
- 🎖️ Achievement: "Park Ranger"

---

## 🏖️ World 3: Beach Boardwalk

**Theme**: Chasing treats along the beach and pier  
**Levels**: 11-15  
**Status**: 📋 Planned

### Visual Style
- **Colors**: Sandy yellows, ocean blues, pier browns, sunset oranges
- **Aesthetic**: South Park construction paper (consistent)
- **Background**: Ocean waves, seagulls, beach umbrellas, setting sun
- **Platforms**: Wooden pier planks (worn, some broken/rickety)
- **Sand**: Textured sand dunes, beach grass

### New Obstacles
- 🦀 **Crabs** - Move in patterns (left-right-pause, then reverse)
- 🌊 **Waves** - Periodic rising water that damages and pushes
- ☀️ **Seagulls** - Dive bomb from above (aerial hazard)

### New Mechanic: Tide System
- **Low Tide**: More platforms visible, easier route
- **High Tide**: Water rises, some platforms submerged (damage zone)
- **Visual**: Water level animation, foam/spray
- **Gameplay**: Must time jumps with tide cycle (30-second rhythm)

### Difficulty Curve
- Advanced scroll speeds
- Vertical hazards (seagulls)
- Environmental timing (tides)
- Pattern recognition (crabs)

### Progression Metrics
| Metric | Range |
|--------|-------|
| **Scroll Speed** | 160 → 240 px/sec |
| **Platform Width** | 160px → 60px |
| **Health** | 15 → 18 hearts |
| **Length** | 10000px → 16000px |
| **Obstacle Types** | 5 (poo, squirrels, crabs, waves, seagulls) |

### Completion Reward
- 🏆 Unlock **Husky** breed (tanky, +5 max health)
- 🌍 Unlock **World 4: City Streets**
- 🎖️ Achievement: "Beach Bum"

---

## 🏙️ World 4: City Streets

**Theme**: Urban chase through downtown  
**Levels**: 16-20  
**Status**: 📋 Planned

### Visual Style
- **Colors**: Grays (concrete), reds (brick), neon signs, yellow taxi cabs
- **Aesthetic**: South Park construction paper (consistent)
- **Background**: Building skyline, fire escapes, street lights, traffic
- **Platforms**: Building ledges, awnings, fire escape stairs, car roofs
- **Ground**: Asphalt streets, sidewalks, crosswalks

### New Obstacles
- 🚗 **Cars** - Moving platforms AND hazards (jump on roof or get hit)
- 🚧 **Construction Zones** - Falling debris (random spawn, dodge quickly)
- 👔 **People** - Slow you down if you bump them (crowd navigation)

### New Mechanic: Traffic Lights
- **Red Light**: Cars stopped (safe platforms, but scroll doesn't stop!)
- **Yellow Light**: Cars start moving (warning!)
- **Green Light**: Cars zoom by (hazard + moving platform opportunity)
- **Visual**: Traffic light signals, car brake lights
- **Gameplay**: Time jumps with traffic cycles (challenging rhythm)

### Difficulty Curve
- Expert-level scroll speeds
- Complex multi-layer hazards
- Rhythm-based mechanics (traffic)
- Crowd management
- FINALE world!

### Progression Metrics
| Metric | Range |
|--------|-------|
| **Scroll Speed** | 200 → 280 px/sec |
| **Platform Width** | 140px → 50px |
| **Health** | 18 → 20 hearts |
| **Length** | 12000px → 18000px |
| **Obstacle Types** | 6 (poo, squirrels, cars, debris, people, traffic) |

### Completion Reward
- 🏆 Unlock **Endless Mode** (procedurally generated levels)
- 🎖️ Achievement: "City Slicker"
- 🎖️ Achievement: "Dog Treat Master" (beat all 20 levels!)
- 🎬 **Credits Scene** with stats

---

## 📊 Difficulty Escalation Across Worlds

### Comparative Metrics

| Factor | World 1 | World 2 | World 3 | World 4 |
|--------|---------|---------|---------|---------|
| **Levels** | 1-5 | 6-10 | 11-15 | 16-20 |
| **Platform Width** | 80-200px | 70-180px | 60-160px | 50-140px |
| **Scroll Speed Range** | 0-180 | 120-200 | 160-240 | 200-280 |
| **Max Health** | 3-12 | 12-15 | 15-18 | 18-20 |
| **Obstacle Types** | 2 | 4 | 5 | 6 |
| **Level Length** | 4-12k px | 8-14k px | 10-16k px | 12-18k px |
| **New Mechanics** | Auto-scroll | Weather | Tides | Traffic |
| **Theme** | Backyard | Park | Beach | City |

### Skill Progression

**World 1**: Master basics (movement, jumping, time pressure)  
**World 2**: Add moving obstacles + environmental effects  
**World 3**: Add vertical hazards + cyclical timing  
**World 4**: Combine all skills + expert execution

---

## 🎮 World Implementation Approach

**Recommended Development Phases Per World:**

### Phase A: Theme & Art (3-4 hours)
- Design color palette
- Create obstacle sprites (South Park style)
- Add world-specific background elements
- Design platform textures/patterns
- Update scene gradients

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

### Phase D: Polish (2-3 hours)
- World-specific particle effects
- Transition screens between worlds
- World completion rewards
- Achievement tracking
- Sound effects (if implemented)

**Total Time Per World**: 12-16 hours

---

## 🏆 Breed Unlock System

**Progression Rewards**: Each world unlocks a new dog breed

| Unlock | Requirement | Breed | Special Trait |
|--------|-------------|-------|---------------|
| **Start** | - | Pug | Instant eating, no distractions |
| **Start** | - | Golden Retriever | Fast (110% speed), high jump (105%), distracted |
| **World 1 Complete** | Beat Level 5 | Chihuahua | Super jump (120% jump height) |
| **World 2 Complete** | Beat Level 10 | Corgi | Speed runner (125% speed, 90% jump) |
| **World 3 Complete** | Beat Level 15 | Husky | Tanky (+5 max health, 90% speed) |
| **World 4 Complete** | Beat Level 20 | Endless Mode | Unlock procedural levels |

**Breed Strategy Table**:
- **Pug**: Reliable, consistent, safe (beginner-friendly)
- **Golden**: Fast, risky, skill-based (intermediate)
- **Chihuahua**: High platforms, vertical routes (advanced)
- **Corgi**: Speed runs, time trials (expert)
- **Husky**: Tank damage, aggressive routes (expert)

---

## 🎨 Visual Consistency Guidelines

**All Worlds Must Maintain:**
1. **South Park aesthetic** - Flat construction paper style
2. **No external outlines** on sprites (except treats)
3. **Thin internal details** (1.5-2px for features)
4. **Bright saturated colors** (no muddy tones)
5. **Exaggerated animations** (squash/stretch, elastic easing)
6. **Gross humor** (puke, stink lines, etc.)

**World-Specific Allowed:**
- Color palettes (warm/cool/sunset/urban)
- Platform textures (wood/stone/sand/concrete)
- Background elements (trees/waves/buildings)
- Obstacle designs (ducks/crabs/cars)

---

## 🔮 Future Expansion Ideas

### World 5: Mountain Trail (Hypothetical)
- **Theme**: Hiking trail escape
- **Obstacles**: Boulders (rolling), hikers (slow zones), bears (chase)
- **Mechanic**: Altitude system (lower oxygen = slower movement at peaks)

### World 6: Doggy Daycare (Hypothetical)
- **Theme**: Indoor chaos
- **Obstacles**: Other dogs (distract all breeds), toys (slippery), gates
- **Mechanic**: Hallways (limited vertical movement, horizontal timing)

**Note**: Focus on completing Worlds 1-4 before expanding further.

---

## 📐 Level Design Formulas

### Platform Count Per Level
```
platforms = baseCount + (levelNumber * 7)
Example: Level 1 = 19, Level 5 = 50
```

### Obstacle Count Per Level
```
treats = 12 + (levelNumber * 6)
poo = 8 + (levelNumber * 4)
squirrels = 5 + (levelNumber * 2)
```

### Scroll Speed Per Level
```
scrollSpeed = (levelNumber - 1) * 40 px/sec
Level 1 = 0, Level 2 = 60, Level 3 = 100, etc.
```

### Platform Width Reduction
```
minWidth = 200 - (levelNumber * 20)
maxWidth = 120 - (levelNumber * 8)
```

---

**Last Updated**: December 7, 2024  
**Current Focus**: World 1 completion (Levels 4-5 remaining)  
**Next World**: World 2 after World 1 fully complete and polished

