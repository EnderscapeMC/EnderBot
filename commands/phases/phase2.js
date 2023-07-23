const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('phase2')
		.setDescription('Sends the phase2 embed.'),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.roles.cache.some(role => role.name === 'Moderator')) {
            return await interaction.reply('You do not have permission to use this command.');
        }
        else {
            const phase2Embed = new EmbedBuilder()
                .setColor('#823eff')
                .setTitle('**Phase 2 - Magic and Miscellany** (June 25)')
                .setDescription('• **~~Custom Enchantments~~**\n• **~~Mailboxes~~**\n• **~~Protections system~~**\n• **~~Mob traps~~**\n• **Store Ranks overhaul**\nㅤ‣ ~~Removal of Iron Rank~~\nㅤ‣ ~~Image maps system~~\nㅤ‣ Exclusive rankup perks \n• **Creative improvements**\nㅤ‣ ~~WorldEdit in plots~~\nㅤ‣ GUI system for plots\n• **AngelChest overhaul**\n• **Nations overhaul**\n• **Finalising new rules and punishments**\n• **Server information sources**\nㅤ‣ In-game help menu\nㅤ‣ Informative broadcasts\nㅤ‣ GitBook site release')
                .setThumbnail('https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/55/Enchanted_Book.gif/revision/latest/thumbnail/width/360/height/360?cb=20200428014446')
                .setImage('https://i.imgur.com/10oREz4.png');
            
            interaction.channel.send({ embeds: [phase2Embed] });
        }
    },
};