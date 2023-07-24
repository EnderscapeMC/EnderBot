const { SlashCommandBuilder } = require('discord.js');
const connection = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addxp')
        .setDescription('Add XP to a user.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of XP to add.')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to add XP to.')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const user = interaction.options.getUser('user');
        const member = interaction.member;
        console.log(`${interaction.user.tag} added ${amount} XP to ${user.tag}.`);
        connection.query(
            'INSERT INTO users (id, xp, level, username, discriminator, avatar) VALUES (?, ?, 1, ?, ?, ?) ON DUPLICATE KEY UPDATE xp = xp + ?',
            [user.id, amount, user.username, user.discriminator, user.avatar, amount],
            (err, result) => {
                if (err) throw err;
                connection.query(
                    'SELECT xp, level FROM users WHERE id = ?',
                    [user.id],
                    (err, result) => {
                        if (err) throw err;
                        const newXP = result[0].xp;
                        const currentLevel = result[0].level;
                        const levelUpThreshold = 300;
                        const newLevel = Math.floor(newXP / levelUpThreshold) + 1;
                        if (newLevel > currentLevel) {
                            connection.query(
                                'UPDATE users SET level = ? WHERE id = ?',
                                [newLevel, user.id],
                                (err, result) => {
                                    if (err) throw err;
                                    interaction.reply(`${user} has leveled up to level ${newLevel}!\nRemaining XP for Next Level: ${levelUpThreshold - (newXP % levelUpThreshold)}`);
                                }
                            );
                        } else {
                            interaction.reply(`${amount} XP added to ${user}!\nCurrent Level: ${currentLevel}\nRemaining XP for Next Level: ${levelUpThreshold - (newXP % levelUpThreshold)}`);
                        }
                    }
                );
            }
        );
    },
};
