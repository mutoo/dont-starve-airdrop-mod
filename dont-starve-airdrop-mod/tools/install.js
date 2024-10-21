const { exec } = require('child_process');
const path = require('path');

// Define source and destination paths
const srcPath = path.join(__dirname, '../src');
const destPath = process.platform === 'win32' 
    ? 'C:\\Program Files\\ (x86)\\Steam\\steamapps\\common\\Don\'t\\ Starve\\ Together\\mods\\dont-starve-airdrop-mod\\' // Updated Windows path
    : '~/Library/Application Support/Steam/steamapps/common/Don\'t Starve Together/dontstarve_steam.app/Contents/mods/dont-starve-airdrop-mod/';

// Construct the command based on the platform
const command = process.platform === 'win32' 
    ? `mklink /D "${destPath}" "${srcPath}"` // Create a soft link on Windows
    : `rsync -avz --delete "${srcPath}" "${destPath}"`; // Keep rsync for other platforms

// Execute the command
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Output: ${stdout}`);
});
