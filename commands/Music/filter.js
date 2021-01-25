const Discord = require('discord.js');

const client = new Discord.Client();
require('dotenv').config();


module.exports = {
    name: 'filter',
    aliases: ['filt'],
    description: 'Apply a filter',
    async execute(message, args) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same voice channel as me.`);

        if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] No music playing to apply a filter to.`);

        if (!args[0]) return message.channel.send(`[🎶] Please specify a valid filter to enable or disable.`);

        const filterToUpdate = message.client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`[🎶] This filter doesn't exist.`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = message.client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        message.client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`[🎶] Adding the filter to the current song...`);
        else message.channel.send(`[🎶] Removing the current filter from the song...`);
    }
};