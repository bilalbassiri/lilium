import { imagesRef, db, provider, auth } from './config';


const signInWithGoogle = async () => {
    try {
        const response = await auth.signInWithPopup(provider);
        const { additionalUserInfo: userInfo } = response;
        return userInfo
    } catch (error) {
        console.log(error.message)
    }
}

const joinChannel = async (frequency, newMember, channelMembers )  => {
    const currentMembers = await channelMembers? channelMembers.concat(newMember) : newMember;
    db.collection(`channel-members`).doc(`channel-${frequency}`).set({members: currentMembers})
}

const leaveChannel = async (frequency, currentUserEmail, channelMembers) => {
    const currentMembers = await channelMembers?.filter(member => member.email !== currentUserEmail)
    db.collection('channel-members').doc(`channel-${frequency}`).set({members: currentMembers})
}

const watchChannelMembers = (fr, setChannelMembers) => {
    db.collection('channel-members').doc(`channel-${fr}`).onSnapshot(doc => setChannelMembers(doc.data()?.members))
}

const watchChannelMessages = (fr, setChannelMessages) => {
    db.collection(`channel-${fr}`)
        .orderBy('timestamp', 'asc')
        .onSnapshot(snp => {
            setChannelMessages(snp.docs.map(doc => doc.data()))
        })
}

const addMessageToChannel = ( getMessageData, messageBody ) => {
    const m = getMessageData({ type: 'text', body: messageBody });
    db.collection(`channel-${m.frequency}`).doc(m.id).set(m);
}

const deleteMessageFromChannel = message => {
    db.collection(`channel-${message.frequency}`).doc(message.id).delete()
}

const uploadBlob = (fileList, afterUplodingBlobParams) => {
    const up = afterUplodingBlobParams;
    if (fileList.image.length === 0) {
        up.setImgSelected(false)
        return
    }
    let uploadTask = imagesRef.child(fileList.image[0].name).put(fileList.image[0], { contentType: 'image/jpeg' });
    uploadTask.on('state_changed',
        snp => {
            let progress = (snp.bytesTransferred / snp.totalBytes) * 100;
            up.setUploadProgress(progress);
        },
        error => {
            console.log(error.message)
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                const m = up.getMessageData({ type: 'image', body: url });
                db.collection('channel-' + m.frequency)
                    .doc(m.id)
                    .set(m)
                    .then(() => {
                        up.scrollDown()
                        up.setImgSelected(false)
                        up.setUploadProgress(-1)
                    })
            })
        })
}

export {
    signInWithGoogle,
    uploadBlob,
    joinChannel,
    watchChannelMembers,
    watchChannelMessages,
    addMessageToChannel,
    deleteMessageFromChannel,
    leaveChannel
}