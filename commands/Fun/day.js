const Discord = require('discord.js');

module.exports = {
    name: 'day',
    description: 'Tells you what day it is today!',
    aliases: ['today', 'whatdayisit'],
    execute(message, args) {
        var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];
    if (weekday = 6){
        message.channel.send(`IT'S FRIDAYYYY`);
        message.channel.send(new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/821383765225242624/837621746390794273/Tenshi_FRIDAY.mp4"))
    } else{
        message.channel.send(`Today is ${n}`);
        }
    }
};