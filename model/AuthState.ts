export interface AuthState {
    userId: number | null;
    clubId: number | null;
    email: string;
    password: string;
    pin: string;
    setCredentials: (email: string, password: string, pin?: string) => void;
    setAuthData: (userId: number, clubId: number, email: string) => void;
    resetAuthData: () => void;
    setSelectedUser: (userId: number, clubId: number) => void;
    logout: () => void;  // Add logout function here
  }