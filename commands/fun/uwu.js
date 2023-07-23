const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uwu')
		.setDescription('Replies with owo!'),
	async execute(interaction) {
		await interaction.reply('owo!');
	},
};