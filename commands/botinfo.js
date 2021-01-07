const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = {
    name: 'botinfo',
    aliases: ['invite'],
    description: 'Gives some information about Tenshi',
    execute(message, args) {
        let days = Math.floor(message.client.uptime / 86400000) % 7;
        let hours = Math.floor(message.client.uptime / 3600000) % 24;
        let minutes = Math.floor(message.client.uptime / 60000) % 60;
        let seconds = Math.floor(message.client.uptime / 1000) % 60;

        const uptimeEmbed = new Discord.MessageEmbed()
            .setAuthor(`TenshiBot - Info`)
            .setThumbnail("https://cdn.discordapp.com/app-icons/795976317907763210/034e72efff15d18e85ddcc58ee03c23f.png")
            .addField('Servers', `Chilling in ${message.client.guilds.cache.size} servers.`)
            .addField('Users', `Watching over ${message.client.users.cache.size} users.`)
            .addField('Developer', `**https://github.com/Ricozyx/**`, true)
            .addField('Invite', `**https://itsri.co/tenshi-invite.html/**`, true)
            .addField('Uptime', ` ${days}d ${hours}h ${minutes}m ${seconds}s`, true)
            .setDescription(`Tenshi is a multi-purpose Discord bot. Tenshi is made in JavaScript with the use of Discord.JS.`)
            .setColor("BLURPLE")
            .setTimestamp();

        message.channel.send(uptimeEmbed)
    }
};