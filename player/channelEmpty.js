module.exports = (client, message, queue) => {
    message.channel.send(`[🎶] Stopped playing music as the voice chat is empty.`);
};