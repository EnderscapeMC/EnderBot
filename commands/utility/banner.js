const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banner')
		.setDescription('Sends the banner embed.'),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.roles.cache.some(role => role.name === 'Moderator')) {
            return await interaction.reply('You do not have permission to use this command.');
        }
        else {
            const bannerEmbed = new EmbedBuilder()
                .setColor('#813eff')
                .setImage('https://i.imgur.com/10oREz4.png');
        
            interaction.channel.send({ embeds: [bannerEmbed] });
        }
    },
};