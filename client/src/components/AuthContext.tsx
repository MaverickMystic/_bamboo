import { createContext, useEffect, useState } from "react";
import { api, setLogoutHandler } from "../utils/api";

type User = {
  id: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

// Export the context so our hook file can read it
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    setLogoutHandler(logout);
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}