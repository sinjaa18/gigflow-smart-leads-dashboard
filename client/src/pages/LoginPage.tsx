import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">
        <form onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <button className="w-full bg-black text-white p-3 rounded">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account ?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer ml-2"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
