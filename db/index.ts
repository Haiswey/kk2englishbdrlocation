import {neon} from '@neondatabase/serverless';
export function getSql(){if(!process.env.DATABASE_URL)throw new Error('Database not configured. Set DATABASE_URL and run database setup.');return neon(process.env.DATABASE_URL);}
