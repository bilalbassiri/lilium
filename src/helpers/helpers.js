const getFormattedTimestamp = (timestamp, index, messages) => {
    let date = timestamp?.toDate()
    date = new Date(date)
    const today = new Date().getDate();
    let m = date.getMinutes(), h = date.getHours(), c = 'AM';
    if(h>12) {
        h -=12;
        c = 'PM'
    } else if(h===0) {
        h = 12;
    }
    const v = date.getDate() === today?
                                         'Today'
            : date.getDate() === today - 1 ? 
                                        'Yesterday' 
            : date.toDateString().split(' ').slice(1).join(' ')
    return timestamp? `${v}, ${h}:${m<10? '0' : ''}${m} ${c}` : '';
}

const getChannels = (num = 6) => {
    const channels = [];
    for(let i = 0; i < num; i++) {
        channels[i] = `channel-${i}`
    }
    return channels
}

const isFirstMessageInBlock = (messages, index) => {
    if(index === 0 || messages[index].email !== messages[index - 1].email) return true
    else return false
}  
export { getFormattedTimestamp, getChannels, isFirstMessageInBlock}