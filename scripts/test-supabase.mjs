import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';

// Parse .env or .env.local if present
function loadEnv() {
  const envFiles = ['.env', '.env.local'];
  const env = {};
  for (const file of envFiles) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
            env[key] = val;
          }
        }
      });
    }
  }
  return env;
}

const env = { ...process.env, ...loadEnv() };
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('---------------------------------------------------------');
console.log('🔍 Supabase Connection & Schema Inspection Tool');
console.log('---------------------------------------------------------');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!');
  console.log('Please ensure your .env file contains:');
  console.log('VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.log('VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-publishable-key');
  process.exit(1);
}

console.log(`📡 Connecting to Supabase Project: ${supabaseUrl}`);

// Configure Supabase client with WebSocket transport for Node.js < 22
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    transport: WebSocket,
  },
});

async function inspectTables() {
  let hasErrors = false;

  // 1. Inspect public.device_status
  console.log('\n--- [1] Checking table: public.device_status ---');
  try {
    const { data, error, count } = await supabase
      .from('device_status')
      .select('*', { count: 'exact' })
      .limit(3);

    if (error) {
      hasErrors = true;
      console.error(`❌ Error querying public.device_status: ${error.message} (code: ${error.code})`);
      if (error.code === '42501' || error.message.toLowerCase().includes('permission denied') || error.message.toLowerCase().includes('policy')) {
        console.warn('⚠️  RLS is blocking read access! Run this in Supabase SQL Editor:');
        console.log('   CREATE POLICY "Allow public read device_status" ON public.device_status FOR SELECT TO anon USING (true);');
      }
    } else {
      console.log(`✅ Table public.device_status accessible!`);
      console.log(`   Total row count: ${count ?? (data ? data.length : 0)}`);
      if (data && data.length > 0) {
        console.log('   Columns detected:', Object.keys(data[0]).join(', '));
        console.log('   Sample row:', JSON.stringify(data[0], null, 2));
      } else {
        console.log('   (Table is currently empty)');
      }
    }
  } catch (err) {
    hasErrors = true;
    console.error(`❌ Exception checking device_status:`, err.message);
  }

  // 2. Inspect public.sorting_history
  console.log('\n--- [2] Checking table: public.sorting_history ---');
  try {
    const { data, error, count } = await supabase
      .from('sorting_history')
      .select('*', { count: 'exact' })
      .limit(3);

    if (error) {
      hasErrors = true;
      console.error(`❌ Error querying public.sorting_history: ${error.message} (code: ${error.code})`);
      if (error.code === '42501' || error.message.toLowerCase().includes('permission denied') || error.message.toLowerCase().includes('policy')) {
        console.warn('⚠️  RLS is blocking read access! Run this in Supabase SQL Editor:');
        console.log('   CREATE POLICY "Allow public read sorting_history" ON public.sorting_history FOR SELECT TO anon USING (true);');
      }
    } else {
      console.log(`✅ Table public.sorting_history accessible!`);
      console.log(`   Total row count: ${count ?? (data ? data.length : 0)}`);
      if (data && data.length > 0) {
        console.log('   Columns detected:', Object.keys(data[0]).join(', '));
        console.log('   Sample row:', JSON.stringify(data[0], null, 2));
      } else {
        console.log('   (Table is currently empty)');
      }
    }
  } catch (err) {
    hasErrors = true;
    console.error(`❌ Exception checking sorting_history:`, err.message);
  }

  console.log('\n---------------------------------------------------------');
  if (hasErrors) {
    console.log('⚠️  One or more table queries failed due to permission or schema errors.');
    console.log('    Review the RLS error messages above.');
    process.exit(1);
  } else {
    console.log('🎉 Supabase connection and schema inspection successful!');
    process.exit(0);
  }
}

inspectTables();
