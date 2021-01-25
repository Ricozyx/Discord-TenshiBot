const Discord = require('discord.js');
const { Guild, Client } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: 'feed',
    cooldown: 5,
    description: 'Feed someone.',
    async execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('[🚫] You need to mention someone to give them food.');
        }
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/feed");

        const embed = new Discord.MessageEmbed()
            .setColor('#ff9eb5')
            .setTitle(`${message.author.username} just gave ${message.mentions.users.first().username} some food`)
            .setImage(body.url)
            .setFooter(`Powered by TenshiBot`);
        message.channel.send({ embed })
    }
};