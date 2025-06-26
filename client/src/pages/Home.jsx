import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-800"></div>
  </div>
);

const Home = () => {

    const Navigate=useNavigate()

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
      if (!isSignIn) {
        if (user.password !== user.confirmPassword) {
          setError("Passwords do not match!");
          setIsLoading(false);
          return;
        }

        const { username, email, password, role } = user;

        try {
          await axios.post("https://multi-agent-bot-backend.onrender.com/auth/signup", {
            username,
            email,
            password,
            role,
          });
        } catch (err) {
            console.error("Signup Error:", err); 
            setError(err.response?.data?.error || "Signup failed");
            setIsLoading(false);
            return;
          }

        alert("Registered successfully! You can now sign in.");
        toggleForm();
        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        setIsLoading(false);
      } else {
        const { email, password } = user;

        const response = await axios.post("https://multi-agent-bot-backend.onrender.com/auth/login", {
          email,
          password,
        });

        const { token, userData } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        Navigate('/dashboard')
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-5 bg-white relative">
      <div className="col-span-1 md:col-span-3 flex items-center justify-center p-4 sm:p-5 md:p-8 bg-gray-50 relative z-10">
        <div className="w-full max-w-md px-4 sm:px-0">

        <p className="text-xs sm:text-sm text-gray-700 mb-2 bg-amber-200 p-1 text-center rounded-lg">
          Please <strong>SIGNUP</strong> as <span className="font-semibold text-blue-800">admin</span> or <span className="font-semibold text-blue-800">support</span> role and <strong>LOGIN</strong> to test the Dashboard and Support agents.
        </p>

          <h2 className="text-base sm:text-lg md:text-xl font-medium mb-2 sm:mb-3">
            {isSignIn ? "Welcome Back, Friend...!" : "Sign Up and Go!"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3">
            {!isSignIn && (
              <>
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={user.username}
                  onChange={handleChange}
                  className="p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-sm"
                  required
                />
                <select
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-sm"
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
              className="p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-sm"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-sm"
              required
            />
            {!isSignIn && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleChange}
                className="p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-sm"
                required
              />
            )}

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-950 text-white p-2 rounded-md font-medium shadow-md transition duration-300 text-sm"
            >
              {isLoading ? <Spinner /> : isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-3 sm:mt-4 text-xs text-gray-600 text-center">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="text-blue-800 hover:underline font-medium ml-1 transition"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
      
      <div className="col-span-2 hidden md:block relative">
        <img src="./cover_photo.webp" alt="Background" className="w-full h-full object-cover" />
      </div>
    </div>

  )
}

export default Home
