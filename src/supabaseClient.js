// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Yahan apna Supabase project URL aur anon key paste karo
const supabaseUrl = "https://stdzpshbqmoxwzkpowun.supabase.co";

const supabaseAnonKey = "sb_publishable_mRJ_yPtcFdQU3Au_jZSWCg_oQJ4ZLYg";

// const supaUrl = "https://stdzpshbqmoxwzkpowun.supabase.co";
// const supaKey = "sb_publishable_mRJ_yPtcFdQU3Au_jZSWCg_oQJ4ZLYg";

// Supabase client create karo
export const supabase = createClient(supabaseUrl, supabaseAnonKey);