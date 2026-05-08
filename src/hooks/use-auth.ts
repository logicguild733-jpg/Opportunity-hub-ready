import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useAuthUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user ?? null;
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const { data: result, error } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (error) throw error;

      return result.user; // ✅ IMPORTANT FIX
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  });
}
