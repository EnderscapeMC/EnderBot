const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changelog')
		.setDescription('Sends the changelog embed.'),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.roles.cache.some(role => role.name === 'Moderator')) {
            return await interaction.reply('You do not have permission to use this command.');
        }
        else {
            const changelogEmbed = new EmbedBuilder()
                .setColor('#813eff')
                .setTitle('ㅤㅤㅤㅤㅤㅤㅤㅤ__Enderscape Changelog 20/7/23__')
                .addFields(
                    { name: '\u200B', value: '➤ **Miscellaneous:**\n• Nations levels added to `/levelperks` - can now also use `/levels` to open this menu. Nations items do not currently update.\n• `/rankperks` menu items now change depending on player rank.', inline: false },
                    { name: '\u200B', value: '➤ **Bug Fixes:**\n• Fixed issue whereby players had insufficient permissions to upgrade Upgradeable Hoppers.\n• Fixed butcher drops for Blaze spawners, as reported by <@529311057437655050>.', inline: false },
                );
            
            interaction.channel.send({ embeds: [changelogEmbed] });
        }
    },
};