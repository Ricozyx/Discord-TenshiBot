module.exports = (client, message, query) => {
    message.channel.send(`[🎶] No results found on YouTube for ${query}.`);
};