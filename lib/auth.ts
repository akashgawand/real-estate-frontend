import Cookies from 'js-cookie';
import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  const { token, user } = response.data;

  // Store token in cookie
  Cookies.set('auth_token', token, { expires: 7 }); // 7 days

  return { token, user };
};

export const logout = () => {
  Cookies.remove('auth_token');
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login';
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>('/auth/me');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get('auth_token');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
