import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://mudgnaajtolytggksvvq.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZGduYWFqdG9seXRnZ2tzdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjAxODcsImV4cCI6MjEwNzYzNjE4N30.lL5jb84u0PUWH4BjQWdZ4uZLpGKybUuhGISGB9tvdIQ';

/**
 * Cliente Supabase leve e estático para leitura de dados públicos (JIF, comunicados, etc.)
 * Não utiliza `cookies()`, permitindo geração estática em build e ISR com revalidação por webhook.
 */
export const supabasePublic = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

