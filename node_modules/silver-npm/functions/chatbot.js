const fetch = require('node-fetch').default;

async function chatbot(message, channelID) {
    if (!message) return new Error('Silver-npm chatbot --> No message provided. View the example');
    if (!channelID || isNaN(channelID)) return new Error('Silver-npm chatbot --> Invalid channel id provided. View the example');

    if (message.channel.id == channelID) {
        if (message.author.bot) return;
        fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&key=DQRJMBYJR1lQtQFEC1mpdXNex`)
            .then(r => r.json())
            .then(data => {
                message.channel.send(data.response);
            })
    }
}

module.exports = chatbot;