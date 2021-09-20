const { MessageEmbed } = require('discord.js');

async function queue (message, client) {
    const queue = client.player.getQueue(message.guild.id);
    if(!queue || !queue.playing) return message.channel.send("No music is being played");

    const track = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
        return `${i + 2}: **[${m.title}](${m.url})** Duration: ${m.duration}`
    });

    const queueEmbed = new MessageEmbed()
    .setTitle('Server queue')
    .setDescription(`>> 1: **[${track.title}](${track.url})** Duration: ${track.duration} <<\n${tracks.join("\n")}${
        queue.tracks.length > tracks.length
            ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}`
            : ""
    }`)
    .setColor('RANDOM')

    message.reply({
        embeds: [queueEmbed]
    });
}

module.exports = queue