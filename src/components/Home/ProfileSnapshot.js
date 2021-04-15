import { Avatar } from '@material-ui/core';
import React from 'react'
import { useUserProfile } from '../../contexts/UserContext'
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#00cc8d',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    }
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const ProfileSnapshot = () => {
    const classes = useStyles();
    const { name, picture} = useUserProfile();
    return (
        <div className="profile-snapshot">
            <div className={classes.root}>
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Avatar alt={name} src={picture} style={{ height: '90px', width: '90px' }} />
                </StyledBadge>
            </div>
            <h1 className="profile-snapshot-name">{name}</h1>
        </div>
    )
}
export default ProfileSnapshot