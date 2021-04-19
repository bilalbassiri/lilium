import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();
UserContext.displayName = "UserContext";

const useUserProfile = () => useContext(UserContext).userProfile;
const useSetUserProfile = () => useContext(UserContext).setUserProfile;
const useIsNewUser = () => useContext(UserContext).isNewUser;
const useSetIsNewUser = () => useContext(UserContext).setIsNewUser;
const useIsloggedIn = () => useContext(UserContext).isLoggedIn;

const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null)
    const [isNewUser, setIsNewUser] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        setIsLoggedIn(!!userProfile)
    }, [userProfile])
    const value = {
        userProfile,
        setUserProfile,
        isNewUser,
        setIsNewUser,
        isLoggedIn
    }
    return (
        <UserContext.Provider value={value}>
            { children}
        </UserContext.Provider>
    )
}
export {
    UserProvider,
    useUserProfile,
    useSetUserProfile,
    useSetIsNewUser,
    useIsNewUser,
    useIsloggedIn
}