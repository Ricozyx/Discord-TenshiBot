module.exports = (client, message, queue, track) => {
    //message.channel.send(`[🎶] ${track.title} has been added to the queue.`);
    message.channel.send({
        embed: {
            color: '#ff9eb5',
            author: { name: track.title },
            fields: [
                { name: 'Channel', value: track.author, inline: true },
                { name: 'Views', value: track.views, inline: true },
                { name: 'Duration', value: track.duration, inline: true },
                // { name: 'Filters activated', value: filters.length + '/' + client.filters.length, inline: true },

                { name: '[🎶]', value: `Song has been added to the queue.`, inline: false },
            ],
            thumbnail: { url: track.thumbnail },
            timestamp: new Date(),
        },
    });
};