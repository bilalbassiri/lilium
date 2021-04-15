import React, { createContext, useContext, useState } from 'react'

const MessagesContext = createContext();
MessagesContext.display = 'Messages';

const useChannelMessages = () => useContext(MessagesContext).channelMessages;
const useSetChannelMessages = () => useContext(MessagesContext).setChannelMessages;
const useFullScreenImage = () => useContext(MessagesContext).fullScreenImage;
const useSetFullScreenImage = () => useContext(MessagesContext).setFullScreenImage;

const MessagesProvider = ({ children }) => {
    const [channelMessages, setChannelMessages] = useState([]);
    const [fullScreenImage, setFullScreenImage] = useState({
        fullScreen: false,
        imageUrl: ''
    })
    return (
        <MessagesContext.Provider
            value={
                {
                    channelMessages,
                    setChannelMessages,
                    setFullScreenImage,
                    fullScreenImage
                }}>
            {children}
        </MessagesContext.Provider>
    )
}
export {
    MessagesProvider,
    useChannelMessages,
    useSetChannelMessages,
    useSetFullScreenImage,
    useFullScreenImage
}