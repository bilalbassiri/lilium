import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();
UserContext.displayName = "UserContext";

const useUserProfile = () => useContext(UserContext).userProfile;
const useSetUserProfile = () => useContext(UserContext).setUserProfile;
const useIsNewUser = () => useContext(UserContext).isNewUser;
const useSetIsNewUser = () => useContext(UserContext).setIsNewUser;

const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({
        "name": "Soprano Tommy",
        "granted_scopes": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
        "id": "102100421433288476597",
        "verified_email": true,
        "given_name": "Soprano",
        "locale": "en",
        "family_name": "Tommy",
        "email": "sprntommy@gmail.com",
        "picture": "https://lh3.googleusercontent.com/a-/AOh14GjXGBWUOHRXkoprUPIwek67X3_bWQuCgDNhisEH=s96-c"
    })
    const [isNewUser, setIsNewUser] = useState(false);
    return (
        <UserContext.Provider value={{ userProfile, setUserProfile, isNewUser, setIsNewUser }}>
            { children}
        </UserContext.Provider>
    )
}
export {
    UserProvider,
    useUserProfile,
    useSetUserProfile,
    useSetIsNewUser,
    useIsNewUser
}