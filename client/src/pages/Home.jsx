import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axios from "axios";

const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-green-800"></div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUserContext();

  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError("");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const baseURL = "https://multi-agent-bot-backend.onrender.com";

      if (!isSignIn) {
        if (user.password !== user.confirmPassword) {
          setError("Passwords do not match!");
          setIsLoading(false);
          return;
        }

        const { username, email, password, role } = user;
        await axios.post(`${baseURL}/auth/signup`, {
          username,
          email,
          password,
          role,
        });

        alert("Registered successfully! You can now sign in.");
        toggleForm();
        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
      } else {
        const { email, password } = user;
        await axios.post(
          `${baseURL}/auth/login`,
          { email, password },
          { withCredentials: true }
        );
        await fetchUser();
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setError(err.response?.data?.error || "Something went wrong.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-5 bg-[#141414] text-[#E1E1E1]">
      {/* Left Form Section */}
      <div className="col-span-1 md:col-span-3 flex items-center justify-center p-6 sm:p-8 bg-[#1E1E1E] shadow-md">
        <div className="w-full max-w-md px-4 sm:px-0">
          <p className="text-xs sm:text-sm text-[#E1E1E1] mb-4 bg-[#343540] p-2 text-center rounded-lg">
            Please <strong>SIGNUP</strong> as{" "}
            <span className="font-semibold text-[#10A37F]">admin</span> or{" "}
            <span className="font-semibold text-[#10A37F]">support</span> role
            and <strong>LOGIN</strong> to test the Dashboard and Support agents.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#FFFFFF]">
            {isSignIn ? "Welcome Back, Friend...!" : "Sign Up and Go!"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {!isSignIn && (
              <>
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={user.username}
                  onChange={handleChange}
                  className="p-2 rounded-md bg-[#0C0C0C] text-[#E1E1E1] border border-[#343540] focus:outline-none focus:ring-2 focus:ring-[#10A37F] transition text-sm"
                  required
                />
                <select
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="p-2 rounded-md bg-[#0C0C0C] text-[#E1E1E1] border border-[#343540] focus:outline-none focus:ring-2 focus:ring-[#10A37F] transition text-sm"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="support">Support</option>
                </select>
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="p-2 rounded-md bg-[#0C0C0C] text-[#E1E1E1] border border-[#343540] focus:outline-none focus:ring-2 focus:ring-[#10A37F] transition text-sm"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="p-2 rounded-md bg-[#0C0C0C] text-[#E1E1E1] border border-[#343540] focus:outline-none focus:ring-2 focus:ring-[#10A37F] transition text-sm"
              required
            />
            {!isSignIn && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleChange}
                className="p-2 rounded-md bg-[#0C0C0C] text-[#E1E1E1] border border-[#343540] focus:outline-none focus:ring-2 focus:ring-[#10A37F] transition text-sm"
                required
              />
            )}

            {error && (
              <p className="text-red-500 text-xs mt-1 p-1 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="bg-[#10A37F] hover:bg-[#0e8f70] text-white p-2 rounded-md font-medium shadow-md transition duration-300 text-sm"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-xs text-[#E1E1E1] text-center">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="text-[#10A37F] hover:underline font-medium ml-1 transition"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="col-span-2 hidden md:block relative">
        <img
          src="./cover_photo.webp"
          alt="Background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#141414] to-transparent" />
      </div>
    </div>
  );
};

export default Home;
