export interface AuthContextType {
  signOut: (callback: VoidFunction) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
}
