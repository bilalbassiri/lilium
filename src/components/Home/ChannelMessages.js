import React, { useState, useEffect } from 'react'
import { useSetChannelMembers } from '../../contexts/MembersContext';
import { useChannelMessages, useSetChannelMessages } from '../../contexts/MessagesContext';
import { useFrequency } from '../../contexts/RadioCentext';
import { watchChannelMembers, watchChannelMessages } from '../../firebase/functions';
import {CircularIndeterminate, SingleMessage} from './index';

const ChannelMessages = () => {
    const channelMessages = useChannelMessages();
    const setChannelMessages = useSetChannelMessages();
    const setChannelMembers = useSetChannelMembers();
    const fr = useFrequency();
    const [isLoading, setLoadingState] = useState(false)

    useEffect(() => {
        watchChannelMembers(fr, setChannelMembers)
        watchChannelMessages(fr, setChannelMessages)
        setLoadingState(true)
        const id = setTimeout(() => {
            setLoadingState(false)
        }, 2000);
        return () => {
            watchChannelMembers(fr, setChannelMembers)
            watchChannelMessages(fr, setChannelMessages)
            clearTimeout(id)
        }
    }, [fr, setChannelMessages, setChannelMembers])
    return (
        <div className="channel-messages" id="msg-block-id">
            {
                isLoading && channelMessages ?
                    <CircularIndeterminate />
                    :
                    channelMessages.map((message, index) => (
                        <SingleMessage
                            message={message}
                            index={index}
                            key={message.id} />
                    ))
            }
        </div>
    )
}
export default ChannelMessages