-- MySQL Script generated by MySQL Workbench
-- Mon Mar 27 16:36:28 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ecommerce
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ecommerce
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecommerce` DEFAULT CHARACTER SET utf8 ;
USE `ecommerce` ;

-- -----------------------------------------------------
-- Table `ecommerce`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(155) NOT NULL,
  `email` VARCHAR(155) NOT NULL UNIQUE,
  `fone` VARCHAR(45) NULL,
  `senha` VARCHAR(155) NOT NULL,
  `tipo` CHAR(1) NOT NULL DEFAULT "2",
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `data_pedido` DATE NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedidos_usuarios_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ecommerce`.`usuarios` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(155) NOT NULL,
  `descricao` TEXT(700) NOT NULL,
  `imagem` VARCHAR(45) NOT NULL,
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`produtos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_categoria` INT NOT NULL,
  `nome` VARCHAR(155) NOT NULL,
  `preco` DOUBLE NOT NULL,
  `imagem` VARCHAR(45) NOT NULL,
  `status` CHAR(1) NOT NULL,
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produtos_categoria_idx` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_produtos_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `ecommerce`.`categorias` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce`.`itens_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`itens_pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_pedido` INT NOT NULL,
  `id_produto` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_itens_pedido_pedido_idx` (`id_pedido` ASC) VISIBLE,
  INDEX `fk_itens_pedido_produto_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_itens_pedido_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `ecommerce`.`pedidos` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_pedido_produto`
    FOREIGN KEY (`id_produto`)
    REFERENCES `ecommerce`.`produtos` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`endereco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `logradouro` VARCHAR(145) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(145) NOT NULL,
  `cidade` VARCHAR(145) NOT NULL,
  `estado` VARCHAR(2) NOT NULL,
  `cep` VARCHAR(12) NOT NULL,
  `tipo` VARCHAR(2) NOT NULL,
  `id_usuario` INT NOT NULL,
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_endereco_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_endereco_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ecommerce`.`usuarios` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce`.`config_loja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`config_loja` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome_fantasia` VARCHAR(145) NOT NULL,
  `end_completo` VARCHAR(145) NOT NULL,
  `email` VARCHAR(145) NOT NULL,
  `fone` VARCHAR(45) NOT NULL,
  `instagram` VARCHAR(45) NULL,
  `facebook` VARCHAR(45) NULL,
  `twiter` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
