CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(255) NOT NULL,
  `xp` INT NOT NULL DEFAULT '0',
  `level` INT NOT NULL DEFAULT '1',
  `username` VARCHAR(32) NOT NULL,
  `discriminator` INT NOT NULL,
  `avatar` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
)