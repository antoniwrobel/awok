export interface AuthContextType {
  signOut: (callback?: VoidFunction) => Promise<void>;
  getAccessAndRefresh: (username: string, password: string) => Promise<void>;
}

export type GetAccessAndRefreshResponse = {
  access: string;
  refresh: string;
};
