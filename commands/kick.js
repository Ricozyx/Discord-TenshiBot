const { Guild, Client } = require("discord.js");

module.exports = {
    name: 'kick', // TO-DO
    description: 'Kick someone from the current server.',
    guildOnly: true,
    permissions: 'KICK_MEMBERS',
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('Who do you wanna kick?');
        }
        const taggedUser = message.mentions.users.first();
        message.guild.member(taggedUser).kick().then(member => {
            message.channel.send(`Kicked the user.`);
        }).catch(() => {
            message.channel.send(`[🚫] Tenshi doesn\'t have the permissions to kick ${taggedUser}.`)
        });
    }
};