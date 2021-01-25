const got = require("got");

module.exports = {
    name: 'meme',
    cooldown: 5,
    description: 'Sends a random meme from /r/memes.',
    async execute(message, args) {
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let meme = content[0].data.children[0].data.url;
            let upvotes = content[0].data.children[0].data.ups;
            let downvotes = content[0].data.children[0].data.downs;
            message.channel.send(`${meme}`);
            message.channel.send(`\`👍: ${upvotes} | 👎:${downvotes}\``)
        })
    }
};