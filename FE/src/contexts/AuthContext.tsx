import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../interface/user";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios để thực hiện các request HTTP

export interface AuthContextType {
  user: User | null,
  login: (token: string, user: User) => void;
  logout: () => void,
  getProfile: () => void;
  updateProfile: (updatedUser: User) => void;
  isAdmin: boolean,
  isCollapsed: boolean, 
  setIsCollapsed: Dispatch<SetStateAction<boolean>>,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      setUser(user);
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    nav(user.role === "admin" ? "/admin" : "/");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    nav("/login");
  };

  const getProfile = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    }
  };

  const updateProfile = async (updatedUser: User) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await axios.put('/api/profile', updatedUser, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error updating profile", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getProfile, updateProfile, isCollapsed, setIsCollapsed, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};
