import React from 'react'
import { UserProvider } from './UserContext';
import { RadioProvider } from './RadioCentext';
import { MessagesProvider } from './MessagesContext';
import { MembersProvider } from './MembersContext';

const Provider = ({ children }) => {
    return (
        <UserProvider>
            <MessagesProvider>
                <RadioProvider>
                    <MembersProvider>
                        { children }
                    </MembersProvider>
                </RadioProvider>
            </MessagesProvider >
        </UserProvider>
    )
}
export default Provider;