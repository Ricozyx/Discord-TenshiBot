console.log('🎬  Starting TenshiBot...');

require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();
const got = require('got')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`🥂  Succesfully launched ${client.user.tag}`);
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;


    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('[🚫] That is a server only command.');
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.client.user);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.channel.reply('[🚫] You don\'t have permissions to execute this command.');
        }
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`[🚫] \`${command.name}\` is on cooldown. Please wait ${timeLeft.toFixed(1)} more second(s).`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('[🚫] There has been an error trying to execute that command.');
    }


});