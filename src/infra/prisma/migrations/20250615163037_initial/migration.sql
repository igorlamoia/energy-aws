-- CreateTable
CREATE TABLE `State` (
    `id_state` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_state`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id_customer` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf_cnpj` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `mobile_phone` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Customer_cpf_cnpj_key`(`cpf_cnpj`),
    PRIMARY KEY (`id_customer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UtilityCompany` (
    `id_utility_company` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_state` INTEGER NOT NULL,
    `standard_rate` DECIMAL(10, 2) NULL,
    `off_peak_rate` DECIMAL(10, 2) NULL,
    `peak_rate` DECIMAL(10, 2) NULL,
    `intermediate_rate` DECIMAL(10, 2) NULL,
    `end_first_intermediate_time` DATETIME(3) NULL,
    `end_second_intermediate_time` DATETIME(3) NULL,
    `end_peak_time` DATETIME(3) NULL,
    `start_first_intermediate_time` DATETIME(3) NULL,
    `start_second_intermediate_time` DATETIME(3) NULL,
    `start_peak_time` DATETIME(3) NULL,

    PRIMARY KEY (`id_utility_company`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Residence` (
    `id_residence` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `complement` VARCHAR(191) NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `id_state` INTEGER NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `id_utility_company` INTEGER NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `id_customer` INTEGER NOT NULL,

    PRIMARY KEY (`id_residence`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hardware` (
    `id_hardware` INTEGER NOT NULL AUTO_INCREMENT,
    `firmware_version` VARCHAR(191) NOT NULL,
    `hardware_version` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `id_residence` INTEGER NOT NULL,

    PRIMARY KEY (`id_hardware`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reading` (
    `id_reading` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `energy_consumed` DECIMAL(10, 2) NOT NULL,
    `current_value` DECIMAL(10, 2) NOT NULL,
    `voltage_value` DECIMAL(10, 2) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `id_hardware` INTEGER NOT NULL,

    PRIMARY KEY (`id_reading`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id_log` INTEGER NOT NULL AUTO_INCREMENT,
    `route` VARCHAR(191) NOT NULL,
    `request_type` VARCHAR(191) NOT NULL,
    `request_body` VARCHAR(191) NOT NULL,
    `response_body` VARCHAR(191) NOT NULL,
    `request_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_log`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UtilityCompany` ADD CONSTRAINT `UtilityCompany_id_state_fkey` FOREIGN KEY (`id_state`) REFERENCES `State`(`id_state`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_id_state_fkey` FOREIGN KEY (`id_state`) REFERENCES `State`(`id_state`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_id_utility_company_fkey` FOREIGN KEY (`id_utility_company`) REFERENCES `UtilityCompany`(`id_utility_company`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_id_customer_fkey` FOREIGN KEY (`id_customer`) REFERENCES `Customer`(`id_customer`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hardware` ADD CONSTRAINT `Hardware_id_residence_fkey` FOREIGN KEY (`id_residence`) REFERENCES `Residence`(`id_residence`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reading` ADD CONSTRAINT `Reading_id_hardware_fkey` FOREIGN KEY (`id_hardware`) REFERENCES `Hardware`(`id_hardware`) ON DELETE RESTRICT ON UPDATE CASCADE;
