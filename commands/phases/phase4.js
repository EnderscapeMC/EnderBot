const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('phase4')
		.setDescription('Sends the phase4 embed.'),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.roles.cache.some(role => role.name === 'Moderator')) {
            return await interaction.reply('You do not have permission to use this command.');
        }
        else {
            const phase4Embed = new EmbedBuilder()
                .setColor('#823eff')
                .setTitle('**Other Projects**')
                .setDescription('• **Skyblock gamemode**\n• **Spawn improvements**\nㅤ‣ Rentable shop areas at spawn\nㅤ‣ Layout changes for convenience\nㅤ‣ Prison structure and jail system\nㅤ‣ Archive with items, screenshots, etc from previous seasons\nㅤ‣ Other new structures\n• **Tabcomplete tidying**\n• **Improved anti-cheat system**\n• **Consistent menu and message formatting**\n• **New GUI Menus**\n• **Base transferring from previous seasons**\n• **Country chat tags that are given to users based on their IP**')
                .setThumbnail('https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/41/Ender_Chest_%28S%29_JE2_BE2.png/revision/latest?cb=20200315175314')
                .setImage('https://i.imgur.com/10oREz4.png');
            
            interaction.channel.send({ embeds: [phase4Embed] });
        }
    },
};