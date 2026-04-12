import { Navigate } from "react-router-dom";
import { useAuthMe } from "@/hooks/use-auth";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { data, isLoading, error } = useAuthMe();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
