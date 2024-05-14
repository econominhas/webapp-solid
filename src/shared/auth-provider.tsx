import { type ParentComponent, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type SessionProps = {
  token: string;
  refreshToken: string;
  user: {
    name: string;
  };
};

type Props = {
  login: (provider: string) => Promise<void>;
  logout?: () => Promise<void>;
  revalidate?: () => Promise<void>;
  session: SessionProps;
};

const AuthContext = createContext({} as Props);

export const AuthProvider: ParentComponent = (props) => {
  const [authSession, _] = createStore<SessionProps>({} as SessionProps);

  async function login(provider: string) {
    console.log(`Login with ${provider}`);
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
