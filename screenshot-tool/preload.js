const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  takeScreenshot: () => ipcRenderer.invoke('take-screenshot'),
  getSavePath: () => ipcRenderer.invoke('get-save-path'),
  onScreenshotSaved: (callback) => ipcRenderer.on('screenshot-saved', callback),
  onScreenshotError: (callback) => ipcRenderer.on('screenshot-error', callback)
});