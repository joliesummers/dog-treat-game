# GitHub Setup Instructions

Follow these steps to create your GitHub repository and deploy the game:

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `dog-treat-game`
3. Description: "8-bit side scroller game where dogs collect treats"
4. Keep it **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 2: Push Your Code

Run these commands in your terminal:

```bash
cd /home/jolie/CascadeProjects/dog-treat-game
git remote add origin https://github.com/joliesummers/dog-treat-game.git
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository: https://github.com/joliesummers/dog-treat-game
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: **GitHub Actions**
5. The workflow will automatically run when you push to main

## Step 4: Access Your Game

After the GitHub Action completes (1-2 minutes):
- Your game will be live at: **https://joliesummers.github.io/dog-treat-game/**

## Troubleshooting

If the deployment fails:
1. Check the "Actions" tab in your GitHub repository
2. Look for any error messages in the workflow run
3. Make sure GitHub Pages is enabled and set to "GitHub Actions"

## Future Deployments

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your game
2. Deploy to GitHub Pages
3. Make it live within 1-2 minutes

---

Once deployed, share the link and start building your game! 🐕🎮



