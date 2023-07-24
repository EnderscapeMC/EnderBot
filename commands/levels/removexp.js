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
        console.log(`${interaction.user.tag} removed ${amount} XP from ${user.tag}.`);
        connection.query('SELECT xp FROM users WHERE id = ?', [user.id], (err, rows) => {
            if (err) throw err;

            if (rows.length === 0) {
                interaction.reply(`${user} not found in the database.`);
                return;
            }

            const currentXP = rows[0].xp;
        
            if (currentXP >= amount) {
                connection.query(
                    'UPDATE users SET xp = GREATEST(xp - ?, 0) WHERE id = ?',
                    [amount, user.id],
                    (err, result) => {
                        if (err) throw err;
                        if (result.affectedRows > 0) {
                            interaction.reply(`${amount} XP removed from ${user}!`);
                        } else {
                            interaction.reply(`Failed to remove XP from ${user}.`);
                        }
                    }
                );
            } else {
                interaction.reply(`${user} does not have enough XP to remove.`);
            }
        });
    },          
};