export function server(): string {
  return 'server';
}

// Supabase
export * from './supabase/create-supabase-server-side-client.fn';
export * from './supabase/create-supabase-admin-server-side-client.fn';
export * from './supabase/get-internal-user-id-from-supabase-session.fn';

// Utils
export * from './utils/errors';
