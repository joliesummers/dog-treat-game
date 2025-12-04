# 🧪 Testing Roadmap

This document outlines when and what tests to add as your game grows.

## ✅ Current Testing (MVP - v0.1.0)

- **TypeScript Compilation** - `tsc` ensures no type errors
- **ESLint** - Code quality and consistency checks
- **Build Verification** - `npm run build` confirms production builds work

**Status**: Sufficient for MVP launch ✨

---

## 📋 Testing Phases

### Phase 1: Post-Launch Stabilization (After first 10 players)
**Trigger**: When you start getting bug reports or want to refactor safely

**Add:**

1. **Unit Tests for Core Game Logic** (1-2 hours)
   - Dog breed stats validation
   - Health system calculations
   - Score/treat counting
   
   ```bash
   npm install --save-dev jest @types/jest ts-jest
   ```
   
   **Files to test:**
   - `src/types/DogBreeds.ts`
   - Health calculations in UIScene
   - Collision detection logic

   **Example:**
   ```typescript
   // tests/breeds.test.ts
   describe('Dog Breeds', () => {
     test('Pug has instant eating', () => {
       expect(DOG_BREEDS.pug.eatSpeed).toBe(0);
     });
   });
   ```

2. **Smoke Test** (30 minutes)
   - Verify game initializes without crashing
   - Test scene transitions work
   
   **When to add**: Before adding Milestone 7 or 8

---

### Phase 2: Before Adding Golden Retriever (Milestone 7)
**Trigger**: When you start working on the second dog breed

**Add:**

1. **Breed System Tests** (1 hour)
   - Test breed selection persists
   - Verify different breeds have different stats
   - Test distraction mechanic for Golden Retriever
   
   **Why now**: Multiple breeds = more complexity to test

2. **State Management Tests** (1 hour)
   - Test game state resets properly
   - Verify UI updates correctly
   - Test pause/resume functionality
   
   **Why now**: We just fixed several state bugs!

---

### Phase 3: Before Adding More Levels (Milestone 8)
**Trigger**: When you create level 2 or level progression

**Add:**

1. **Level System Tests** (1-2 hours)
   - Verify level unlock logic
   - Test level selection
   - Validate each level has required items
   
2. **Integration Tests** (2 hours)
   - Test complete gameplay flow
   - Win condition works across all levels
   - Game over works across all levels

---

### Phase 4: Pre-Production Hardening (Optional)
**Trigger**: When you want to polish for wider release or portfolio

**Add:**

1. **Performance Tests**
   - FPS monitoring
   - Memory leak detection
   
2. **Visual Regression Tests** (Advanced)
   - Screenshot comparisons
   - UI consistency checks

3. **Cross-Browser Testing** (Manual)
   - Test in Chrome, Firefox, Safari
   - Test on mobile browsers

---

## 🎯 Testing Decision Tree

```
┌─ Launching MVP? 
│  └─ Current tests (TypeScript + ESLint + Build) ✅
│
┌─ Got bug reports?
│  └─ Add Phase 1: Unit tests for reported bugs
│
┌─ Adding new dog breeds?
│  └─ Add Phase 2: Breed system tests
│
┌─ Adding more levels?
│  └─ Add Phase 3: Level system tests
│
└─ Want to polish/publish widely?
   └─ Add Phase 4: Full test suite
```

---

## 📊 Test Coverage Goals

| Phase | Coverage Goal | Time Investment |
|-------|--------------|----------------|
| MVP (Current) | Build passes | ✅ Done |
| Phase 1 | Core logic tested | 2-3 hours |
| Phase 2 | Feature parity | 2-3 hours |
| Phase 3 | Integration complete | 3-4 hours |
| Phase 4 | Production ready | 4-6 hours |

---

## 🚦 When NOT to Add Tests

**Don't add tests if:**
- ❌ You're still experimenting with game mechanics
- ❌ You haven't validated the game is fun yet
- ❌ You're the only player
- ❌ You're rapidly prototyping

**Tests are most valuable when:**
- ✅ Code is stabilizing
- ✅ You have users/players
- ✅ You're adding features to existing systems
- ✅ You want confidence when refactoring

---

## 🔧 Quick Setup Commands

### When you're ready for Phase 1:

```bash
# Install Jest
npm install --save-dev jest @types/jest ts-jest jsdom @types/jsdom

# Create jest.config.js
cat > jest.config.js << 'EOF'
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^phaser$': '<rootDir>/node_modules/phaser/dist/phaser.js'
  },
  testMatch: ['**/tests/**/*.test.ts']
};
EOF

# Add test script
# In package.json: "test": "jest"

# Run tests
npm test
```

### When you're ready for Phase 2+:

```bash
# Add to GitHub Actions
# In .github/workflows/deploy.yml:
- name: Run unit tests
  run: npm test
```

---

## 📝 Current Test Status

- ✅ ESLint configured and running
- ✅ TypeScript type checking
- ✅ Build verification in CI/CD
- ⏳ Unit tests - **Waiting for Phase 1**
- ⏳ Integration tests - **Waiting for Phase 3**
- ⏳ E2E tests - **Optional, Phase 4**

---

## 🎮 Testing Philosophy for Games

**Remember**: Games are different from apps!

1. **Playtest > Unit Tests** - Player feedback is more valuable than 100% coverage
2. **Test logic, not graphics** - Don't test Phaser's rendering
3. **Test state, not interactions** - Test health decreases, not that keys work
4. **Fast feedback** - Keep tests quick so you run them often

**Bottom line**: Add tests when they help you move faster, not because you "should."

---

**Last Updated**: December 2024  
**Next Review**: After Milestone 7 or first 10 players

