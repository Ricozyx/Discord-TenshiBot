const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Ping!',
    execute(message, args, client) {
        message.reply('🏓 Pong.');
        message.channel.send('Calculating network ping...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            resultMessage.edit(`Tenshi ping: ${ping}ms`)
        })
    },
};