const Silver = require('silver-npm');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_INTEGRATIONS"]});

client.commands = new Discord.Collection();

client.on('ready', () => {
    console.log('Bot online');
    client.guilds.cache.forEach(guild => {
        require('./load-commands')(guild.id)
    });
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
for (const command of commandFiles) {
    const cmd = require(`./commands/${command}`);
    client.commands.set(cmd.data.name, cmd);
}

client.on('interactionCreate', (interaction) => {
    if(!interaction.isCommand()) return;

    const { commandName } = interaction;

    const command = client.commands.get(commandName);
    if(command){
        command.run(interaction, client);
    }
});

client.login('TOKEN');