import React, { useState } from "react";

export type LoginOptions = {
  email: string;
  password: string;
};
export type AuthContext = {
  token: string | null;
  actions: {
    login: (options: LoginOptions) => Promise<void>;
  };
};

export const initialAuthContext = {
  token: null,
  actions: {
    login: async () => {},
  },
};

export const authContext = React.createContext<AuthContext>(initialAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (values: LoginOptions) => {
    const loginRequest = await fetch("/api/user/token/", {
      //mode: 'no-cors',
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (loginRequest.status === 200) {
      const { data } = await loginRequest.json();
      setToken(data);
    } else {
      throw new Error("user does not exist or the password is wrong");
    }
  };
  return (
    <authContext.Provider
      value={{
        token,
        actions: {
          login,
        },
      }}
    >
      {children}
    </authContext.Provider>
  );
};