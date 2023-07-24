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
          'INSERT INTO users (id, xp, level, username, discriminator, avatar) VALUES (?, 10, 1, ?, ?, ?)',
          [id, message.author.username, message.author.discriminator, message.author.avatar],
          (err, insertResult) => {
            if (err) {
              console.error(err);
            } else {
              const affectedRows = insertResult.affectedRows;
              if (affectedRows === 1) {
                console.log('User inserted:', insertResult);
              } else if (affectedRows === 2) {
                console.log('User already exists. Skipping insertion.');
              }
              connection.query(
                'UPDATE users SET xp = xp + 10 WHERE id = ?',
                [id],
                (err, updateResult) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('User XP updated:', updateResult);
                    connection.query(
                      'SELECT xp, level FROM users WHERE id = ?',
                      [id],
                      (err, selectResult) => {
                        if (err) {
                          console.error(err);
                        } else {
                          const newXP = selectResult[0].xp;
                          const currentLevel = selectResult[0].level;
                          const levelUpThreshold = 300;
                          const newLevel = Math.floor(newXP / levelUpThreshold) + 1;
                          if (newLevel > currentLevel) {
                            connection.query(
                              'UPDATE users SET level = ? WHERE id = ?',
                              [newLevel, id],
                              (err, levelUpResult) => {
                                if (err) {
                                  console.error(err);
                                } else {
                                  console.log('User level updated:', levelUpResult);
                                  message.channel.send(`${message.author} gained 10 XP!\n${message.author} has leveled up to level ${newLevel}!\nRemaining XP for Next Level: ${levelUpThreshold - (newXP % levelUpThreshold)}`);
                                }
                              }
                            );
                          } else {
                            message.channel.send(`${message.author} gained 10 XP!\nCurrent Level: ${currentLevel}\nRemaining XP for Next Level: ${levelUpThreshold - (newXP % levelUpThreshold)}`);
                          }
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
        
        setTimeout(() => {
          xpCooldown.delete(id);
        }, 30000);
      }
    }
  },
};