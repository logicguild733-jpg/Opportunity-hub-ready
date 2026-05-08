import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Briefcase, ArrowRight } from "lucide-react";
import { useLogin } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useLogin();

  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginForm>({
      resolver: zodResolver(loginSchema),
    });

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login.mutateAsync(data);

      toast.success("Welcome back!");

      // get role from DB (profiles table)
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", result?.id)
        .single();

      const role = profile?.role;

      if (role === "admin") navigate("/admin");
      else if (role === "reseller") navigate("/reseller");
      else navigate("/dashboard");

    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-4">

        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase /> Opportunity Hub
        </h1>

        <input
          placeholder="Email"
          {...register("email")}
          className="w-full border p-2 rounded"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border p-2 rounded"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button className="w-full bg-blue-500 text-white p-2 rounded flex justify-center items-center gap-2">
          Sign in <ArrowRight size={16} />
        </button>

      </form>
    </div>
  );
}
