module.exports = {
    name: 'setstatus',
    creatorOnly: true,
    description: 'Sets bot status. [OWNER ONLY]',
    execute(message, args, client) {
        message.client.user.setPresence({ activity: { name: `the stars tonight.`, type: "WATCHING" }, status: "dnd" });
    }
};