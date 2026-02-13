#!/usr/bin/env node

/**
 * CashVault Database Setup Script
 * 
 * This script helps you set up your Neon PostgreSQL database
 * Run: node setup-database.js
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
    warning: '\x1b[33m%s\x1b[0m'  // Yellow
  };
  console.log(colors[type] || colors.info, message);
}

async function main() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║          CashVault Database Setup Helper               ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('\n');

  log('This will help you set up Neon PostgreSQL for CashVault.', 'info');
  log('If you haven\'t created a Neon account yet:', 'warning');
  log('1. Go to https://neon.tech', 'info');
  log('2. Sign up and create a project', 'info');
  log('3. Copy your connection string\n', 'info');

  const hasNeon = await question('Do you have your Neon connection string? (yes/no): ');
  
  if (hasNeon.toLowerCase() !== 'yes') {
    log('\nPlease create a Neon account first:', 'warning');
    log('https://neon.tech', 'info');
    log('\nThen run this script again.', 'info');
    rl.close();
    return;
  }

  console.log('\n');
  log('Paste your Neon connection string (Prisma format):', 'info');
  log('Example: postgresql://user:pass@host.neon.tech/db?sslmode=require&pgbouncer=true', 'warning');
  
  const connectionString = await question('\nConnection String: ');
  
  if (!connectionString.includes('neon.tech') || !connectionString.includes('postgresql://')) {
    log('\n❌ Invalid connection string. Please check and try again.', 'error');
    rl.close();
    return;
  }

  // Parse connection string
  const directUrl = connectionString.replace('&pgbouncer=true', '');
  
  // Update .env.local
  const envPath = path.join(__dirname, '.env.local');
  
  if (!fs.existsSync(envPath)) {
    log('\n❌ .env.local not found!', 'error');
    rl.close();
    return;
  }

  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace or add DATABASE_URL
  if (envContent.includes('DATABASE_URL=')) {
    envContent = envContent.replace(
      /DATABASE_URL=".*?"/,
      `DATABASE_URL="${connectionString}"`
    );
  } else {
    envContent += `\nDATABASE_URL="${connectionString}"\n`;
  }
  
  // Replace or add DIRECT_URL
  if (envContent.includes('DIRECT_URL=')) {
    envContent = envContent.replace(
      /DIRECT_URL=".*?"/,
      `DIRECT_URL="${directUrl}"`
    );
  } else {
    envContent += `DIRECT_URL="${directUrl}"\n`;
  }

  fs.writeFileSync(envPath, envContent);
  log('\n✅ .env.local updated with your database credentials!', 'success');

  // Run Prisma commands
  console.log('\n');
  log('Running database setup commands...', 'info');
  
  try {
    log('1/3: Generating Prisma client...', 'info');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    log('\n2/3: Running migrations...', 'info');
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    
    log('\n3/3: Verifying connection...', 'info');
    execSync('npx prisma db pull', { stdio: 'inherit' });
    
    console.log('\n');
    log('╔════════════════════════════════════════════════════════╗', 'success');
    log('║     ✅ Database setup complete!                        ║', 'success');
    log('╚════════════════════════════════════════════════════════╝', 'success');
    console.log('\n');
    log('Your database is ready to use!', 'success');
    log('Restart your app and test the connection.', 'info');
    
  } catch (error) {
    console.log('\n');
    log('❌ Database setup failed.', 'error');
    log('Error: ' + error.message, 'error');
    log('\nPlease check your connection string and try again.', 'warning');
  }

  rl.close();
}

main().catch(console.error);
