import React from 'react'
import { Avatar } from '@material-ui/core';
import { useUserProfile } from '../../contexts/UserContext';
import { getFormattedTimestamp, isFirstMessageInBlock } from '../../helpers/helpers';
import { MessageSettings } from './index';
import { useChannelMessages, useSetFullScreenImage } from '../../contexts/MessagesContext';

const SingleMessage = ({ message, index }) => {
    const userProfile = useUserProfile();
    const channelMessages = useChannelMessages();
    const setFullScreenImage = useSetFullScreenImage();
    const isCurrentUser = userProfile.email === message.email;
    const thisIsImage = message.type === 'image';
    const messageClasses = [
        'single-message',
        isCurrentUser ?
            'current-user-message'
            :
            'other-users-message',
        thisIsImage ? 'message-image' : '',
        isFirstMessageInBlock(channelMessages, index) ? isCurrentUser ? 'current-user-first-message' : 'other-users-first-message' : ''
    ]
    return (
        <div className={messageClasses.join(' ')}>
            <div className="face-icon">
                <Avatar src={message.picture} className="user-avatar">
                    {message.name[0]}
                </Avatar>
            </div>
            <div className="msg-body">
                <p>
                    {
                        thisIsImage ?
                                <img className="message-type-image"
                                    alt={'Image sent by ' + message.name}
                                    src={message.body} 
                                    onClick={ () => setFullScreenImage({ fullScreen : true, imageUrl: message.body }) }/>
                            : message.body
                    }
                </p>
                <div className="speak-flesh"></div>
            </div>
            <div className="hidden-info">
                <MessageSettings message={message} />
                <div className="time">{getFormattedTimestamp(message.timestamp, index, channelMessages)}</div>
            </div>
        </div>
    )
}
export default SingleMessage