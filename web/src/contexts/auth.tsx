import { AxiosInstance } from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import privateApi from '../services/privateApi';
import publicApi from '../services/publicApi';

export interface AuthContextData {
  signed: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  api: AxiosInstance
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

  const [signed, setSigned] = useState(false);

  const api = useCallback(privateApi(signOut), [])

  useEffect(() => {
    const storageUserId = localStorage.getItem('@HappyAuth:user_id');
    const storageToken = localStorage.getItem('@HappyAuth:token');

    if (storageToken && storageUserId) {
      setSigned(true)
    }
  }, [setSigned])

  async function signIn(email: string, password: string) {
    const response = await publicApi.post('/login', { email, password });

    const { user, access_token, refresh_token } = response.data;

    localStorage.setItem('@HappyAuth:user_id', user.id);
    localStorage.setItem('@HappyAuth:token', access_token);
    localStorage.setItem('@HappyAuth:refreshToken', refresh_token);

    setSigned(true)
  }

  function signOut() {
    localStorage.removeItem('@HappyAuth:user_id');
    localStorage.removeItem('@HappyAuth:token');
    localStorage.removeItem('@HappyAuth:refreshToken');
    setSigned(false)
  }

  return (
    <AuthContext.Provider value={{ signed, signIn, signOut, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;