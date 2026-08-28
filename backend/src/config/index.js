import dotenv from 'dotenv';

dotenv.config();

const required = ['PORT', 'CLIENT_URL', 'SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.warn(`[config] Missing environment variables: ${missing.join(', ')}`);
}

const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  supabase: {
    url: process.env.SUPABASE_URL || '',
    publishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },

  upload: {
    dir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800', 10), // 50 MB
  },
};

export default config;
