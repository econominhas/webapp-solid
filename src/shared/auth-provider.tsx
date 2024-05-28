import { env } from "@/utils/env";
import { type ParentComponent, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type AuthResponse = {
  refreshToken: string;
  accessToken: string;
  expiresAt: string;
};

type Props = {
  login: (provider: "google" | "facebook") => Promise<void>;
  logout?: () => Promise<void>;
  revalidate?: () => Promise<void>;
  session: AuthResponse;
};

const AuthContext = createContext({} as Props);

export const AuthProvider: ParentComponent = (props) => {
  const [authSession, _] = createStore<AuthResponse>({} as AuthResponse);

  async function login(provider: "google" | "facebook") {
    switch (provider) {
      case "google":
        window.location.href = env.VITE_GOOGLE_AUTH_URL;
        break;
      case "facebook":
        console.log("Nothing to do yet");
        break;
      default:
        console.log("Nothing to do");
    }
  }

  return (
    <AuthContext.Provider value={{ login, session: authSession }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth: cannot find a AuthContext");
  }

  return context;
}
