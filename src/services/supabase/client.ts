import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://rpykhywovyyehispfhtm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweWtoeXdvdnl5ZWhpc3BmaHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5ODE5NzgsImV4cCI6MjAwNjU1Nzk3OH0.uF-qyurBg2gtpasVw-vDYko2N4iaStpXW8dgERkbpho';

const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: AsyncStorage
  }
});

export default client;