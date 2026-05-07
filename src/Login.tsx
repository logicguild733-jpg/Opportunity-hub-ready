const onSubmit = async (data: LoginForm) => {
  try {
    await login.mutateAsync(data);

    toast.success("Welcome back!");

    // 👇 FORCE REDIRECT (no role confusion)
    if (data.email === "logicguild733@gmail.com") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (error: any) {
    toast.error(error?.message || "Failed to log in");
  }
};
