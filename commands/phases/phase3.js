const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('phase3')
		.setDescription('Sends the phase3 embed.'),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.roles.cache.some(role => role.name === 'Moderator')) {
            return await interaction.reply('You do not have permission to use this command.');
        }
        else {
            const phase3Embed = new EmbedBuilder()
                .setColor('#823eff')
                .setTitle('**Phase 3 - War and Capitalism** (August 16)')
                .setDescription('• **Balanced Wars system**\nㅤ‣ Purchasable war shields\n• **Contracts system**\n• **Upgradeable spawners**\n• **Upgradeable hoppers**\n• **Secondary currency**\nㅤ‣ Advertising rewards from custom server IP\nㅤ‣ Basic voting setup with rewards\n• **Cubelets**\n• **Mayor role improvements**\n• **Playtime rewards**\n• **New auctions system**\n• **In-game booster perks**\n• **Incentives for content creators**')
                .setThumbnail('https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/0f/Netherite_Sword_JE2_BE2.png/revision/latest?cb=20200304213920')
                .setImage('https://i.imgur.com/10oREz4.png');
            
            interaction.channel.send({ embeds: [phase3Embed] });
        }
    },
};