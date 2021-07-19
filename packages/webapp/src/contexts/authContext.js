import React, { useContext, createContext, useState } from "react";

const AuthContext = createContext();
const UpdateAuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthUpdate() {
  return useContext(UpdateAuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")) || "NULL"
  );

  function updateUser(data) {
    setUser(data);
  }
  return (
    <AuthContext.Provider value={user}>
      <UpdateAuthContext.Provider value={updateUser}>
        {children}
      </UpdateAuthContext.Provider>
    </AuthContext.Provider>
  );
}
