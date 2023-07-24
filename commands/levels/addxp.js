const { SlashCommandBuilder } = require('discord.js');
const connection = require('../../database');

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
        connection.query('SELECT xp, level FROM users WHERE id = ?', [user.id], (err, rows) => {
            if (err) throw err;
            if (rows.length === 0) {
                interaction.reply(`${user} not found in the database.`);
                return;
            }
            const currentXP = rows[0].xp;
            const currentLevel = rows[0].level;
            const levelUpThreshold = 300;
            if (currentXP >= amount) {
                connection.query(
                    'UPDATE users SET xp = GREATEST(xp - ?, 0) WHERE id = ?',
                    [amount, user.id],
                    (err, result) => {
                        if (err) throw err;
                        if (result.affectedRows > 0) {
                            const newXP = currentXP - amount;
                            const newLevel = Math.floor(newXP / levelUpThreshold) + 1;
                            connection.query(
                                'UPDATE users SET level = ? WHERE id = ?',
                                [newLevel, user.id],
                                (err, result) => {
                                    if (err) throw err;
                                    if (newLevel < currentLevel) {
                                        interaction.reply(`${amount} XP removed from ${user}!\nLevelled down from Level ${currentLevel} to Level ${newLevel}\nRemaining XP for Next Level: ${levelUpThreshold - (newXP % levelUpThreshold)}`);
                                    } else {
                                        interaction.reply(`${amount} XP removed from ${user}!\nCurrent Level: ${newLevel}\nRemaining XP for Next Level: ${levelUpThreshold - (newXP % levelUpThreshold)}`);
                                    }
                                }
                            );
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

