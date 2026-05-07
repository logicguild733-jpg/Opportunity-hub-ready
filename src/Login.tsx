const onSubmit = async (data: LoginForm) => {
  try {
    const result = await login.mutateAsync(data);

    toast.success("Welcome back!");

    const user = result?.user; // 👈 FIXED

    if (user?.email === "logicguild733@gmail.com") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (error: any) {
    toast.error(error?.message || "Failed to log in");
  }
};
