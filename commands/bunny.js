const fetch = require("node-fetch");
require('dotenv').config();

module.exports = {
    name: 'bunny',
    aliases: ['rabbit', 'cottontail'],
    cooldown: 5,
    description: 'Sends a random bunny GIF.',
    async execute(message, args) {
        let keywords = "bunny";
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        message.channel.send(json.results[index].url);
    }
};