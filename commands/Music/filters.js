module.exports = {
    name: 'filters',
    description: 'Lists the filters',
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same voice channel as me.`);

        if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] There's no music playing right now.`);

        const filtersStatuses = [
            [],
            []
        ];
        message.client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (message.client.player.getQueue(message).filters[filterName] ? `🟢` : `🔴`));
        });

        message.channel.send({
            embed: {
                color: 'BLURPLE',
                footer: { text: 'TenshiBot x Zerio' },
                fields: [
                    { name: 'Filters', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `List of all filters enabled or disabled.\nUse \`?filter\` to add a filter to a song.`,
            },
        });
    }
};