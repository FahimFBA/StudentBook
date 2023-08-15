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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentstable`
--

LOCK TABLES `commentstable` WRITE;
/*!40000 ALTER TABLE `commentstable` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likestable`
--

LOCK TABLES `likestable` WRITE;
/*!40000 ALTER TABLE `likestable` DISABLE KEYS */;
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
  `user_id` int NOT NULL,
  `post_creation_time` datetime DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poststable`
--

LOCK TABLES `poststable` WRITE;
/*!40000 ALTER TABLE `poststable` DISABLE KEYS */;
INSERT INTO `poststable` VALUES (1,'this is a post',NULL,3,NULL),(2,'this is another post',NULL,6,NULL),(3,'from user 7',NULL,7,NULL),(4,'asdasd',NULL,6,NULL),(5,'asdasdas',NULL,7,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrelationshiptable`
--

LOCK TABLES `userrelationshiptable` WRITE;
/*!40000 ALTER TABLE `userrelationshiptable` DISABLE KEYS */;
INSERT INTO `userrelationshiptable` VALUES (1,7,6);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertable`
--

LOCK TABLES `usertable` WRITE;
/*!40000 ALTER TABLE `usertable` DISABLE KEYS */;
INSERT INTO `usertable` VALUES (3,'FahimFBA','Md. Fahim Bin Amin','fahimbinamin@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$DdN9PYPP9UdATQNZRX4vo.KiISP/WFtOd7aRJfNpUlqo0CD3IshnC'),(4,'asda','gsdgherwsd','asd@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$pThl9Iq144PYpJ6VGB1NXOyAi1kASRmD81fqYVEz0FAYPEwhI7EoW'),(5,'','','',NULL,NULL,NULL,NULL,'$2a$10$exqFrNx9OXws72/cQoS4aeUyOVKAFcFJk2QnCyEhK2vtWObObh30q'),(6,'testMe','test me Full','test@gmail.com',NULL,NULL,'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',NULL,'$2a$10$xfUFJCHlVH76LqfmGuzfgebdR6uFa4er.fQ7Sh7RpLW1W4IIUsmp6'),(7,'testMe2','test me Full2','test2@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$r6mqi12DNlBySWESCd.2TukAvEkUrP4x8pUS4y9NBj1rf5cl.WgF2');
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

-- Dump completed on 2023-08-15 21:16:26
