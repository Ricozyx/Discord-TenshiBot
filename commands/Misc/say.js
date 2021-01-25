module.exports = {
    name: 'say',
    description: 'Let the bot say your input (ADMIN ONLY)',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        const input = args.join(" ");
        message.channel.send(input);
    }
};