module.exports = {
    name: 'shuffle',
    description: 'Shuffle the queue',
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`[🎶] You're not in a voice channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`[🎶] You are not in the same voice channel as me.`);

        if (!message.client.player.getQueue(message)) return message.channel.send(`[🎶] No music currently playing.`);

        message.client.player.shuffle(message);

        return message.channel.send(`[🎶] Shuffled the **${message.client.player.getQueue(message).tracks.length}** songs in queue.`);
    }
};