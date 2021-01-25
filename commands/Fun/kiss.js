const Discord = require('discord.js');
const { Guild, Client } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: 'kiss',
    cooldown: 5,
    description: 'Kiss someone.',
    async execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('[🚫] You need to mention someone to kiss them. ');
        }
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/kiss");

        const embed = new Discord.MessageEmbed()
            .setColor('#ff9eb5')
            .setTitle(`${message.author.username} just kissed  ${message.mentions.users.first().username}`)
            .setImage(body.url)
            .setFooter(`😳 Powered by TenshiBot`);
        message.channel.send({ embed })
    }
};