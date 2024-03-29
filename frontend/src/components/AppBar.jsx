import { UilEstate } from "@iconscout/react-unicons";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function AppBar({ setQuery }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    setQuery({ q: null });
  };

  return (
    <div className="grid grid-flow-col items-center gap-6 mx-auto px-5 md:px-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-600 text-white text-base md:text-xl font-medium shadow-lg shadow-gray-400">
      <div className="justify-self-start">
        <Link to="/">
          <UilEstate className="w-7 h-7 hover:text-sky-800 transition ease-out md:w-10 md:h-10" />
        </Link>
      </div>
      {user && (
        <div className="justify-self-end">
          <span>{user.email}</span>
          <button
            className="p-4 hover:text-sky-800  transition ease-out"
            onClick={handleClick}
          >
            Log out
          </button>
        </div>
      )}
      {!user && (
        <ul className="justify-self-end">
          <Link
            className="p-4 hover:text-sky-800 hover:scale-110 transition ease-out"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="p-4 hover:text-sky-800 hover:scale-110 transition ease-out"
            to="/signup"
          >
            Sign-up
          </Link>
        </ul>
      )}
    </div>
  );
}

export default AppBar;
