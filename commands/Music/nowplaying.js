const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

module.exports = {
    name: 'nowplaying',
    aliases: ['np', 'now-playing', 'current', 'current-song'],
    description: 'Current song',
    execute(message, args) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same voice channel.`);

        if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] No music is currently playing.`);

        const track = message.client.player.nowPlaying(message);
        const filters = [];

        Object.keys(message.client.player.getQueue(message).filters).forEach((filterName) => message.client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'BLURPLE',
                author: { name: track.title },
                fields: [
                    { name: 'Channel', value: track.author, inline: true },
                    { name: 'Requested by', value: track.requestedBy.username, inline: true },
                    { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                    { name: 'Views', value: track.views, inline: true },
                    { name: 'Duration', value: track.duration, inline: true },
                    // { name: 'Filters activated', value: filters.length + '/' + client.filters.length, inline: true },

                    { name: 'Volume', value: message.client.player.getQueue(message).volume, inline: true },
                    { name: 'Repeat mode', value: message.client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                    { name: 'Currently paused', value: message.client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                    { name: 'Progress bar', value: message.client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    },
};