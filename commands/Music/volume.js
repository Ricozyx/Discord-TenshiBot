module.exports = {
    name: 'volume',
    aliases: ['v', 'vol'],
    description: 'Change the music volume.',
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You\'re not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same voice channel !`);

        if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] No music currently playing.`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`[🎶] Please enter number between 1 & 100.`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`[🎶] Please enter number between 1 & 100.`);

        message.client.player.setVolume(message, parseInt(args[0]));

        //message.channel.send(`[🎶] Changed volume to **${parseInt(args[0])}%**.`);
        message.channel.send({
            embed: {
                color: '#ff9eb5',
                author: { name: `Volume changed` },
                fields: [
                    { name: '[🎶]', value: `Changed volume to **${parseInt(args[0])}%**.`, inline: false },
                ],
                timestamp: new Date(),
            },
        });
    }
};