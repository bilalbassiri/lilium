import React from 'react'

const Logo = ({ loggedIn }) => {
    return (
        <div className="logo-container">
            <div className="logo">
                <div className="poles">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <h1 className="name">{loggedIn ? '' : 'lilium'}</h1>
        </div>
    )
}
export default Logo;