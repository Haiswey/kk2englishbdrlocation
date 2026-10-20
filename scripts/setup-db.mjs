import {neon} from '@neondatabase/serverless';
if(!process.env.DATABASE_URL)throw new Error('Set DATABASE_URL before database setup');
const sql=neon(process.env.DATABASE_URL);
await sql`CREATE TABLE IF NOT EXISTS readings (id BIGSERIAL PRIMARY KEY,name TEXT NOT NULL,device TEXT NOT NULL,lat DOUBLE PRECISION NOT NULL,lng DOUBLE PRECISION NOT NULL,accuracy DOUBLE PRECISION NOT NULL,captured DOUBLE PRECISION NOT NULL,received DOUBLE PRECISION NOT NULL,session TEXT NOT NULL)`;
await sql`CREATE INDEX IF NOT EXISTS readings_received_idx ON readings(received DESC)`;
console.log('Database schema is ready.');
