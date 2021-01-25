const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
        name: 'queue',
        cooldown: 10,
        description: 'Returns the current music queue.',
        async execute(message, args) {
            if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel !`);
            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🚫] You are not in the same voice channel !`);
            const queue = message.client.player.getQueue(message);

            if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] No songs currently playing !`);

            message.channel.send(`**Server queue - ${message.guild.name} ${message.client.player.getQueue(message).loopMode ? '(looped)' : ''}**\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
                            return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
                        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`));
    
    }
};