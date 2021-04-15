import React, { useState, useEffect } from 'react'
import { Logo } from '.';
import { useIsNewUser } from '../../contexts/UserContext';

const Intro = ({ dude }) => {
    const [welcome, setWelcome] = useState(true)
    const isNewUser = useIsNewUser();
    useEffect(() => {
        const id = setTimeout(() => {
            setWelcome(false)
        }, 2000);
        return () => {
            clearTimeout(id)
        }
    }, [])
    return (
        <div className="intro-container">
            {
                welcome?
                <h1 className="you-are-welcome-dude">{isNewUser ? "You're Welcome" : "Welcome Back"}, <span className="dude">{dude}</span></h1>
                :
                <Logo loggedIn={true}/>
            }
        </div>
    )
}
export default Intro