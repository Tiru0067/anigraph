import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file located at server root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  cognodb: {
    uri: process.env.COGNODB_URI || '',
    user: process.env.COGNODB_USER || 'cognodb',
    password: process.env.COGNODB_PASSWORD || ''
  }
};

export default config;
