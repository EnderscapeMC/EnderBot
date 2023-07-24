const { SlashCommandBuilder } = require('discord.js');
const connection = require ('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removexp')
        .setDescription('Remove XP from a user.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of XP to remove.')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to remove XP from.')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const user = interaction.options.getUser('user');
        const member = interaction.member;
        console.log(`${member.displayName} removed ${amount} XP from ${user.username}.`);
        connection.query(
            'UPDATE users SET xp = GREATEST(xp - ?, 0) WHERE id = ?',
            [amount, user.id],
            (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    interaction.reply(`${amount} XP removed from ${user}!`);
                } else {
                    interaction.reply(`${user} does not have enough XP to remove.`);
                }
            }
        );
    },          
};