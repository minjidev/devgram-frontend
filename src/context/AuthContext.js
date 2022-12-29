import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState([
        {
            webAcessToken: localStorage.getItem("webAccessToken"),
            userId: localStorage.getItem("userId"),
        },
    ]);

    return (
        <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
