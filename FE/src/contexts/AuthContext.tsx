import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../interface/user";
import { useNavigate } from "react-router-dom";
import { instance } from "../api";
import { toast } from "react-toastify";

export interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAdmin: boolean;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
  updateUserRole: (_id: string, role: string) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const updateUserRole = async (_id: string, editRole: string) => {
    const res = await instance.patch(`/auth/user/${_id}/role`, { role: editRole })
    if (res) {
      toast.success("Cập nhật vai trò thành công!")
      nav('/admin/users')
    }
  }


  return (
    <AuthContext.Provider value={{ user, login, logout, isCollapsed, setIsCollapsed, updateUserRole, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};
