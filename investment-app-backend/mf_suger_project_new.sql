/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 8.0.41 : Database - mf_suger_uat
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mf_suger_uat` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mf_suger_uat`;

/*Table structure for table `budget_view` */

DROP TABLE IF EXISTS `budget_view`;

CREATE TABLE `budget_view` (
  `pk_budget_view_id` int NOT NULL AUTO_INCREMENT,
  `fk_credit_card_id` int DEFAULT NULL,
  `budget_month` varchar(100) DEFAULT NULL,
  `budget_year` int DEFAULT NULL,
  `actual_amount` decimal(10,2) NOT NULL,
  `remaining_amount` decimal(10,2) NOT NULL,
  `update_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  PRIMARY KEY (`pk_budget_view_id`),
  KEY `fk_credit_card_id` (`fk_credit_card_id`),
  CONSTRAINT `budget_view_ibfk_1` FOREIGN KEY (`fk_credit_card_id`) REFERENCES `credit_card` (`pk_credit_card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `budget_view` */

insert  into `budget_view`(`pk_budget_view_id`,`fk_credit_card_id`,`budget_month`,`budget_year`,`actual_amount`,`remaining_amount`,`update_date`,`due_date`) values 
(98,1,'March',2024,4900.00,500.00,'2024-03-01',NULL),
(99,2,'March',2024,55435.00,0.00,'2024-02-26',NULL),
(100,3,'March',2024,75656.00,75656.00,'2024-02-26',NULL),
(101,4,'April',2024,500.00,500.00,'2024-03-16',NULL),
(102,6,'April',2024,1000.00,1000.00,'2024-03-09',NULL),
(103,7,'March',2024,10000.00,10000.00,'2024-03-09',NULL),
(104,2,'April',2024,400.00,400.00,'2024-03-16',NULL),
(105,3,'April',2024,787.00,787.00,'2024-03-16',NULL),
(106,7,'April',2024,0.00,0.00,'2024-03-16',NULL),
(107,1,'April',2024,74283.00,74283.00,'2024-03-16',NULL),
(108,6,'May',2024,0.00,0.00,'2024-03-16',NULL),
(109,5,'April',2024,0.00,0.00,'2024-03-16',NULL),
(110,1,'May',2025,0.00,0.00,'2025-04-19',NULL),
(111,2,'May',2025,0.00,0.00,'2025-04-19',NULL),
(112,3,'May',2025,0.00,0.00,'2025-04-19',NULL),
(113,4,'May',2025,0.00,0.00,'2025-04-19',NULL),
(114,6,'June',2025,0.00,0.00,'2025-04-19',NULL),
(115,7,'May',2025,0.00,0.00,'2025-04-19',NULL),
(116,5,'May',2025,0.00,0.00,'2025-04-19',NULL);

/*Table structure for table `credit_card` */

DROP TABLE IF EXISTS `credit_card`;

CREATE TABLE `credit_card` (
  `pk_credit_card_id` int NOT NULL AUTO_INCREMENT,
  `fk_user_id` int NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `credit_card_name` varchar(100) NOT NULL,
  `statement_date` int DEFAULT NULL,
  `due_date` int DEFAULT NULL,
  PRIMARY KEY (`pk_credit_card_id`),
  KEY `fk_user_id` (`fk_user_id`),
  CONSTRAINT `credit_card_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `mf_user` (`pk_mf_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `credit_card` */

insert  into `credit_card`(`pk_credit_card_id`,`fk_user_id`,`bank_name`,`credit_card_name`,`statement_date`,`due_date`) values 
(1,1,'SBI','vistara prime',3,23),
(2,1,'ICICI','coral',28,15),
(3,1,'ICICI','amazon pay',28,15),
(4,1,'Axis','Flipkart',20,9),
(5,2,'Axis','Flipkart',20,9),
(6,1,'RBL','Duet Plus',15,4),
(7,1,'Standard Chartered','Smart',10,29);

/*Table structure for table `databasechangelog` */

DROP TABLE IF EXISTS `databasechangelog`;

CREATE TABLE `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `databasechangelog` */

/*Table structure for table `databasechangeloglock` */

DROP TABLE IF EXISTS `databasechangeloglock`;

CREATE TABLE `databasechangeloglock` (
  `ID` int NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `databasechangeloglock` */

insert  into `databasechangeloglock`(`ID`,`LOCKED`,`LOCKGRANTED`,`LOCKEDBY`) values 
(1,'\0',NULL,NULL);

/*Table structure for table `expense` */

DROP TABLE IF EXISTS `expense`;

CREATE TABLE `expense` (
  `pk_expense_id` int NOT NULL AUTO_INCREMENT,
  `fk_credit_card_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `expense_date` date NOT NULL,
  `expense_time` time DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pk_expense_id`),
  KEY `fk_credit_card_id` (`fk_credit_card_id`),
  CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`fk_credit_card_id`) REFERENCES `credit_card` (`pk_credit_card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `expense` */

insert  into `expense`(`pk_expense_id`,`fk_credit_card_id`,`amount`,`expense_date`,`expense_time`,`reason`) values 
(1,1,200.00,'2024-02-09','02:41:00','rsfvg'),
(2,5,400.00,'2024-02-09','02:41:00','rsger'),
(3,4,44434.00,'2024-02-10','02:41:00','dsffr'),
(4,4,44.00,'2024-02-09','02:41:00','dsffr'),
(5,2,45435.00,'2024-02-10','03:21:00','fsdr'),
(6,6,100.00,'2024-02-09','03:23:00','jgb nf'),
(7,1,400.00,'2024-02-10','03:27:00','vn n dgkjfd'),
(9,4,10.00,'2024-02-09','03:30:00',''),
(11,3,75656.00,'2024-02-10','03:41:00','fdvghn qwed'),
(13,1,500.00,'2024-02-11','03:27:00','vn n dgkjfd'),
(14,1,600.00,'2024-02-13','03:27:00','vn n dgkjfd'),
(15,1,700.00,'2024-02-14','03:27:00','vn n dgkjfd'),
(16,1,1000.00,'2024-02-23','03:27:00','vn n dgkjfd'),
(17,2,10000.00,'2024-02-24','03:21:00','fsdr'),
(18,7,10000.00,'2024-02-25','03:21:00','fsdr'),
(19,1,1000.00,'2024-02-26','03:27:00','vn n dgkjfd'),
(20,4,500.00,'2024-02-24','03:30:00',''),
(21,1,500.00,'2024-03-01','03:29:00','bfffe'),
(22,1,73783.00,'2024-03-07','04:27:00',''),
(23,3,787.00,'2024-03-06','04:27:00',''),
(24,1,500.00,'2024-03-09','22:09:00',''),
(25,6,1000.00,'2024-03-08','22:11:00','hdgdbwsd'),
(26,2,400.00,'2024-03-09','22:13:00','test1');

/*Table structure for table `map_role_user` */

DROP TABLE IF EXISTS `map_role_user`;

CREATE TABLE `map_role_user` (
  `pk_map_role_user_id` int NOT NULL AUTO_INCREMENT,
  `fk_user_id` int DEFAULT NULL,
  `fk_role_id` int DEFAULT NULL,
  PRIMARY KEY (`pk_map_role_user_id`),
  KEY `fk_user_id` (`fk_user_id`),
  KEY `fk_role_id` (`fk_role_id`),
  CONSTRAINT `map_role_user_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `mf_user` (`pk_mf_user_id`),
  CONSTRAINT `map_role_user_ibfk_2` FOREIGN KEY (`fk_role_id`) REFERENCES `mf_role` (`pk_mf_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `map_role_user` */

insert  into `map_role_user`(`pk_map_role_user_id`,`fk_user_id`,`fk_role_id`) values 
(1,1,1),
(2,2,1),
(19,21,2);

/*Table structure for table `mf_role` */

DROP TABLE IF EXISTS `mf_role`;

CREATE TABLE `mf_role` (
  `pk_mf_role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pk_mf_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `mf_role` */

insert  into `mf_role`(`pk_mf_role_id`,`role_name`) values 
(1,'admin'),
(2,'customer');

/*Table structure for table `mf_user` */

DROP TABLE IF EXISTS `mf_user`;

CREATE TABLE `mf_user` (
  `pk_mf_user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phonenumber` varchar(200) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`pk_mf_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `mf_user` */

insert  into `mf_user`(`pk_mf_user_id`,`username`,`fullname`,`email`,`phonenumber`,`password`,`is_active`) values 
(1,'sayantan','Sayantan Biswas','sayantanbiswas123@gmail.com','+91999999999','$2a$10$ny6IQ4/asXn.OBY7FlpA7euEijd2n.vkeZdQxKgAzJgekxdBmvAim',1),
(2,'sbiswas','Sayantan Biswas','sayantanbiswas1234@gmail.com','+91888888888','$2a$12$FtDYeChNh.mxnZuHylb0f.TUHBJl4/bZi5OWbNlIGHLXKloQ3cnP6',1),
(21,'yo_Sayantan','Sayantan Biswas','sayantanbiswas1002@gmail.com','9999999998','$2a$10$5xlc3PPdtUWrL5nIrQ7O2O2SLdNAX3IChJz02UhvJFdlobqQ9GKIy',1);

/*Table structure for table `mutual_fund` */

DROP TABLE IF EXISTS `mutual_fund`;

CREATE TABLE `mutual_fund` (
  `pk_mutual_fund_id` int NOT NULL AUTO_INCREMENT,
  `amc_name` varchar(150) DEFAULT NULL,
  `scheme_name` varchar(150) DEFAULT NULL,
  `option` varchar(150) DEFAULT NULL,
  `plan_type` varchar(100) DEFAULT NULL,
  `scheme_code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`pk_mutual_fund_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `mutual_fund` */

insert  into `mutual_fund`(`pk_mutual_fund_id`,`amc_name`,`scheme_name`,`option`,`plan_type`,`scheme_code`) values 
(1,'Parag Parikh','Parag Parikh Flexi Cap Fund','Growth','Direct','122639'),
(2,'HDFC','HDFC Defence Fund','Growth','Direct','151750'),
(3,'Nippon India','NIPPON INDIA GOLD SAVINGS FUND','Growth','Direct','118663'),
(4,'Quant','Quant Flexi Cap Fund','Growth','Direct','120843'),
(5,'Mirae Asset','Mirae Asset Global X Artificial Intelligence & Technology ETF Fund of Fund','Growth','Direct','150597'),
(6,'Mirae Asset','Mirae Asset Global Electric & Autonomous Vehicles ETFs Fund of Fund','Growth','Direct','150595'),
(7,'ICICI Prudential','ICICI Prudential Bluechip Fund','Growth','Direct','120586'),
(8,'Quant','Quant Small Cap Fund','Growth','Direct','120828'),
(9,'Quant','Quant Active Fund','Growth','Direct','120823'),
(10,'SBI','SBI Technology Opportunities Fund','Growth','Direct','120578'),
(11,'ICICI Prudential','ICICI Prudential Technology Fund','Growth','Direct','120594'),
(12,'Quant','quant ELSS Tax Saver Fund','Growth','Direct','120847'),
(13,'Nippon India','NIPPON INDIA SMALL CAP FUND','Growth','Direct','113177'),
(14,'Tata Digital','Tata Digital India Fund  Plan','Growth','Direct','135800'),
(15,'DSP','DSP Small Cap Fund','Growth','Direct','119212');

/*Table structure for table `order_detail` */

DROP TABLE IF EXISTS `order_detail`;

CREATE TABLE `order_detail` (
  `pk_order_detail_id` int NOT NULL AUTO_INCREMENT,
  `fk_mutual_fund_id` int DEFAULT NULL,
  `fk_user_id` int DEFAULT NULL,
  `side` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `nav` double DEFAULT NULL,
  `units` double DEFAULT NULL,
  `date_of_event` date DEFAULT NULL,
  PRIMARY KEY (`pk_order_detail_id`),
  KEY `fk_mutual_fund_id` (`fk_mutual_fund_id`),
  KEY `fk_user_id` (`fk_user_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`fk_mutual_fund_id`) REFERENCES `mutual_fund` (`pk_mutual_fund_id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`fk_user_id`) REFERENCES `mf_user` (`pk_mf_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=391 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `order_detail` */

insert  into `order_detail`(`pk_order_detail_id`,`fk_mutual_fund_id`,`fk_user_id`,`side`,`amount`,`nav`,`units`,`date_of_event`) values 
(58,10,1,'Buy',40000,176.6775,226.40121124648016,'2023-09-01'),
(59,10,1,'Buy',3000,172.3191,17.409561679465597,'2023-08-09'),
(60,9,1,'Buy',70000,500.0719,139.97987089456535,'2023-07-13'),
(61,2,1,'Buy',8000,10.689,748.4329684722612,'2023-07-20'),
(62,10,1,'Buy',10000,160.8342,62.17583076236273,'2023-06-22'),
(318,1,1,'Buy',1999.9,60.7503,32.92,'2023-08-24'),
(319,1,1,'Buy',9999.5,69.8354,143.187,'2023-12-26'),
(320,10,1,'Buy',5999.95,160.6063,36.226,'2023-01-25'),
(321,10,1,'Buy',999.95,165.4587,6.044,'2023-02-10'),
(322,10,1,'Sell',1999.9,153.5389,13.025,'2023-03-20'),
(323,10,1,'Sell',1999.9,147.1695,13.589,'2023-04-20'),
(324,10,1,'Buy',4999.75,157.5845,31.727,'2023-05-23'),
(325,10,1,'Buy',4999.75,161.6934,30.921,'2023-06-20'),
(326,10,1,'Buy',2999.85,172.9167,17.349,'2023-07-20'),
(327,10,1,'Buy',1999.9,180.7054,11.067,'2023-09-07'),
(328,10,1,'Buy',2999.85,180.3823,16.631,'2023-09-20'),
(329,10,1,'Buy',9999.5,175.2069,57.073,'2023-11-07'),
(330,10,1,'Buy',9999.5,193.7621,51.607,'2023-12-26'),
(331,5,1,'Buy',999.95,10.908,91.671,'2023-01-30'),
(332,5,1,'Buy',999.95,11.177,89.465,'2023-03-20'),
(333,5,1,'Buy',999.95,11.43,87.485,'2023-04-20'),
(334,5,1,'Buy',2999.85,12.147,246.962,'2023-05-23'),
(335,5,1,'Buy',2999.85,13.592,220.707,'2023-06-20'),
(336,5,1,'Buy',9999.5,13.531,739.007,'2023-07-03'),
(337,5,1,'Sell',4999.75,13.869,360.498,'2023-07-20'),
(338,5,1,'Buy',999.95,13.475,74.208,'2023-09-20'),
(339,5,1,'Buy',999.95,14.557,68.692,'2023-11-20'),
(340,5,1,'Buy',9999.5,15.311,653.093,'2023-12-26'),
(341,2,1,'Sell',999.95,11.039,90.583,'2023-08-11'),
(342,2,1,'Buy',4999.75,11.864,421.422,'2023-09-20'),
(343,2,1,'Buy',4999.75,13.27,376.771,'2023-11-20'),
(344,2,1,'Buy',4999.75,15.395,324.765,'2024-01-23'),
(345,12,1,'Sell',24998.75,270.3344,92.473,'2023-01-09'),
(346,12,1,'Sell',74996.25,270.3344,277.42,'2023-01-09'),
(347,12,1,'Buy',9999.5,247.0606,40.474,'2023-02-01'),
(348,12,1,'Sell',9999.5,244.0337,40.976,'2023-03-16'),
(349,13,1,'Buy',4999.75,136.1616,36.719,'2023-10-03'),
(350,13,1,'Buy',4999.75,133.6674,37.404,'2023-11-01'),
(351,13,1,'Buy',4999.75,158.6193,31.52,'2024-02-01'),
(352,4,1,'Buy',1999.9,78.8733,25.356,'2023-09-18'),
(353,4,1,'Buy',1999.9,75.6573,26.434,'2023-11-01'),
(354,4,1,'Sell',1999.9,82.3477,24.286,'2023-12-01'),
(355,4,1,'Buy',59997,88.1136,680.905,'2023-12-26'),
(356,4,1,'Sell',1999.9,99.9002,20.019,'2024-02-01'),
(357,8,1,'Buy',999.95,152.5608,6.554,'2023-01-25'),
(358,8,1,'Buy',999.95,151.2203,6.613,'2023-02-10'),
(359,8,1,'Buy',999.95,144.4825,6.921,'2023-03-20'),
(360,8,1,'Buy',999.95,152.3633,6.563,'2023-04-20'),
(361,8,1,'Buy',2999.85,160.3958,18.703,'2023-05-23'),
(362,8,1,'Buy',2999.85,171.1507,17.528,'2023-06-20'),
(363,8,1,'Buy',2999.85,180.902,16.583,'2023-07-20'),
(364,8,1,'Buy',1999.9,197.1346,10.145,'2023-09-06'),
(365,8,1,'Buy',3999.8,194.0484,20.612,'2023-09-20'),
(366,8,1,'Buy',4999.75,195.9769,25.512,'2023-09-29'),
(367,8,1,'Buy',3999.8,202.5014,19.752,'2023-11-20'),
(368,8,1,'Buy',9999.5,224.1267,44.615,'2023-12-26'),
(369,7,1,'Buy',499.98,75.6,6.613,'2023-01-24'),
(370,7,1,'Buy',499.98,74.72,6.691,'2023-02-10'),
(371,7,1,'Buy',499.98,71.83,6.961,'2023-03-20'),
(372,9,1,'Buy',2999.85,445.1549,6.739,'2023-02-02'),
(373,9,1,'Buy',2999.85,428.8138,6.996,'2023-03-20'),
(374,9,1,'Buy',2999.85,451.5771,6.643,'2023-04-20'),
(375,9,1,'Buy',5999.7,467.8854,12.823,'2023-05-23'),
(376,9,1,'Buy',5999.7,489.9683,12.245,'2023-06-20'),
(377,9,1,'Buy',5999.7,515.8658,11.63,'2023-07-20'),
(378,9,1,'Buy',999.95,544.3198,1.837,'2023-09-20'),
(379,9,1,'Buy',999.95,537.6578,1.86,'2023-10-20'),
(380,9,1,'Buy',999.95,554.2719,1.804,'2023-11-20'),
(381,2,1,'Buy',4999.75,15.842,315.601,'2024-02-20'),
(382,15,1,'Buy',10000,188.25,53.12084993359894,'2025-04-03'),
(383,7,1,'Buy',100000,119.15,839.278220730172,'2024-10-11'),
(384,8,1,'Buy',10000,143.0586,69.90142501045025,'2023-03-27'),
(385,4,1,'Buy',100000,101.9666,980.7132923918224,'2024-02-14'),
(386,8,1,'Buy',100000,304.1605,328.77378883845864,'2024-09-12'),
(387,9,1,'Sell',40000,663.0763,60.32488267187351,'2025-02-06'),
(388,2,1,'Buy',50000,15.654,3194.0718027341254,'2024-02-21'),
(389,8,1,'Buy',120000,122.2147,918.232176653054,'2022-06-15'),
(390,12,1,'Buy',200000,254.1385,786.9724579314036,'2022-04-21');

/*Table structure for table `qrtz_blob_triggers` */

DROP TABLE IF EXISTS `qrtz_blob_triggers`;

CREATE TABLE `qrtz_blob_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(190) NOT NULL,
  `TRIGGER_GROUP` varchar(190) NOT NULL,
  `BLOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `SCHED_NAME` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qrtz_blob_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_blob_triggers` */

/*Table structure for table `qrtz_calendars` */

DROP TABLE IF EXISTS `qrtz_calendars`;

CREATE TABLE `qrtz_calendars` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `CALENDAR_NAME` varchar(190) NOT NULL,
  `CALENDAR` blob NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`CALENDAR_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_calendars` */

/*Table structure for table `qrtz_cron_triggers` */

DROP TABLE IF EXISTS `qrtz_cron_triggers`;

CREATE TABLE `qrtz_cron_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(190) NOT NULL,
  `TRIGGER_GROUP` varchar(190) NOT NULL,
  `CRON_EXPRESSION` varchar(120) NOT NULL,
  `TIME_ZONE_ID` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qrtz_cron_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_cron_triggers` */

insert  into `qrtz_cron_triggers`(`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`,`CRON_EXPRESSION`,`TIME_ZONE_ID`) values 
('quartzScheduler','UpdateBudgetAgent','DEFAULT','00 00 00 ? * * *','Asia/Calcutta');

/*Table structure for table `qrtz_fired_triggers` */

DROP TABLE IF EXISTS `qrtz_fired_triggers`;

CREATE TABLE `qrtz_fired_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `ENTRY_ID` varchar(95) NOT NULL,
  `TRIGGER_NAME` varchar(190) NOT NULL,
  `TRIGGER_GROUP` varchar(190) NOT NULL,
  `INSTANCE_NAME` varchar(190) NOT NULL,
  `FIRED_TIME` bigint NOT NULL,
  `SCHED_TIME` bigint NOT NULL,
  `PRIORITY` int NOT NULL,
  `STATE` varchar(16) NOT NULL,
  `JOB_NAME` varchar(190) DEFAULT NULL,
  `JOB_GROUP` varchar(190) DEFAULT NULL,
  `IS_NONCONCURRENT` varchar(1) DEFAULT NULL,
  `REQUESTS_RECOVERY` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`ENTRY_ID`),
  KEY `IDX_QRTZ_FT_TRIG_INST_NAME` (`SCHED_NAME`,`INSTANCE_NAME`),
  KEY `IDX_QRTZ_FT_INST_JOB_REQ_RCVRY` (`SCHED_NAME`,`INSTANCE_NAME`,`REQUESTS_RECOVERY`),
  KEY `IDX_QRTZ_FT_J_G` (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_FT_JG` (`SCHED_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_FT_T_G` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `IDX_QRTZ_FT_TG` (`SCHED_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_fired_triggers` */

/*Table structure for table `qrtz_job_details` */

DROP TABLE IF EXISTS `qrtz_job_details`;

CREATE TABLE `qrtz_job_details` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `JOB_NAME` varchar(190) NOT NULL,
  `JOB_GROUP` varchar(190) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `JOB_CLASS_NAME` varchar(250) NOT NULL,
  `IS_DURABLE` varchar(1) NOT NULL,
  `IS_NONCONCURRENT` varchar(1) NOT NULL,
  `IS_UPDATE_DATA` varchar(1) NOT NULL,
  `REQUESTS_RECOVERY` varchar(1) NOT NULL,
  `JOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_J_REQ_RECOVERY` (`SCHED_NAME`,`REQUESTS_RECOVERY`),
  KEY `IDX_QRTZ_J_GRP` (`SCHED_NAME`,`JOB_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_job_details` */

insert  into `qrtz_job_details`(`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`,`DESCRIPTION`,`JOB_CLASS_NAME`,`IS_DURABLE`,`IS_NONCONCURRENT`,`IS_UPDATE_DATA`,`REQUESTS_RECOVERY`,`JOB_DATA`) values 
('quartzScheduler','UpdateBudgetAgent','DEFAULT',NULL,'com.finance.stockMarket.agent.jobs.UpdateBudgetAgent','0','0','0','0','¬í\0sr\0org.quartz.JobDataMapŸ°ƒè¿©°Ë\0\0xr\0&org.quartz.utils.StringKeyDirtyFlagMap‚èÃûÅ](\0Z\0allowsTransientDataxr\0org.quartz.utils.DirtyFlagMapæ.­(v\nÎ\0Z\0dirtyL\0mapt\0Ljava/util/Map;xpsr\0java.util.HashMapÚÁÃ`Ñ\0F\0\nloadFactorI\0	thresholdxp?@\0\0\0\0\0w\0\0\0\0\0\0t\0datesr\0java.util.DatehjKYt\0\0xpw\0\0–IMôæxx\0');

/*Table structure for table `qrtz_locks` */

DROP TABLE IF EXISTS `qrtz_locks`;

CREATE TABLE `qrtz_locks` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `LOCK_NAME` varchar(40) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`LOCK_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_locks` */

insert  into `qrtz_locks`(`SCHED_NAME`,`LOCK_NAME`) values 
('quartzScheduler','TRIGGER_ACCESS');

/*Table structure for table `qrtz_paused_trigger_grps` */

DROP TABLE IF EXISTS `qrtz_paused_trigger_grps`;

CREATE TABLE `qrtz_paused_trigger_grps` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_GROUP` varchar(190) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_paused_trigger_grps` */

/*Table structure for table `qrtz_scheduler_state` */

DROP TABLE IF EXISTS `qrtz_scheduler_state`;

CREATE TABLE `qrtz_scheduler_state` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `INSTANCE_NAME` varchar(190) NOT NULL,
  `LAST_CHECKIN_TIME` bigint NOT NULL,
  `CHECKIN_INTERVAL` bigint NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`INSTANCE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_scheduler_state` */

/*Table structure for table `qrtz_simple_triggers` */

DROP TABLE IF EXISTS `qrtz_simple_triggers`;

CREATE TABLE `qrtz_simple_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(190) NOT NULL,
  `TRIGGER_GROUP` varchar(190) NOT NULL,
  `REPEAT_COUNT` bigint NOT NULL,
  `REPEAT_INTERVAL` bigint NOT NULL,
  `TIMES_TRIGGERED` bigint NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qrtz_simple_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_simple_triggers` */

/*Table structure for table `qrtz_simprop_triggers` */

DROP TABLE IF EXISTS `qrtz_simprop_triggers`;

CREATE TABLE `qrtz_simprop_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(190) NOT NULL,
  `TRIGGER_GROUP` varchar(190) NOT NULL,
  `STR_PROP_1` varchar(512) DEFAULT NULL,
  `STR_PROP_2` varchar(512) DEFAULT NULL,
  `STR_PROP_3` varchar(512) DEFAULT NULL,
  `INT_PROP_1` int DEFAULT NULL,
  `INT_PROP_2` int DEFAULT NULL,
  `LONG_PROP_1` bigint DEFAULT NULL,
  `LONG_PROP_2` bigint DEFAULT NULL,
  `DEC_PROP_1` decimal(13,4) DEFAULT NULL,
  `DEC_PROP_2` decimal(13,4) DEFAULT NULL,
  `BOOL_PROP_1` varchar(1) DEFAULT NULL,
  `BOOL_PROP_2` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qrtz_simprop_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qrtz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_simprop_triggers` */

/*Table structure for table `qrtz_triggers` */

DROP TABLE IF EXISTS `qrtz_triggers`;

CREATE TABLE `qrtz_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(190) NOT NULL,
  `TRIGGER_GROUP` varchar(190) NOT NULL,
  `JOB_NAME` varchar(190) NOT NULL,
  `JOB_GROUP` varchar(190) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `NEXT_FIRE_TIME` bigint DEFAULT NULL,
  `PREV_FIRE_TIME` bigint DEFAULT NULL,
  `PRIORITY` int DEFAULT NULL,
  `TRIGGER_STATE` varchar(16) NOT NULL,
  `TRIGGER_TYPE` varchar(8) NOT NULL,
  `START_TIME` bigint NOT NULL,
  `END_TIME` bigint DEFAULT NULL,
  `CALENDAR_NAME` varchar(190) DEFAULT NULL,
  `MISFIRE_INSTR` smallint DEFAULT NULL,
  `JOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `IDX_QRTZ_T_J` (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_T_JG` (`SCHED_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_T_C` (`SCHED_NAME`,`CALENDAR_NAME`),
  KEY `IDX_QRTZ_T_G` (`SCHED_NAME`,`TRIGGER_GROUP`),
  KEY `IDX_QRTZ_T_STATE` (`SCHED_NAME`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_N_STATE` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_N_G_STATE` (`SCHED_NAME`,`TRIGGER_GROUP`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_NEXT_FIRE_TIME` (`SCHED_NAME`,`NEXT_FIRE_TIME`),
  KEY `IDX_QRTZ_T_NFT_ST` (`SCHED_NAME`,`TRIGGER_STATE`,`NEXT_FIRE_TIME`),
  KEY `IDX_QRTZ_T_NFT_MISFIRE` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`),
  KEY `IDX_QRTZ_T_NFT_ST_MISFIRE` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_NFT_ST_MISFIRE_GRP` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`,`TRIGGER_GROUP`,`TRIGGER_STATE`),
  CONSTRAINT `qrtz_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`) REFERENCES `qrtz_job_details` (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `qrtz_triggers` */

insert  into `qrtz_triggers`(`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`,`JOB_NAME`,`JOB_GROUP`,`DESCRIPTION`,`NEXT_FIRE_TIME`,`PREV_FIRE_TIME`,`PRIORITY`,`TRIGGER_STATE`,`TRIGGER_TYPE`,`START_TIME`,`END_TIME`,`CALENDAR_NAME`,`MISFIRE_INSTR`,`JOB_DATA`) values 
('quartzScheduler','UpdateBudgetAgent','DEFAULT','UpdateBudgetAgent','DEFAULT',NULL,1745001000000,-1,5,'WAITING','CRON',1744986567000,0,NULL,0,'');

/* Procedure structure for procedure `update_budget_view` */

/*!50003 DROP PROCEDURE IF EXISTS  `update_budget_view` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `update_budget_view`(IN update_date_param DATE, IN user_id INT)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE pid INT;
	DECLARE act_amount DECIMAL(10, 2);
	DECLARE rem_amount DECIMAL(10, 2);
	DECLARE sum_amount DECIMAL(10, 2);
	declare st_day int;
	declare d_day int;
	declare month_of_budget VARCHAR(100);
	declare year_of_budget INT;
	declare lower_date date;
	declare temp_due_date date;
	DECLARE credit_card_cursor CURSOR FOR SELECT pk_credit_card_id FROM credit_card WHERE fk_user_id = user_id;
	
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	
	OPEN credit_card_cursor;
	
	credit_card_loop: LOOP
		FETCH credit_card_cursor INTO pid;
		IF done THEN
			LEAVE credit_card_loop;
		END IF;
		
		select statement_date,due_date into st_day, d_day from credit_card where pk_credit_card_id=pid;
		SET temp_due_date = CONCAT(DATE_FORMAT(update_date_param, '%Y-%m'), '-', LPAD(d_day, 2, '0'));
		if st_day > d_day then
			set temp_due_date = date_add(temp_due_date, INTERVAL 1 MONTH);
		end if;
		
		SET lower_date = CONCAT(DATE_FORMAT(update_date_param, '%Y-%m'), '-', LPAD(st_day, 2, '0'));
		
		if (day(update_date_param) < st_day) then
			set lower_date = DATE_SUB(lower_date, INTERVAL 1 MONTH);
		else
			SET temp_due_date = DATE_ADD(temp_due_date, INTERVAL 1 MONTH);
		end if;
		
		set month_of_budget = monthname(temp_due_date);
		set year_of_budget = year(temp_due_date);
		
		SELECT SUM(e.amount) INTO sum_amount
			FROM expense e
			WHERE e.fk_credit_card_id = pid AND e.expense_date between lower_date and update_date_param;
			
		if sum_amount is null then
			set sum_amount = 0;
		end if;

		IF EXISTS (SELECT 1 FROM budget_view WHERE fk_credit_card_id = pid AND budget_month = month_of_budget AND budget_year = year_of_budget) THEN
			select actual_amount, remaining_amount into act_amount, rem_amount from budget_view 
			WHERE fk_credit_card_id = pid AND budget_month = month_of_budget AND budget_year = year_of_budget;
			set rem_amount = sum_amount - act_amount + rem_amount;
			UPDATE budget_view
				SET actual_amount = sum_amount, remaining_amount = rem_amount, update_date = update_date_param
				WHERE fk_credit_card_id = pid AND budget_month = month_of_budget AND budget_year = year_of_budget;
		ELSE
			INSERT INTO budget_view (fk_credit_card_id, budget_month, budget_year, actual_amount, remaining_amount, update_date)
				VALUES (
				    pid,
				    month_of_budget,
				    year_of_budget,
				    sum_amount,
				    sum_amount,
				    update_date_param
				);
		end if;

		
	END LOOP credit_card_loop;

	CLOSE credit_card_cursor;

END */$$
DELIMITER ;

/* Procedure structure for procedure `update_test_budget_view` */

/*!50003 DROP PROCEDURE IF EXISTS  `update_test_budget_view` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `update_test_budget_view`(IN update_date_param DATE, IN user_id INT)
BEGIN
	DECLARE done INT DEFAULT 0;
	DECLARE pid INT;
	DECLARE act_amount DECIMAL(10, 2);
	DECLARE rem_amount DECIMAL(10, 2);
	DECLARE last_date DATE;
	DECLARE sum_amount DECIMAL(10, 2);
	DECLARE credit_card_cursor CURSOR FOR SELECT pk_credit_card_id FROM credit_card WHERE fk_user_id = user_id;
	
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
	
	OPEN credit_card_cursor;
	
		credit_card_loop: LOOP
		FETCH credit_card_cursor INTO pid;
		IF done=1 THEN
		LEAVE credit_card_loop;
	    END IF;

	    -- Debugging: Print pid
	    SELECT CONCAT("Processing credit card ID: ", pid);
	    
	    set act_amount = 0;
	    set rem_amount = 0;
	    set last_date = null;

	    
	    
	    SELECT SUM(e.amount) INTO sum_amount
			FROM expense e
			WHERE e.fk_credit_card_id = pid AND e.expense_date < update_date_param;


	    -- Debugging: Print details
	    IF last_date IS NULL THEN
		SELECT CONCAT("Last date is NULL for credit card ID ", pid, " and sum amount is ", sum_amount);
	    ELSE
		SELECT CONCAT("Last date is NOT NULL for credit card ID ", pid, " and sum amount is ", sum_amount);
	    END IF;

	    
	END LOOP credit_card_loop;


	CLOSE credit_card_cursor;

END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
