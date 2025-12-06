import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthState, DefaultProps } from "@/types";

export function AuthProvider({ children }: DefaultProps) {
  const [auth, setAuth] = useState<AuthState>({
    token: null,
    user: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
