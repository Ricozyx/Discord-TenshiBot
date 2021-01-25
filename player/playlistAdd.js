module.exports = (client, message, queue, playlist) => {
    message.channel.send(`[🎶] ${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs).`);
    message.channel.send({
        embed: {
            color: '#ff9eb5',
            author: { name: playlist.title },
            fields: [
                { name: 'Song amount', value: playlist.tracks.length, inline: true },
                { name: 'Playlist by', value: playlist.author, inline: true },
                // { name: 'Filters activated', value: filters.length + '/' + client.filters.length, inline: true },

                { name: '[🎶]', value: `Entire playlist has been added to the queue.`, inline: false },
            ],
            thumbnail: { url: track.thumbnail },
            timestamp: new Date(),
        },
    });
};