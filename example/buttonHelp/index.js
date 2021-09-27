const Silver = require('silver-npm');
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

client.on('ready', () => {
    console.log('Bot is online');
});

client.on('messageCreate', (message) => {
    if (message.content == "!help") {
        const embed1 = new Discord.MessageEmbed()
            .setTitle('Page 1')
            .setColor('RANDOM')

        const embed2 = new Discord.MessageEmbed()
            .setTitle('Page 2')
            .setColor('RANDOM')

        const embed3 = new Discord.MessageEmbed()
            .setTitle('Page 3')
            .setColor('RANDOM')

        Silver.buttonHelp(message.channel, [embed1, embed2, embed3], '▶', '◀');
    }
});

client.login('TOKEN');