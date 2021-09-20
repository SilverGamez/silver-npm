const Silver = require('silver-npm'); //import the package
const Discord = require('discord.js'); //require discord
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]
});

client.on('ready', () => {
    console.log('Bot is online'); //when bot is online
})

client.on('messageCreate', (message) => {
    if (!message.guild) return; //if it is a dm, it wont run

    if (message.content.startsWith("!queue")) {
        Silver.queue(message, client); //gets the queue
    } 
})

client.login('TOKEN'); //login into the bot