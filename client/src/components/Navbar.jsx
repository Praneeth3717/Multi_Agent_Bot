import React from "react";
import { useUserContext } from "../context/UserContext";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { userData, handleLogOut } = useUserContext();
  const getDisplayName = (name) => {
    if (!name) return "";
    if (name.length > 10) {
      const arr = name.split(" ");
      if (arr.length > 1) {
        return arr[0];
      } else {
        return name.slice(0, 10).concat("...");
      }
    }
    return name;
  };
  return (
    <div className="w-full h-20 bg-[#000000] fixed top-0 z-40 flex items-center justify-between px-3 border-b border-[#343540]">
      <h1 className="flex-5 text-xl lg:text-2xl text-[#E1E1E1]">
        {userData?.role === "admin" ? "Admin" : "Support"} Dashboard
      </h1>

      <div className="flex-1 flex items-center justify-evenly gap-6 ">
        <div className="flex flex-row items-center gap-2 text-sm font-medium">
          <FaUser className="text-2xl w-12 h-12 text-[#FFFFFF] p-3 rounded-full bg-[#3C3C50]" />
          <p className="text-center lg:text-lg text-[#E1E1E1] opacity-80">
            {getDisplayName(userData?.username)}
          </p>
        </div>
        <button
          onClick={handleLogOut}
          className="flex items-center justify-center gap-2 text-sm h-12 text-[#E1E1E1] border border-[#343540] px-3 py-1 hover:bg-[#1E1E1E] rounded-md transition duration-200"
        >
          <FiLogOut className="text-2xl text-[#E1E1E1]" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
