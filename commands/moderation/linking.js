const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('linking')
		.setDescription('Replies with instructions to link a Minecraft account to the Enderscape Discord server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mention in the bot\'s reply.')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.member;
        const linkingEmbed = new EmbedBuilder()
            .setColor('#813eff')
            .setTitle('Gain Access to the Discord Server')
            .setDescription('**You __must__ link your Minecraft and Discord accounts in-game to gain access to the Enderscape Discord server.**')
            .addFields(
                { name: '\u200B', value: 'To do this, log into Enderscape using the IP address `enderscape.net` and type `/link` in-game. Send the code provided to this channel and you will gain access to the Discord! If you run into any issues, please create a ticket in <#711511585071562793>.', inline: false },
            );
        
        if (user === null || !member.roles.cache.some(role => role.name === 'Moderator')) {
            await interaction.reply({ embeds: [linkingEmbed] });
        }
        else {
            await interaction.reply(`${user}`);
            await interaction.channel.send({ embeds: [linkingEmbed] });
        }
    },
};