-- CreateTable
CREATE TABLE `state` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf_cnpj` VARCHAR(14) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `mobile_phone` VARCHAR(20) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `customer_cpf_cnpj_key`(`cpf_cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utility_company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_state` INTEGER NOT NULL,
    `standard_rate` INTEGER NOT NULL,
    `off_peak_rate` INTEGER NOT NULL,
    `peak_rate` INTEGER NOT NULL,
    `intermediate_rate` INTEGER NOT NULL,
    `end_first_intermediate_time` INTEGER NULL,
    `end_second_intermediate_time` INTEGER NULL,
    `end_peak_time` INTEGER NULL,
    `start_first_intermediate_time` INTEGER NULL,
    `start_second_intermediate_time` INTEGER NULL,
    `start_peak_time` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `residence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hardware` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firmware_version` VARCHAR(20) NOT NULL,
    `hardware_version` VARCHAR(20) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `id_residence` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reading` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `energy_consumed` INTEGER NOT NULL,
    `current_value` INTEGER NOT NULL,
    `voltage_value` INTEGER NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `id_hardware` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `route` VARCHAR(191) NOT NULL,
    `request_type` VARCHAR(191) NOT NULL,
    `request_body` VARCHAR(191) NOT NULL,
    `response_body` VARCHAR(191) NOT NULL,
    `request_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `utility_company` ADD CONSTRAINT `utility_company_id_state_fkey` FOREIGN KEY (`id_state`) REFERENCES `state`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `residence` ADD CONSTRAINT `residence_id_state_fkey` FOREIGN KEY (`id_state`) REFERENCES `state`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `residence` ADD CONSTRAINT `residence_id_utility_company_fkey` FOREIGN KEY (`id_utility_company`) REFERENCES `utility_company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `residence` ADD CONSTRAINT `residence_id_customer_fkey` FOREIGN KEY (`id_customer`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hardware` ADD CONSTRAINT `hardware_id_residence_fkey` FOREIGN KEY (`id_residence`) REFERENCES `residence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reading` ADD CONSTRAINT `reading_id_hardware_fkey` FOREIGN KEY (`id_hardware`) REFERENCES `hardware`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
