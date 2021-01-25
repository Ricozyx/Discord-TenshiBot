module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`[🎶] Abandoned search.`);
    } else message.channel.send(`[🎶] You must send a number between **1** and **${tracks.length}** !`);
};