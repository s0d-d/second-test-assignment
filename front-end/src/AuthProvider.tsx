import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { IUser, IAuthStatus } from "./types";

interface AuthContextType {
  user: IUser | null;
  authStatus: IAuthStatus;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setAuthStatus: Dispatch<SetStateAction<IAuthStatus>>;
}

axios.defaults.withCredentials = true;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [authStatus, setAuthStatus] = useState<IAuthStatus>("loading");

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await axios.get<IUser>("/api/user", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUser(response.data);
          setAuthStatus("authenticated");
        } else {
          setUser(null);
          setAuthStatus("unauthenticated");
        }
      } catch (error) {
        setUser(null);
        setAuthStatus("unauthenticated");
      }
    };

    checkUserLoggedIn();

    const intervalId = setInterval(checkUserLoggedIn, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider value={{ user, authStatus, setUser, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
