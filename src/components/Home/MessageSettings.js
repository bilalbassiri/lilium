import React, { useState } from 'react';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { deleteMessageFromChannel } from '../../firebase/functions';
import { useUserProfile } from '../../contexts/UserContext';
import { useIsMember } from '../../contexts/MembersContext';

const MessageSettings = ({ message }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { email } = useUserProfile();
    const isMember = useIsMember();
    const isCurrentUserMessage = email === message.email;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = e => {
        if (e.target.classList.contains('Delete')) {
            deleteMessageFromChannel(message)
        }
        setAnchorEl(null);
    };
    const options = {
        messageOptions: [

        ],
        myMessageOptions: [
            'Delete',
        ],
        otherMessageOptions: [

        ]
    }

    return (
        isCurrentUserMessage
        &&
        isMember
        &&
        <div className="message-options">
            <button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="button">
                <MoreHorizOutlinedIcon />
            </button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    options.myMessageOptions.map((option, i) => <MenuItem key={i} className={option} onClick={handleClose}>{option}</MenuItem>)
                }
            </Menu>

        </div>
    )
}
export default MessageSettings