# 🛠️ Development & Testing Guide

**For Developers & Testers**

---

## 🔓 Debug Features

### Unlock All Levels (For Testing)

**Method 1: Debug Key (Recommended)**
1. Launch the game (locally or deployed)
2. Click **PLAY** to reach the Level Select screen
3. **Press the `L` key**
4. All 5 levels will unlock instantly
5. Confirmation message appears: "🔓 ALL LEVELS UNLOCKED (Debug Mode)"

**Method 2: Browser Console**
```javascript
// Unlock all 5 levels
localStorage.setItem('unlockedLevels', '5');
// Then refresh the page
location.reload();
```

**Method 3: Reset Progress**
```javascript
// Reset to Level 1 only
localStorage.setItem('unlockedLevels', '1');
location.reload();
```

---

## 🎮 Testing Checklist

### Level Testing

**Level 1 - Tutorial**
- [ ] No auto-scroll (can move freely)
- [ ] 3 hearts displayed
- [ ] Falling = instant death
- [ ] 12 treats, 8 poo, 5 squirrels
- [ ] Wide platforms (120-200px)

**Level 2 - Beginner**
- [ ] Auto-scroll active (60 px/sec)
- [ ] Owner sprite visible on left edge
- [ ] 10 hearts displayed
- [ ] Danger zone damage (-1 HP/sec)
- [ ] 18 treats, 12 poo, 8 squirrels
- [ ] Narrower platforms (120-160px)

**Level 3 - Intermediate**
- [ ] Faster auto-scroll (100 px/sec)
- [ ] Owner sprite chasing
- [ ] 10 hearts displayed
- [ ] Danger zone damage (-1 HP/sec)
- [ ] 24 treats, 16 poo, 10 squirrels
- [ ] Tiny platforms (100-120px)

**Level 4 - Advanced**
- [ ] Very fast auto-scroll (140 px/sec)
- [ ] Owner sprite chasing aggressively
- [ ] 10 hearts displayed
- [ ] **Poo clusters** visible (2-3 poo close together)
- [ ] Danger zone damage (-2 HP/sec) - DOUBLED!
- [ ] 30 treats, 20 poo, 12 squirrels
- [ ] Very tiny platforms (90-110px)

**Level 5 - Expert**
- [ ] EXTREME auto-scroll (180 px/sec)
- [ ] Owner sprite chasing very aggressively
- [ ] **12 hearts** displayed (+2 extra)
- [ ] **Multi-hazard platforms** (squirrels near poo)
- [ ] Danger zone damage (-3 HP/sec) - TRIPLED!
- [ ] 36 treats, 24 poo, 15 squirrels
- [ ] Minimal platforms (80-100px)

### Breed Testing

**Pug**
- [ ] Speed: 100% (baseline)
- [ ] Jump: 95% (slightly lower)
- [ ] Eating: Instant (no delay)
- [ ] Distractions: NEVER (immune to squirrels)
- [ ] Strategy: Consistent, reliable

**Golden Retriever**
- [ ] Speed: 110% (faster!)
- [ ] Jump: 105% (higher!)
- [ ] Eating: 200ms delay
- [ ] Distractions: 15% chance/sec (1.5sec freeze)
- [ ] Movement during distraction: 50% speed
- [ ] Jump during distraction: 70% power
- [ ] Strategy: Fast but risky

### Visual Effects

**Treat Collection**
- [ ] Gold stars ⭐ particles burst
- [ ] White sparkles ✨ spin
- [ ] Bone spins out while fading
- [ ] Score increments by size (1-3 pts)

**Poo Hit**
- [ ] Dog pukes 🤢 (construction paper green)
- [ ] Streamy elongated particles from mouth
- [ ] Puking face overlay (X_X eyes, open mouth, green tint)
- [ ] Stink lines rise from poo (thin wavy lines)
- [ ] Invincibility: 2 seconds (dog flashes)
- [ ] Health decreases by 1

**Dog Landing**
- [ ] Dust cloud puffs appear (3-5 clouds)
- [ ] Light gray fluffy clouds
- [ ] Expand/fade animation
- [ ] Spray sideways/up

**Squirrel Distraction (Golden only)**
- [ ] 💭 Thought bubble appears
- [ ] Squirrel bounces exaggerated
- [ ] Movement slowed to 50%
- [ ] Jump reduced to 70%
- [ ] Lasts 1.5 seconds

**Owner Sprite (Levels 2-5)**
- [ ] Blue shirt, brown pants
- [ ] X_X angry eyes
- [ ] Open mouth (shouting)
- [ ] Reaching arm
- [ ] Speed lines behind
- [ ] Fixed to left edge of camera

---

## 🏗️ Local Development

### Start Dev Server
```bash
npm run dev
# Server runs on http://localhost:5173
```

### Build for Production
```bash
npm run build
# Output in /dist folder
```

### Run Linter
```bash
npm run lint
```

### Test Build Locally
```bash
npm run build
npm run preview
# Preview runs on http://localhost:4173
```

---

## 📊 Performance Testing

### Check Frame Rate
Open browser console (F12) and run:
```javascript
// Monitor FPS
setInterval(() => {
  console.log('FPS:', Math.round(1000 / game.loop.delta));
}, 1000);
```

### Check Asset Load Times
```javascript
// In browser Network tab (F12)
// Filter by: All, JS, Images
// Look for slow-loading assets
```

---

## 🐛 Debugging Tips

### Common Issues

**Levels won't unlock:**
- Check localStorage: `localStorage.getItem('unlockedLevels')`
- Press `L` on Level Select screen
- Or manually set: `localStorage.setItem('unlockedLevels', '5')`

**Auto-scroll not working:**
- Check level config: `getCurrentLevelConfig(2).autoScroll`
- Should be `true` for Levels 2-5

**Owner sprite not showing:**
- Check danger zone is enabled: `getCurrentLevelConfig(2).dangerZoneEnabled`
- Owner only appears on Levels 2-5

**Dog stuck in danger zone:**
- Dog is constrained to camera left edge
- Must jump/move right to escape
- Damage applies at -1/-2/-3 HP per second

### Browser Console Commands

```javascript
// Check current level
game.scene.scenes[2].currentLevel

// Check unlocked levels
localStorage.getItem('unlockedLevels')

// Unlock all levels
localStorage.setItem('unlockedLevels', '5')

// Reset progress
localStorage.clear()

// Get dog position
game.scene.scenes[2].dog.getSprite().x
```

---

## 📝 Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: v9 flat config
- **Formatting**: 2-space indentation
- **Comments**: Explain "why" not "what"
- **Naming**: camelCase for variables, PascalCase for classes

---

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, commit often
git add .
git commit -m "Clear, descriptive message"

# Push to remote
git push origin feature/my-feature

# Merge to main (after testing)
git checkout main
git merge feature/my-feature
git push origin main
```

---

## 📚 Useful Files

- `PROJECT_PLAN.md` - Overall roadmap & milestones
- `LEVELS.md` - Detailed level designs
- `WORLDS.md` - World themes & progression
- `TESTING_ROADMAP.md` - Testing strategy
- `PHASER_LIMITATIONS.md` - Technical notes
- `DEPLOYMENT.md` - Deploy instructions

---

## 🆘 Need Help?

1. Check `PHASER_LIMITATIONS.md` for known issues
2. Check browser console for errors (F12)
3. Review `PROJECT_PLAN.md` for feature specs
4. Check git history for recent changes

---

**Last Updated**: December 7, 2024  
**Game Version**: v0.2.0 (World 1 Complete - 5 Levels)



