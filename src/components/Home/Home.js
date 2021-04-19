import React, { useState, useEffect } from 'react';
import {
    Antenna,
    ChannelMessages,
    MessageForm,
    Members,
    JoinChannel,
    LeaveChannel,
    ChannelInfo,
    ProfileSnapshot,
    Logo,
    Intro,
    MainHeading,
    Header,
} from '.';

import Grid from '@material-ui/core/Grid';
import { useIsMember } from '../../contexts/MembersContext';
import { useUserProfile } from '../../contexts/UserContext';
import { useFullScreenImage, useSetFullScreenImage } from '../../contexts/MessagesContext';

const Home = () => {
    const isMember = useIsMember();
    const [introOver, setIntroOver] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const userProfile = useUserProfile();
    const fullScreenImage = useFullScreenImage();
    const setFullScreenImage = useSetFullScreenImage();

    useEffect(() => {
        setIsSmallScreen(window.matchMedia('(max-width: 599px)').matches)
        window.addEventListener('resize', () => {
            const { matches } = window.matchMedia('(max-width: 600px)');
            setIsSmallScreen(matches)
        })
        const id = setTimeout(() => {
            setIntroOver(true)
        }, 4000)
        return () => {
            clearTimeout(id)
        }
    }, [])
    return (
        introOver ?
            <Grid className='home' container wrap="nowrap" justify="space-between">
                {
                    fullScreenImage.fullScreen
                    &&
                    <div className="absolute-full-screen-image"
                        onClick={() => setFullScreenImage({ fullScreen: false, imageUrl: '' })}>
                        <img
                            alt=""
                            src={fullScreenImage.imageUrl} />
                    </div>
                }
                <Grid item container wrap="nowrap" sm={3} xs={12} justify="space-between" className="left-side-item side">
                    <Grid item>
                        <Logo />
                        <ProfileSnapshot />
                        <Members />
                    </Grid>
                    <Grid item container justify="center" alignItems="flex-end">
                        <LeaveChannel />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} container wrap="nowrap" className="chat-room">

                    {/* Components will be rendered only on the small screens
                        START */}
                    {
                        isSmallScreen
                        &&
                        <>
                            <Header />
                            <Antenna />
                            <ChannelInfo />
                        </>
                    }
                    {/* END */}
                    <ChannelMessages />
                    {
                        isMember ?
                            <MessageForm />
                            :
                            <JoinChannel />
                    }
                </Grid>
                <Grid className="right-side-item side" direction="column" wrap="nowrap" justify="space-between" item container sm={3} xs={12} >
                    <Grid item>
                        <MainHeading title="Channel" />
                        <Antenna />
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Grid>
            :
            <Intro dude={userProfile.given_name} />
    )
}
export default Home