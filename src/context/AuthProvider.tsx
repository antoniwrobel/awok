import { fakeAuthProvider } from "../auth/auth";
import { AuthContext } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const signin = (newUser: string, callback: VoidFunction) =>
    fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });

  const signout = (callback: VoidFunction) =>
    fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
