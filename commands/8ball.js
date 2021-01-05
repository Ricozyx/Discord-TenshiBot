const Discord = require('discord.js');

// Replies from the original 8ball: http://www.otcpas.com/advisor-blog/magic-8-ball-messages/
const replies = [
    "As I see it, yes.", "Ask again later.", "Better not tell you now.", "Concentrate and ask again.", "Don’t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.", "Signs point to yes.", "Very doubtful.", "Without a doubt.", "Yes.", "Yes – definitely.", "You may rely on it."
]

module.exports = {
    name: '8ball',
    description: 'The 8ball knows all, right?',
    args: true,
    execute(message, args) {
        let rand = Math.floor(Math.random() * replies.length);
        let reply = replies[rand];

        message.channel.send(`🎱 Says: \"${reply}\"`);
    }
};