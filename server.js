// Root server.js - Entry point for Render deployment
const path = require('path');

console.log('🔀 Proxy server starting...');
console.log('📁 Root directory:', __dirname);
console.log('🎯 Looking for server at:', path.join(__dirname, 'src', 'server.js'));

// Check if the src/server.js file exists
const fs = require('fs');
const serverPath = path.join(__dirname, 'src', 'server.js');

if (fs.existsSync(serverPath)) {
    console.log('✅ Found server file, starting...');
    require('./src/server.js');
} else {
    console.error('❌ Server file not found at:', serverPath);
    process.exit(1);
}
