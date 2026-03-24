import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  name: string;
  type: 'web' | 'mobile';
  description: string;
  category?: string;
  rating?: string;
  rating_count?: string;
  developer?: string;
  icon: string;
  link?: string;
  technologies?: string[];
  screenshots?: string[];
  color?: string; // e.g. "bg-blue-50 text-blue-500"
  created_at: string;
};
