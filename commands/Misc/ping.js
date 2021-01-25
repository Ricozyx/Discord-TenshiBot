const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'ping',
    cooldown: 10,
    description: 'Ping!',
    execute(message, args, client) {
        message.reply('🏓 Pong.');

        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Pinging...')
            .setColor("RED")).then((pingEmbed) => {

            const ping = pingEmbed.createdTimestamp - message.createdTimestamp

            pingEmbed.edit(new Discord.MessageEmbed()
                .setColor("GREEN")
                .setThumbnail("https://i.imgur.com/TYt7Yen.png")
                .setTitle('Pong!')
                .addField('Bot', `**${ping}ms**`, true)
                .addField('API', `**${message.client.ws.ping}ms**`, true));
        })
    },
};