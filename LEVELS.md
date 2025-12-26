# 🎮 Dog Treat Adventure - Level Design Document

**Purpose**: Detailed documentation of all levels, game elements, and difficulty progression

**See Also**: 
- [PROJECT_PLAN.md](./PROJECT_PLAN.md) - Overall project roadmap
- [WORLDS.md](./WORLDS.md) - World themes and visual design

---

## 🎮 Game Elements Reference

### HELPFUL Elements (Collect These!)

#### 🦴 Treats (Dog Bones)
**Purpose**: Score points and win the level

**Sizes & Scoring:**
- **Small (1pt)**: Quick snack, easy to grab, lower platforms
- **Medium (2pt)**: Better reward, slightly higher placement
- **Large (3pt)**: Best reward, usually on high/risky platforms

**Visual Effects:**
- Gold stars ⭐ particle burst (5-pointed)
- White sparkles ✨ (spinning)
- Bone spins out while fading

**Strategy:**
- Collect ALL treats to complete level
- High treats = high risk/reward
- Plan route to maximize efficiency

---

### HARMFUL Elements (Avoid These!)

#### 💩 Poo (Primary Hazard)
**Damage**: -1 heart

**Effects Triggered:**
- Dog pukes 🤢 with construction paper green particles
- Streamy elongated shapes (16x6px ellipses)
- Puking face overlay (X_X eyes, open mouth, green tint)
- Invincibility frames: 2 seconds (dog flashes)
- Stink lines rising (South Park style - thin wavy lines)

**Placement Strategy:**
- Static on platforms (forces route planning)
- Near tempting treats (risk/reward)
- Clusters in Levels 4-5 (path finding challenge)

**Player Impact:**
- Level 1 (3 hearts): 3 hits = game over (very punishing!)
- Levels 2-5 (10-12 hearts): More forgiving, strategic damage management

---

#### 🐿️ Squirrels (Distraction Hazard)
**Affected Breed**: Golden Retriever ONLY (Pug is immune!)

**Distraction Mechanics:**
- **Trigger**: 15% chance per second when near Golden
- **Duration**: 1.5 seconds
- **Effect**: Movement reduced to 50%, jump reduced to 70%
- **Visual**: 💭 Thought bubble appears above dog
- **Animation**: Exaggerated bounce (Back.easeInOut, squash/stretch, wobble)

**Strategic Impact:**
- **Levels 1 (No auto-scroll)**: Minor annoyance, slows collection
- **Levels 2-5 (Auto-scroll)**: DANGEROUS! Danger zone catches up while distracted
- **Breed Balance**: Golden = faster but risky, Pug = slower but reliable

**Placement Strategy:**
- On high-value treat platforms (temptation)
- Near danger zone edges (Levels 4-5)
- Multiple squirrels = Golden Retriever skill test

---

#### 🔴 Danger Zone (Auto-Scroll Hazard)
**Active On**: Levels 2-5 only (auto-scroll levels)

**Visual:**
- Red gradient on left edge of screen (80px wide)
- Fades from opaque (left) to transparent (right)
- "⚠️ DANGER ZONE ⚠️" vertical warning text
- Fixed to camera (always visible on left)

**Damage Over Time:**
- **Levels 2-3**: -1 HP per second
- **Level 4**: -2 HP per second
- **Level 5**: -3 HP per second (brutal!)

**Mechanics:**
- Camera auto-scrolls right (platforms appear to move left)
- Dog must keep moving forward to stay ahead
- Can enter danger zone (takes damage) but CAN'T move off-screen left
- Constrained to camera left edge (gets "stuck" there)
- Must move right to escape

**Strategic Implications:**
- **Standing still** = danger zone catches you in 10-30 seconds
- **Going left** = voluntary danger (risky treat collection)
- **Distractions (Golden)** = danger zone advances while frozen
- **Pug advantage** = no distractions = safer pacing

---

#### ⬇️ Falling (Environmental Hazard)
**Trigger**: Fall below bottom of screen

**Damage:**
- **Level 1**: Instant death (game over)
- **Levels 2-5**: -5 hearts (unless health < 5, then death)

**Strategic Use:**
- Teaches players to respect platform edges
- Levels 2-5: Recoverable mistake (not instant fail)
- Combined with auto-scroll: Can't recover if danger zone catches you after fall damage

---

## 🏡 World 1: Backyard Escape - Complete Level Guide

