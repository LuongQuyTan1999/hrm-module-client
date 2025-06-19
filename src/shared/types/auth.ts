export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
