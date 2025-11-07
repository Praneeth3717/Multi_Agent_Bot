import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { userData, fetchUser } = useUserContext();
  useEffect(() => {
    const checkUser = async () => {
      await fetchUser()
    }
    if (!userData) {
      checkUser();
    }
  }, [userData, fetchUser]);
  if (!userData) return <Navigate to="/" replace />;
  return children;
}
