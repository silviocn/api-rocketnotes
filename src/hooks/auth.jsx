import { createContext, useContext, useState, useEffect } from 'react';

import { api } from '../services/api'; // to send email and password to back end

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState ({}); // all States need to be created at the beginning of the function

  async function signIn ({ email, password }) { // using {} to tell JavaScript that we want email and password independently the order
   
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      // Local Storage works with 2 values: key and value. Recommended to use '@' and name of the application
      // because many API maybe using local storage. JSON stringify used to parse to string (user it's an object)
      localStorage.setItem("@rocketnotes:token", token);
      // token no need to stringify because it's already a text

      api.defaults.headers.common['Authorization']= `Bearer ${token}`; // putting the token in the header of api authorization so the user doesn't need to login every time
      
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

  async function signOut() {
    const token = localStorage.removeItem("@rocketnotes:token");
    const user = localStorage.removeItem("@rocketnotes:user");

    setData({}); // changing the State to empty, to indicate value change and clear user info
  }

  async function updateProfile( { user, avatarFile }) {
    try {

      if(avatarFile) {
        const fileUploadForm = new FormData(); // to send avatar as a file
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token }); // passing new data to the context; token is already keep in data token
      alert("Profile Updated Successfully!")

    } catch (error) {
      if (error.response) {
      alert (error.response.data.message);
      } else {
      alert("Unable to login.");
      }
    }

  }

  //useEffect has two parts, first what you want him to execute (always when reloading the component), and second it's when to execute
  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if (token && user) {
      api.defaults.headers.common['Authorization']= `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user) // doing the opposite way I did in line 16
      });
    }

  }, []); // No need to bind to any state, useEffect will run once when reload

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signOut,
      updateProfile,
      user: data.user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }