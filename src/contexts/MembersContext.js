import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUserProfile } from './UserContext';

const MembersContext = createContext();
MembersContext.displayName = "Members";

const useChannelMembers = () => useContext(MembersContext).channelMembers
const useSetChannelMembers = () => useContext(MembersContext).setChannelMembers
const useIsMember = () => useContext(MembersContext).isMember

const MembersProvider = ({ children }) => {
    const userProfile = useUserProfile();
    const [channelMembers, setChannelMembers] = useState(null)
    const [isMember, setIsMember] = useState(false)

    useEffect(() => {
        setIsMember(!!channelMembers?.find(member => member.email === userProfile.email))
    }, [userProfile, channelMembers])
    
    return (
        <MembersContext.Provider value={{ channelMembers, setChannelMembers, isMember }}>
            { children }
        </MembersContext.Provider>
    )
}
export {
    MembersProvider,
    useChannelMembers,
    useSetChannelMembers,
    useIsMember
}
