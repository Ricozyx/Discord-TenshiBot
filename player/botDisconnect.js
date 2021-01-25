module.exports = (client, message, queue) => {
    message.channel.send(`[🎶] I\'ve been disconnected from the voice channel. Stopped playing music.`);
};