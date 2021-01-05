const fetch = require("node-fetch");
require('dotenv').config();

module.exports = {
    name: 'cat',
    aliases: ['kitten', 'kat', "kitty"],
    cooldown: 5,
    description: 'Sends a random cat GIF.',
    async execute(message, args) {
        let keywords = "kitten";
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        message.channel.send(json.results[index].url);
    }
};