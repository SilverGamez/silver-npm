# silver-npm

[silver-npm](https://www.npmjs.com/package/silver-npm) is a npm package made by (Silver_3#6333) because i was bored
 
[【Github】](https://github.com/SilverGamez/silver-npm)
[【Npm】](https://www.npmjs.com/package/silver-npm)
[【Node.js】](https://nodejs.org/en/download/)

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

### commands/ping.js
```javascript
const { SlashCommandBuilder } = require('@discordjs/builders'); //require the slash command builder

module.exports = {
    run: async (interaction, client) => {
        interaction.reply("Pong!"); //replies with "Pong!"
    },
    data: new SlashCommandBuilder()
    .setName("ping") //name of the command
    .setDescription("Pong!") //description of the command
}
```

### What is should look like:
![https://cdn.discordapp.com/attachments/884277461926428722/889028424205754398/unknown.png](https://cdn.discordapp.com/attachments/884277461926428722/889028424205754398/unknown.png) 
![https://cdn.discordapp.com/attachments/884277461926428722/889028457126854746/unknown.png](https://cdn.discordapp.com/attachments/884277461926428722/889028457126854746/unknown.png)

### Output: 
![https://cdn.discordapp.com/attachments/884277461926428722/889102753761202226/unknown.png](https://cdn.discordapp.com/attachments/884277461926428722/889102753761202226/unknown.png)

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

# .chatBot()
#### In this function, the bot will be a chatbot pretty much

### index.js
```javascript
const Silver = require('silver-npm'); //requre the package
const Discord = require('discord.js'); //also need discord
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

client.on('ready', () => {
    console.log('Bot is online!'); //when the bot is online
});

client.on('messageCreate', (message) => {
    Silver.chatBot(message, CHANNEL_ID); //chat bot
});

client.login('TOKEN'); //login into the bot
```

### Output:

![https://cdn.discordapp.com/attachments/884277461926428722/889101716602101790/unknown.png](https://cdn.discordapp.com/attachments/884277461926428722/889101716602101790/unknown.png)

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔


# .play()
#### In this, the bot will play music!

### index.js
```javascript
const Silver = require('silver-npm'); //import the package
const Discord = require('discord.js'); //require discord
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

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
```

### Output:

![https://cdn.discordapp.com/attachments/864025300459585549/889318880399470622/unknown.png](https://cdn.discordapp.com/attachments/864025300459585549/889318880399470622/unknown.png)

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
