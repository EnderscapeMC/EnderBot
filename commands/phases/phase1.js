const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('phase1')
		.setDescription('Sends the phase1 embed.'),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.roles.cache.some(role => role.name === 'Moderator')) {
            return await interaction.reply('You do not have permission to use this command.');
        }
        else {
            const phase1Embed = new EmbedBuilder()
                .setColor('#823eff')
                .setTitle('**Phase 1 - Rules and Balancing** ~~(March 9)~~')
                .setDescription('• **~~Server reset~~**\n• **~~Vanilla loot replenishing system~~**\n• **~~Rules and punishments overhaul~~**\n• **~~Permissions system overhaul~~**\nㅤ‣ ~~Toggleable staff modes~~\nㅤ‣ ~~Permission bug fixes~~\n• **~~mcMMO changes~~**\nㅤ‣ ~~mcMMO GUI menus~~\nㅤ‣ ~~mcMMO balancing~~\n• **~~Server shop overhaul~~**\nㅤ‣ ~~Shop layout changes~~\nㅤ‣ ~~Dynamic pricing system~~\n• **~~Spawn changes~~**\nㅤ‣ ~~Physical shop stalls~~\nㅤ‣ ~~Creation of spawn village~~\nㅤ‣ ~~Spawn leaderboards~~\n• **~~Lands levels and pricing overhaul~~**')
                .setThumbnail('https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/a3/Map_%28item%29_JE2_BE2.png/revision/latest?cb=20190817070857')
                .setImage('https://i.imgur.com/10oREz4.png');
            
            interaction.channel.send({ embeds: [phase1Embed] });
        }
    },
};