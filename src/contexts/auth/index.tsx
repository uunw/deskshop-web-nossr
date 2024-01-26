import { useAtom } from "jotai";
import { createContext } from "react";

import { userSessionAtom } from "@/libs/jotai";
import { UserType } from "@/types/user.type";

export interface IAuthContext {
  isAuthenticated: boolean;
  setUser: (user: UserType) => void;
  user: UserType | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  //   const [user, setUser] = useState<string | null>(null);
  const [userSession, setUser] = useAtom(userSessionAtom);

  const isAuthenticated = !!userSession;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user: userSession, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
