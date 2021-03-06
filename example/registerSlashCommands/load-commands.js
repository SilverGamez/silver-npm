const Silver = require('silver-npm');
const fs = require('fs');

module.exports = async (guildID) => {
    const commands = [];
    const files = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

    for (const file of files) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON())
    }

    const config = {
        guildID: guildID,
        clientID: "CLIENT ID",
        token: "TOKEN",
        commands: commands
    };

    Silver.registerSlashCommands(config);
}