**Theme**: Escaping your backyard from the owner who spotted you
**Visual Style**: South Park construction paper
**Colors**: Warm browns (wood), vibrant greens (grass), cyan sky
**Obstacles**: Poo 💩, Squirrels 🐿️

---

### Level 1 - Tutorial: "Safe Backyard"
**Status**: ✅ COMPLETE

**Difficulty**: Tutorial  
**Length**: 4000px (5 screen widths)  
**Health**: 3 ❤️ (punishing!)  
**Auto-Scroll**: None (explore freely)

**Layout:**
- 19 platforms (120-200px wide)
- Safe gaps (easy jumps)
- Gentle height variation

**Obstacles:**
- 12 treats (small/medium/large mix)
- 8 poo hazards (teaches avoidance)
- 5 squirrels (introduces distraction)

**Learning Goals:**
- Master movement (arrow keys)
- Practice jumping (up arrow)
- Learn treat collection
- Understand damage system
- Build confidence

**Breed Strategy:**
- **Pug**: Easy mode - no distractions, instant eating
- **Golden**: Practice distractions without scroll pressure

---

### Level 2 - Beginner: "Owner Spots You"
**Status**: ✅ COMPLETE

**Difficulty**: Beginner  
**Length**: 6000px (7.5 screen widths)  
**Health**: 10 ❤️  
**Auto-Scroll**: 60 px/sec (1 px/frame @ 60fps)  
**Danger Zone**: -1 HP/sec

**Layout:**
- 28 platforms (120-160px wide) - narrower!
- Wider gaps (requires timing)
- Moderate height variation (180-450px)

**Obstacles:**
- 18 treats (+50% from L1)
- 12 poo hazards (+50% from L1)
- 8 squirrels (more distractions)

**New Mechanic**: Auto-scroll introduced!
- Camera pushes you forward
- Can't go back
- Danger zone on left edge

**Learning Goals:**
- Manage time pressure
- Keep moving forward
- Balance speed vs safety
- Understand danger zone

**Breed Strategy:**
- **Pug**: Reliable, no distractions = safer
- **Golden**: Speed helps outrun danger zone, but distractions are risky!

---

### Level 3 - Intermediate: "Owner Gets Serious"
**Status**: ✅ COMPLETE

**Difficulty**: Intermediate  
**Length**: 8000px (10 screen widths)  
**Health**: 10 ❤️  
**Auto-Scroll**: 100 px/sec (1.67 px/frame @ 60fps)  
**Danger Zone**: -1 HP/sec

**Layout:**
- 35 platforms (100-120px wide) - tiny!
- Brutal gaps (precision required)
- Extreme height variation (220-490px)

**Obstacles:**
- 24 treats (+33% from L2)
- 16 poo hazards (+33% from L2)
- 10 squirrels (constant distraction threat)

**Challenge Escalation:**
- Faster auto-scroll (real pressure)
- Precision jumps needed
- Split-second decisions
- Long endurance test

**Learning Goals:**
- Master timing under pressure
- Perfect spatial awareness
- Route optimization
- Risk assessment

**Breed Strategy:**
- **Pug**: Consistency critical - no margin for distraction errors
- **Golden**: Speed advantage shines, but ONE distraction can be fatal

---

### Level 4 - Advanced: "Owner Running!"
**Status**: 📋 PLANNED

**Difficulty**: Advanced  
**Length**: 10000px (12.5 screen widths)  
**Health**: 10 ❤️  
**Auto-Scroll**: 140 px/sec (2.33 px/frame @ 60fps)  
**Danger Zone**: -2 HP/sec (DOUBLED!)

**Planned Layout:**
- 42 platforms (90-110px wide) - very tiny!
- Precise gaps (expert timing needed)
- Rapid height changes (constant up/down)

**Planned Obstacles:**
- 30 treats (high-reward targets)
- 20 poo hazards (**NEW: Clusters!** 2-3 poo on same platform)
- 12 squirrels (some moving? - future consideration)

**New Challenges:**
- **Poo Clusters**: Multiple poo on one platform = threading the needle
- Faster scroll = less reaction time
- Double danger zone damage = unforgiving
- Endurance: 71 seconds minimum at full speed

**Learning Goals:**
- Path planning around hazard clusters
- Perfect execution required
- Sustained concentration
- Risk vs reward mastery

**Breed Strategy:**
- **Pug**: Reliability is life-or-death (no distractions = essential)
- **Golden**: Speed barely keeps up - distractions almost guarantee failure

---

