const { client } = require('discord.js');
const connection = require('../database.js');

const xpCooldown = new Set();

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        if (!message.author.bot && message.guild) {
            const { id } = message.author;
            if (!xpCooldown.has(id)) {
                xpCooldown.add(id);
                connection.query(
                    'INSERT INTO users (id, xp, level, username, discriminator, avatar) VALUES (?, 10, 1, ?, ?, ?) ON DUPLICATE KEY UPDATE xp = xp + 10',
                    [id, message.author.username, message.author.discriminator, message.author.avatar],
                    (err, result) => {
                        if (err) throw err;
                        connection.query(
                            'SELECT xp, level FROM users WHERE id = ?',
                            [id],
                            (err, result) => {
                                if (err) throw err;
                                const newXP = result[0].xp;
                                const currentLevel = result[0].level;
                                const levelUpThreshold = 300;
                                const newLevel = Math.floor(newXP / levelUpThreshold) + 1;
                                if (newLevel > currentLevel) {
                                    connection.query(
                                        'UPDATE users SET level = ? WHERE id = ?',
                                        [newLevel, id],
                                        (err, result) => {
                                          if (err) throw err;
                                          message.channel.send(`${message.author} gained 10 XP!\n${message.author} has levelled up to level ${newLevel}!\nRemaining XP for Next Level: ${levelUpThreshold - (newXP % levelUpThreshold)}`);
                                        }
                                      );
                                    } else {
                                      message.channel.send(`${message.author} gained 10 XP!\nCurrent Level: ${currentLevel}\nRemaining XP for Next Level: ${levelUpThreshold - (newXP % levelUpThreshold)}`);
                                    }
                                  }
                                );
                              }
                            );
                            setTimeout(() => {
                              xpCooldown.delete(id);
                            }, 30000);
                          }
                        }
                      },
                    };