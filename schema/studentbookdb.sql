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
  UNIQUE KEY `article_id_UNIQUE` (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articletable`
--

LOCK TABLES `articletable` WRITE;
/*!40000 ALTER TABLE `articletable` DISABLE KEYS */;
INSERT INTO `articletable` VALUES (1,'I am with Joy Bhai now',8,'2023-08-24 22:39:34',''),(2,'I am with Joy Bhai now',8,'2023-08-25 02:27:43',''),(3,'hello',8,'2023-08-25 02:29:00',''),(4,'well asdasdasdasd',8,'2023-08-25 02:30:42',''),(5,'I am with Joy Bhai now',8,'2023-08-25 03:04:12','new title'),(6,'I am with Joy Bhai now at 3.11 AM',8,'2023-08-25 03:11:17','newer title');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentstable`
--

LOCK TABLES `commentstable` WRITE;
/*!40000 ALTER TABLE `commentstable` DISABLE KEYS */;
INSERT INTO `commentstable` VALUES (1,'new comment from Joy',NULL,8,34);
/*!40000 ALTER TABLE `commentstable` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likestable`
--

LOCK TABLES `likestable` WRITE;
/*!40000 ALTER TABLE `likestable` DISABLE KEYS */;
INSERT INTO `likestable` VALUES (10,8,36),(11,8,34);
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
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poststable`
--

LOCK TABLES `poststable` WRITE;
/*!40000 ALTER TABLE `poststable` DISABLE KEYS */;
INSERT INTO `poststable` VALUES (1,'this is a post',NULL,3,NULL),(2,'this is another post',NULL,6,NULL),(3,'from user 7',NULL,7,NULL),(4,'asdasd',NULL,6,NULL),(5,'asdasdas',NULL,7,NULL),(6,'jane theke',NULL,8,NULL),(7,'from postman',NULL,NULL,'2023-08-16 23:40:20'),(8,'from postman 2',NULL,NULL,'2023-08-16 23:41:47'),(9,'from postman 232',NULL,NULL,'2023-08-16 23:44:22'),(10,'from postman (testing for showing the user id automatically)',NULL,8,'2023-08-16 23:46:16'),(11,'asdasd',NULL,8,'2023-08-17 17:31:48'),(12,'This is from Fahim',NULL,8,'2023-08-17 17:31:58'),(13,'desc with an image',NULL,8,'2023-08-17 17:53:14'),(14,'desc with an image',NULL,8,'2023-08-17 17:53:43'),(15,'',NULL,8,'2023-08-17 17:55:19'),(16,'img',NULL,8,'2023-08-17 17:56:01'),(17,'asdasd',NULL,8,'2023-08-17 17:58:33'),(18,'from postman (testing for showing the user id automatically)',NULL,8,'2023-08-17 22:55:02'),(19,'from postman (testing for showing the user id automatically)asdasd',NULL,8,'2023-08-17 23:21:52'),(20,'posting',NULL,8,'2023-08-17 23:36:09'),(21,'postingasdas',NULL,8,'2023-08-17 23:46:09'),(22,'I am with Joy Bhai now',NULL,8,'2023-08-18 00:21:28'),(23,'asdasdasdawt3wt23qerq','',8,'2023-08-18 00:26:28'),(24,'asdasdasdawt3wt23qerq','1692296795439istockphoto-1322992439-612x612.jpg',8,'2023-08-18 00:26:35'),(25,'Again trying','1692297003778big_news1.gif',8,'2023-08-18 00:30:03'),(26,'Again trying without image','1692297008684big_news1.gif',8,'2023-08-18 00:30:08'),(27,'asdasdas','',8,'2023-08-18 00:30:19'),(28,'asdasdas',NULL,8,'2023-08-18 00:31:14'),(29,'3ewqy3gesf',NULL,8,'2023-08-18 00:31:23'),(30,'asfgawfgasd',NULL,8,'2023-08-18 00:32:22'),(31,'',NULL,8,'2023-08-18 00:32:30'),(32,'asdasdasde3tasfsdf','',8,'2023-08-18 00:33:47'),(33,'','1692297230592istockphoto-1322992439-612x612.jpg',8,'2023-08-18 00:33:50'),(34,'asdatgfwa','1692297234865istockphoto-1322992439-612x612.jpg',8,'2023-08-18 00:33:54'),(35,'post number 35. Posting without image ','',8,'2023-08-18 10:56:26'),(36,'post number 35. Posting with image ','1692334610806Introduction To Open Source ( à¦à¦ªà§à¦¨ à¦¸à§à¦°à§à¦¸ à¦¨à¦¿à§à§ à¦ªà¦°à¦¿à¦à¦¿à¦¤à¦¿ à¦®à§à¦²à¦ à¦à¦²à§à¦à¦¨à¦¾ ).png',8,'2023-08-18 10:56:50'),(38,'another user\'s post',NULL,9,NULL),(40,'test','',8,'2023-08-21 18:15:27'),(42,'Fahim again','',8,'2023-08-21 18:24:22'),(43,'post with image','1692892118822scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 21:48:38'),(44,'creating new post',NULL,8,'2023-08-24 22:36:04'),(45,'creating new post',NULL,8,'2023-08-24 22:37:14'),(46,'testing unwrap','',8,'2023-08-24 23:01:25'),(47,'testing unwrap','1692896495779scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:01:35'),(48,'testing unwrap 2','',8,'2023-08-24 23:01:53'),(49,'testing unwrap 3','',8,'2023-08-24 23:04:09'),(50,'testing unwrap 3 ','1692896659832scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:04:19'),(53,'','1692896751582scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:05:51'),(54,'','1692896759789scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:05:59'),(57,'','1692896878486scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:07:58'),(58,'asdasd','',8,'2023-08-24 23:08:01'),(59,'asdfasd','',8,'2023-08-24 23:08:09'),(60,'asdasd','',8,'2023-08-24 23:09:06'),(61,'','1692896949728scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:09:09'),(62,'asdasd','',8,'2023-08-24 23:09:16'),(63,'asdasd','1692896999710scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:09:59'),(64,'asdasd','',8,'2023-08-24 23:10:02'),(66,'','',8,'2023-08-24 23:10:22'),(67,'','1692897027154scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:10:27'),(68,'asdas','',8,'2023-08-24 23:10:48'),(69,'asdasd','1692897053608scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:10:53'),(70,'','',8,'2023-08-24 23:10:56'),(71,'asdasd','',8,'2023-08-24 23:11:03'),(72,'asdasdas','',8,'2023-08-24 23:11:28'),(73,'','1692897092408scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:11:32'),(74,'asdasd','',8,'2023-08-24 23:11:36'),(75,'','',8,'2023-08-24 23:11:41'),(76,'asdasdasd','',8,'2023-08-24 23:12:18'),(77,'','1692897142652scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:12:22'),(78,'asdasdasd','',8,'2023-08-24 23:12:30'),(79,'','',8,'2023-08-24 23:12:37'),(80,'','',8,'2023-08-24 23:12:42'),(81,'','1692897290071scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:14:50'),(82,'asdasd','',8,'2023-08-24 23:14:52'),(83,'asdasd','',8,'2023-08-24 23:14:55'),(84,'','',8,'2023-08-24 23:14:58'),(85,'asdasd','',8,'2023-08-24 23:17:00'),(86,'','1692897442200scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:17:22'),(87,'','1692897478807scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:17:58'),(88,'','',8,'2023-08-24 23:23:04'),(89,'','',8,'2023-08-24 23:23:17'),(90,'asdasd','',8,'2023-08-24 23:24:42'),(91,'','',8,'2023-08-24 23:25:42'),(92,'','',8,'2023-08-24 23:25:50'),(93,'','1692898044713scenic-aesthetic-1920x1080-12513.jpg',8,'2023-08-24 23:27:24'),(94,'','',8,'2023-08-24 23:27:29');
/*!40000 ALTER TABLE `poststable` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrelationshiptable`
--

LOCK TABLES `userrelationshiptable` WRITE;
/*!40000 ALTER TABLE `userrelationshiptable` DISABLE KEYS */;
INSERT INTO `userrelationshiptable` VALUES (1,7,6),(2,7,8),(3,9,8),(9,8,9);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertable`
--

LOCK TABLES `usertable` WRITE;
/*!40000 ALTER TABLE `usertable` DISABLE KEYS */;
INSERT INTO `usertable` VALUES (3,'FahimFBA','Md. Fahim Bin Amin','fahimbinamin@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$DdN9PYPP9UdATQNZRX4vo.KiISP/WFtOd7aRJfNpUlqo0CD3IshnC',NULL,NULL),(4,'asda','gsdgherwsd','asd@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$pThl9Iq144PYpJ6VGB1NXOyAi1kASRmD81fqYVEz0FAYPEwhI7EoW',NULL,NULL),(5,'','','',NULL,NULL,NULL,NULL,'$2a$10$exqFrNx9OXws72/cQoS4aeUyOVKAFcFJk2QnCyEhK2vtWObObh30q',NULL,NULL),(6,'testMe','test me Full','test@gmail.com',NULL,NULL,'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',NULL,'$2a$10$xfUFJCHlVH76LqfmGuzfgebdR6uFa4er.fQ7Sh7RpLW1W4IIUsmp6',NULL,NULL),(7,'testMe2','test me Full2','test2@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$r6mqi12DNlBySWESCd.2TukAvEkUrP4x8pUS4y9NBj1rf5cl.WgF2',NULL,NULL),(8,'Jane','Fahim Bin Amin','jane23@gmail.com',NULL,NULL,'1692619066384Introduction To Open Source ( à¦à¦ªà§à¦¨ à¦¸à§à¦°à§à¦¸ à¦¨à¦¿à§à§ à¦ªà¦°à¦¿à¦à¦¿à¦¤à¦¿ à¦®à§à¦²à¦ à¦à¦²à§à¦à¦¨à¦¾ ).png','169261906637678585957_2435762763344830_7944738235358380032_n.jpg','$2a$10$ZU0crC7xwDiJo0LYSH5IbuMDG0u/7sbRV18lhUDPQAllBkr5goEPS','Fahim','Fahim'),(9,'Tester','Test Doe AB','jane21213@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$7ku8vobrFQmQUxnIKY5QZ.P2DzTg4gw3v3i1Gea.Eyl1GRgYxNeGq',NULL,NULL);
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

-- Dump completed on 2023-08-25  3:43:01
