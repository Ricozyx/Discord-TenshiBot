const Discord = require('discord.js');

const client = new Discord.Client();
require('dotenv').config();


module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    description: 'Repeats the current song.',
    execute(message, args) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same voice channel.`);

        if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] No music currently playing.`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (message.client.player.getQueue(message).loopMode) {
                message.client.player.setLoopMode(message, false);
                return message.channel.send(`[🎵] Repeat mode **disabled**.`);
            } else {
                message.client.player.setLoopMode(message, true);
                return message.channel.send(`[🎵] Repeat mode **enabled**.`);
            };
        } else {
            if (message.client.player.getQueue(message).repeatMode) {
                message.client.player.setRepeatMode(message, false);
                return message.channel.send(`[🎵] Repeat mode **disabled**.`);
            } else {
                message.client.player.setRepeatMode(message, true);
                return message.channel.send(`[🎵] Repeat mode **enabled**.`);
            }
        }
    }
};