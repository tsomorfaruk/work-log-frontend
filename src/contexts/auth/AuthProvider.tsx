import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthState, DefaultProps } from "@/types";
import { CookieManager } from "@/classes/CookieManger";
import { SessionData } from "@/classes/SessionManager";
const token = CookieManager.get("token");

export function AuthProvider({ children }: DefaultProps) {
  const [auth, setAuth] = useState<AuthState>({
    token: token,
    user: null,
  });

  useEffect(() => {
    SessionData.set("token", auth.token);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
