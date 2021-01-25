module.exports = (client, error, message) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`[🎶] There\'s no music playing right now.`);
            break;
        case 'NotConnected':
            message.channel.send(`[🎶] You\'re not in a voice channel.`);
            break;
        case 'UnableToJoin':
            message.channel.send(`[🎶] I\'m unable to join your voice channel.`);
            break;
        default:
            message.channel.send(`[🎶] Something went wrong. Error: ${error}.`);
    };
};