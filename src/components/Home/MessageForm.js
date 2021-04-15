import React, { useState } from 'react'
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ClearIcon from '@material-ui/icons/Clear';
import { addMessageToChannel, uploadBlob } from '../../firebase/functions';
import firebase from '../../firebase/config';
import { useFrequency } from '../../contexts/RadioCentext';
import { useUserProfile } from '../../contexts/UserContext';
import { useForm } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';
import { LinearProgressWithLabel } from './index';

const MessageForm = () => {
    const { register, handleSubmit } = useForm();
    const { name, email, picture } = useUserProfile();
    const [messageBody, setMessageBody] = useState('');
    const [uploadProgress, setUploadProgress] = useState(-1);
    const [isImgSelected, setImgSelected] = useState(false);
    const fr = useFrequency();
    const scrollDown = () => {
        document.getElementById('msg-block-id').scrollTop = document.getElementById('msg-block-id').scrollHeight
    }

    const getMessageData = obj => {
        return {
            id: uuid4(),
            name,
            email,
            type: obj.type ?? '',
            body: obj.body ?? '',
            picture,
            frequency: fr,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
    }
    const afterUplodingBlobParams = {
        setUploadProgress,
        scrollDown,
        setImgSelected,
        getMessageData
    }
    const sendMessage = e => {
        e.preventDefault()
        if (!messageBody) return;
        addMessageToChannel(getMessageData, messageBody);
        setMessageBody('')
        scrollDown();
    }
    return (
        <form onSubmit={isImgSelected ? handleSubmit(data => uploadBlob(data, afterUplodingBlobParams)) : sendMessage} >
            {
                isImgSelected ?
                    <div className='selected'>
                        {
                            uploadProgress >= 0 ?
                                <LinearProgressWithLabel progress={uploadProgress} />
                                :
                                <div className="selected-image">
                                    <ClearIcon
                                        className="clear-image-icon"
                                        onClick={() => setImgSelected(false)} />
                                    <span><PhotoOutlinedIcon/></span>
                                </div>
                        }
                    </div>
                    :
                    <input
                        type="text"
                        placeholder={`Write your message here...`}
                        value={messageBody}
                        onInput={e => {
                            setMessageBody(e.target.value)
                        }} />
            }
            <div className="message-icons-container">
                <div className="upload-image-holder">
                    <label htmlFor="imageSelector" onClick={e => setImgSelected(true)} className="select-image-label"><PhotoLibraryIcon className="select-icon" /></label>
                    <input
                        {...register('image')}
                        type="file"
                        id="imageSelector"
                        className="select-image-input" />
                </div>
                <button type="submit" disabled={uploadProgress >= 0}>
                    <SendRoundedIcon
                        className="send-icon"
                        style={{ color: isImgSelected || messageBody ? '#e79a8d' : 'rgba(182, 191, 196, 0.878)' }} />
                </button>
            </div>
        </form>
    )
}
export default MessageForm;