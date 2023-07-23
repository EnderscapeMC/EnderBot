const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('phase5')
		.setDescription('Sends the phase5 embed.'),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.roles.cache.some(role => role.name === 'Moderator')) {
            return await interaction.reply('You do not have permission to use this command.');
        }
        else {
            const phase5Embed = new EmbedBuilder()
                .setColor('#823eff')
                .setTitle('**Future Concepts**')
                .setDescription('• **Quests system**\n• **Dungeons system**\n• **Mob arena system**\n• **Duels improvements**\nㅤ‣ New arenas\nㅤ‣ New kits\n• **Purchasable kits system**\n• **Custom fishing**\n• **Spawn areas for Nether and The End**\n• **Complete rankup overhaul**\nㅤ‣ New ranks and perks\nㅤ‣ Various rankup paths to choose between\nㅤ‣ Rankup costs and rewards\n• **Custom advancements**\n• **Pocket games**\n• **Levelled mobs**\n \nHave ideas? Suggest them in <#591447718262734863>!')
                .setThumbnail('https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3b/Bow_%28Pull_0%29_JE1_BE1.png/revision/latest?cb=20200510234457')
                .setImage('https://i.imgur.com/10oREz4.png');
            
            interaction.channel.send({ embeds: [phase5Embed] });
        }
    },
};