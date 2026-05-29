import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate strong random secrets
const accessSecret = crypto.randomBytes(64).toString('hex');
const refreshSecret = crypto.randomBytes(64).toString('hex');

const envContent = `JWT_ACCESS_SECRET=${accessSecret} JWT_REFRESH_SECRET=${refreshSecret} JWT_ACCESS_EXPIRES_IN=10m JWT_REFRESH_EXPIRES_IN=7d `.trim();

const envPath = path.join(__dirname, '.env');
fs.writeFileSync(envPath, envContent, {flag: 'w'});

console.log('.env file' , envPath)