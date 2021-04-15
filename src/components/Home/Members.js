import React from 'react';
import { useChannelMembers } from '../../contexts/MembersContext';
import { MainHeading, Member } from './index';

const Members = () => {
    const channelMembers = useChannelMembers();
    return (
        <div className="members">
            <MainHeading title="Members"/>
            <div className="members-list">
                {
                    channelMembers?.length ?
                        channelMembers.map((member, index) =>
                            <Member key={index} memberInfo={member} />
                        )
                        :
                        <p className="be-a-lilium">
                            No members to show here
                        </p>
                }
            </div>
        </div>
    )
}
export default Members