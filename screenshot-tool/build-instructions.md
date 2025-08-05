# Build Instructions for Screenshot Tool

## Quick Setup

1. **Copy the entire `/app/screenshot-tool/` folder to your local machine**

2. **Install Node.js** (if not already installed):
   - Download from: https://nodejs.org/
   - Install the LTS version (v18 or higher recommended)

3. **Linux Users - Install Required System Libraries:**
   ```bash
   # Ubuntu/Debian:
   sudo apt-get update
   sudo apt-get install libgtk-3-dev libgconf-2-4 libnss3-dev libxss1 libasound2-dev libxtst6 libatspi2.0-0 libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxkbcommon0

   # CentOS/RHEL/Fedora:
   sudo yum install gtk3-devel libXScrnSaver alsa-lib
   # OR for newer versions:
   sudo dnf install gtk3-devel libXScrnSaver alsa-lib

   # Arch Linux:
   sudo pacman -S gtk3 libxss alsa-lib
   ```

4. **Open Command Prompt/Terminal** in the screenshot-tool folder

5. **Install dependencies:**
   ```bash
   npm install
   ```

6. **Test the app:**
   ```bash
   npm start
   ```

7. **Build the installer:**
   ```bash
   npm run build
   ```

## What Happens During Build

The build process will:
- Create a `dist` folder
- Generate a Windows installer (.exe file)
- The installer will be around 150-200MB (includes Electron runtime)
- Installer is completely standalone - no internet needed

## Installer Features

The generated installer will:
- ✅ Install the app to Program Files
- ✅ Create desktop shortcut
- ✅ Create Start Menu entry
- ✅ Allow custom installation directory
- ✅ Work offline (no internet required)
- ✅ Can be distributed to any Windows machine

## Alternative: Portable Version

If you want a portable version instead of an installer:

1. Change `package.json` build target from `"nsis"` to `"portable"`
2. Run `npm run build`
3. This creates a portable .exe that doesn't need installation

## File Locations After Installation

When users install your app:
- **App files**: `C:\Program Files\Screenshot Tool\`
- **Screenshots**: `C:\Users\[Username]\Desktop\screensnip\`
- **Desktop shortcut**: `Screenshot Tool.lnk`

## Troubleshooting Build Issues

**Error: "libgobject-2.0.so.0: No such file" (Linux)**
```bash
# Ubuntu/Debian:
sudo apt-get install libglib2.0-dev libgtk-3-dev

# CentOS/RHEL:
sudo yum install glib2-devel gtk3-devel

# Fedora:
sudo dnf install glib2-devel gtk3-devel
```

**Error: "electron-builder not found"**
```bash
npm install -g electron-builder
```

**Error: "Python required"**
- Install Python 3.x from python.org
- Or use: `npm install --global windows-build-tools`

**Build fails on Windows:**
- Run Command Prompt as Administrator
- Ensure Windows SDK is installed

**Linux Display Issues:**
- Ensure you're running in a graphical environment (not headless)
- Install: `sudo apt-get install xvfb` for headless testing

**Large file size?**
- This is normal - Electron bundles Chrome runtime
- Final installer will be 150-200MB
- This ensures it works on any Windows machine

## Distribution

Once built, you can:
- Share the installer (.exe) file with anyone
- Upload to GitHub releases
- Distribute via any file sharing method
- No additional dependencies needed on target machines

The installer is completely self-contained and will work on any Windows 10/11 machine without requiring Node.js or any other software to be pre-installed.