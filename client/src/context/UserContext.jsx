import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [appLoading, setAppLoading] = useState(true);

  const baseURL = "https://multi-agent-bot-backend.onrender.com";

  const fetchUser = async () => {
    try {
      setAppLoading(true);
      const response = await axios.get(`${baseURL}/user/me`, {
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    } finally {
      setAppLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserData(null);
        sessionStorage.removeItem("chatMessages");
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, handleLogOut, fetchUser, appLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
