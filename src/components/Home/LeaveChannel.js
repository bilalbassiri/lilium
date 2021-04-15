import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useChannelMembers, useIsMember } from '../../contexts/MembersContext';
import { useUserProfile } from '../../contexts/UserContext';
import { leaveChannel } from '../../firebase/functions';
import { useFrequency } from '../../contexts/RadioCentext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > button': {
      margin: theme.spacing(1),
      color: '#0c1b33',
      fontWeight: '600',
      fontSize: '.8rem'
    },
  },
}));

const LeaveChannel = () => {
  const classes = useStyles();
  const channelMembers = useChannelMembers();
  const { email, given_name } = useUserProfile();
  const isMember = useIsMember();
  const fr = useFrequency();

  return (
    <div className={classes.root}>
      {
        isMember ?
          <Button
            color="secondary"
            onClick={() => leaveChannel(fr, email, channelMembers)}>
            LEAVE CHANNEL
      </Button>
          :
          channelMembers?.length ?
            <div className="not-a-member-reminder reminder">
              <h5>Hi 👋, {given_name}</h5>
              <p>You are not a member in this channel, join in and say Hey.</p>
            </div>
            :
            <div className="no-members-reminder reminder">
              <h5>Hi 👋, {given_name}</h5>
              <p><span>There is no members in this channel for the moment</span>
                , switch to another frequency or join and tell your friends to come here.
              </p>
            </div>
      }
    </div>

  )
}
export default LeaveChannel;