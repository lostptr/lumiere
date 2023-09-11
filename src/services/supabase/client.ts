import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

// todo: use github secrets
const SUPABASE_URL = 'XXX';
const SUPABASE_ANON_KEY = 'XXX';

const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: AsyncStorage
  }
});

export default client;