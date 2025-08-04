// DOM elements
const captureBtn = document.getElementById('captureBtn');
const status = document.getElementById('status');
const savePathElement = document.getElementById('savePath');

// Button click handler
captureBtn.addEventListener('click', async () => {
    try {
        captureBtn.disabled = true;
        captureBtn.textContent = 'Capturing...';
        status.textContent = 'Taking screenshot...';
        status.className = 'status';
        
        await window.electronAPI.takeScreenshot();
        
    } catch (error) {
        console.error('Error:', error);
        status.textContent = `Error: ${error.message}`;
        status.className = 'status error';
    } finally {
        captureBtn.disabled = false;
        captureBtn.textContent = 'Take Screenshot';
    }
});

// Listen for screenshot saved event
window.electronAPI.onScreenshotSaved((event, filePath) => {
    const fileName = filePath.split(/[\\/]/).pop();
    status.textContent = `✅ Screenshot saved: ${fileName}`;
    status.className = 'status success';
    
    // Clear status after 3 seconds
    setTimeout(() => {
        status.textContent = '';
        status.className = 'status';
    }, 3000);
});

// Listen for screenshot error event
window.electronAPI.onScreenshotError((event, errorMessage) => {
    status.textContent = `❌ Error: ${errorMessage}`;
    status.className = 'status error';
    
    // Clear status after 5 seconds
    setTimeout(() => {
        status.textContent = '';
        status.className = 'status';
    }, 5000);
});

// Load and display save path
window.electronAPI.getSavePath().then(path => {
    savePathElement.textContent = `📁 Save location: ${path}`;
});

// Add keyboard shortcut info
document.addEventListener('DOMContentLoaded', () => {
    console.log('Screenshot Tool loaded successfully!');
});