const {
    MessageEmbed
} = require('discord.js');
const {
    Player
} = require('discord-player');

async function play(message, song, client, config) {
    if (!message) return new Error('Silver-npm play --> No message provided. View the example');
    if (!song) return new Error('Silver-npm play --> No song provided. View the example');
    if (!client) return new Error('Silver-npm play --> No client provided. View the example');

    client.player = new Player(client);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send(config.noVoiceChannel);

    const queue = client.player.createQueue(message.guild, {
        metadata: {
            channel: voiceChannel
        }
    });

    try {
        if (!queue.connection) {
            await queue.connect(voiceChannel);
        }
    } catch (error) {
        queue.destroy();
        return message.channel.send(config.cantJoinVoice)
    }

    const track = await client.player.search(song, {
        requestedBy: message.author
    }).then(x => x.tracks[0]);
    if (!track) return message.channel.send(config.cantFindSong);

    queue.play(track);

    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(track.thumbnail)
        .setAuthor(track.requestedBy.username, track.requestedBy.displayAvatarURL())
        .setDescription(`Added [**${track.title}**](${track.url}) to the queue!\nDuration: ${track.duration}`)

    message.reply({
        embeds: [embed]
    });

    queue.setVolume(config.volume || 100);
}

module.exports = play