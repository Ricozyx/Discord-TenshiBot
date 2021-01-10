const Discord = require('discord.js');
const { Guild, Client } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: 'baka',
    cooldown: 5,
    description: 'Baka!~',
    async execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('[🚫] You need to mention someone.');
        }
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/baka");

        const embed = new Discord.MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`Baka~ ! ${message.mentions.users.first().username}`)
            .setImage(body.url)
            .setFooter(`Powered by TenshiBot`);
        message.channel.send({ embed })
    }
};