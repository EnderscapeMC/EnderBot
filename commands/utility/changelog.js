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
                .setTitle('ㅤㅤㅤㅤㅤㅤㅤㅤ__Enderscape Changelog 25/7/23__')
                .addFields(
                    { name: '\u200B', value: '➤ **Banner Creation GUI:**\n• Banner Maker GUI implemented - use `/bm` to open this. Currently a Netherite-only feature.\n• Users in Creative can get created banners without needing materials.\n• Use `/bm see` and `/bm hand` to get information on a banner you are looking at or holding, respectively.', inline: false },
                    { name: '\u200B', value: '➤ **Miscellaneous:**\n• AutoShulkers and DispoShulkers re-enabled.\n• `/report` command functions once again.\n• Camels, Mules, Villagers, Skeleton Horses, Wandering Traders, Striders and Iron Golems can now be locked with `/cp lock`. \n• Nations tax limit increased from `$10` per Land member chunk to `$20` per Land member chunk to allow Nations to break even with Nations upkeep (capital land does not pay taxes to Nation).', inline: false },
                ); 
            
            interaction.channel.send({ embeds: [changelogEmbed] });
        }
    },
};