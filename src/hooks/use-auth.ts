import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/**
 * Get current logged-in user
 */
export function useAuthUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("AUTH USER ERROR:", error);
        return null;
      }

      return data.user ?? null;
    },
  });
}

/**
 * LOGIN
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      console.log("LOGIN ATTEMPT:", data);

      const { data: res, error } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (error) {
        console.log("LOGIN ERROR:", error);
        throw error;
      }

      console.log("LOGIN SUCCESS:", res);

      return res; // full session + user
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

/**
 * LOGOUT
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log("LOGOUT ERROR:", error);
        throw error;
      }
    },

    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
