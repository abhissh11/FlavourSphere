import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = (jwt) => setToken(jwt);
  const logout = () => setToken(null);

  const value = useMemo(() => ({
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
