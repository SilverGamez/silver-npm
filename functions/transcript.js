const fetchAll = require('discord-fetch-all');
const fs = require('fs');

async function transcript(channel) {
    if(!channel) return new Error('silver-npm transcript --> No channel provided. View the example: ');

    const msgArray = await fetchAll.messages(channel, {
        reverseArray: true
    });

    const content = msgArray.map(m => `${m.author.tag} - ${m.embeds.length ? m.embeds[0].description : m.content}`);

    fs.writeFileSync(`transcript-${channel.id}.txt`, content.join('\n'));

    await channel.send({
        content: "Transcript created.",
        files: [{
            attachment: `./transcript-${channel.id}.txt`,
            name: `${channel.name}-transcript.txt`
        }]
    });

    setTimeout(() => {
        fs.unlink(`./transcript-${channel.id}.txt`, function (err) {
            if (err) return console.log(err);
        });
    }, 1000);
}

module.exports = transcript;