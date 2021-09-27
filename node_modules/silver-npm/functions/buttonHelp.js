const {
    MessageButton,
    MessageActionRow
} = require('discord.js');

async function buttonHelp(channel, embeds, emojiNext, emojiBack) {
    if (!channel) return new Error('Silver-Npm buttonHelp --> No channel provided. View the example: https://github.com/SilverGamez/silver-npm#buttonhelp');
    if (!Array.isArray(embeds) || !embeds) return new Error('Silver-npm buttonHelp --> No embeds provided / embeds isnt an array. View the example: https://github.com/SilverGamez/silver-npm#buttonhelp');
    if (!emojiNext) return new Error('Silver-Npm buttonHelp --> No next emoji provided. View the example: https://github.com/SilverGamez/silver-npm#buttonhelp');
    if (!emojiBack) return new Error('Silver-Npm buttonHelp --> No back emoji provided. View the example: https://github.com/SilverGamez/silver-npm#buttonhelp');

    let pageNumber = 0;

    const button_back = new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('back')
        .setLabel(emojiBack)

    const button_next = new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('next')
        .setLabel(emojiNext)

    const button_back_disabled = new MessageButton()
        .setStyle('SECONDARY')
        .setCustomId('back_disabled')
        .setDisabled()
        .setLabel(emojiBack)

    const button_next_disabled = new MessageButton()
        .setStyle('SECONDARY')
        .setCustomId('next_disabled')
        .setDisabled()
        .setLabel(emojiNext)

    const buttonsActive = new MessageActionRow()
        .addComponents([button_back, button_next])

    const buttonsDisabled = new MessageActionRow()
        .addComponents([button_back_disabled, button_next_disabled])

    channel.send({
        embeds: [embeds[0]],
        components: [buttonsActive]
    }).then(m => {
        setTimeout(() => {
            m.edit({
                embeds: [embeds[0]],
                components: [buttonsDisabled]
            })
        }, 600000);
    })

    const collector = channel.createMessageComponentCollector({
        time: 600000
    });

    collector.on('collect', async (i) => {
        if (i.customId == 'back') {
            if (pageNumber !== 0) {
                --pageNumber
                i.update({
                    embeds: [embeds[pageNumber]],
                    components: [buttonsActive]
                });
            } else {
                pageNumber = embeds.length - 1
                i.update({
                    embeds: [embeds[pageNumber]],
                    components: [buttonsActive]
                });
            }
        }
        if (i.customId == 'next') {
            if (pageNumber < embeds.length - 1) {
                pageNumber++
                i.update({
                    embeds: [embeds[pageNumber]],
                    components: [buttonsActive]
                });
            } else {
                pageNumber = 0;
                i.update({
                    embeds: [embeds[pageNumber]],
                    components: [buttonsActive]
                });
            }
        }
    });
}

module.exports = buttonHelp;