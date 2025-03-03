// import React, { useState, useContext, createContext } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(JSON.parse(localStorage.getItem("users")));
//     const [data, setData] = useState(JSON.parse(localStorage.getItem("user")));
//     const navigate = useNavigate();

//     function Login(userData) {
//         localStorage.setItem("users", JSON.stringify(userData));
//         setUser(userData);
//         navigate("/Home")
//     }
//     function register(userData) {
//         localStorage.setItem("user", JSON.stringify(userData));;
//         setData(userData);
//       }


//     return (
//         <AuthContext.Provider value={{ data,user, Login, register }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => useContext(AuthContext);
// export default AuthProvider;


import React, { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("users")));
    const [data, setData] = useState(JSON.parse(localStorage.getItem("user")));
    const [profileData, setProfileData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const savedProfile = JSON.parse(localStorage.getItem("profileData"));
        if (savedProfile) setProfileData(savedProfile);
    }, []);
    function updateProfileData(newData) {
        setProfileData(newData);
        localStorage.setItem("profileData", JSON.stringify(newData));
    }

    function Login(userData) {
        localStorage.setItem("users", JSON.stringify(userData));
        setUser(userData);
        navigate("/Home");
    }

    function register(userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setData(userData);
    }
    function profile(userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setProfileData(userData)
    }

    return (
        <AuthContext.Provider value={{ data, user, profileData, Login, register, profile, updateProfileData }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;