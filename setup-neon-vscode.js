#!/usr/bin/env node

/**
 * CashVault Database Setup - VS Code Neon Extension Edition
 * 
 * This script helps you set up your database using the VS Code Neon extension
 * Run: node setup-neon-vscode.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m%s\x1b[0m',    // Cyan
    success: '\x1b[32m%s\x1b[0m', // Green
    error: '\x1b[31m%s\x1b[0m',   // Red
    warning: '\x1b[33m%s\x1b[0m', // Yellow
    bold: '\x1b[1m%s\x1b[0m'     // Bold
  };
  console.log(colors[type] || colors.info, message);
}

async function main() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     CashVault Database Setup (VS Code Neon Ext)        ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('\n');

  log('Great! You have the Neon VS Code extension authenticated.', 'success');
  console.log('\n');
  
  log('STEP 1: Create Database in VS Code', 'bold');
  log('────────────────────────────────────', 'info');
  log('1. Open VS Code Command Palette (Ctrl+Shift+P)', 'info');
  log('2. Type: "Neon: Create Project"', 'info');
  log('3. Name it: "cashvault"', 'info');
  log('4. Choose region closest to you (e.g., "US East")', 'info');
  log('5. Wait for it to create...', 'info');
  console.log('\n');

  const created = await question('Have you created the database in VS Code? (yes/no): ');
  
  if (created.toLowerCase() !== 'yes') {
    log('\nPlease create the database first, then run this script again.', 'warning');
    rl.close();
    return;
  }

  console.log('\n');
  log('STEP 2: Get Connection String', 'bold');
  log('────────────────────────────────────', 'info');
  log('1. In VS Code, look at the bottom status bar', 'info');
  log('2. Click on the Neon icon or open Neon panel', 'info');
  log('3. Right-click your "cashvault" project', 'info');
  log('4. Select "Copy Connection String" → "Prisma"', 'info');
  log('5. Paste it below:\n', 'info');

  const connectionString = await question('Paste your Neon connection string: ');
  
  if (!connectionString.includes('neon.tech') || !connectionString.includes('postgresql://')) {
    log('\n❌ That doesn\'t look like a valid Neon connection string.', 'error');
    log('It should look like: postgresql://user:pass@host.neon.tech/db?sslmode=require', 'warning');
    rl.close();
    return;
  }

  // Ensure pg bouncer and connect timeout are in the URL
  let dbUrl = connectionString.trim();
  if (!dbUrl.includes('pgbouncer')) {
    dbUrl += dbUrl.includes('?') ? '&pgbouncer=true' : '?pgbouncer=true';
  }
  if (!dbUrl.includes('connect_timeout')) {
    dbUrl += '&connect_timeout=10';
  }

  // Create direct URL (without pgbouncer)
  const directUrl = dbUrl.replace('&pgbouncer=true', '').replace('?pgbouncer=true&', '?').replace('?pgbouncer=true', '');

  console.log('\n');
  log('STEP 3: Updating Configuration', 'bold');
  log('────────────────────────────────────', 'info');

  // Update .env.local
  const envPath = path.join(__dirname, '.env.local');
  
  if (!fs.existsSync(envPath)) {
    log('\n❌ .env.local not found!', 'error');
    rl.close();
    return;
  }

  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace DATABASE_URL
  if (envContent.includes('DATABASE_URL=')) {
    envContent = envContent.replace(
      /DATABASE_URL=".*?"/,
      `DATABASE_URL="${dbUrl}"`
    );
    log('✅ Updated DATABASE_URL', 'success');
  } else {
    envContent += `\nDATABASE_URL="${dbUrl}"\n`;
    log('✅ Added DATABASE_URL', 'success');
  }
  
  // Replace DIRECT_URL
  if (envContent.includes('DIRECT_URL=')) {
    envContent = envContent.replace(
      /DIRECT_URL=".*?"/,
      `DIRECT_URL="${directUrl}"`
    );
    log('✅ Updated DIRECT_URL', 'success');
  } else {
    envContent += `DIRECT_URL="${directUrl}"\n`;
    log('✅ Added DIRECT_URL', 'success');
  }

  fs.writeFileSync(envPath, envContent);
  console.log('\n');
  log('STEP 4: Initializing Database', 'bold');
  log('────────────────────────────────────', 'info');

  try {
    log('Generating Prisma client...', 'info');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log('\n');
    log('Running migrations (this creates all tables)...', 'info');
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    
    console.log('\n');
    log('Verifying database connection...', 'info');
    execSync('npx prisma db pull', { stdio: 'inherit' });
    
    console.log('\n');
    log('╔════════════════════════════════════════════════════════╗', 'success');
    log('║           🎉 DATABASE SETUP COMPLETE! 🎉               ║', 'success');
    log('╚════════════════════════════════════════════════════════╝', 'success');
    console.log('\n');
    log('✅ Your Neon database is connected!', 'success');
    log('✅ All tables created!', 'success');
    log('✅ Ready for users!', 'success');
    console.log('\n');
    log('NEXT STEPS:', 'bold');
    log('1. Restart your app: npm run dev', 'info');
    log('2. Sign up as a user', 'info');
    log('3. Open browser console and run:', 'info');
    log('   fetch("/api/admin/setup", {method:"POST"})', 'warning');
    log('4. Go to /admin to access admin panel', 'info');
    console.log('\n');
    
  } catch (error) {
    console.log('\n');
    log('❌ Database initialization failed.', 'error');
    log('This might be because:', 'warning');
    log('- The connection string is incorrect', 'info');
    log('- Your database is still being created', 'info');
    log('- Network issues', 'info');
    console.log('\n');
    log('Try again in a minute, or check your Neon dashboard:', 'warning');
    log('https://console.neon.tech', 'info');
  }

  rl.close();
}

main().catch(console.error);
