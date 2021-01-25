const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = {
    name: 'test',
    description: 'test!',
    execute(message, args) {

        let servers_count = message.client.guilds.cache.size;
        var myarray = [];
        message.client.guilds.cache.keyArray().forEach(async function(item, index) {

            let guildMember = message.client.guilds.cache.get(item).memberCount;
            myarray.push(guildMember)
        })
        let sum = myarray.reduce(function(a, b) {
            return a + b
        });

        message.channel.send(`${sum}`);
    }
};