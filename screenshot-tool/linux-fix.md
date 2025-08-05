# Linux Setup Fix

## Quick Fix for the Library Error

You're getting the `libgobject-2.0.so.0` error because you're on a Linux system that's missing required libraries for Electron.

### Solution:

**For Ubuntu/Debian systems:**
```bash
sudo apt-get update
sudo apt-get install libgtk-3-dev libgconf-2-4 libnss3-dev libxss1 libasound2-dev libxtst6 libatspi2.0-0 libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxkbcommon0 libglib2.0-dev
```

**For CentOS/RHEL:**
```bash
sudo yum install gtk3-devel libXScrnSaver alsa-lib glib2-devel
```

**For Fedora:**
```bash
sudo dnf install gtk3-devel libXScrnSaver alsa-lib glib2-devel
```

**For Arch Linux:**
```bash
sudo pacman -S gtk3 libxss alsa-lib glib2
```

### After installing the libraries:

1. Try running the app again:
   ```bash
   npm start
   ```

2. If you're on a headless server (no GUI), you'll need a virtual display:
   ```bash
   sudo apt-get install xvfb
   xvfb-run --auto-servernum npm start
   ```

### Building for Linux:

The app will now build AppImage files for Linux distribution:
```bash
npm run build
```

This creates a portable Linux executable that users can run without installation.

### Cross-Platform Note:

The app now supports:
- **Windows**: Creates NSIS installer (.exe)
- **Linux**: Creates AppImage (.AppImage)  
- **macOS**: Creates DMG installer (.dmg)

Your screenshots will still be saved to `~/Desktop/screensnip/` on Linux systems.