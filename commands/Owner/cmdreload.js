require('dotenv').config();

module.exports = {
    name: 'cmdreload',
    aliases: ['cmdrefresh', 'cmdrenew'],
    creatorOnly: true,
    description: 'Reloads a command',
    execute(message, args) {
        if (!args.length) return message.channel.send(`[🚫] What command would you like to reload, ${message.author}?`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) ||
            message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`[🚫] Command \`${commandName}\` not found, ${message.author}.`);
        delete require.cache[require.resolve(`./${command.name}.js`)];
        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.error(error);
            message.channel.send(`[🚫] Failed to reload: \`${command.name}\`. Due the error:\n\`${error.message}\``);
        }
        message.channel.send(`Command: \`${command.name}\` was reloaded!`);
    },
};