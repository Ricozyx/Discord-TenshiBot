module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Sends a random bunny GIF.',
    async execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same vc as me.`);

        if (!args[0]) return message.channel.send(`[🎶] What song would you like to play?`);

        message.client.player.play(message, args.join(" "), { firstResult: true });
    }
};