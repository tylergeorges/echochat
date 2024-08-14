import { useMemo } from "react";

import { createClient } from "@/lib/supabase/client";

export const useSupabase = () => useMemo(createClient, []);
