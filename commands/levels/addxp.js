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
        const member = interaction.guild.members.cache.get(user.id);
        console.log(`${member.toString()} added ${amount} XP to ${user.toString()}.`);
        connection.query(
            'INSERT INTO users (id, xp, username, discriminator, avatar) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE xp = xp + ?',
            [user.id, amount, user.username, user.discriminator, user.avatar, amount],
            (err, result) => {
                if (err) throw err;
                interaction.reply(`${amount} XP added to ${user}!`);
            }
        );
    },          
};