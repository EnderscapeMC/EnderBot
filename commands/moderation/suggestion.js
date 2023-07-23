const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('Replies with instructions to create a suggestion.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mention in the bot\'s reply.')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.member;
        const suggestionEmbed = new EmbedBuilder()
            .setColor('#813eff')
            .setTitle('Create a Suggestion')
            .setDescription('If you have any ideas for additions or improvements to the server, you can make a suggestion by typing "!suggest [your suggestion]" in <#591447718262734863>.')
            .setFooter({ text: 'Enderscape', iconURL: 'https://cdn.discordapp.com/attachments/607467899698937877/997453641508196422/Enderscape.gif' });
        
        if (user === null || !member.roles.cache.some(role => role.name === 'Moderator')) {
            await interaction.reply({ embeds: [suggestionEmbed] });
        }
        else {
            await interaction.reply(`${user}`);
            await interaction.channel.send({ embeds: [suggestionEmbed] });
        }
    },
};