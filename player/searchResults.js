module.exports = (client, message, query, tracks) => {
        message.channel.send({
                    embed: {
                        color: '#ff9eb5',
                        author: { name: `Here are your search results for ${query}` },
                        footer: { text: 'TenshiBot x Zerio | Reply with the number you want to play.' },
                        timestamp: new Date(),
                        description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });
};