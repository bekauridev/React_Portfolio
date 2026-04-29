import { useCallback, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/authApi";
import { AuthContext } from "./authContext";

function getUserFromResponse(response) {
  return response?.data?.user ?? null;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearAuth = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (err) {
      if (err?.status && err.status !== 401) {
        setError(err.message || "Logout failed");
      }
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  const refreshMe = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.me();
      const nextUser = getUserFromResponse(response);

      if (nextUser?.role === "admin") {
        setUser(nextUser);
        return nextUser;
      }

      setUser(null);
      if (nextUser) {
        await authApi.logout().catch(() => null);
        throw new Error("Access denied. Admin role is required.");
      }

      return null;
    } catch (err) {
      setUser(null);
      if (err?.status && err.status !== 401) {
        setError(err.message || "Failed to restore admin session");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authApi.login(email, password);
        const loggedInUser = getUserFromResponse(response);
        const nextUser = loggedInUser?.role === "admin" ? loggedInUser : await refreshMe();

        if (!nextUser || nextUser.role !== "admin") {
          await authApi.logout().catch(() => null);
          setUser(null);
          throw new Error("Access denied. Admin role is required.");
        }

        setUser(nextUser);
        return nextUser;
      } catch (err) {
        setUser(null);
        setError(err.message || "Login failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refreshMe]
  );

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  useEffect(() => {
    const handleUnauthorized = () => clearAuth();
    window.addEventListener("admin:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("admin:unauthorized", handleUnauthorized);
  }, [clearAuth]);

  const value = useMemo(
    () => ({ user, loading, error, login, logout, refreshMe }),
    [user, loading, error, login, logout, refreshMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
