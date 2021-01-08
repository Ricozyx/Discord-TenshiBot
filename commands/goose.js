const Discord = require('discord.js');
const { Guild, Client } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: 'goose',
    cooldown: 5,
    description: 'Random pic of a goose',
    async execute(message, args) {
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/goose");

        const embed = new Discord.MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`${message.author.username}, here is your goose pic.`)
            .setImage(body.url)
            .setFooter(`Powered by TenshiBot`);
        message.channel.send({ embed })
    }
};