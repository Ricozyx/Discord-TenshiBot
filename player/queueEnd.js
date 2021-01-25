module.exports = (client, message, queue) => {
    message.channel.send({
        embed: {
            color: '#ff9eb5',
            author: { name: `Left voicechat` },
            fields: [
                { name: '[🎶]', value: `Stopped playing music as the queue is empty.`, inline: false },
            ],
            thumbnail: { url: `https://www.svgrepo.com/show/101222/music-note-symbol-with-stop-button.svg` },
            timestamp: new Date(),
        },
    });
};