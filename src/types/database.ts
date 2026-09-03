/** App profile row — mirrors public.profiles in Supabase. */
export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role?: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfileUpdate = Pick<Profile, "full_name" | "avatar_url">;
