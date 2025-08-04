# Screenshot Tool

A one-click desktop screenshot tool built with Electron.js that captures full-screen screenshots and saves them with a custom naming format.

## Features

- ✅ **One-click screenshot capture** - Click the tray icon or use the app button
- ✅ **Custom filename format** - Files are saved as `DDMMYYYYMMMHH.png` (Day, Month, Year, Minute, Hour)
- ✅ **Automatic folder creation** - Creates `screensnip` folder on Desktop if it doesn't exist
- ✅ **System tray integration** - Minimizes to tray for quick access
- ✅ **Global hotkey** - Use `Ctrl+Shift+S` to capture from anywhere
- ✅ **Desktop notifications** - Get notified when screenshot is saved
- ✅ **Taskbar pinnable** - Can be pinned to Windows taskbar
- ✅ **Standalone installer** - No internet required after installation

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run in development mode:**
   ```bash
   npm start
   # or
   yarn start
   ```

3. **Build standalone installer:**
   ```bash
   npm run build
   # or
   yarn build
   ```

   This will create a Windows installer in the `dist` folder.

## Usage

### Taking Screenshots

1. **Tray Icon**: Click the camera icon in the system tray
2. **App Button**: Open the app and click "Take Screenshot"
3. **Keyboard Shortcut**: Press `Ctrl+Shift+S` anywhere
4. **Taskbar**: Pin the app to taskbar for quick access

### File Naming

Screenshots are automatically named using the format: `DDMMYYYYMMMHH.png`

Example: `31122024530.png` = 31st December 2024, 5:30

### Save Location

All screenshots are saved to: `Desktop/screensnip/`

The folder is created automatically if it doesn't exist.

## Technical Details

### Built With
- **Electron.js** - Cross-platform desktop app framework
- **Node.js** - JavaScript runtime
- **Native APIs** - For screen capture and file system access

### Key Features
- Uses Electron's `desktopCapturer` API for high-quality screenshots
- Implements system tray for background operation
- Global shortcuts for system-wide access
- Auto-minimize to tray to keep desktop clean
- Native notifications on successful capture

### File Structure
```
screenshot-tool/
├── main.js          # Main Electron process
├── renderer.js      # UI logic
├── preload.js       # Secure IPC bridge
├── index.html       # App interface
├── package.json     # Dependencies & build config
├── assets/
│   ├── icon.png     # App icon
│   └── icon.ico     # Windows icon
└── dist/            # Built installers (after build)
```

## Building for Distribution

The app is configured to build a Windows NSIS installer that:
- Creates a standalone executable
- Installs to Program Files
- Creates desktop and start menu shortcuts
- Allows custom installation directory
- Requires no internet connection after installation

## Troubleshooting

**App won't start?**
- Ensure Node.js is installed
- Run `npm install` to install dependencies

**Screenshots not saving?**
- Check if Desktop folder exists and is writable
- Verify permissions for file creation

**Tray icon missing?**
- Check system tray settings in Windows
- Look for hidden icons in system tray

## License

MIT License - feel free to use and modify as needed.