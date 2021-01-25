const Discord = require('discord.js');
const { Guild, Client } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: 'hug',
    cooldown: 5,
    description: 'Hug someone. ',
    async execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('[🚫] You need to mention someone to hug them.');
        }
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/hug");

        const embed = new Discord.MessageEmbed()
            .setColor('#ff9eb5')
            .setTitle(`Awww, ${message.author.username} just hugged ${message.mentions.users.first().username}`)
            .setImage(body.url)
            .setFooter(`Powered by TenshiBot`);
        message.channel.send({ embed })
    }
};