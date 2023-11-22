import React, { createContext, useContext, useState } from "react";

interface AuthenticateUserContextProps {
  // user: boolean;
  user: any;
  setUser: any;
  actualUser: string;
  setActualUser: any;
  userToken: any;
  setUserToken: any;
}

const AuthenticateUserContext = createContext(
  {} as AuthenticateUserContextProps
);

const AuthenticateUserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState("");
  const [actualUser, setActualUser] = useState("");
  const [userToken, setUserToken] = useState(null);
  return (
    <AuthenticateUserContext.Provider
      value={{
        user,
        setUser,
        actualUser,
        setActualUser,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </AuthenticateUserContext.Provider>
  );
};

export const useAuthenticate = () => useContext(AuthenticateUserContext);
export default AuthenticateUserContextProvider;
