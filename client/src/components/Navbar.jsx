import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
      if (token) {
        const storedUser = localStorage.getItem("user");
        setUserData(JSON.parse(storedUser));
      }
  }, []);

  const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className='w-full h-12 shadow-sm bg-white fixed top-0 z-40 flex items-center justify-between px-3'>
      <h1 className='font-semibold text-lg lg:text-xl text-gray-800'>
        Welcome to {userData?.role === 'admin' ? 'Admin' : 'Support'} Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 text-sm font-medium">
          {userData?.username}
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
