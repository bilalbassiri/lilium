import React from 'react'
import { Avatar } from '@material-ui/core';
import { Logo } from './Home';
import { useIsloggedIn, useUserProfile } from '../contexts/UserContext';
import { GitHub } from '@material-ui/icons';

const Header = () => {
    const user = useUserProfile();
    const isLoggedIn = useIsloggedIn();
    return (
        <div className="main-header">
            <Logo />
            {
                isLoggedIn ?
                    <div className="user-ss-snapshot">
                        <h2>{user.name}</h2>
                        <Avatar src={user.picture} alt={user.name} style={{ height: 30, width: 30 }}>{user.name[0]}</Avatar>
                    </div>
                    :
                    <a href="https://github.com/bilalbassiri/lilium" target="_blank" className="github">
                        <GitHub className="icon"/>
                    </a>
            }
        </div>
    )
}
export default Header;