// This component will be shown in the small screens
import React from 'react'
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useChannelMembers, useIsMember } from '../../contexts/MembersContext';
import { leaveChannel } from '../../firebase/functions';
import { useUserProfile } from '../../contexts/UserContext';
import { useFrequency } from '../../contexts/RadioCentext';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            fontSize: '.75rem',
            width: theme.spacing(3.5),
            height: theme.spacing(3.5),
        },
    }
}));
const ChannelInfo = () => {
    const classes = useStyles();
    const channelMembers = useChannelMembers();
    const { email } = useUserProfile();
    const fr = useFrequency();
    const isMember = useIsMember();
    return (
        <Grid container justify="space-between" className="channel-info">
            <Grid item className="channel-info-members">
                <AvatarGroup max={4} className={classes.root}>
                    {
                        channelMembers
                        &&
                        channelMembers[0]
                        &&
                        channelMembers.map((member, i) => <Avatar key={i} alt={member.name} src={member.picture}>{member.name[0]}</Avatar>)
                    }
                </AvatarGroup>
            </Grid>
            <Grid item className="channel-info-leave">
                {
                    isMember
                    &&
                    <Button
                        type="button"
                        variant="outlined"
                        style={{ height: 25 }}
                        onClick={() =>
                            leaveChannel(fr, email, channelMembers)
                        }>
                        LEAVE
                    </Button>
                }
            </Grid>
        </Grid>
    )
}
export default ChannelInfo