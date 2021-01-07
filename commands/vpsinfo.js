const Discord = require('discord.js')

const fs = require('fs');
const os = require('os');
const osutils = require('os-utils');

module.exports = {
    name: 'vpsinfo',
    description: 'Displays info about the server Tenshi is being hosted on.',
    execute(message, args) {
        osutils.cpuUsage(function(v) {
            const embed = new Discord.MessageEmbed()
                .setColor("BLURPLE")
                .setThumbnail(message.client.user.avatarURL)
                .setTimestamp()
                .setTitle("VPS Stats")
                .setThumbnail("https://lh3.googleusercontent.com/proxy/FyAz0CGemiy4R89P7UVJfjEGannHKsTtknC36o9LvkM9HXH07kelh2XObhwtRzf_mRPqfwVjzH_1R0l5t0mKASDSLalQT8xGqosH5dcOQsW9Xwbn")
                .addField("OS", osutils.platform(), true)
                .addField("CPU Cores", osutils.cpuCount() + " Cores", true)
                .addField("CPU Usage %", `${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}%`, true)
                .addField("Total RAM", osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB", true)
                .addField("RAM Usage", `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + ( osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1]}MB`, true)
                .addField("RAM Usage %", `${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[1]}%`, true)
                //.addField("Server Uptime", osutils.sysUptime() +"ms",true)
            message.channel.send({ embed });
        })
    }
};