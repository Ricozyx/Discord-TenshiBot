module.exports = {
    name: 'stop',
    aliases: ['s'],
    description: 'Stops the music',
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You\'re not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You\'re not in the same vc as me.`);

        if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] No music currently playing.`);

        message.client.player.setRepeatMode(message, false);
        message.client.player.stop(message);

        message.channel.send({
            embed: {
                color: '#ff9eb5',
                author: { name: `Stopped playing music` },
                fields: [
                    { name: '[🎶]', value: `As per request the bot has stopped playing music.`, inline: false },
                ],
                timestamp: new Date(),
            },
        });
    }
};