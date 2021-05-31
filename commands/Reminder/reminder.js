//credit to Vandy Liu
const Discord = require('discord.js');
const client = new Discord.Client()
const moment = require('moment');

module.exports = {
    name: 'remind',
    description: 'Reminds you.',
    async execute(message, args) {
        var reminders = [];

        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100),
              seconds = parseInt((duration / 1000) % 60),
              minutes = parseInt((duration / (1000 * 60)) % 60),
              hours = parseInt((duration / (1000 * 60 * 60)) % 24);
              days = parseInt((duration / (1000 * 60 * 60 * 24)) % 365);
          
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
          
            if (days !== 0)
                return days + " days " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
            else
                return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
          }

        var remindermessage = message.content.substr(8,message.end);
		
		if (remindermessage == "") {
			message.reply('Make sure you\'re using the remind command correctly.')
            message.reply('Example: ?remind 10s This message would be reminded in 10 seconds')
		} else if (remindermessage.search(/[0-9]+(s|m|h|d){1}/) >= 0) {
			var time = remindermessage.substring(0,remindermessage.search(" ")).toLowerCase();
			var outputmessage = remindermessage.substring(remindermessage.search(" ") + 1, remindermessage.end);
			var actualTime = 0;

			var magnitudes = time.split(/s|d|m|h/).filter(word => word != "");
			var typesOfTime = time.split(/[0-9]+/).filter(word => word != "");

			if ((magnitudes.length == typesOfTime.length) && (-1 == time.search(/a|b|c|e|f|g|i|j|k|l|n|o|p|q|r|t|u|v|w|x|y|z/))) {
				for (i = 0; i < magnitudes.length; i++) {
					switch (typesOfTime[i]) {
						case 's':
							actualTime += magnitudes[i]*1000;
							break;
						case 'm':
							actualTime += magnitudes[i]*60000;
							break;
						case 'h':
							actualTime += magnitudes[i]*3600000;
							break;
						case 'd':
							actualTime += magnitudes[i]*86400000;
							break;
						default:
					}
				}

				message.channel.send(`${message.author} I will make sure to remind you.`);
				var d = new Date();
				var reminder = {author: message.author, remindermessage: outputmessage, starttime: d.getTime(), timetowait: actualTime};
				
				reminders.push(reminder);
				reminders.sort(function(a, b){return (a.starttime+a.timetowait) - (b.starttime+b.timetowait)});

				setTimeout(function() 
					{ console.log(`[!] Reminded ${message.author} in DMs`);
					  reminders.shift();
                      const reminderEmbed = new Discord.MessageEmbed()
                      .setTitle(`TenshiBot would like to remind you`)
                      .setThumbnail(`https://i.imgur.com/fj9PciJ.png`)
                      .addField("Reminder:", outputmessage, true)
                      .setTimestamp()
                      .setColor('#ff9eb5')
                      .setFooter('Powered by Tenshi', 'https://cdn.discordapp.com/avatars/795976317907763210/3bea682e06611cf19eca59078a62b42e.png')
          
                  message.author.send(reminderEmbed)
					}, actualTime);
			} else {
				message.reply('The correct way to set time is the following: \"1d2h3s\" which would remind you in 1 day, 2 hours and 3 seconds. ');
			}
		} else {
			message.reply('Make sure you\'re using the remind command correctly.')
            message.reply('Example: ?remind 10s This message would be reminded in 10 seconds')
		}
	}
};