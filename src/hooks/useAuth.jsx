import { createContext, useContext, useState } from 'react';
import {
  loginWithEmail,
  logout as firebaseLogout,
  registerPlanningUser,
} from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password, role) => {
    await loginWithEmail(email, password);
    setUser({ type: role, data: { email } });
  };

  const register = async (email, password, fullName, phone) => {
    await registerPlanningUser(email, password, fullName, phone);
    setUser({ type: 'planning', data: { email, fullName, phone } });
  };

  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
