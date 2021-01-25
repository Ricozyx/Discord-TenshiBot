const fetch = require("node-fetch");
require('dotenv').config();

module.exports = {
    name: 'gif',
    aliases: ['giphy', 'tenor'],
    cooldown: 5,
    description: 'Search a gif.',
    async execute(message, args) {

        let inputs = message.cleanContent.split(" ");

        let keywords = "?";
        if (inputs.length > 1) {
            keywords = inputs.slice(1, inputs.length).join(" ");
        }
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        message.channel.send(json.results[index].url);
    }
};