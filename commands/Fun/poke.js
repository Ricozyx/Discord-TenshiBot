const Discord = require('discord.js');
const { Guild, Client } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: 'poke',
    cooldown: 5,
    description: 'Poke someone.',
    async execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('[🚫] You need to mention someone to poke them. ');
        }
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/poke");

        const embed = new Discord.MessageEmbed()
            .setColor('#ff9eb5')
            .setTitle(`${message.author.username} poked ${message.mentions.users.first().username}`)
            .setImage(body.url)
            .setFooter(`Powered by TenshiBot`);
        message.channel.send({ embed })
    }
};