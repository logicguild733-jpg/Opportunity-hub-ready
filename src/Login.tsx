import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 50 }}>
      <h1>Login Page ✅</h1>

      <button onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </button>
    </div>
  );
}
