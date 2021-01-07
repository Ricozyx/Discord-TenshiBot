const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Displays various info about the server.',
    guildOnly: true,
    execute(message, args) {
        let day = message.guild.createdAt.getDate()
        let month = 1 + message.guild.createdAt.getMonth()
        let year = message.guild.createdAt.getFullYear()

        const serverEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("Created on:", `${day}/${month}/${year}`, true)
            .addField("Owned by:", message.guild.owner.user.tag, true)
            .addField("Region:", message.guild.region, true)
            .addField("Members:", message.guild.memberCount, true)
            .setTimestamp()
            .setColor('BLURPLE')
            .setFooter('Powered by Tenshi', 'https://cdn.discordapp.com/avatars/795976317907763210/3bea682e06611cf19eca59078a62b42e.png')

        message.channel.send(serverEmbed)
    },
};