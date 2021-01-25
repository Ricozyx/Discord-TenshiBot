module.exports = {
    name: 'skip',
    description: 'Skips the current song',
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same voice channel as me.`);

        if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] No music currently playing.`);

        message.client.player.skip(message);

        message.channel.send({
            embed: {
                color: '#ff9eb5',
                author: { name: `Skipped the song.` },
                fields: [
                    { name: '[🎶]', value: `Skipped the current song.`, inline: false },
                ],
                timestamp: new Date(),
            },
        });
    }
};