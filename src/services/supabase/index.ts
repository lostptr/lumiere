import 'react-native-url-polyfill/auto';
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://rpykhywovyyehispfhtm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweWtoeXdvdnl5ZWhpc3BmaHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5ODE5NzgsImV4cCI6MjAwNjU1Nzk3OH0.uF-qyurBg2gtpasVw-vDYko2N4iaStpXW8dgERkbpho';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: AsyncStorage
  }
});

export async function loginWithEmail(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function logoutFromAuth() {
  return await supabase.auth.signOut();
}

export async function createAccount(email: string, password: string, name: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      }
    }
  });
}

//s8DVu0As