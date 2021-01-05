const { Guild, Client } = require("discord.js");

module.exports = {
    name: 'ban', // TO-DO
    description: 'Ban someone from the current server.',
    guildOnly: true,
    permissions: 'BAN_MEMBERS',
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('Who do you wanna ban?');
        }
        const taggedUser = message.mentions.users.first();
        message.guild.member(taggedUser).ban().then(member => {
            message.channel.send(`Banned the user.`);
        }).catch(() => {
            message.channel.send(`[🚫] Tenshi doesn\'t have the permissions to ban ${taggedUser}.`)
        });
    }
};