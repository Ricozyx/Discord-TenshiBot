const Discord = require('discord.js');
const { Guild, Client } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: 'lizard',
    cooldown: 5,
    description: 'Random pic of a lizard',
    async execute(message, args) {
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/lizard");

        const embed = new Discord.MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`${message.author.username}, here is your lizard pic.`)
            .setImage(body.url)
            .setFooter(`Powered by TenshiBot`);
        message.channel.send({ embed })
    }
};