const { app, BrowserWindow, ipcMain, desktopCapturer, nativeImage, globalShortcut, Menu, Tray } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;
let tray;

// Function to create the main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 200,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    title: 'Screenshot Tool'
  });

  mainWindow.loadFile('index.html');

  // Hide menu bar
  mainWindow.setMenuBarVisibility(false);

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Minimize to tray instead of closing
  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

// Function to create tray
function createTray() {
  const trayIconPath = path.join(__dirname, 'assets', 'icon.png');
  tray = new Tray(trayIconPath);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Take Screenshot',
      click: () => takeScreenshot()
    },
    {
      label: 'Show App',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        } else {
          createWindow();
        }
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Screenshot Tool - Click to take screenshot');
  tray.setContextMenu(contextMenu);
  
  // Single click to take screenshot
  tray.on('click', () => {
    takeScreenshot();
  });
}

// Function to get formatted filename
function getFormattedFilename() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const minute = String(now.getMinutes()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  
  return `${day}${month}${year}${minute}${hour}.png`;
}

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to take screenshot
async function takeScreenshot() {
  try {
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: {
        width: 1920,
        height: 1080
      }
    });

    if (sources.length > 0) {
      // Get the primary screen (first source)
      const source = sources[0];
      const image = source.thumbnail;
      
      // Convert to PNG buffer
      const buffer = image.toPNG();
      
      // Create the screensnip folder path
      const desktopPath = path.join(os.homedir(), 'Desktop');
      const screensnipPath = path.join(desktopPath, 'screensnip');
      
      // Ensure directory exists
      ensureDirectoryExists(screensnipPath);
      
      // Generate filename
      const filename = getFormattedFilename();
      const filePath = path.join(screensnipPath, filename);
      
      // Save the file
      fs.writeFileSync(filePath, buffer);
      
      console.log(`Screenshot saved: ${filePath}`);
      
      // Send success message to renderer
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('screenshot-saved', filePath);
      }
      
      // Show notification
      const { Notification } = require('electron');
      if (Notification.isSupported()) {
        new Notification({
          title: 'Screenshot Captured!',
          body: `Saved as ${filename}`,
          icon: path.join(__dirname, 'assets', 'icon.png')
        }).show();
      }
      
    }
  } catch (error) {
    console.error('Error taking screenshot:', error);
    
    // Send error message to renderer
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('screenshot-error', error.message);
    }
  }
}

// App event handlers
app.whenReady().then(() => {
  createWindow();
  createTray();
  
  // Register global shortcut (Ctrl+Shift+S)
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    takeScreenshot();
  });
});

app.on('window-all-closed', () => {
  // Don't quit the app, keep it running in tray
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
});

// IPC handlers
ipcMain.handle('take-screenshot', async () => {
  await takeScreenshot();
});

ipcMain.handle('get-save-path', () => {
  const desktopPath = path.join(os.homedir(), 'Desktop');
  const screensnipPath = path.join(desktopPath, 'screensnip');
  return screensnipPath;
});