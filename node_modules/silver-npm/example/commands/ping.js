const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    run: async (interaction, client) => {
        interaction.reply("Pong!");
    },
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!")
}