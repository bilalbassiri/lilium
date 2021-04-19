import React from 'react'
import { signInWithGoogle } from '../../firebase/functions';
import { useSetIsNewUser, useSetUserProfile } from '../../contexts/UserContext';
import Header from '../Header';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormatQuoteRounded } from '@material-ui/icons';

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
                    <p>Pariatur exercitation enim do veniam Lorem veniam labore ex excepteur.</p>
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
            <div className="quote-container">
                <div className="ff"></div>
                <div className="quote">
                    <FormatQuoteRounded style={{ fontSize: '4rem', transform: 'rotate(.5turn)' }} />
                    <blockquote>
                        A book must be the axe for the frozen sea within us.
                    </blockquote>
                    <p>― Franz Kafka</p>
                </div>
            </div>
        </div>
    )
}
export default LoginPage
