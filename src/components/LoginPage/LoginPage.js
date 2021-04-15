import React from 'react'
import { signInWithGoogle } from '../../firebase/functions';
import { useSetIsNewUser, useSetUserProfile } from '../../contexts/UserContext';
import Header from '../Header';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            borderRadius: '20px',
            borderColor: '#e79a8d',
            color: 'white',
            backgroundColor: '#e79a8d',
            '&:hover': {
                borderColor: '#e79a8d',
                backgroundColor: 'white',
                color: '#e79a8d'
            }
        },
    },
}));

const LoginPage = () => {
    const classes = useStyles();
    const setUserProfile = useSetUserProfile();
    const setIsNewUser = useSetIsNewUser();

    return (
        <div className="login-page">
            <div className="sign-in-card">
                <Header />
                <main className="sign-in-body">
                    <h2>Hello!</h2>
                    <p>Duis veniam sit aliqua exercitation tempor nostrud enim amet ipsum ut.</p>
                    <div className={classes.root}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                signInWithGoogle()
                                    .then(({ profile, isNewUser }) => {
                                        setUserProfile(profile)
                                        setIsNewUser(isNewUser)
                                    })
                            }}>
                            Sign in with Google
                    </Button>
                    </div>
                </main>
            </div>
            <div className="random-quote">
                    <h3>sada</h3>
            </div>
        </div>
    )
}
export default LoginPage
