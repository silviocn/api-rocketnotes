import { createContext, useContext, useState } from 'react';

import { api } from '../services/api'; // to send email and password to back end

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState ({}); // all States need to be created at the beginning of the function

  async function singIn ({ email, password }) { // using {} to tell JavaScript that we want email and password independently the order
   
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data

      api.defaults.headers.authorization = `Bearer ${token}`; // putting the token in the header of api authorization so the user doesn't need to login every time
      setData( {user, token });

      console.log(user, token);

    } catch (error) {
      if (error.response) {
      alert (error.response.data.message);
      } else {
      alert("Unable to login.");
      }
    }
  }

  return (
    <AuthContext.Provider value={{ singIn, user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }