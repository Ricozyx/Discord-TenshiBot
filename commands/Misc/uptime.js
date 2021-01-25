const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = {
    name: 'uptime',
    permissions: 'SEND_MESSAGES',
    description: 'Shows you TenshiBots server uptime.',
    execute(message, args, client) {
        let months = Math.floor(message.client.uptime / 2592000000) % 12; // UNUSED FOR NOW BUT MAY BE USED LATER.
        let weeks = Math.floor(message.client.uptime / 604800000) % 4; // UNUSED FOR NOW BUT MAY BE USED LATER.
        let days = Math.floor(message.client.uptime / 86400000) % 7;
        let hours = Math.floor(message.client.uptime / 3600000) % 24;
        let minutes = Math.floor(message.client.uptime / 60000) % 60;
        let seconds = Math.floor(message.client.uptime / 1000) % 60;

        const uptimeEmbed = new Discord.MessageEmbed()
            .setAuthor(`TenshiBot - Uptime`)
            .setThumbnail("https://hlassets.paessler.com/common/files/graphics/server-uptime.png")
            .setDescription(`**Tenshi** has been online for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`)
            .setColor('#ff9eb5')
            .setTimestamp();

        message.channel.send(uptimeEmbed)
    },
};