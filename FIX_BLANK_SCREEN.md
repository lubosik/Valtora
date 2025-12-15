# Fix Blank Screen Issue

## Problem
The server is showing a blank screen due to macOS permission issues blocking port binding.

## Solution

### Option 1: Grant Network Permissions (Recommended)
1. Open **System Settings** (or System Preferences on older macOS)
2. Go to **Privacy & Security** → **Firewall**
3. Click the lock icon and enter your password
4. Make sure **Terminal** (or your terminal app) has network permissions
5. If Node.js appears in the list, ensure it's allowed to accept incoming connections

### Option 2: Run Server Manually
Open Terminal and run:
```bash
cd "/Users/ghost/Downloads/Valtora Ben's Company"
npm run dev
```

Or use the provided script:
```bash
./START_SERVER.sh
```

### Option 3: Use a Different Port
If port 3000 is blocked, try:
```bash
PORT=3003 npm run dev
```
Then access: http://localhost:3003

### Option 4: Check for Conflicting Processes
```bash
# Kill any processes using port 3000
lsof -ti:3000 | xargs kill -9

# Then start the server
npm run dev
```

## If Still Not Working

1. **Check macOS Firewall:**
   - System Settings → Privacy & Security → Firewall
   - Temporarily disable firewall to test
   - Re-enable and add exceptions

2. **Rebuild the project:**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   npm run dev
   ```

3. **Check Node.js version:**
   ```bash
   node --version
   # Should be v18 or higher
   ```

## Current Status
- ✅ All code fixes applied
- ✅ Build successful
- ⚠️ Server needs manual start due to macOS permissions
