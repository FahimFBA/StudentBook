CREATE TABLE IF NOT EXISTS `videotable` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `video_title` varchar(200) NOT NULL,
  `video_description` varchar(1000) DEFAULT NULL,
  `video_url` varchar(300) NOT NULL,
  `video_embed_url` varchar(300) NOT NULL,
  `video_thumbnail_url` varchar(300) NOT NULL,
  `user_id` int NOT NULL,
  `video_creation_time` datetime NOT NULL,
  PRIMARY KEY (`video_id`),
  UNIQUE KEY `video_id_UNIQUE` (`video_id`),
  KEY `video_user_id_idx` (`user_id`),
  CONSTRAINT `video_user_id` FOREIGN KEY (`user_id`) REFERENCES `usertable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
