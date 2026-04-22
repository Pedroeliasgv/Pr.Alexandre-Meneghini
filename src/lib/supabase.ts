import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "SUA_URL_AQUI";
const supabaseKey = "SUA_ANON_KEY_AQUI";

export const supabase = createClient(supabaseUrl, supabaseKey);