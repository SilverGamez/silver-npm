# silver-npm

silver-npm is a npm package made by (Silver_3#6333) because i was bored

## Installation

```bash
npm install silver-npm
```

## Usage

```javascript
const Silver = require('silver-npm'); 
```

# .registerSlashCommands()
#### In this function, it will register the slash commands to the provided guilds with provided commands
#### A example of usage is below
### index.js
```javascript
//this is used to register slash commands
const Silver = require('silver-npm'); //require the package
const fs = require('fs'); //we will need fs (npm i fs)
const Discord = require('discord.js'); //discord.js v13 need to be installed (npm i discord.js)

client.commands = new Discord.Collection(); //create a collection to store the commands

const files = fs.readdirSync('./commands').filter(file => file.endsWith(".js")); //only use files that ends with .js
for (const file of files) {
    const command = require(`./commands/${command}`); //file to commands folder 
    client.commands.set(command.data.name, command); //add the command to the collection
}

client.on('ready', () => {
    console.log('Bot online'); //when the bot is ready
    client.guilds.cache.forEach(guild => {
        require('./load-commands')(guild.id) //load slash commands for the guild
    });
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isCommand()) return;

    const { commandName } = interaction;

    const command = client.commands.get(commandName); //get the command from the collection
    if(command){ //if the command exists
        command.run(interaction, client); //run the command
    }
});

client.login('TOKEN'); //login to your bot
```
### load-commands.js
```javascript
const Silver = require('silver-npm');
const fs = require('fs');

module.exports = async (guildID) => {
    const commands = [];
    const files = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

    for (const file of files) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON()) //adds the data to an array
    }

    const config = {
        guildID: guildID, //got from the index.js client.guilds.cache.forEach
        clientID: "CLIENT ID", //the clients id, right click the bot and click "copy id"
        token: "TOKEN", //bots token
        commands: commands
    };

    Silver.registerSlashCommands(config); //registers the commands
}
```