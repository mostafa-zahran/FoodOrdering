import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/src/database.types'

const supabaseUrl = process.env.EXPO_PUBLIC_DB_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_DB_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})