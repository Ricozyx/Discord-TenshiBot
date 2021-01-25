const { DiscordAPIError } = require("discord.js");

const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    aliases: ['user-info'],
    cooldown: 10,
    description: 'Gives you information about the user you mentioned',
    execute(message, args) {
        if (!message.mentions.users.size) {
            const infoEmbed = new Discord.MessageEmbed()
                .addField("Username", `${message.author.username}#${message.author.discriminator}`, true)
                .addField("ID", `${message.author.id}`)
                .setColor('#ff9eb5')
                .setThumbnail(`${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)
                .setTitle(`Userinfo on ${message.author.username}`)
                .addField('Account created:', `${moment(message.author.createdAt).toString().substr(0, 15)}\n(${moment(message.author.createdAt).fromNow()})`, true)
                .addField('Server joined:', `${moment(message.guild.member(message.author).joinedAt).toString().substr(0, 15)}\n(${moment(message.guild.member(message.author).joinedAt).fromNow()})`, true)
                .addField('Is Bot', `${message.author.bot.toString().toUpperCase()}`, true)
            message.channel.send(infoEmbed);
        }

        const avatarList = message.mentions.users.map(user => {
            const infoEmbed = new Discord.MessageEmbed()
                .addField("Username", `${user.username}#${user.discriminator}`, true)
                .addField("ID", `${user.id}`)
                .setColor('#ff9eb5')
                .setThumbnail(`${user.displayAvatarURL({ format: "png", dynamic: true })}`)
                .setTitle(`Userinfo on ${user.username}`)
                .addField('Account created:', `${moment(user.createdAt).toString().substr(0, 15)}\n(${moment(user.createdAt).fromNow()})`, true)
                .addField('Server joined:', `${moment(message.guild.member(user).joinedAt).toString().substr(0, 15)}\n(${moment(message.guild.member(user).joinedAt).fromNow()})`, true)
                .addField('Is Bot', `${user.bot.toString().toUpperCase()}`, true)
            return (infoEmbed);
        });
        message.channel.send(avatarList);
    },
};