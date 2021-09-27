const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');

async function registerCommands(config) {
    /*
        guildID -> Number
        clientID -> Number
        token -> String
        commands -> Array 
    */

    const guildID = config.guildID; //guild id
    const clientID = config.clientID; //client id
    const token = config.token; //bot token
    const commands = config.commands; //array of commands

    if (!guildID || isNaN(guildID)) return new Error('Silver-Npm registerSlashCommands --> Invalid guild id used. View the example: https://github.com/SilverGamez/silver-npm#load-commandsjs');
    if (!clientID || isNaN(clientID)) return new Error('Silver-Npm registerSlashCommands --> Invalid client id used. View the example: https://github.com/SilverGamez/silver-npm#load-commandsjs');
    if (!token) return new Error('Silver-Npm registerSlashCommands --> No bot token provied. View the example: https://github.com/SilverGamez/silver-npm#load-commandsjs');

    if (!commands) return new Error('Silver-Npm registerSlashCommands --> No commands provided. View the example: https://github.com/SilverGamez/silver-npm#load-commandsjs');
    if (!Array.isArray(commands)) return new Error('Silver-Npm registerSlashCommands --> Commands is not an array. View the example: https://github.com/SilverGamez/silver-npm#load-commandsjs');

    const rest = new REST({
        version: '9'
    }).setToken(token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(clientID, guildID), {
                    body: commands
                },
            );
            console.log(`Loaded commands for ${guildID}`)
        } catch (error) {
            console.log('Silver-Npm registerSlashCommands --> ' + error);
        }
    })();
}

module.exports = registerCommands