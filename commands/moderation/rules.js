const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Sends the rules embed.'),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.roles.cache.some(role => role.name === 'Moderator')) {
            return await interaction.reply('You do not have permission to use this command.');
        }
        else {
            const rulesEmbed = new EmbedBuilder()
                .setColor('#813eff')
                .setTitle('Enderscape Discord Rules')
                .setDescription('If you\'re looking for in-game rules, please log-on to the Minecraft server and type /rules in chat.')
                .addFields(
                    { name: '\u200B', value: '1. Respect other users. Disrespect, harassment, or discrimination is strictly prohibited and will not be tolerated.', inline: false },
                    { name: '\u200B', value: '2. Avoid discussing sensitive, controversial, or political topics such as race, religion and politics. These discussions can easily become heated and lead to conflict.', inline: false },
                    { name: '\u200B', value: '3. Do not spam, use excessive profanity, or write in all caps. This includes sending identicle messages to multiple channels and sending intentionally unnecessarily long messages.', inline: false },
                    { name: '\u200B', value: '4. Please limit your speech to English-only within the server. This helps ensure that all players can understand and communicate with each other, regardless of their native language.', inline: false },
                    { name: '\u200B', value: '5. Do not advertise unless it has been endorsed by staff. This includes promoting personal social media accounts, other servers, or products and services that are not related to Enderscape.', inline: false },
                    { name: '\u200B', value: '6. Do not send links to malicious or NSFW websites. This includes any link containing viruses, malware, or harmful content, as well as any adult-oriented, pornographic or offensive material.', inline: false },
                    { name: '\u200B', value: '7. Do not share the personal information of other users without their consent. This includes sensitive information such as full name, address, phone number, IP address and other personally identifiable information.', inline: false },
                    { name: '\u200B', value: '8. Threatening players or staff in any form is strictly prohibited. This includes making death, DDoS, doxing or SWAT threats, as well as encouraging suicide or self-harm.', inline: false },
                    { name: '\u200B', value: '9. Keep conversation in <#586142853521080325> and avoid clogging other channels. This helps keep the server organised and easy to navigate.', inline: false },
                    { name: '\u200B', value: '10. No humourous or repeated suggestions in <#591447718262734863>. Please only use this channel for serious suggestions.', inline: false },
                    { name: '\u200B', value: '11. Do not use alt accounts to boost votes in <#591447718262734863> or <#535038230391816192>.', inline: false },
                    { name: '\u200B', value: '12. Do not DM staff with issues. Instead, please create a ticket in <#711511585071562793>. This ensures that staff can address your issue in a timely and organised manner.', inline: false },
                    { name: '\u200B', value: '13. All users must be at least 13 years old and must abide by Discord Terms of Service and Community Guidelines.', inline: false },
                );
            
            interaction.channel.send({ embeds: [rulesEmbed] });
        }
    },
};