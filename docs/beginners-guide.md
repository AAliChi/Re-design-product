# Beginner's guide

This guide is for you if you haven't used a terminal, Git or code editors in a while, or ever. Follow the steps in order. Each one only needs doing once.

> **Don't want to install anything?** Use **GitHub Codespaces** instead (Option A in the [README](../README.md#option-a-in-your-browser-nothing-to-install-easiest)). It runs everything in your browser, and you can skip straight to [section 6](#6-making-changes).

---

## 1. A few words you'll see

| Word | What it means |
|---|---|
| **Terminal** | A window where you type commands instead of clicking. On Mac it's the *Terminal* app; on Windows use *PowerShell*. VS Code also has one built in (**View → Terminal**). |
| **Repository (repo)** | A project folder whose history Git keeps track of. |
| **Git** | Software that saves snapshots (versions) of your project. |
| **GitHub** | A website that stores your repos online. |
| **Clone** | Download a repo from GitHub to your computer. |
| **Commit** | Save a snapshot of your changes, with a short message. |
| **Push** | Upload your commits to GitHub. |
| **Node.js / npm** | Software that runs the app on your computer. `npm` comes with Node.js. |
| **localhost** | An address that means "this computer". The app runs at `http://localhost:5173`. |

## 2. Install Node.js

1. Go to [nodejs.org](https://nodejs.org) and download the **LTS** version.
2. Open the installer and accept the defaults.
3. Check that it worked: open a **new** terminal window and type:
   ```bash
   node -v
   ```
   You should see a version number like `v22.x.x` or `v24.x.x`. Anything **20.19 or newer** works.

## 3. Install a code editor

Install **[VS Code](https://code.visualstudio.com)**. It's free. **[Cursor](https://cursor.com)** also works and has AI built in.

## 4. Install Git (and optionally GitHub Desktop)

- **Mac:** open Terminal and type `git --version`. If Git isn't installed, your Mac will offer to install it. Click **Install**.
- **Windows:** download from [git-scm.com](https://git-scm.com/download/win) and accept the defaults.

If you'd rather click than type commands, also install **[GitHub Desktop](https://desktop.github.com)** and sign in with your GitHub account.

## 5. Get the project onto your computer

First make your own copy on GitHub. See ["Get your own copy" in the README](../README.md#1-get-your-own-copy).

**With GitHub Desktop:**
1. **File → Clone repository** and pick your copy.
2. Click **Clone**.
3. Click **Open in Visual Studio Code**.

**With the terminal:**
```bash
cd ~/Documents
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
code .
```
`code .` opens the folder in VS Code. If that doesn't work, open VS Code and use **File → Open Folder**.

**Then, in VS Code's terminal** (**View → Terminal**):
```bash
npm install
npm run dev
```
`npm install` downloads everything the app needs. It takes a minute and you only do it once. `npm run dev` starts the app and opens it in your browser. Leave that terminal running while you work.

## 6. Making changes

1. Open a file in VS Code. A good first one is `src/cancellation-flow/flow.config.ts`.
2. Change something, for example the text `'Manage Subscription'`.
3. Save with `Cmd + S` (Mac) or `Ctrl + S` (Windows).
4. Look at the browser. It updates by itself.

If the page goes blank or red, read the message. It names the file and line with the problem. Undo with `Cmd/Ctrl + Z` and save again.

**Reading the code:** files ending in `.tsx` are screens. The parts that look like HTML (`<Button>`, `<div>`) describe what's on the screen. The words inside `className="…"` are Tailwind styles: `p-4` is padding, `rounded-xl` is rounded corners, `bg-card` is the card colour, `text-sm` is small text. You don't have to memorise them. Hover over one in VS Code, or ask your AI assistant.

## 7. Saving your work to GitHub

**GitHub Desktop:** your changed files appear on the left. Type a summary at the bottom left, such as `Rename settings entry`, click **Commit to main**, then **Push origin**.

**VS Code:** click the **Source Control** icon in the left sidebar (it looks like a branch). Type a message, click **Commit**, then **Sync Changes**. If it asks to stage all changes, click **Yes**.

**Terminal:**
```bash
git add .
git commit -m "Rename settings entry"
git push
```

## 8. Next time you sit down to work

1. Open the project folder in VS Code.
2. In the terminal: `npm run dev`
3. Work, save, commit, push.

## 9. Getting help

- Paste the error message into your AI assistant and ask *"What does this mean and how do I fix it?"*
- Check the [Troubleshooting table in the README](../README.md#9-troubleshooting).
- Ask your Re:Design group or facilitator. Everyone gets stuck, and that's part of learning.
