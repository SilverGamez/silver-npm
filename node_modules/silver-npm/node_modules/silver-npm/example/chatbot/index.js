const Silver = require('silver-npm');
const Discord = require('discord.js');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_INTEGRATIONS", "GUILD_MESSAGES"]});

client.on('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', (message) => {
    Silver.chatBot(message, message.channel.id); //chat bot
});

client.login('TOKEN');