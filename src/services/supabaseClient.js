import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

/**
 * Checks whether Supabase URL and Publishable Key are configured.
 */
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabasePublishableKey &&
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    supabasePublishableKey !== 'your-publishable-anon-key'
  );
};

export const getSupabaseConfig = () => ({
  url: supabaseUrl || '',
  publishableKey: supabasePublishableKey || '',
  isConfigured: isSupabaseConfigured()
});

/**
 * Official Supabase JavaScript client instance.
 * Safe for client-side use with Publishable (Anon) Key only.
 * Service-role key is never used or exposed here.
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;
