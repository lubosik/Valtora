#!/bin/bash
# Start Next.js development server
cd "$(dirname "$0")"
pkill -f "next dev" 2>/dev/null
sleep 2
npm run dev
