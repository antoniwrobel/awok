export interface AuthContextType {
  user: string | null;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  signIn: (username: string, password: string) => Promise<{}>;
}
