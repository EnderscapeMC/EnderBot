const { SlashCommandBuilder } = require('discord.js');
const connection = require ('../../database');

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
        connection.query(
            'INSERT INTO user (id, xp) VALUES (?, ?) ON DUPLICATE KEY UPDATE    xp = xp + ?',
            [user, amount, amount],
            (err, result) => {
                if (err) throw err;
                interaction.reply('${amount}XP added to ${user}!')
            }
        );
    },
};