import React, { createContext, useContext, useState } from "react";

interface AuthenticateUserContextProps {
  // user: boolean;
  user: any;
  setUser: any;
  actualUser: string;
  setActualUser: any;
  userToken: any;
  setUserToken: any;
  userCenter: any;
  setUserCenter: any
}

const AuthenticateUserContext = createContext(
  {} as AuthenticateUserContextProps
);

const AuthenticateUserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState("");
  const [actualUser, setActualUser] = useState("");
  const [userToken, setUserToken] = useState(null);
  const [userCenter, setUserCenter] = useState(false);
  return (
    <AuthenticateUserContext.Provider
      value={{
        user,
        setUser,
        actualUser,
        setActualUser,
        userToken,
        setUserToken,
        userCenter,
        setUserCenter
      }}
    >
      {children}
    </AuthenticateUserContext.Provider>
  );
};

export const useAuthenticate = () => useContext(AuthenticateUserContext);
export default AuthenticateUserContextProvider;
