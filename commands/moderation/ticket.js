const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Replies with instructions to create a ticket.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mention in the bot\'s reply.')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.member;
        const ticketEmbed = new EmbedBuilder()
            .setColor('#813eff')
            .setTitle('Create a Ticket')
            .setDescription('For issues that require staff assistance, create a ticket in <#711511585071562793>. Please respect that our staff have busy lives outside of Enderscape, and may take a while to respond to you. Creating a ticket organises player issues in an orderly fashion, making it easier for staff to deal with them, and avoiding them getting lost in other channels.')
            .setFooter({ text: 'Enderscape', iconURL: 'https://cdn.discordapp.com/attachments/607467899698937877/997453641508196422/Enderscape.gif' });
        
        if (user === null || !member.roles.cache.some(role => role.name === 'Moderator')) {
            await interaction.reply({ embeds: [ticketEmbed] });
        }
        else {
            await interaction.reply(`${user}`);
            await interaction.channel.send({ embeds: [ticketEmbed] });
        }
    },
};