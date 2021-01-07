module.exports = {
    name: 'purge',
    aliases: ['prune', 'bulkdelete', 'clean'],
	guildOnly: true,
    permissions: 'MANAGE_MESSAGES',
    description: 'Deletes 2 to 100 messages at a time.',
    execute(message, args) {
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply('What amount of messages would you like to purge?');
        } else if (amount < 2) {
            return message.reply('The minimum number is 2.');
        } else if (amount > 100) {
            return message.reply('I can only delete a maximum of 100 messages at a time.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send(`ERROR: Could not delete all ${amount} messages in this channel.`);
        });
    },
};