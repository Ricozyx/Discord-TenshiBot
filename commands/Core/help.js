const Discord = require('discord.js');
require('dotenv').config();


module.exports = {
    name: 'help',
    description: 'List all of Tenshi\'s commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 10,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`TenshiBot - Help`)
            .addField("Commands:", commands.map(command => command.name).join(', '), true)
            .addField("Extra:", `\nType \`${process.env.PREFIX}help [command name]\` to get info on a specific command.`, true)
            .setTimestamp()
            .setColor('#ff9eb5')
            .setFooter('Powered by Tenshi', 'https://cdn.discordapp.com/avatars/795976317907763210/3bea682e06611cf19eca59078a62b42e.png')


            return message.author.send(helpEmbed)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands.');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command.');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${process.env.PREFIX}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });

    },
};