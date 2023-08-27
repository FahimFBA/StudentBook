CREATE DATABASE  IF NOT EXISTS `studentbookdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `studentbookdb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: studentbookdb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `announcementtable`
--

DROP TABLE IF EXISTS `announcementtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcementtable` (
  `announcement_id` int NOT NULL AUTO_INCREMENT,
  `announcement_content` varchar(500) NOT NULL,
  `user_id` int NOT NULL,
  `announcement_creation_time` datetime NOT NULL,
  `announcement_title` varchar(45) NOT NULL,
  PRIMARY KEY (`announcement_id`),
  UNIQUE KEY `announcement_id_UNIQUE` (`announcement_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `announcement_user_id` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcementtable`
--

LOCK TABLES `announcementtable` WRITE;
/*!40000 ALTER TABLE `announcementtable` DISABLE KEYS */;
INSERT INTO `announcementtable` VALUES (4,'This will be our announcement section',12,'2023-08-28 02:10:44','Launch for a new social media');
/*!40000 ALTER TABLE `announcementtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articletable`
--

DROP TABLE IF EXISTS `articletable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articletable` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `article_content` varchar(500) NOT NULL,
  `user_id` int NOT NULL,
  `article_creation_time` datetime NOT NULL,
  `article_title` varchar(45) NOT NULL,
  PRIMARY KEY (`article_id`),
  UNIQUE KEY `article_id_UNIQUE` (`article_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `article_user_fk` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articletable`
--

LOCK TABLES `articletable` WRITE;
/*!40000 ALTER TABLE `articletable` DISABLE KEYS */;
INSERT INTO `articletable` VALUES (11,'Hello everyone!\nI hope you all are doing well in this new community of ours. If you have any question, then feel free to reach out to me! My appointment schedule is available for you on my profile! ✌️',12,'2023-08-28 02:08:39','Instruction for StudentBook');
/*!40000 ALTER TABLE `articletable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentstable`
--

DROP TABLE IF EXISTS `commentstable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentstable` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_desc` varchar(100) NOT NULL,
  `comment_creation_time` datetime DEFAULT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`),
  KEY `post_id_idx` (`post_id`),
  KEY `comment_user_id_idx` (`user_id`),
  CONSTRAINT `comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_id` FOREIGN KEY (`post_id`) REFERENCES `poststable` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentstable`
--

LOCK TABLES `commentstable` WRITE;
/*!40000 ALTER TABLE `commentstable` DISABLE KEYS */;
INSERT INTO `commentstable` VALUES (13,'Welcome, Jane!','2023-08-28 01:55:06',2,120),(14,'Looks very beautiful, Ma\'am!','2023-08-28 02:14:21',12,122),(15,'Welcome me, too!','2023-08-28 02:23:15',13,123);
/*!40000 ALTER TABLE `commentstable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty_table`
--

DROP TABLE IF EXISTS `faculty_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty_table` (
  `faculty_id` int NOT NULL,
  `faculty_research_interest` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`faculty_id`),
  UNIQUE KEY `faculty_id_UNIQUE` (`faculty_id`),
  CONSTRAINT `faculty_id_ftable` FOREIGN KEY (`faculty_id`) REFERENCES `usertable` (`user_if_faculty_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty_table`
--

LOCK TABLES `faculty_table` WRITE;
/*!40000 ALTER TABLE `faculty_table` DISABLE KEYS */;
INSERT INTO `faculty_table` VALUES (22,'Bioinformetics');
/*!40000 ALTER TABLE `faculty_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facultydegreetable`
--

DROP TABLE IF EXISTS `facultydegreetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facultydegreetable` (
  `faculty_id` int NOT NULL,
  `faculty_degree1` varchar(200) NOT NULL,
  `faculty_degree2` varchar(200) DEFAULT NULL,
  `faculty_degree3` varchar(200) DEFAULT NULL,
  `faculty_degree4` varchar(200) DEFAULT NULL,
  `faculty_degree5` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`faculty_id`),
  UNIQUE KEY `faculty_id_UNIQUE` (`faculty_id`),
  CONSTRAINT `faculty_id` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_table` (`faculty_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultydegreetable`
--

LOCK TABLES `facultydegreetable` WRITE;
/*!40000 ALTER TABLE `facultydegreetable` DISABLE KEYS */;
INSERT INTO `facultydegreetable` VALUES (22,'Lecturer',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `facultydegreetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facultydepttable`
--

DROP TABLE IF EXISTS `facultydepttable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facultydepttable` (
  `faculty_id` int NOT NULL,
  `faculty_dept1` varchar(200) NOT NULL,
  `faculty_dept2` varchar(200) DEFAULT NULL,
  `faculty_dept3` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`faculty_id`),
  UNIQUE KEY `faculty_id_UNIQUE` (`faculty_id`),
  CONSTRAINT `faculty_id_dept` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_table` (`faculty_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultydepttable`
--

LOCK TABLES `facultydepttable` WRITE;
/*!40000 ALTER TABLE `facultydepttable` DISABLE KEYS */;
INSERT INTO `facultydepttable` VALUES (22,'CSE','EEE',NULL);
/*!40000 ALTER TABLE `facultydepttable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobtable`
--

DROP TABLE IF EXISTS `jobtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobtable` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `job_provider_user_name` varchar(200) NOT NULL,
  `job_provider_company_name` varchar(200) NOT NULL,
  `job_provider_company_linkedin` varchar(200) NOT NULL,
  `job_provider_company_website` varchar(200) NOT NULL,
  `job_provider_company_email` varchar(200) NOT NULL,
  `job_description` varchar(3000) NOT NULL,
  `job_requirement` varchar(3000) NOT NULL,
  `job_salary` varchar(15) NOT NULL,
  `job_provider_company_twitter` varchar(200) DEFAULT NULL,
  `job_provider_company_facebook` varchar(200) DEFAULT NULL,
  `user_id` int NOT NULL,
  `job_creation_time` date NOT NULL,
  PRIMARY KEY (`job_id`),
  UNIQUE KEY `job_id_UNIQUE` (`job_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `job_user_id` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobtable`
--

LOCK TABLES `jobtable` WRITE;
/*!40000 ALTER TABLE `jobtable` DISABLE KEYS */;
INSERT INTO `jobtable` VALUES (8,'Anisul Islam (Anis)','United International University','https://www.linkedin.com/school/uiuinfo/','https://www.uiu.ac.bd/','hr.uiu@gmail.com','We are going to hire a senior backend developer for our this new platform StudentBook. Interested participant is requested to apply.','4+ years experience, Expertise in NodeJS, Angular, Django is a must.','60000','https://twitter.com/uiuedu?lang=en','https://www.facebook.com/uiuinfo/',12,'2023-08-28');
/*!40000 ALTER TABLE `jobtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likestable`
--

DROP TABLE IF EXISTS `likestable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likestable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `likeeUserId_idx` (`user_id`),
  KEY `likePostId_idx` (`post_id`),
  CONSTRAINT `likeeUserId` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likePostId` FOREIGN KEY (`post_id`) REFERENCES `poststable` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likestable`
--

LOCK TABLES `likestable` WRITE;
/*!40000 ALTER TABLE `likestable` DISABLE KEYS */;
INSERT INTO `likestable` VALUES (21,2,120),(23,1,120),(24,1,122),(25,12,122);
/*!40000 ALTER TABLE `likestable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poststable`
--

DROP TABLE IF EXISTS `poststable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poststable` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_desc` varchar(500) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `post_creation_time` datetime DEFAULT NULL,
  `user_fullname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poststable`
--

LOCK TABLES `poststable` WRITE;
/*!40000 ALTER TABLE `poststable` DISABLE KEYS */;
INSERT INTO `poststable` VALUES (120,'Hello, I am Jane Doe, and I am from Canada. Glad to meet you!','1693166075107pexels-kamizzle-15666462.jpg',1,'2023-08-28 01:54:35','Jane Doe'),(122,'Wow!','1693166327596pexels-alina-vilchenko-17439236.jpg',2,'2023-08-28 01:58:47','Israt Jahan Khan'),(123,'Just joined here! Glad to meet you!','',12,'2023-08-28 02:01:51','Anisul Islam');
/*!40000 ALTER TABLE `poststable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stafftable`
--

DROP TABLE IF EXISTS `stafftable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stafftable` (
  `staff_id` int NOT NULL,
  `staff_designation` varchar(200) NOT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `staff_id_UNIQUE` (`staff_id`),
  CONSTRAINT `staff_id` FOREIGN KEY (`staff_id`) REFERENCES `usertable` (`user_if_staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stafftable`
--

LOCK TABLES `stafftable` WRITE;
/*!40000 ALTER TABLE `stafftable` DISABLE KEYS */;
INSERT INTO `stafftable` VALUES (110,'Admin');
/*!40000 ALTER TABLE `stafftable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storiestable`
--

DROP TABLE IF EXISTS `storiestable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storiestable` (
  `story_id` int NOT NULL AUTO_INCREMENT,
  `story_img` varchar(200) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`story_id`),
  UNIQUE KEY `story_id_UNIQUE` (`story_id`),
  KEY `story_userid_idx` (`user_id`),
  CONSTRAINT `story_userid` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storiestable`
--

LOCK TABLES `storiestable` WRITE;
/*!40000 ALTER TABLE `storiestable` DISABLE KEYS */;
/*!40000 ALTER TABLE `storiestable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studenttable`
--

DROP TABLE IF EXISTS `studenttable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studenttable` (
  `student_id` int NOT NULL,
  `student_cgpa` varchar(5) DEFAULT NULL,
  `student_stat` varchar(45) NOT NULL,
  `student_work_email` varchar(200) DEFAULT NULL,
  `student_work_company` varchar(200) DEFAULT NULL,
  `student_dept` varchar(200) DEFAULT NULL,
  `student_grad_year` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `student_id_UNIQUE` (`student_id`),
  CONSTRAINT `student_id` FOREIGN KEY (`student_id`) REFERENCES `usertable` (`user_if_student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studenttable`
--

LOCK TABLES `studenttable` WRITE;
/*!40000 ALTER TABLE `studenttable` DISABLE KEYS */;
INSERT INTO `studenttable` VALUES (11201111,'2.30','Formal','jane@uiu.ac.bd','N/A','CSE','2025');
/*!40000 ALTER TABLE `studenttable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrelationshiptable`
--

DROP TABLE IF EXISTS `userrelationshiptable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrelationshiptable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followeruserid` int NOT NULL,
  `followeduserid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `follower_user_idx` (`followeruserid`),
  KEY `followerd_user_idx` (`followeduserid`),
  CONSTRAINT `follower_user` FOREIGN KEY (`followeruserid`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followerd_user` FOREIGN KEY (`followeduserid`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrelationshiptable`
--

LOCK TABLES `userrelationshiptable` WRITE;
/*!40000 ALTER TABLE `userrelationshiptable` DISABLE KEYS */;
INSERT INTO `userrelationshiptable` VALUES (17,1,12),(18,13,12);
/*!40000 ALTER TABLE `userrelationshiptable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertable`
--

DROP TABLE IF EXISTS `usertable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) NOT NULL,
  `user_fullname` varchar(200) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `user_dob` datetime DEFAULT NULL,
  `user_phone` varchar(11) DEFAULT NULL,
  `user_profile_img` varchar(200) DEFAULT NULL,
  `user_cover_img` varchar(200) DEFAULT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_city` varchar(200) DEFAULT NULL,
  `user_website` varchar(200) DEFAULT NULL,
  `user_occ` varchar(50) NOT NULL,
  `user_if_student_id` int DEFAULT NULL,
  `user_if_faculty_id` int DEFAULT NULL,
  `user_if_staff_id` int DEFAULT NULL,
  `user_cal` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  UNIQUE KEY `user_if_student_id_UNIQUE` (`user_if_student_id`),
  UNIQUE KEY `user_if_faculty_id_UNIQUE` (`user_if_faculty_id`),
  UNIQUE KEY `user_if_staff_id_UNIQUE` (`user_if_staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertable`
--

LOCK TABLES `usertable` WRITE;
/*!40000 ALTER TABLE `usertable` DISABLE KEYS */;
INSERT INTO `usertable` VALUES (1,'Jane','Jane Doe','jane23@gmail.com',NULL,NULL,'1693163601886pexels-daka-17813826.jpg','1693163601872pexels-lina-kivaka-16550526.jpg','$2a$10$ZU0crC7xwDiJo0LYSH5IbuMDG0u/7sbRV18lhUDPQAllBkr5goEPS','Canada','janedoe.com','Student',11201111,NULL,NULL,'https://calendly.com/'),(2,'Israt','Israt Jahan Khan','isratjahankhan@gmail.com',NULL,NULL,'1693166237794329901150_5732024393591687_3590245626934702253_n.jpg','1693166237786pexels-jacob-colvin-1761279.jpg','$2a$10$AIUdFUpH3ZXmDRbzRacLc.BAH3rbB.Daoe/SQ99uYYaJBXJ/NjLmq','Bangladesh','github.io/IsratIJK','Faculty',NULL,22,NULL,NULL),(12,'Anisul','Anisul Islam','anisul@gmail.com',NULL,NULL,'1693166576309pexels-pixabay-220453.jpg','1693166576301pexels-jacob-colvin-1761279.jpg','$2a$10$VOdFHQ13eur6eQxM1nEw/.XIlvdUR4JOzcAVznw.c/4Z0kPzzyCU6','Chittagong','anisul.com','Staff',NULL,NULL,110,NULL),(13,'R2','Robin','robin@gmail.com',NULL,NULL,'1693167779669pexels-arianna-jadÃ©-2896853.jpg','1693167779659pexels-andre-moura-17734945.jpg','$2a$10$LoNJX.1d.pVQEr2lUAKe5eEPCqVYqP8FYE4pdM39JpRo9QdKZ4tvy','Canada','r2.com','Student',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `usertable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-28  2:24:15
