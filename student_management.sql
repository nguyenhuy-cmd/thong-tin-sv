-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: student_management
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_code` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `user_id` int DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_94ea28a151d5f49f6bd4833466` (`student_code`),
  KEY `FK_fb3eff90b11bddf7285f9b4e281` (`user_id`),
  CONSTRAINT `FK_fb3eff90b11bddf7285f9b4e281` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'SV001','Nguyá»…n VÄƒn An','2003-05-12','Nam','an.nguyen@gmail.com','0987654321','HÃ  Ná»™i',1,'2026-10-05 15:25:23.143856'),(2,'SV002','Tráº§n Thá»‹ BÃ¬nh','2004-08-22','Ná»¯','binh.tran@gmail.com','0912345678','Háº£i PhÃ²ng',1,'2026-10-05 15:25:23.143856'),(3,'SV003','LÃª HoÃ ng CÆ°á»ng','2002-11-05','Nam','cuong.le@gmail.com','0909123456','ÄÃ  Náºµng',1,'2026-10-05 15:25:23.143856'),(4,'SV004','Pháº¡m Ngá»c Dung','2005-02-14','Ná»¯','dung.pham@gmail.com','0934567890','TP HCM',1,'2026-10-05 15:25:23.143856'),(5,'SV005','HoÃ ng Minh Tuáº¥n','2003-09-30','Nam','tuan.hoang@gmail.com','0976543210','Huáº¿',1,'2026-10-05 15:25:23.143856'),(6,'SV006','VÅ© Thu Tháº£o','2004-12-01','Ná»¯','thao.vu@gmail.com','0965432109','Ninh BÃ¬nh',1,'2026-10-05 15:25:23.143856'),(7,'SV007','Äáº·ng Quá»‘c Äáº¡t','2002-04-18','Nam','dat.dang@gmail.com','0945678901','Nam Äá»‹nh',1,'2026-10-05 15:25:23.143856'),(8,'SV008','BÃ¹i Thá»‹ Lan','2005-07-07','Ná»¯','lan.bui@gmail.com','0981234567','Thanh HÃ³a',1,'2026-10-05 15:25:23.143856'),(9,'SV009','Äá»— XuÃ¢n HÃ¹ng','2003-10-25','Nam','hung.do@gmail.com','0919876543','Nghá»‡ An',1,'2026-10-05 15:25:23.143856'),(10,'SV010','NgÃ´ PhÆ°Æ¡ng Trinh','2004-03-15','Ná»¯','trinh.ngo@gmail.com','0901234987','VÄ©nh PhÃºc',1,'2026-10-05 15:25:23.143856'),(11,'SV011','Phan Thanh Háº£i','2002-08-08','Nam','hai.phan@gmail.com','0932145678','Quáº£ng Ninh',1,'2026-10-05 15:25:23.143856'),(12,'SV012','LÃ½ Cáº©m TÃº','2005-11-20','Ná»¯','tu.ly@gmail.com','0978563412','Báº¯c Ninh',1,'2026-10-05 15:25:23.143856'),(13,'SV013','TrÆ°Æ¡ng Trá»ng NghÄ©a','2003-01-09','Nam','nghia.truong@gmail.com','0963258741','ThÃ¡i BÃ¬nh',1,'2026-10-05 15:25:23.143856'),(14,'SV014','Äinh Mai PhÆ°Æ¡ng','2004-06-16','Ná»¯','phuong.dinh@gmail.com','0941238569','Cáº§n ThÆ¡',1,'2026-10-05 15:25:23.143856'),(15,'SV015','LÆ°u VÄƒn TÃ¹ng','2002-09-02','Nam','tung.luu@gmail.com','0984561237','BÃ¬nh DÆ°Æ¡ng',1,'2026-10-05 15:25:23.143856'),(16,'SV016','ChÃ¢u Ãi TiÃªn','2005-04-10','Ná»¯','tien.chau@gmail.com','0917894562','Äá»“ng Nai',1,'2026-10-05 15:25:23.143856'),(17,'SV017','Há»“ ChÃ­ Thanh','2003-12-28','Nam','thanh.ho@gmail.com','0904567891','VÅ©ng TÃ u',1,'2026-10-05 15:25:23.143856'),(18,'SV018','DÆ°Æ¡ng BÃ­ch Ngá»c','2004-05-19','Ná»¯','ngoc.duong@gmail.com','0937418529','LÃ¢m Äá»“ng',1,'2026-10-05 15:25:23.143856'),(19,'SV019','Trá»‹nh Há»¯u Khoa','2002-02-24','Nam','khoa.trinh@gmail.com','0971592634','Quáº£ng Nam',1,'2026-10-05 15:25:23.143856'),(20,'SV020','Máº¡ch Báº£o UyÃªn','2005-08-31','Ná»¯','uyen.mach@gmail.com','0969874123','KhÃ¡nh HÃ²a',1,'2026-10-05 15:25:23.143856');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$10$gbcTochSoOupgzA05PLucOweRbzIX0NFhQ0L5spZnWQzUvuXZyigy','admin@gmail.com','admin','2026-10-05 14:50:13.145274','2026-10-05 14:50:13.145274'),(2,'huy','$2b$10$H929zdXp8EqdLMzp/XUJEehra1Exj9dT6rbpQ7TjNcpoctRfrfwS.','huy@gmail.com','user','2026-10-05 15:22:58.750058','2026-10-05 15:22:58.750058');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-05 15:25:34
