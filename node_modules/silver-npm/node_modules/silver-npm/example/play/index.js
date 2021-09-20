const Silver = require('silver-npm'); //import the package
const Discord = require('discord.js'); //require discord
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]
});

/*
    you need to install below
    npm i ffmpeg-static
    npm i opusscript
*/

client.on('ready', () => {
    console.log('Bot is online'); //when bot is online
})

client.on('messageCreate', (message) => {
    if (!message.guild) return; //if it is a dm, it wont run
    const args = message.content.substring('!'.length).split(' ');

    if (message.content.startsWith("!play")) {
        const song = args.join(' ');
        /*
            !play <song>
            !play among us
        */

        if (!song) return message.channel.send('Please add a song to play'); //if no song provided

        Silver.play(message, song, client, {
            noVoiceChannel: '', //if user isnt in a voice channel, it will send a message
            cantJoinVoice: '', //if bot cant join the vc
            cantFindSong: '', //if the bot cant find the song
            volume: 100 //volume when bot joins
        });
    }
})

client.login('TOKEN'); //login into the bot