const Discord = require('discord.js');

const client = new Discord.Client();
require('dotenv').config();


module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],
    description: 'Clears the current music queue.',
    async execute(message, args) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same voice channel !`);

        if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] No music currently playing !`);

        if (message.client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`[🎶] There is only one song in the queue.`);

        message.client.player.clearQueue(message);

        message.channel.send(`[🎶] The queue has been cleared.`);
    }
};