const Discord = require('discord.js');
const { Guild, Client } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: 'cuddle',
    cooldown: 5,
    description: 'Cuddle someone.',
    async execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('[🚫] You need to mention someone to cuddle them. ');
        }
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/cuddle");

        const embed = new Discord.MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`${message.author.username} is cuddling with ${message.mentions.users.first().username}`)
            .setImage(body.url)
            .setFooter(`😳 Powered by TenshiBot`);
        message.channel.send({ embed })
    }
};