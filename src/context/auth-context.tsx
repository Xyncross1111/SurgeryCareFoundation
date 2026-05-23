"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/lib/api-client";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { LOCALE_COOKIE, isLocale } from "@/i18n/config";
import type { User, LoginRequest, RegisterRequest } from "@/types/auth";

async function syncLocaleFromDonorProfile() {
  try {
    const profile = await userService.getProfile();
    const saved = profile.donorProfile?.languagePreference;
    if (!isLocale(saved)) return;
    const currentCookie = document.cookie
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith(`${LOCALE_COOKIE}=`))
      ?.split("=")[1];
    if (currentCookie === saved) return;
    document.cookie = `${LOCALE_COOKIE}=${saved}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    // Force RSC refetch so the user sees their preferred language immediately.
    if (typeof window !== "undefined") window.location.reload();
  } catch {
    // best-effort
  }
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Rehydrate session on mount — try refreshing the token first,
  // then fetch the full session profile.
  useEffect(() => {
    authService
      .refreshToken()
      .then((tokens) => {
        setAccessToken(tokens.accessToken);
        return authService.getMe();
      })
      .then((session) => {
        setUser(session);
        syncLocaleFromDonorProfile();
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(
    async (data: LoginRequest) => {
      const result = await authService.login(data);
      setAccessToken(result.accessToken);
      const session = await authService.getMe();
      setUser(session);
      syncLocaleFromDonorProfile();
      return session;
    },
    [],
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      const result = await authService.register(data);
      setAccessToken(result.accessToken);
      const session = await authService.getMe();
      setUser(session);
      return session;
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setAccessToken(null);
      setUser(null);
      router.push("/login");
    }
  }, [router]);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
