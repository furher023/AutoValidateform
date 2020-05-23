CREATE DATABASE IF NOT EXISTS `test`;
USE test;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (

  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NULL,
  `passwordHash` VARCHAR(80) NOT NULL,
  `imagePath` VARCHAR(50) NULL,
  `aboutMe` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_username` (`username` ASC),
  UNIQUE INDEX `uq_email` (`email` ASC)
  );
