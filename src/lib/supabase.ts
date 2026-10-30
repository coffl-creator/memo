import { createClient } from "@supabase/supabase-js";

// 교육용이라 로그인 없이 공개 키로 읽고 쓴다
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);
