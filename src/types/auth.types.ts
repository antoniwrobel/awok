export interface AuthContextType {
  signOut: (callback: VoidFunction) => void;
  signIn: (username: string, password: string) => Promise<{}>;
}
