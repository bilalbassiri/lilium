import React from 'react'
import { useIsloggedIn } from '../../contexts/UserContext';

const Logo = () => {
    const isLoggedIn = useIsloggedIn();
    return (
        <div className="logo-container">
            <div className="logo">
                <div className="poles">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <h1 className="name">{isLoggedIn ? '' : 'lilium'}</h1>
        </div>
    )
}
export default Logo;