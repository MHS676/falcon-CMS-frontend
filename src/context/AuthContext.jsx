import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('cms_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email, password) => {
    // Demo credentials
    if (email === 'admin@falcon.com' && password === 'admin123') {
      const userData = { email, name: 'Admin User', role: 'Admin' };
      localStorage.setItem('cms_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('cms_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
