const Discord = require('discord.js');
const { Guild, Client } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: 'slap',
    cooldown: 5,
    description: 'Slap someone. ',
    async execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('[🚫] You need to mention someone to slap them.');
        }
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/slap");

        const embed = new Discord.MessageEmbed()
            .setColor('#ff9eb5')
            .setTitle(`${message.author.username} just slapped ${message.mentions.users.first().username}`)
            .setImage(body.url)
            .setFooter(`Powered by TenshiBot`);
        message.channel.send({ embed })
    }
};