### Level 5 - Expert: "Escape the Backyard!"
**Status**: 📋 PLANNED

**Difficulty**: Expert (World 1 FINALE!)  
**Length**: 12000px (15 screen widths)  
**Health**: 12 ❤️ (extra 2 for compensation!)  
**Auto-Scroll**: 180 px/sec (3 px/frame @ 60fps) - EXTREME!  
**Danger Zone**: -3 HP/sec (TRIPLE damage!)

**Planned Layout:**
- 50 platforms (80-100px wide) - MINIMAL landing space!
- Pixel-perfect gaps (no room for error)
- Extreme height variation (max vertical challenge)

**Planned Obstacles:**
- 36 treats (maximum risk/reward)
- 24 poo hazards (**NEW: Multi-hazard platforms!** Poo + squirrels together)
- 15 squirrels (everywhere - Golden's nightmare)

**New Challenges:**
- **Multi-Hazard Platforms**: Squirrel + poo on same platform = tight squeeze
- Extreme scroll = constant forward dash required
- Triple danger damage = 4 seconds in zone = death
- Endurance: 67 seconds minimum at full speed
- Pixel-perfect platforming

**Learning Goals:**
- Prove complete mastery of all mechanics
- Ultimate test of skill
- Psychological pressure management
- World 1 graduation exam!

**Breed Strategy:**
- **Pug**: Only safe choice - consistency is king
- **Golden**: Nearly impossible due to distractions (expert-only!)

**Completion Reward:**
- 🏆 Unlock Chihuahua breed (high jumper)
- 🌍 Unlock World 2: Park Adventure
- 🎖️ Achievement: "Backyard Master"

---

## 📊 World 1 Summary Tables

### Quick Reference: Difficulty Metrics

| Element | L1 | L2 | L3 | L4 (Plan) | L5 (Plan) |
|---------|----|----|----|-----------| --------|
| **Treats** | 12 | 18 | 24 | 30 | 36 |
| **Poo Hazards** | 8 | 12 | 16 | 20 | 24 |
| **Squirrels** | 5 | 8 | 10 | 12 | 15 |
| **Platforms** | 19 | 28 | 35 | 42 | 50 |
| **Platform Width** | 120-200px | 120-160px | 100-120px | 90-110px | 80-100px |
| **Gap Distance** | Safe | Risky | Brutal | Precise | Pixel-perfect |
| **Scroll Speed** | 0 | 60 | 100 | 140 | 180 px/sec |
| **Scroll (px/frame)** | 0 | 1.0 | 1.67 | 2.33 | 3.0 |
| **Danger Damage** | None | 1/sec | 1/sec | 2/sec | 3/sec |
| **Length** | 4000px | 6000px | 8000px | 10000px | 12000px |
| **Min Time** | N/A | ~38sec | ~40sec | ~42sec | ~44sec |
| **Hearts** | 3 | 10 | 10 | 10 | 12 |

### Difficulty Progression Formula

**Each Level Adds:**
- +6 treats (+50%)
- +4 poo hazards (+50%)
- +2-3 squirrels (+40%)
- +7-8 platforms (+40%)
- -10-20px platform width
- +40 px/sec scroll speed
- +2000px length
- +0-1 HP/sec danger damage

**Skill Requirements:**
- **L1**: Basic movement + jumping
- **L2**: + Time management
- **L3**: + Precision platforming
- **L4**: + Path planning (hazard clusters)
- **L5**: + Perfect execution (multi-hazards)

---

## 🔮 Future Level Design Guidelines

**When Designing New Levels:**

1. **Start with Goal**: What skill should player practice?
2. **Set Difficulty Tier**: Tutorial / Beginner / Intermediate / Advanced / Expert
3. **Choose Metrics**: Use tables above for guidance
4. **Create Signature Moment**: Each level needs 1-2 memorable challenges
5. **Balance Risk/Reward**: High treats = high danger
6. **Test Both Breeds**: Ensure viable strategies for Pug AND Golden

**Signature Moments (World 1):**
- L1: First high platform jump (teaches risk/reward)
- L2: First danger zone encounter (teaches time pressure)
- L3: 490px height platform (tests precision)
- L4 (Plan): First poo cluster (teaches path planning)
- L5 (Plan): Multi-hazard platform (ultimate test)

---

**Last Updated**: December 7, 2024  
**Current Status**: Levels 1-3 complete and playable, Levels 4-5 designed/planned  
**Next**: Implement Levels 4-5 layouts and mechanics



