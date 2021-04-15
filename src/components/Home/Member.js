import React from 'react';
import { useUserProfile } from '../../contexts/UserContext';
import { Avatar } from '@material-ui/core';

const Member = ({ memberInfo : { picture, email, name }}) => {
    const userProfile = useUserProfile();
    return (
        <div className="member">
            <Avatar src={picture} >{name[0]}</Avatar>
            <div>
                <h5>{userProfile.email === email ? "You" : name}</h5>
            </div>
        </div>
    )
}
export default Member;