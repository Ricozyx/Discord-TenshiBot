require('dotenv').config();

const chalk = require('chalk');
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const got = require('got');

const { timeStamp } = require('console');

// Music stuff
const { Player } = require("discord-player");
client.player = new Player(client);

//Filters stuff
client.config = require('./filter/filterconf');
client.filters = client.config.filters;

console.log(chalk.blue('[🎬]  Starting TenshiBot...'));

fs.readdirSync('./commands').forEach(dirs => {
    const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(chalk.yellow(`[⌛]  Loading command: ${file}`));
        client.commands.set(command.name.toLowerCase(), command);
    };
});

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(chalk.green(`[🎊]  Succesfully launched ${client.user.tag}`));
    client.user.setPresence({ activity: { name: `ko-fi.com/ricozyx`, type: "WATCHING" }, status: "dnd" });
});

// Checks if message starts with the set prefix, otherwise ignore.
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

    if (command.creatorOnly && message.member.id !== process.env.OWNERID) {
        return message.reply('[🚫] Only the owner of this bot can execute that command.');
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('[🚫] You don\'t have permissions to execute this command.');
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
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of player) {
    console.log(chalk.yellowBright(`[🎶] Loading discord-player event: ${file}`));
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
