import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/services/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutBtn: React.FC = () => {
  const { logout: setlogout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi();
  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      await api.getLogout();

      setlogout();

      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className=" font-medium flex items-center text-black dark:text-white"
      onClick={logoutHandler}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Logging out...
        </>
      ) : (
        "Logout"
      )}
    </button>
  );
};
