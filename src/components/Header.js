import React from 'react'
import { Avatar } from '@material-ui/core';
import { Logo } from './Home';

const Header = ({ loggedIn, userProfile }) => {
    return (
        <div className="main-header">
            <Logo loggedIn={loggedIn} />
            {
                loggedIn ?
                    <div className="user-ss-snapshot">
                        <h2>{userProfile.name}</h2>
                        <Avatar src={userProfile.picture} alt={userProfile.name} style={{height: 30, width: 30}}>{userProfile.name[0]}</Avatar>
                    </div>
                    : null
            }
        </div>
    )
}
export default Header;