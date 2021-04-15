import React from 'react'
import Button from '@material-ui/core/Button';
import { useUserProfile } from '../../contexts/UserContext';
import { joinChannel } from '../../firebase/functions';
import { useFrequency } from '../../contexts/RadioCentext';
import { useChannelMembers } from '../../contexts/MembersContext';

const JoinChannel = () => {
    const { name, email, picture} = useUserProfile();
    const frequency = useFrequency();
    const channelMembers = useChannelMembers();
    const newMember = [{
        name,
        email,
        picture
    }]
    return (
        <div className="join-channel">
            <Button
                style={{ fontWeight: '600', fontSize: '.8rem' }}
                color="primary"
                onClick={() => { joinChannel(frequency, newMember, channelMembers) }}>
                JOIN CHANNEL</Button>
        </div>
    )
}
export default JoinChannel