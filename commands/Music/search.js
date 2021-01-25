module.exports = {
    name: 'search',
    aliases: ['srch'],
    description: 'Search for a song',
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same voice channel.`);

        if (!args[0]) return message.channel.send(`[🎶] What song do you wanna search for?`);

        message.client.player.play(message, args.join(" "));
    }
};