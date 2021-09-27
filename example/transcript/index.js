const Silver = require('silver-npm');
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

client.on('ready', () => {
    console.log('Bot is online');
});

client.on('messageCreate', (message) => {
    if (message.content == "!transcript") {
        Silver.transcript(message.channel);
    }
});

client.login('TOKEN');