-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2024 at 07:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ods`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `ownerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `pet` varchar(255) DEFAULT NULL,
  `petId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `veterinarian` varchar(255) DEFAULT NULL,
  `veterinarianId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` datetime DEFAULT NULL,
  `scheduleStart` time DEFAULT NULL,
  `scheduleEnd` time DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `condition_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `documentation` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`documentation`)),
  `medication` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`medication`)),
  `internal_observation` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `owner`, `ownerId`, `status`, `pet`, `petId`, `veterinarian`, `veterinarianId`, `date`, `scheduleStart`, `scheduleEnd`, `observation`, `condition_name`, `description`, `documentation`, `medication`, `internal_observation`, `rating`, `createdAt`, `updatedAt`) VALUES
('1980bf0b-7cb4-4577-a942-30c44423ee20', 'Stella Cartpenter', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'no attempt', 'shephard', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', 'Sahil Mangukiya', '6bf408b9-f6fa-42f5-aaf2-6ae5abe2ebda', '2024-04-13 00:00:00', '11:41:00', '12:41:00', 'cvxbbvbvb', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 06:11:14', '2024-04-15 13:11:00'),
('232dd6bd-ca3e-4a68-b4a0-185232b9130c', 'Darshit Gajera', '556260e9-bba3-4521-8365-e6fbb1b53da2', 'complete', 'Tommy', '2ff926d9-5991-4fb8-91b5-ab2872612f64', 'Darshit lachak', '409b9e7c-45ca-4c9e-8fc8-1dc3de06e0c7', '2024-01-09 00:00:00', '10:07:00', '11:07:00', 'asdsadasdas', 'Tommy', '<p>dasdasdsadsa</p>', '[{\"SAHIL PRAVINBHAI MANGUKIYA.pdf\":\"http://localhost:2000/profile/appointment/SAHIL PRAVINBHAI MANGUKIYA.pdf\"}]', '\"[{\\\"intake\\\":\\\"12\\\",\\\"Name\\\":\\\"test 1\\\",\\\"frequency\\\":\\\"34\\\"}]\"', 'adasdasd', 5, '2024-01-08 12:37:57', '2024-01-08 12:41:16'),
('25bb5cc7-3866-498d-a1ef-d280920b82be', 'Banjo Don', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', 'pending', 'Bobby', 'f2b7fcc7-85d2-4672-8155-b215cb24163c', 'Darshit lachak', '409b9e7c-45ca-4c9e-8fc8-1dc3de06e0c7', '2024-04-26 00:00:00', '18:36:00', '23:36:00', 'adsasd', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-12 13:06:09', '2024-04-12 13:06:09'),
('289d3494-3568-45ca-9e5a-6cd109c30a04', 'Banjo Don', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', 'no attempt', 'Bobby', 'f2b7fcc7-85d2-4672-8155-b215cb24163c', 'Ankit Pansheriya', '4f44964a-478d-4a5b-b158-a990ec55d3e5', '2024-04-17 00:00:00', '09:47:00', '13:47:00', 'dasdad', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-01 16:18:04', '2024-04-18 14:17:00'),
('2b9d66e2-1d22-4ee6-bafe-d443c966d242', 'Darshit Gajera', '556260e9-bba3-4521-8365-e6fbb1b53da2', 'no attempt', 'Tommy', '2ff926d9-5991-4fb8-91b5-ab2872612f64', 'Demo Doctor', '998fe165-7c9b-4525-acb2-c8ac181713cc', '2024-04-22 00:00:00', '00:32:00', '00:32:00', '', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 07:02:59', '2024-04-22 07:01:53'),
('483e3bf1-bb09-4ae1-853a-e1df7d52a7ea', 'ram ram', '6b86bfab-80f9-4b2a-b18c-cff6488155f2', 'no attempt', 'demo', 'dd9596fc-d51e-4d8f-950e-41055fc30d8e', 'Ram Hands', '1b5d9cee-add2-4063-add3-cd0bf59f77e0', '2024-04-13 00:00:00', '01:10:00', '02:10:00', 'test', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 06:54:57', '2024-04-13 06:54:58'),
('4ce45c34-63be-4b02-99f6-45488a8399f9', 'Jayesh Baldha', '652847f6-367c-4701-b78d-00e44e239f76', 'complete', 'Happy', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', 'test doctor', '714583f4-1106-4ee7-bfed-405e65880f93', '2024-04-22 00:00:00', '12:36:00', '15:35:00', '', 'das', '<p>asdasd</p>', '[{\"favicon1.png\":\"http://localhost:2000/profile/appointment/favicon1.png\"}]', '[{\"intake\":\"1\",\"Name\":\"test3\",\"frequency\":\"2\"}]', 'asda', 5, '2024-04-13 07:05:28', '2024-04-15 13:49:27'),
('4d50d50b-4a1b-48f3-9203-3ce88d363e7b', 'Banjo Don', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', 'no attempt', 'Bobby', 'f2b7fcc7-85d2-4672-8155-b215cb24163c', 'Darshit lachak', '409b9e7c-45ca-4c9e-8fc8-1dc3de06e0c7', '2024-04-12 00:00:00', '01:09:00', '06:08:00', '', 'sad', '<p>dsa</p>', '[{\"favicon1.png\":\"http://localhost:2000/profile/appointment/favicon1.png\"}]', '[{\"intake\":\"1\",\"Name\":\"test3\",\"frequency\":\"4\"}]', 'adas', 3, '2024-04-10 15:27:15', '2024-04-12 06:38:00'),
('501689b1-edea-4a8f-811f-35664a1a5333', 'ram ram', '6b86bfab-80f9-4b2a-b18c-cff6488155f2', 'no attempt', 'demo', 'dd9596fc-d51e-4d8f-950e-41055fc30d8e', 'Ankit Pansheriya', '4f44964a-478d-4a5b-b158-a990ec55d3e5', '2024-04-13 00:00:00', '09:52:00', '13:49:00', '', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-12 16:19:49', '2024-04-15 14:19:00'),
('57eb732c-ba13-4a25-bcd0-4b5a639952c5', 'Stella Cartpenter', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'no attempt', 'Sabrina', 'a748064a-a14c-4775-b331-5df435538b1f', 'Ankit Pansheriya', '4f44964a-478d-4a5b-b158-a990ec55d3e5', '2024-04-13 00:00:00', '11:31:00', '00:31:00', 'cxzvcvcxvcxvcxv', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 06:01:57', '2024-04-13 06:01:58'),
('5d8650ad-881f-4c39-975c-693dc2251bdb', 'Stella Cartpenter', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'pending', 'shephard', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', 'Mahima Gnadhi', '9685a358-e663-4a33-8d8e-5fb483015c4c', '2024-05-02 00:00:00', '00:30:00', '16:30:00', '', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 07:00:45', '2024-04-13 07:00:45'),
('63c506cd-ae81-40d1-9c44-0c90fcf8897d', 'Darshit Gajera', '556260e9-bba3-4521-8365-e6fbb1b53da2', 'no attempt', 'Tommy', '2ff926d9-5991-4fb8-91b5-ab2872612f64', 'Darshit lachak', '409b9e7c-45ca-4c9e-8fc8-1dc3de06e0c7', '2024-04-13 00:00:00', '10:48:00', '11:49:00', 'jhkjhkjhkhjkhjk', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 05:18:51', '2024-04-15 12:55:18'),
('63f99254-6695-4db7-999c-64833ccb7d3a', 'Darshit Gajera', '556260e9-bba3-4521-8365-e6fbb1b53da2', 'pending', 'Tommy', '', 'Ankit Pansheriya', '4f44964a-478d-4a5b-b158-a990ec55d3e5', '2024-03-30 00:00:00', '18:36:00', '23:36:00', 'DASDA', NULL, NULL, NULL, NULL, NULL, 0, '2024-03-30 13:03:48', '2024-03-30 13:21:05'),
('70a633f5-def7-4b11-825f-b75e3fecd344', 'Banjo Don', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', 'complete', 'Bobby', 'f2b7fcc7-85d2-4672-8155-b215cb24163c', 'Ankit Pansheriya', '4f44964a-478d-4a5b-b158-a990ec55d3e5', '2024-10-29 00:00:00', '11:58:00', '15:58:00', '', 'asd', '<p>asd</p>', '[]', '[{\"intake\":\"1\",\"Name\":\"test3\",\"frequency\":\"2\"}]', 'adsadsd', 5, '2024-04-13 07:02:35', '2024-04-22 07:05:29'),
('720dcece-ec3b-4a43-8fdc-d1952f037d1a', 'Stella Cartpenter', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'pending', 'Sabrina', 'a748064a-a14c-4775-b331-5df435538b1f', 'Ankit Pansheriya', '4f44964a-478d-4a5b-b158-a990ec55d3e5', '2024-04-13 00:00:00', '06:26:00', '18:30:00', '', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-12 12:56:35', '2024-04-12 12:56:35'),
('860b40f1-4e72-4c72-ae23-601f1e5b2f66', 'Stella Cartpenter', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'pending', 'Sabrina', 'a748064a-a14c-4775-b331-5df435538b1f', 'Ankit Pansheriya', '4f44964a-478d-4a5b-b158-a990ec55d3e5', '2024-04-13 00:00:00', '06:26:00', '18:30:00', '', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-12 12:56:32', '2024-04-12 12:56:32'),
('a650e021-471d-4978-ac60-6df588b761ac', 'Banjo Don', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', 'no attempt', 'Bobby', 'f2b7fcc7-85d2-4672-8155-b215cb24163c', 'Sahil Mangukiya', '6bf408b9-f6fa-42f5-aaf2-6ae5abe2ebda', '2024-04-13 00:00:00', '11:00:00', '12:00:00', ' m  mn,mj,m,mn,n,', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 06:13:15', '2024-04-15 12:55:18'),
('ab4401b2-852e-441d-8c9d-45fb1cf33ec8', 'Stella Cartpenter', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'pending', 'shephard', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', 'Sahil Mangukiya', '6bf408b9-f6fa-42f5-aaf2-6ae5abe2ebda', '2024-04-24 00:00:00', '00:28:00', '15:28:00', '', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 06:58:19', '2024-04-13 06:58:19'),
('bb3b4f4b-b242-433d-aa38-f6ff1b60bcc4', 'Stella Cartpenter', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'complete', 'Sabrina', '', 'adas qweqwe', '1b5d9cee-add2-4063-add3-cd0bf59f77e0', '2024-04-24 00:00:00', '10:06:00', '01:06:00', 'asdad', 'asda', '<p>dasd</p>', '[{\"favicon1.png\":\"http://localhost:2000/profile/appointment/favicon1.png\"}]', '[{\"intake\":\"1\",\"Name\":\"test3\",\"frequency\":\"2\"}]', 'asd', 5, '2024-01-27 04:36:18', '2024-04-10 19:51:20'),
('d10e6fb4-490a-4d4e-8e8b-cfbe0db55087', 'Nikhil Pansheriya', '7434b51e-c2b6-4970-9e6d-66c23da29df2', 'complete', 'Sheru', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', 'Ankit Pansheriya', '4f44964a-478d-4a5b-b158-a990ec55d3e5', '2024-01-09 00:00:00', '08:57:00', '09:57:00', 'dasdasda', 'shery', '<p>adasdasd</p>', '[{\"issue.pdf\":\"http://localhost:2000/profile/appointment/issue.pdf\"}]', '\"[{\\\"intake\\\":\\\"12\\\",\\\"Name\\\":\\\"test3\\\",\\\"frequency\\\":\\\"12\\\"},{\\\"intake\\\":\\\"1\\\",\\\"Name\\\":\\\"test 1\\\",\\\"frequency\\\":\\\"10\\\"}]\"', 'adasdasdas', 5, '2024-01-08 12:27:21', '2024-01-08 12:29:30'),
('d41134f6-aad9-463a-85e1-986899d49cb1', 'Stella Cartpenter', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'pending', 'shephard', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', 'Darshit lachak', '409b9e7c-45ca-4c9e-8fc8-1dc3de06e0c7', '2024-04-12 00:00:00', '18:24:00', '18:24:00', 'asd', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-12 12:54:59', '2024-04-12 12:54:59'),
('e45da023-84ea-494c-9fed-b1c4798632f8', 'Rahul Lathiya', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', 'complete', 'Leila', '', 'Demo Doctor', '998fe165-7c9b-4525-acb2-c8ac181713cc', '2024-04-25 00:00:00', '00:33:00', '15:33:00', '', 'asd', '<p>asda</p>', '[{\"darshit.jpg\":\"http://localhost:2000/profile/appointment/darshit.jpg\"}]', '[{\"intake\":\"1\",\"Name\":\"test3\",\"frequency\":\"12\"}]', 'asda', 5, '2024-04-13 07:03:20', '2024-04-22 07:07:43'),
('e5e45d65-07eb-4415-912a-b70adf8f57b8', 'Stella Cartpenter', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'no attempt', 'shephard', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', 'Ankit Pansheriya', '4f44964a-478d-4a5b-b158-a990ec55d3e5', '2024-04-20 00:00:00', '06:35:00', '06:35:00', '', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-12 13:05:37', '2024-04-22 07:05:00'),
('e9fdb8f6-94f9-4511-84ec-b6c744e98966', 'Rahul Lathiya', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', 'pending', 'shephard', 'd0566845-3c8e-4ed9-8191-17dbfd6896a8', 'test doctor', '714583f4-1106-4ee7-bfed-405e65880f93', '2024-05-01 00:00:00', '12:29:00', '17:29:00', 'asd', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 06:59:17', '2024-04-13 06:59:17'),
('f0dbd8f7-7d79-4fb1-84a3-4e199e4eb277', 'Banjo Don', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', 'no attempt', 'Bobby', 'f2b7fcc7-85d2-4672-8155-b215cb24163c', 'Sahil Mangukiya', '6bf408b9-f6fa-42f5-aaf2-6ae5abe2ebda', '2024-04-17 00:00:00', '01:00:00', '02:01:00', 'dfbgfdghdfgdgdfg', NULL, NULL, NULL, NULL, NULL, 0, '2024-04-13 06:31:10', '2024-04-17 04:36:31');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`, `createdAt`, `updatedAt`) VALUES
('18ace408-d0bd-4a47-9542-d15fa6209d2c', 'medicine1', '2023-11-21 11:03:18', '2024-01-23 06:17:03'),
('b0a8bc9a-74a3-4b45-8356-b3216b414b94', 'youngster', '2023-11-06 09:16:10', '2024-04-13 06:52:19'),
('bd837952-96a6-42f6-ab39-ab7e5bf8c38c', 'test', '2024-01-23 06:51:31', '2024-01-23 06:51:31'),
('bddabedd-b3bd-4173-aa4e-47b184ab4282', 'Rabies ', '2023-11-21 11:46:59', '2023-12-13 06:34:47'),
('bf6e57d4-2a35-4a8b-bbd9-f99e422f50fa', 'sahil', '2024-01-23 06:51:19', '2024-01-23 06:51:19'),
('da37f5d9-e5a2-47b1-8e44-690383b1f982', 'category4', '2023-11-21 11:58:51', '2023-11-21 11:58:51'),
('f437953e-2480-44de-8ae2-5797834e4c57', 'category3', '2023-11-21 11:58:46', '2023-11-21 11:58:46'),
('fce9827c-55fa-4231-85ce-c9ade683d9ed', 'Parents', '2023-11-21 10:08:25', '2023-11-21 10:08:25');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `productId`, `stock`, `reason`, `createdAt`, `updatedAt`) VALUES
('12c30147-6f97-401f-a85a-4857e70ccdbf', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, 'das', '2024-04-11 11:13:22', '2024-04-11 11:13:22'),
('1b2406d9-bff7-4d5b-a029-ec4e559012f6', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 200, 'new', '2024-04-11 13:51:24', '2024-04-11 13:51:24'),
('30a5543a-5f40-4ff1-9af6-b9744e723446', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 100, 'New Stock Update', '2023-12-14 10:25:16', '2023-12-14 10:25:16'),
('36a7cff2-0eef-42d7-876e-d2e9474f7ce9', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, '0', '2024-04-11 13:54:32', '2024-04-11 13:54:32'),
('36fe3139-a714-4778-a151-ffcbd75f87f8', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, 'asd', '2024-04-11 13:46:34', '2024-04-11 13:46:34'),
('4720e2c5-6b0f-449d-b73f-6a2794e79083', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, 'das', '2024-04-11 13:58:04', '2024-04-11 13:58:04'),
('5dd03582-4e05-4293-b653-c53b86cda4ed', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, '', '2024-04-11 11:07:41', '2024-04-11 11:07:41'),
('63824a18-65df-427a-987c-6a5503222b87', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, 'new ', '2024-04-11 13:46:25', '2024-04-11 13:46:25'),
('772e82a2-66e5-4ac5-8ffc-ad43c9ad2f12', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 100, '100 Stock Added', '2023-12-14 10:30:42', '2023-12-14 10:30:42'),
('817a55b8-c8c2-4e3c-862a-0b127e561b60', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, '', '2024-04-11 11:07:33', '2024-04-11 11:07:33'),
('8899440c-d856-4c90-a160-8f2c9115f0b5', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, 'Test', '2023-12-14 10:33:02', '2023-12-14 10:33:02'),
('97a71d69-3a2e-4c95-aaec-67846c9aeecb', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, 'Test', '2023-12-14 10:32:50', '2023-12-14 10:32:50'),
('a3a64785-deee-4a90-bf48-8fab6350a627', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, 'new', '2024-04-11 13:51:33', '2024-04-11 13:51:33'),
('c4bfacaa-01b1-4988-ba2b-154acc414f27', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 0, 'dsa', '2024-04-11 13:54:22', '2024-04-11 13:54:22'),
('c7fa93e3-91b6-4b43-b7ec-378363fe8ab4', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 10, 'dsa', '2024-04-11 13:49:39', '2024-04-11 13:49:39'),
('dc2b0a10-6011-40e1-a38a-9a14f13acc2d', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 100, '100 stock added', '2023-12-14 10:31:26', '2023-12-14 10:31:26'),
('dfd1bdde-59b1-4c12-9e01-68871f4ef614', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 100, 'sda', '2024-04-11 13:55:34', '2024-04-11 13:55:34'),
('ff8f572a-ba9c-4bb4-bad6-347e5e79d7bc', '3efce28e-ef8a-43ed-8921-90eb4823df5e', 200, 'neew', '2024-04-11 13:59:01', '2024-04-11 13:59:01');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `phone_1` bigint(20) DEFAULT NULL,
  `phone_2` bigint(20) NOT NULL,
  `doc_identity` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `name`, `dob`, `surname`, `phone_1`, `phone_2`, `doc_identity`, `email`, `address`, `department`, `district`, `createdAt`, `updatedAt`) VALUES
('0071cb1e-afb6-4c49-a467-fc0edcecd1fb', 'Hiren', '2010-10-26 00:00:00', 'jaiswal', 8855223366, 9874563210, '32154', 'hiren@gmail.com', '72, hip lisa', 'amaxona', 'PUEBLO NUEVO', '2023-11-06 08:48:44', '2023-11-30 07:02:45'),
('17434425-6268-4bc7-8dd2-e1685c16b874', 'Jhon', '1993-06-21 00:00:00', 'Doe', 6548231970, 3928174560, '3695', 'jhon@gmail.com', 'asdas', 'PASCO', 'PAUCAR', '2024-01-09 10:41:27', '2024-01-09 10:41:27'),
('556260e9-bba3-4521-8365-e6fbb1b53da2', 'Darshit', '2001-11-26 00:00:00', 'Gajera', 9632587410, 0, '95632', 'darshit@gmail.com', '123, hugos st. ', NULL, 'PAMPAROMAS', '2023-11-28 05:19:28', '2023-11-28 05:19:28'),
('652847f6-367c-4701-b78d-00e44e239f76', 'Jayesh', '1988-04-04 00:00:00', 'Baldha', 7894562310, 0, '856966', 'jayesh@gmail.com', '34, baldha mansion', 'ANCASH', 'PAMPAROMAS', '2023-11-28 10:03:01', '2023-11-28 10:04:29'),
('6b86bfab-80f9-4b2a-b18c-cff6488155f2', 'ram', '1995-06-15 00:00:00', 'ram', 8521479630, 0, '85236', 'ram@gmail.com', 'st done', 'ANCASH', 'CAJACAY', '2024-04-10 14:06:08', '2024-04-12 12:09:16'),
('7434b51e-c2b6-4970-9e6d-66c23da29df2', 'Nikhil', '2023-10-26 00:00:00', 'Pansheriya', 9607795786, 0, '456987', 'nikhil@gmail.com', '92, gaso st. viso lia state', 'amaxona', 'SALAVERRY', '2023-11-05 14:22:48', '2023-11-28 06:47:01'),
('9f328fdd-5389-404f-aec8-b652a0e353e0', 'Stella', '1999-08-24 00:00:00', 'Cartpenter', 3571968240, 9173865400, '1478', 'stella@gmail.com', 'stc', 'LIMA', 'MAGDALENA DEL MAR', '2024-01-09 10:40:19', '2024-01-09 10:40:19'),
('a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', 'Banjo', '1994-10-22 00:00:00', 'Don', 9764312580, 9137826450, '648235', 'banjo@gmail.com', 'asdad', 'HUANCAVELICA', 'TICRAPO', '2024-01-09 10:38:58', '2024-01-09 10:38:58'),
('bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', 'Rahul', '1980-06-15 00:00:00', 'Lathiya', 9856321470, 7845123690, '9856312', 'rahulL@gmail.com', 'dsaasd', 'ANCASH', 'CAJACAY', '2024-01-09 10:35:37', '2024-01-09 10:35:37'),
('dd41ceea-d877-42b9-82ff-5d33b7ac011a', 'Umesh', '1990-04-09 00:00:00', 'Davra', 8523697410, 1478523690, '83125', 'davra@gmail.com', 'st sums.', 'AREQUIPA', 'ORCOPAMPA', '2024-01-09 10:36:39', '2024-01-09 10:36:39'),
('feb73959-bf55-44d6-80c3-929f9ecdfbcc', 'Brian', '1989-10-13 00:00:00', 'Occoner', 7755336699, 9988774411, '3561', 'brian@gmail.com', 'dasdsadas', 'CALLAO', 'BELLAVISTA', '2024-01-09 10:42:53', '2024-04-10 14:01:50');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `payment_no` int(11) DEFAULT NULL,
  `transfer_no` int(11) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `doctor` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `final_amount` int(11) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `payment_no`, `transfer_no`, `owner`, `doctor`, `service`, `amount`, `discount`, `final_amount`, `payment_method`, `description`, `createdAt`, `updatedAt`) VALUES
('2c02bef4-e465-47c1-ba76-1df3bd87374e', 2, 3692, 'Darshit Gajera', 'Ankit  Pansheriya', 'therapy', 2000, 30, 1400, 'cash', 'i am say a big thank you for giving a best treatment ', '2023-10-30 10:32:00', '2023-12-15 10:59:34'),
('37dad9a2-620d-4751-b9ac-ffa92b7ecde7', 1, 9632, 'Jayesh Baldha', 'meta test1', 'therapy', 2000, 20, 1600, 'debit card', 'i am say a big thank you for giving a best treatment ', '2023-11-03 13:59:46', '2023-12-15 10:59:21'),
('5efa4805-06d5-4be1-b4bb-3fc027781e20', 3, 8520, 'Nikhil Pansheriya', 'meta test1', 'therapy', 2000, 20, 1600, 'credit card', 'i am say a big thank you for giving a best treatment ', '2023-10-29 06:43:51', '2023-12-16 05:08:15'),
('6c6fec5c-dc95-428d-93f4-ae40a5c6bcaf', 2112, 2121, 'Jhon Doe', 'adas qweqwe', '12', 51, 25, 38, 'credit card', 'sadadsa', '2024-01-17 10:16:22', '2024-04-11 12:21:04'),
('cdae762a-d822-403a-9c90-28f772afe470', 4, 7539, 'Hiren jaiswal', 'Ankit  Pansheriya', 'therapy', 2000, 20, 1600, 'cash', 'i am say a big thank you for giving a best treatment ', '2023-12-15 08:24:58', '2023-12-16 05:08:22'),
('d8bb06df-43d1-420e-89b2-9cce51489048', 5, 7853, 'Hiren jaiswal', 'Ankit  Pansheriya', 'Body Check Up', 2497, 10, 2247, 'cash', 'for body checkup', '2023-12-15 10:42:39', '2024-04-11 12:21:57');

-- --------------------------------------------------------

--
-- Table structure for table `petinfos`
--

CREATE TABLE `petinfos` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `PetId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `qrImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `petinfos`
--

INSERT INTO `petinfos` (`id`, `PetId`, `pdf`, `qrImage`, `createdAt`, `updatedAt`) VALUES
('16299bd0-8b25-43d6-a9a5-d3e76f839f59', '65e03543-3f66-4610-9cc5-ab7516de39ac', 'http://localhost:2000pet_summary_ef58c6fd-1669-4bda-a955-77ef7d8e6baf.pdf', 'http://localhost:2000qr_code_ef58c6fd-1669-4bda-a955-77ef7d8e6baf.png', '2023-11-10 07:28:58', '2023-11-10 07:28:58'),
('2285ca66-7ae6-4f3d-9436-90434e1e1895', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', 'http://localhost:2000/pet_summary_05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4.pdf', 'http://localhost:2000/qr_code_05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4.png', '2024-03-28 07:22:18', '2024-04-15 14:33:46'),
('5c917b36-1418-4804-9478-cbcf6a1bef0c', 'd0566845-3c8e-4ed9-8191-17dbfd6896a8', 'http://localhost:2000/pet_summary_d0566845-3c8e-4ed9-8191-17dbfd6896a8.pdf', 'http://localhost:2000/qr_code_d0566845-3c8e-4ed9-8191-17dbfd6896a8.png', '2024-04-15 14:33:37', '2024-04-15 14:33:37'),
('6b167bed-a492-4b6b-b218-b1d5df0a0e44', '3c6f6663-2406-4168-8cc2-71fddea47fd9', 'http://localhost:2000/pet_summary_3c6f6663-2406-4168-8cc2-71fddea47fd9.pdf', 'http://localhost:2000/qr_code_3c6f6663-2406-4168-8cc2-71fddea47fd9.png', '2024-05-11 10:00:35', '2024-05-11 10:00:35'),
('7fda0e3d-fefc-4af9-89c1-990319a8dbc3', '4f0012a4-e324-406f-a9a3-6336db14333a', 'http://localhost:2000pet_summary_ef58c6fd-1669-4bda-a955-77ef7d8e6baf.pdf', 'http://localhost:2000qr_code_ef58c6fd-1669-4bda-a955-77ef7d8e6baf.png', '2023-11-10 07:25:54', '2023-11-10 07:25:54'),
('e1be7340-4d46-4696-97c1-c5aff22ea762', '3d032862-c7d3-43a7-8e69-0e5fdb9f704b', 'http://localhost:2000/pet_summary_3d032862-c7d3-43a7-8e69-0e5fdb9f704b.pdf', 'http://localhost:2000/qr_code_3d032862-c7d3-43a7-8e69-0e5fdb9f704b.png', '2024-03-28 16:52:22', '2024-04-15 14:44:53'),
('f16bade5-4d79-4b2b-90f6-5a5996e0bcd9', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', 'http://localhost:2000/pet_summary_da4027e9-359f-44a2-a35a-2a5ef7b8205c.pdf', 'http://localhost:2000/qr_code_da4027e9-359f-44a2-a35a-2a5ef7b8205c.png', '2024-03-30 04:06:34', '2024-03-30 04:06:49'),
('f4a5a239-ef8e-4063-9a1c-c568952f0f5e', 'a748064a-a14c-4775-b331-5df435538b1f', 'http://localhost:2000/pet_summary_a748064a-a14c-4775-b331-5df435538b1f.pdf', 'http://localhost:2000/qr_code_a748064a-a14c-4775-b331-5df435538b1f.png', '2024-03-30 08:04:00', '2024-03-30 08:04:00');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ownerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `Species` varchar(255) DEFAULT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `hair` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `exploration` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `petId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `ownerId`, `name`, `owner`, `sex`, `dob`, `age`, `Species`, `breed`, `hair`, `color`, `status`, `exploration`, `createdAt`, `updatedAt`, `petId`) VALUES
('05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'shephard', 'Stella Cartpenter', 'Hembra', '2023-11-09 00:00:00', 1, 'Dog', 'asdsa', 'asdsa', 'asda', NULL, NULL, '2023-12-18 05:45:25', '2024-04-10 20:02:37', NULL),
('2ff926d9-5991-4fb8-91b5-ab2872612f64', '556260e9-bba3-4521-8365-e6fbb1b53da2', 'Tommy', 'Darshit Gajera', 'Macho', '2022-11-03 00:00:00', 1, 'Dog', 'pitbull', 'black', 'black', NULL, NULL, '2023-11-30 09:40:35', '2023-12-04 07:10:30', NULL),
('3c6f6663-2406-4168-8cc2-71fddea47fd9', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', 'Pinky', 'Rahul Lathiya', 'Hembra', '2023-01-01 00:00:00', 15, 'Pig', 'adas', 'dsad', 'dasd', NULL, NULL, '2024-01-09 12:55:49', '2024-04-16 10:30:35', NULL),
('551b4311-e60a-4bf4-934d-0967e9763b77', '17434425-6268-4bc7-8dd2-e1685c16b874', 'sad', 'Jhon Doe', 'Macho', '2020-01-01 00:00:00', 4, 'asd', NULL, NULL, 'sad', NULL, NULL, '2024-04-16 10:28:58', '2024-04-16 10:28:58', NULL),
('a748064a-a14c-4775-b331-5df435538b1f', '9f328fdd-5389-404f-aec8-b652a0e353e0', 'Sabrina', 'Stella Cartpenter', 'Macho', '2021-01-16 00:00:00', 2, 'Cat', 'ds', 'sada', 'dsd', NULL, NULL, '2024-01-09 12:54:11', '2024-01-09 12:54:52', NULL),
('d0566845-3c8e-4ed9-8191-17dbfd6896a8', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', 'shephard', 'Rahul Lathiya', 'Hembra', '2023-11-09 00:00:00', 0, 'Dog', 'asdsa', 'asdsa', 'asda', NULL, NULL, '2024-01-09 11:00:34', '2024-04-10 19:58:45', NULL),
('da4027e9-359f-44a2-a35a-2a5ef7b8205c', '652847f6-367c-4701-b78d-00e44e239f76', 'Happy', 'Jayesh Baldha', 'Macho', '2018-08-27 00:00:00', 5, 'Dog', 'husky', 'straight', 'white', NULL, NULL, '2023-11-30 12:31:58', '2023-12-04 10:32:01', NULL),
('dd9596fc-d51e-4d8f-950e-41055fc30d8e', '6b86bfab-80f9-4b2a-b18c-cff6488155f2', 'demo', 'ram ram', 'Macho', '2009-01-01 00:00:00', 3, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-10 20:00:46', '2024-04-16 10:30:07', NULL),
('e8e59647-e108-476b-833d-c040776f840d', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', 'Leila', 'Rahul Lathiya', 'Hembra', '2023-01-01 00:00:00', 1, 'Cow', 'asd', 'asd', 'asd', NULL, NULL, '2024-01-09 12:56:25', '2024-04-16 10:30:15', NULL),
('ef58c6fd-1669-4bda-a955-77ef7d8e6baf', '0071cb1e-afb6-4c49-a467-fc0edcecd1fb', 'Same', 'Hiren Jaiswal', 'Hembra', '2021-06-22 00:00:00', 2, 'Dog', 'German Shephard', 'straight', 'Brown', NULL, NULL, '2023-11-07 06:27:19', '2023-12-04 07:10:10', NULL),
('f2b7fcc7-85d2-4672-8155-b215cb24163c', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', 'Bobby', 'Banjo Don', 'Hembra', '2022-05-19 00:00:00', 1, 'Horse', 'das', 'dasd', 'dsad', NULL, NULL, '2024-01-09 12:53:35', '2024-01-09 12:55:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `categoryId` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `composition` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `presentation` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `laboratory` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `categoryId`, `category`, `product`, `brand`, `composition`, `stock`, `status`, `sku`, `presentation`, `price`, `laboratory`, `description`, `reason`, `createdAt`, `updatedAt`) VALUES
('3efce28e-ef8a-43ed-8921-90eb4823df5e', '18ace408-d0bd-4a47-9542-d15fa6209d2c', 'Children', 'Paracetamol 500mg Tableta', 'EJEMPLO DE MARCA', 'Paracetamol 500mg', 200, 'active', 'asda', '02694001', 10, 'dsad', 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.Lorem simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum es de re', 'neew', '2023-12-13 10:07:57', '2024-04-11 13:59:01'),
('4e126060-98ac-4c6b-b3b8-603d3c4a6a98', 'b0a8bc9a-74a3-4b45-8356-b3216b414b94', 'youngster', 'test3', 'new', 'test', 300, 'active', '78945', '30mg', 20, 'test', 'testing new', '', '2023-11-06 09:16:41', '2024-04-13 06:52:19'),
('a1b950dd-33c8-4c4d-aa47-0f248779ee97', '64de61b0-56ef-429b-a89e-fea2298f1d45', 'Rabies', 'test 2', NULL, 'test', 90, 'active', '123345', 'test', 35, 'test', 'testing 12314', '', '2023-11-04 11:26:24', '2024-04-11 05:32:11'),
('e87a4427-6bd1-4534-8b6a-a3e1fe8d6129', '64de61b0-56ef-429b-a89e-fea2298f1d45', 'category3', 'test 1', 'test', 'test', 300, 'active', '987650', '20mg', 40, 'test', 'testing 78', '', '2023-11-04 13:06:02', '2023-12-13 11:23:27');

-- --------------------------------------------------------

--
-- Table structure for table `specialities`
--

CREATE TABLE `specialities` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `speciality` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specialities`
--

INSERT INTO `specialities` (`id`, `speciality`, `createdAt`, `updatedAt`) VALUES
('d4ab3ebb-2fd2-45ca-bbb1-b5356da8cc9b', 'testing', '2023-11-23 06:39:28', '2024-04-13 06:50:21'),
('f9a48e06-1fc2-42da-aa7c-0cb38fede427', 'Medicina General J', '2023-11-23 04:29:27', '2024-04-13 06:53:50'),
('fa8c72e9-7731-4a9b-9b9d-a488f0f15584', 'MBBS', '2023-11-23 04:21:11', '2023-11-23 06:36:05'),
('fb110e77-aba8-4810-891c-c5de61fea9ff', 'Doctor2222', '2023-11-23 04:30:34', '2024-04-13 06:54:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `identification` varchar(255) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isverified` tinyint(1) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `isMasterAdmin` tinyint(1) DEFAULT NULL,
  `isCustomerService` tinyint(1) DEFAULT NULL,
  `emailToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `profile`, `identification`, `phone`, `email`, `password`, `isverified`, `isAdmin`, `isMasterAdmin`, `isCustomerService`, `emailToken`, `createdAt`, `updatedAt`) VALUES
('10b059c5-5523-41f1-8b97-a94556f7cc33', 'alicia', 'standardAdmin', 'http://localhost:2000/profile/profile/profile-1712209579565.jpg', '121112', 2147483647, 'ankit@gmail.com', 'Ankit@123', 0, 0, 1, 0, NULL, '2024-03-30 10:01:45', '2024-04-16 09:25:18'),
('1b912fd8-1c8e-4a18-a651-90e5ecda1010', 'Darshit Gajera', 'customerService', 'http://localhost:2000/profile/profile/profile-1712207942571.jpeg', '78945321', 2147483647, 'darshit@gmail.com', 'Darshit@123', 0, 0, 0, 0, NULL, '2023-11-20 08:07:13', '2024-04-16 09:25:37'),
('39559667-aae6-4921-b9f8-a11257c507cc', 'asd asd', 'standardAdmin', 'http://localhost:2000/profile/profile/profile-1713455447404.png', '', 0, 'asd@gmail.com', 'asd123', 0, 0, 0, 0, NULL, '2024-04-18 15:50:47', '2024-04-18 15:50:47'),
('44cc74d7-3c97-4172-b9d7-1e9a23e4e51f', 'Sahil Mangukiya', 'masterAdmin', 'http://localhost:2000/profile/profile/profile-1712207983821.jpg', '784583', 2147483647, 'sahilmangukiya566@gmail.com', 'Sahil@1234', 0, 0, 1, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhaGlsbWFuZ3VraXlhNTY2QGdtYWlsLmNvbSIsImlkIjoiNDRjYzc0ZDctM2M5Ny00MTcyLWI5ZDctMWU5YTIzZTRlNTFmIiwiaWF0IjoxNzEyNzI2MzcwLCJleHAiOjE3MTI3MzM1NzB9.q4ZVhL36anudgwi3Ap9mxh9rTP6EGhb_gQShljDHKy0', '2023-11-07 10:56:47', '2024-04-16 09:25:51'),
('784048a5-a61b-46c6-88de-cf085ffb5c07', 'demo', 'customerService', 'http://localhost:2000/profile/profile/profile-1712894756081.png', '', 1234567890, 'demo@gmail.com', 'demo123', 0, 0, 0, 1, NULL, '2024-04-12 04:05:56', '2024-04-16 04:57:21'),
('7c4772c5-c583-4bbf-886b-fea100423a8b', 'Nikhil Pansheriya', 'customerService', 'http://localhost:2000/profile/profile/profile-1712204432489.png', '78945321123', 2147483647, 'nikhilPansheriya@gmail.com', 'Nikhil@123', 0, 0, 0, 0, NULL, '2023-11-20 08:08:28', '2024-04-16 09:26:03');

-- --------------------------------------------------------

--
-- Table structure for table `vaccinations`
--

CREATE TABLE `vaccinations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `petId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vaccineId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `pet` varchar(255) DEFAULT NULL,
  `vaccine` varchar(255) DEFAULT NULL,
  `exploration` varchar(255) DEFAULT NULL,
  `F_vaccination` datetime DEFAULT NULL,
  `validity` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `ownerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vaccinations`
--

INSERT INTO `vaccinations` (`id`, `petId`, `vaccineId`, `owner`, `pet`, `vaccine`, `exploration`, `F_vaccination`, `validity`, `status`, `ownerId`, `createdAt`, `updatedAt`) VALUES
('009786bf-d3b1-48ce-a90b-33032c6be4a8', '2ff926d9-5991-4fb8-91b5-ab2872612f64', '74b29281-de24-4c63-a278-797832a06be5', 'Darshit Gajera', 'Tommy', 'Feline Panleukopenia', 'APTO', NULL, NULL, 'pending', '556260e9-bba3-4521-8365-e6fbb1b53da2', '2024-04-12 10:42:45', '2024-04-12 10:49:12'),
('02625e7e-8fa6-4176-b14f-e089bdcd7e52', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('03a78d73-d59b-416a-b33d-e7b06292ca69', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('044e5532-693d-4860-b21e-686e8199825c', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('05f74b1d-e7aa-4b14-9383-9d0b892d2e8f', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('0aec1422-d5d9-4982-b894-e2f4f8a09caf', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('0d1fa3e9-2b08-47da-a90f-a0168854c1df', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:46', '2024-04-12 10:42:46'),
('126e37bd-481b-40d7-8c39-ef21df0ddb5c', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('13c82ade-095e-49fc-a304-e166af165e12', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('141a54de-ad19-4c9f-a26c-f2b58b1f1bce', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('15a7280d-f7e7-45df-b62a-283b4b1ce801', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('16169a34-fc5a-408a-9d6a-ed3152318667', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('17115bc8-2190-4991-8ece-a3346da248eb', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('175bf6ff-cff6-4b93-808d-370cbea4b4b8', 'a748064a-a14c-4775-b331-5df435538b1f', '74b29281-de24-4c63-a278-797832a06be5', 'Stella Cartpenter', 'Sabrina', 'Feline Panleukopenia', 'APTO', '2023-11-08 00:00:00', '2023-11-08 00:00:00', 'pending', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2023-12-12 04:50:53', '2024-04-12 05:14:26'),
('19990c0c-3db2-4c90-8bd8-57bd58910ffb', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('1a0a0f3f-4dca-449e-a3af-a046b6d088f7', 'dd9596fc-d51e-4d8f-950e-41055fc30d8e', '6e16b851-45f8-4951-99a3-635a7755b496', 'ram', NULL, 'test', 'APTO', NULL, NULL, 'pending', '6b86bfab-80f9-4b2a-b18c-cff6488155f2', '2024-04-10 20:03:10', '2024-04-10 20:03:10'),
('2182f41a-f56b-4b50-8d92-fdf4a11a2740', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('223f20d4-7290-4a01-a391-e177d6870022', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('25140597-2173-4247-af3f-aa8c7a9659f9', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', 'f43b3ff0-f23f-4383-8228-836131e68d38', 'Jayesh', NULL, 'Rabies Vaccine', 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2023-12-12 04:44:21', '2023-12-12 04:44:21'),
('25d954b5-e4e5-4eba-83c8-3afef45803e8', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('26d591f5-4077-4928-9a81-3b506270fe8e', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('2da94b48-fc5d-4300-8d42-26ad1e67a7fd', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('2ec7a361-bfbe-405f-8686-9041e29d68e5', 'f2b7fcc7-85d2-4672-8155-b215cb24163c', '', 'Banjo', NULL, NULL, 'APTO', NULL, NULL, 'pending', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', '2024-04-15 14:30:26', '2024-04-15 14:30:26'),
('31405438-fe27-4985-bf2b-900825605368', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('31674313-6790-4862-8710-eb1dc3e9dde6', 'a748064a-a14c-4775-b331-5df435538b1f', '74b29281-de24-4c63-a278-797832a06be5', 'Stella', NULL, NULL, 'APTO', NULL, NULL, 'pending', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2024-04-15 14:32:14', '2024-04-15 14:32:14'),
('318a5bb9-9757-497b-97a6-4b4f0677e967', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('350e509c-d4b8-4fdb-8cf8-275ce42b153c', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('384dbba3-50bb-4318-9278-688d5ab1a662', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('389827b4-586e-4419-9f2a-c2ad3a081136', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('3c7f6b46-7029-4a5b-a49f-1e8f8456562d', 'f2b7fcc7-85d2-4672-8155-b215cb24163c', '74b29281-de24-4c63-a278-797832a06be5', 'Banjo Don', 'Bobby', 'Feline Panleukopenia', 'APTO', '0000-00-00 00:00:00', NULL, 'pending', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', '2024-04-15 15:01:18', '2024-04-15 15:01:18'),
('3d817f95-fd33-4555-adb0-4db9008c514d', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('3d819331-2873-4f86-84b7-0ef407093f3e', 'a748064a-a14c-4775-b331-5df435538b1f', '74b29281-de24-4c63-a278-797832a06be5', 'Stella', NULL, NULL, 'APTO', NULL, NULL, 'pending', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2024-04-12 10:46:32', '2024-04-12 10:46:32'),
('3f7025d7-2370-412b-806a-7935efc8825f', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('4155b162-38a1-4d7b-a754-00008b5d49e8', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('41cec334-7f3a-4341-94e6-4dfc64cd58e5', 'a748064a-a14c-4775-b331-5df435538b1f', '74b29281-de24-4c63-a278-797832a06be5', 'Stella Cartpenter', 'Sabrina', 'Feline Panleukopenia', 'NO APTO', NULL, NULL, 'rejected', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2023-12-11 11:22:11', '2024-04-10 03:58:26'),
('431d1940-425c-4e7e-b57c-df3a0db6f046', 'ef58c6fd-1669-4bda-a955-77ef7d8e6baf', '6e16b851-45f8-4951-99a3-635a7755b496', 'test', 'test', 'test', 'APTO', '2023-11-07 00:00:00', '2023-11-07 00:00:00', 'pending', '0071cb1e-afb6-4c49-a467-fc0edcecd1fb', '2023-11-08 05:45:19', '2024-01-23 12:34:01'),
('44c6f1a1-5095-4462-a0d0-8f90fd06a575', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('4517a30a-e9cd-45a5-8895-6ab6559a2f14', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('4740cf33-30b3-4679-ab35-a9465626ce2e', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('492e2896-c43e-47b5-99f1-5d7685d64e48', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('4990ce31-3540-486a-b016-1ba7f1d2e815', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('4fe538c6-0c06-4375-9c0f-6c21afd9a541', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '6e16b851-45f8-4951-99a3-635a7755b496', 'test', NULL, 'test', 'APTO', NULL, NULL, 'pending', '0071cb1e-afb6-4c49-a467-fc0edcecd1fb', '2023-11-08 06:05:18', '2023-11-08 06:05:18'),
('54da6c70-eef8-4c77-bf9a-d8c4016df3fb', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('54dd57d2-8612-4504-9d97-06a3bf0be7e1', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('5500e659-0a28-4553-a519-55fab7a6a539', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('58bffb8b-edee-4ce2-938f-1d20dc57c85b', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('61b8432b-ac32-42ac-b5aa-d68631c8d165', 'ef58c6fd-1669-4bda-a955-77ef7d8e6baf', '', 'Hiren', NULL, NULL, 'APTO', NULL, NULL, 'pending', '0071cb1e-afb6-4c49-a467-fc0edcecd1fb', '2024-04-15 14:30:12', '2024-04-15 14:30:12'),
('61d93179-bb20-408a-8d7a-46f55cb18da8', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('6386866e-853f-40ec-8b3d-ce99f5e1da68', 'e8e59647-e108-476b-833d-c040776f840d', '74b29281-de24-4c63-a278-797832a06be5', 'Rahul Lathiya', 'Leila', 'Feline Panleukopenia', 'APTO', '0000-00-00 00:00:00', NULL, 'pending', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', '2024-04-15 14:54:28', '2024-04-15 14:54:28'),
('64abaa4d-39f2-481f-bf38-e0a5e7c32edf', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('64ce77d9-5600-4304-90f2-b776af12d045', 'e8e59647-e108-476b-833d-c040776f840d', 'f43b3ff0-f23f-4383-8228-836131e68d38', 'Rahul', NULL, 'Rabies Vaccine', 'APTO', NULL, NULL, 'pending', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', '2024-04-10 03:46:52', '2024-04-10 03:46:52'),
('6678b805-86b6-413d-bc5f-b22f03a52fc4', 'f2b7fcc7-85d2-4672-8155-b215cb24163c', '74b29281-de24-4c63-a278-797832a06be5', 'Banjo', NULL, NULL, 'APTO', NULL, NULL, 'pending', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', '2024-04-10 03:46:22', '2024-04-10 03:46:22'),
('6830dfbe-e7b9-4117-b019-0fe4415262e0', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('68ea0f75-6e51-435e-97d4-76327ba5a114', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('69786a36-6dd1-40f3-a5e4-7358afb456cf', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('6c0d9b0f-e78e-45f7-9a87-b9325af97c19', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('6d2ce53e-94de-4c91-8492-fd242dee5f84', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('6e157c47-c7dd-4099-9bb7-7bff0bda6cfc', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:46', '2024-04-12 10:42:46'),
('70fb53d8-62b8-4e39-837a-471e2136a3cc', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('71af1f27-ec0d-4782-a3c4-f943abfd3241', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('71d1f08f-06b8-45f2-9d25-a1dd035c8624', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('7352b865-6996-4630-bfd4-b7c45f881203', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('740d0a10-9390-448a-b14e-6a6a709a65ad', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:46', '2024-04-12 10:42:46'),
('76bcaadb-a108-48b2-ab1b-a98d15a1a175', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('78202f60-df56-43b4-9930-7bc6b8f090d9', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('7a716d69-bcdc-4c35-b364-6a590a37bc62', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('7d25a12b-c12e-4ab6-bc79-ceb907c634f5', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('8041fa54-2fb3-43ae-a378-91080bcaaaf3', 'ef58c6fd-1669-4bda-a955-77ef7d8e6baf', '6b4b6e79-ef28-4f96-b479-6a93cb3301f6', 'Banjo Don', 'Same', 'Adenovirus', 'NO APTO', NULL, NULL, 'rejected', 'a63a8fb7-d9e3-4bc1-af8a-65fc09bd69fb', '2023-12-11 11:24:43', '2024-03-30 08:14:54'),
('80e6119e-f1aa-44f4-85e8-2d33d2acdf86', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('83df0b52-243c-4890-99cc-e47ddad355eb', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('86aaa565-de2d-406f-8668-793181a6c449', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:29', '2024-04-12 10:42:29'),
('876ba066-5284-4f1f-aecc-1157ef42850b', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('8836537c-e73f-4c3c-bebc-84f0395a14fa', 'ef58c6fd-1669-4bda-a955-77ef7d8e6baf', '74b29281-de24-4c63-a278-797832a06be5', 'Hiren', NULL, 'Feline Panleukopenia', 'APTO', NULL, NULL, 'pending', '0071cb1e-afb6-4c49-a467-fc0edcecd1fb', '2023-12-12 05:40:57', '2023-12-12 05:40:57'),
('8868eb8e-0477-4e91-88a4-262fd432f020', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:46', '2024-04-12 10:42:46'),
('89537b8e-487a-41fa-a971-1dd34e56d279', '2ff926d9-5991-4fb8-91b5-ab2872612f64', '', 'Darshit', NULL, NULL, 'APTO', NULL, NULL, 'pending', '556260e9-bba3-4521-8365-e6fbb1b53da2', '2024-04-15 14:32:58', '2024-04-15 14:32:58'),
('8c3df0a1-5dde-4fe9-8c28-4a8b5669a86d', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('8c4467f1-93f4-405b-91d9-5c0b78f64342', '2ff926d9-5991-4fb8-91b5-ab2872612f64', '6b4b6e79-ef28-4f96-b479-6a93cb3301f6', 'Jayesh', NULL, 'Adenovirus', 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2023-12-12 04:46:56', '2023-12-12 04:46:56'),
('8e60afe7-ab81-4cc2-b889-8d8406949f61', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('8f3d5b7d-9507-4dc3-b8fd-2062e41256db', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:25', '2024-04-12 10:42:25'),
('9137543c-b2cd-4c22-9ea1-f1b1fb542451', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('914349fb-3eb0-491c-98bf-c456c7cfe282', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('91c59bdf-539b-4b21-9cad-8bdc01edbff7', '8208d5ee-fdb0-4261-b629-04dd44d1f2bc', '74b29281-de24-4c63-a278-797832a06be5', NULL, NULL, NULL, 'APTO', '0000-00-00 00:00:00', NULL, 'pending', 'bbb15f95-ffbb-4c6f-a379-6dbdb093ff21', '2024-04-15 14:36:52', '2024-04-15 14:36:52'),
('9504dda9-4a61-4532-88a4-34ab2d0c7713', '3c6f6663-2406-4168-8cc2-71fddea47fd9', '74b29281-de24-4c63-a278-797832a06be5', 'Rahul', NULL, NULL, 'APTO', NULL, NULL, 'pending', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', '2024-04-15 15:20:19', '2024-04-15 15:20:19'),
('95f914a5-04af-413f-8ae4-0903b3e851ba', 'a748064a-a14c-4775-b331-5df435538b1f', '74b29281-de24-4c63-a278-797832a06be5', 'Stella', NULL, NULL, 'APTO', NULL, NULL, 'pending', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2024-04-15 14:21:58', '2024-04-15 14:21:58'),
('9a0c0c49-83c7-498a-84d5-d2363c9b3357', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:41:33', '2024-04-12 10:41:33'),
('9b99c688-872a-414f-8b4c-74ebcf9c102b', '2ff926d9-5991-4fb8-91b5-ab2872612f64', '6e16b851-45f8-4951-99a3-635a7755b496', 'Hiren', NULL, 'test', 'APTO', NULL, NULL, 'pending', '0071cb1e-afb6-4c49-a467-fc0edcecd1fb', '2023-12-12 04:47:31', '2023-12-12 04:47:31'),
('9bdb2198-e2a1-4391-9655-4a721d8f8896', 'dd9596fc-d51e-4d8f-950e-41055fc30d8e', '74b29281-de24-4c63-a278-797832a06be5', 'ram', NULL, NULL, 'APTO', NULL, NULL, 'pending', '6b86bfab-80f9-4b2a-b18c-cff6488155f2', '2024-04-12 10:43:00', '2024-04-12 10:43:00'),
('9bfd5299-6cc9-487e-9167-27db5cf05495', 'd0566845-3c8e-4ed9-8191-17dbfd6896a8', '74b29281-de24-4c63-a278-797832a06be5', 'Rahul', NULL, NULL, 'APTO', NULL, NULL, 'pending', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', '2024-04-15 14:29:07', '2024-04-15 14:29:07'),
('9df65d19-4a54-488f-9668-65e57d7efc53', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('a042ded1-fcc6-41c8-9672-31552a2ad2b3', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('a06339b6-8b42-4b62-9a24-da5b62654c75', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('a3d539f0-b076-4284-bd0f-8f6b874045af', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('a3de6461-eb7c-4f19-a8d8-614026e9d726', '2ff926d9-5991-4fb8-91b5-ab2872612f64', '', 'Darshit', NULL, NULL, 'APTO', NULL, NULL, 'pending', '556260e9-bba3-4521-8365-e6fbb1b53da2', '2024-04-15 14:31:53', '2024-04-15 14:31:53'),
('a5b940d6-0d3f-4361-a961-e46c5a743048', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:46', '2024-04-12 10:42:46'),
('a74c1756-7d73-484d-829d-2b182487f1cb', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('a7837ab9-74da-4bc9-8761-32ba70db3e2f', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('a8609f90-ad3a-4d21-a517-175f15bf73de', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('a8d6b6be-e0e9-42ac-93f8-8736a3d89f22', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('aa3ff413-bb11-42e3-8452-0bef6535b93e', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('b0c61e2b-4e83-4010-8228-07ad52f39497', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('b2ec0814-d16f-4f56-ae0f-5ca9f802cbe4', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('b6047f28-25e1-41bf-876e-1036ab3eb32e', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('b8be2c26-2887-49d1-87ea-3a8dbccfec85', 'ef58c6fd-1669-4bda-a955-77ef7d8e6baf', '6b4b6e79-ef28-4f96-b479-6a93cb3301f6', 'Hiren', NULL, 'Adenovirus', 'APTO', NULL, NULL, 'pending', '0071cb1e-afb6-4c49-a467-fc0edcecd1fb', '2023-12-12 05:41:09', '2023-12-12 05:41:09'),
('bd0e92fe-a905-4d24-bab9-7337dcf01007', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', '74b29281-de24-4c63-a278-797832a06be5', 'Stella', NULL, NULL, 'APTO', NULL, NULL, 'pending', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2024-04-12 10:43:19', '2024-04-12 10:43:19'),
('c0eb6c12-8414-4a91-8f31-f1f3d6ffedc2', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:29', '2024-04-12 10:42:29'),
('c11e2f87-d940-4002-86cc-46821613a3d2', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('c433103a-1271-4cbe-b894-69ed8c702422', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('cabc7df5-e8a5-4195-a6c0-da361a098051', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', '74b29281-de24-4c63-a278-797832a06be5', 'Stella Cartpenter', 'shephard', 'Feline Panleukopenia', 'APTO', '0000-00-00 00:00:00', NULL, 'pending', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2024-04-15 15:02:58', '2024-04-15 15:02:58'),
('cba5d1e2-2c47-439f-b632-780f9185dbda', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('ccaeeae8-b53b-4fa7-9095-57dc0bd9025d', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('cdeb6557-65f2-4ac0-ab4a-fa3464c6ec58', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:46', '2024-04-12 10:42:46'),
('ce66d4b0-a91e-4aa0-b775-9c016a2f8ae7', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('cfb9d4b1-5570-4bb5-b7de-1fcab4f90b77', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', '74b29281-de24-4c63-a278-797832a06be5', 'Stella', NULL, 'Feline Panleukopenia', 'APTO', NULL, NULL, 'pending', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2024-04-15 14:35:21', '2024-04-15 14:35:21'),
('cfdceb42-7837-4bea-af45-d502dd7554c2', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('d0a6d5c0-234d-4f4a-9ea4-2d2db9d76340', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('d1a6718e-945b-4968-90c7-3ccb7a1bdf90', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('d1ff27a3-aa63-417c-a85a-ffe1faf2d1ea', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', '74b29281-de24-4c63-a278-797832a06be5', 'Stella', NULL, NULL, 'NO APTO', NULL, NULL, 'rejected', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2024-04-12 10:49:19', '2024-04-15 13:59:53'),
('d38c7d07-77b8-47cc-ad79-9afd76d5d44f', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:28', '2024-04-12 10:42:28'),
('d3a53913-316c-41b5-a9c7-d1edd9247709', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('d8078508-f793-4c8b-a69d-af4bd05552d0', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('d8d08fe3-37bc-4e0e-89ed-fde35e720e2f', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('dadf53d1-75c7-43c2-90bf-e17675d40234', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('db3720de-7fd8-4b32-a88a-b95ec851e904', 'e8e59647-e108-476b-833d-c040776f840d', '74b29281-de24-4c63-a278-797832a06be5', 'Rahul', NULL, 'Feline Panleukopenia', 'APTO', NULL, NULL, 'pending', 'bc160fea-6ce2-4b4f-a39c-0c0457f59fd1', '2024-04-10 03:46:43', '2024-04-10 03:46:43'),
('e062b444-53aa-495b-b455-1a643603d398', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('e117840f-ca43-4557-af7d-8d6c95ffbf56', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('e2e8465b-beca-40d4-9f1d-14f6760146dd', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('e433f0dc-4a4e-4806-ba39-d1e440e37d0c', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('e68ef06c-9285-46bc-963b-78904bfa3b32', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:46', '2024-04-12 10:42:46'),
('e7488aa7-7d0e-4bd1-adb3-b144fa458374', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('e9788346-c962-4909-94f2-506be40e2ebd', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('ea8ab316-6c66-4dc6-8b2c-49e2baba3970', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('ee85fef6-8622-40e6-a0ea-fa503b732713', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('ef4025ed-fd46-4304-b6cd-5b23f6bfb8d7', '05c28633-b6a5-4b5d-bffd-8dc10b1fa6b4', '74b29281-de24-4c63-a278-797832a06be5', 'Stella', NULL, NULL, 'APTO', '2024-04-20 00:00:00', '2024-04-29 00:00:00', 'vaccinated', '9f328fdd-5389-404f-aec8-b652a0e353e0', '2024-04-12 10:47:03', '2024-04-15 14:03:19'),
('f09648d7-c385-4148-af64-bb1970735125', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('f12af538-c69b-41d8-b2b9-865d178de9b2', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('f1666c44-842d-4c7e-aa33-05b1614456a1', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('f2c24778-058f-47bf-9790-0868f9785c13', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('f63f1e27-838e-4e9e-92c3-43879f1bc60f', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('f69a9c38-25e4-479a-91c7-8ca72d5fda92', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:46', '2024-04-12 10:42:46'),
('f7c2e578-93c5-4aeb-9016-ac0cec9c0697', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('f8533f90-e673-4a31-aee4-7d1c35d0b67b', 'ef58c6fd-1669-4bda-a955-77ef7d8e6baf', '6e16b851-45f8-4951-99a3-635a7755b496', 'test', 'test', 'test', 'APTO', '2023-12-13 00:00:00', '2023-12-12 00:00:00', 'vaccinated', '0071cb1e-afb6-4c49-a467-fc0edcecd1fb', '2023-11-08 05:44:32', '2023-12-12 05:40:37'),
('f911d4f2-32a9-4a4f-a9d7-929714323fe3', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, 'Feline Panleukopenia', 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2023-12-11 11:26:34', '2023-12-11 11:26:34'),
('fb6f1a8b-b398-4b32-a360-a930661bfa65', 'da4027e9-359f-44a2-a35a-2a5ef7b8205c', '74b29281-de24-4c63-a278-797832a06be5', 'Jayesh', NULL, NULL, 'APTO', NULL, NULL, 'pending', '652847f6-367c-4701-b78d-00e44e239f76', '2024-04-12 10:42:45', '2024-04-12 10:42:45'),
('ff04357b-64e1-4a23-99fa-88f45098ca76', 'facd9b5f-e3cf-4d1a-98df-102965c3f619', '', NULL, NULL, NULL, 'APTO', '0000-00-00 00:00:00', NULL, 'pending', 'dbbd04fd-99ed-41c0-819d-a8dceacb946d', '2024-04-15 14:38:09', '2024-04-15 14:38:09');

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

CREATE TABLE `vaccines` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `validity` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vaccines`
--

INSERT INTO `vaccines` (`id`, `name`, `validity`, `stock`, `createdAt`, `updatedAt`) VALUES
('6b4b6e79-ef28-4f96-b479-6a93cb3301f6', 'Adenovirus', '36', 150, '2023-12-06 07:16:07', '2024-04-12 05:17:09'),
('6e16b851-45f8-4951-99a3-635a7755b496', 'test', '12', 300, '2023-11-07 09:29:15', '2023-11-07 09:29:15'),
('74b29281-de24-4c63-a278-797832a06be5', 'Feline Panleukopenia', '12', 300, '2023-12-06 07:17:21', '2024-04-11 11:29:24'),
('f43b3ff0-f23f-4383-8228-836131e68d38', 'Rabies Vaccine', '36', 150, '2023-12-06 07:12:16', '2023-12-06 07:12:16');

-- --------------------------------------------------------

--
-- Table structure for table `veterinarians`
--

CREATE TABLE `veterinarians` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `specialityId` char(36) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `identity` varchar(255) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `workingDays` varchar(255) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `emailToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `veterinarians`
--

INSERT INTO `veterinarians` (`id`, `specialityId`, `avatar`, `name`, `surname`, `speciality`, `identity`, `dob`, `phone`, `email`, `password`, `sex`, `address`, `department`, `district`, `workingDays`, `start_time`, `end_time`, `emailToken`, `createdAt`, `updatedAt`) VALUES
('10abe0b2-8f9b-422a-a6e1-3c43cf2b3c60', 'fb110e77-aba8-4810-891c-c5de61fea9ff', 'http://localhost:2000/profile/veterinarian/avatar-1704375894308.png', 'meta', 'test1', 'Doctor2222', '123456', '1980-08-01 00:00:00', 9874561230, 'testVet@gmail.com', 'dad', 'Masculino', 'test', 'JUNIN', 'PALCA', '[\"Lunes\",\"Martes\",\"Miércoles\",\"Jueves\",\"Viernes\",\"Sábado\",\"Domingo\"]', '00:00:00', '00:00:00', NULL, '2023-11-07 04:13:52', '2024-04-13 06:54:13'),
('1b5d9cee-add2-4063-add3-cd0bf59f77e0', 'fb110e77-aba8-4810-891c-c5de61fea9ff', 'http://localhost:2000/profile/veterinarian/avatar-1704802318811.jpg', 'Ram', 'Hands', 'Doctor2222', '12312', '2024-01-02 00:00:00', 123123, 'dsadas', '123', 'Masculino', 'asdad', 'APURIMAC', 'EL PORVENIR', '[\"Martes\",\"Jueves\",\"Miércoles\",\"Domingo\",\"Sábado\"]', '00:00:00', '12:00:00', NULL, '2024-01-09 12:11:58', '2024-04-13 06:54:13'),
('409b9e7c-45ca-4c9e-8fc8-1dc3de06e0c7', 'fb110e77-aba8-4810-891c-c5de61fea9ff', 'http://localhost:2000/profile/veterinarian/avatar-1706372584191.png', 'Darshit', 'lachak', 'Doctor2222', '987456', '2024-01-03 00:00:00', 1234567890, 'asdas', '123', 'Masculino', 'dasdad', 'ANCASH', 'PAMPAROMAS', '[]', '00:00:00', '00:00:00', NULL, '2023-12-18 09:49:35', '2024-04-13 06:54:13'),
('499e10b4-208d-4c92-b035-3b989f55d4ef', '', NULL, 'asd', 'asd', NULL, '12313213', '2024-04-04 00:00:00', 123131232, 'asd@gmail.com', 'asd123', 'Masculino', NULL, 'AMAZONAS', 'BAGUA', NULL, '10:55:00', '12:55:00', NULL, '2024-04-18 17:25:36', '2024-04-18 17:25:36'),
('4f44964a-478d-4a5b-b158-a990ec55d3e5', 'fb110e77-aba8-4810-891c-c5de61fea9ff', 'http://localhost:2000/profile/veterinarian/avatar-1700892579376.png', 'Ankit ', 'Pansheriya', 'Doctor2222', '7894561', '2001-07-25 00:00:00', 2147483647, 'ankitpansheriya123@gmail.com', 'ankit123', 'Masculino', 'Surat', 'AMAZONAS', 'NIEVA', '[\"Lunes\",\"Miércoles\",\"Sábado\"]', '11:40:00', '23:41:00', NULL, '2023-11-25 06:09:39', '2024-04-13 06:54:13'),
('6bf408b9-f6fa-42f5-aaf2-6ae5abe2ebda', 'fa8c72e9-7731-4a9b-9b9d-a488f0f15584', 'http://localhost:2000/profile/veterinarian/avatar-1701060141986.png', 'Sahil', 'Mangukiya', 'MBBS', '7863091', '0000-00-00 00:00:00', 8511122566, 'sahilmangukiya@gmail.com', 'sahil123', 'Masculino', 'Surat, Gujarat', 'ANCASH', 'PAMPAROMAS', '[\"Lunes\",\"Martes\",\"Miércoles\",\"Jueves\",\"Viernes\",\"Sábado\",\"Domingo\"]', '09:00:00', '21:00:00', NULL, '2023-11-25 05:28:38', '2023-11-27 04:55:07'),
('714583f4-1106-4ee7-bfed-405e65880f93', 'fb110e77-aba8-4810-891c-c5de61fea9ff', 'http://localhost:2000/profile/veterinarian/avatar-1712723854916.png', 'test', 'doctor', 'Doctor2222', '98563', '0000-00-00 00:00:00', 7894561230, 'test@gmail.com', 'test123', 'Femenino', '985632', 'APURIMAC', 'EL PORVENIR', '[\"u\",\"n\",\"d\",\"e\",\"f\",\"i\",\"n\",\"e\",\"d\",\"Lunes\",\"Miércoles\",\"Jueves\",\"Martes\",\"Viernes\",\"Sábado\",\"Domingo\"]', '00:00:00', '12:00:00', NULL, '2024-01-09 12:08:13', '2024-04-13 06:54:13'),
('9685a358-e663-4a33-8d8e-5fb483015c4c', 'f9a48e06-1fc2-42da-aa7c-0cb38fede427', 'http://localhost:2000/profile/veterinarian/avatar-1701074554755.png', 'Mahima', 'Gnadhi', 'Medicina General J', '123456', '1995-11-20 00:00:00', 8511122566, 'mahima@gmail.com', 'mahima123', 'Femenino', '123, portugizo st. , jima circle', 'AYACUCHO', 'SAN JOSE DE USHUA', '[\"Lunes\",\"Jueves\",\"Miércoles\",\"Domingo\",\"Sábado\"]', '00:00:00', '12:00:00', NULL, '2023-11-27 04:51:21', '2024-04-13 06:53:50'),
('998fe165-7c9b-4525-acb2-c8ac181713cc', 'd4ab3ebb-2fd2-45ca-bbb1-b5356da8cc9b', NULL, 'Demo', 'Doctor', 'testing', '738743', '1972-04-14 00:00:00', 9856314500, 'demo@gmail.com', 'demo@123', 'Masculino', 'demo', 'ANCASH', 'CANIS', '[\"Lunes\",\"Jueves\",\"Miércoles\",\"Viernes\",\"Domingo\"]', '10:09:00', '13:09:00', NULL, '2024-03-28 16:39:24', '2024-04-13 06:50:21'),
('c697fd3e-e3c1-4dad-a1b8-a37a1feebdb5', 'fb110e77-aba8-4810-891c-c5de61fea9ff', 'http://localhost:2000/profile/veterinarian/avatar-1704375894308 - Copy.png', 'Haresh', 'Mangukiya', 'Doctor2222', '78485', '1994-06-22 00:00:00', 987456310, 'haresh@gmail.com', 'haresh123', 'Masculino', 'surat', 'ANCASH', 'CAJACAY', '[]', '09:17:00', '17:17:00', NULL, '2024-01-27 15:48:13', '2024-04-13 06:54:13'),
('f5e4c494-5d1a-4697-a314-280384bdb0c9', 'd4ab3ebb-2fd2-45ca-bbb1-b5356da8cc9b', 'http://localhost:2000/profile/veterinarian/avatar-1700890935756.png', 'Hina ', 'Chorasiya', 'testing', '78945612', '1998-06-16 00:00:00', 2147483647, 'hina123@gmail.com', 'hina123', 'Femenino', 'Surat', 'APURIMAC', 'OCOBAMBA', '[\"Lunes\",\"Martes\",\"Miércoles\",\"Jueves\",\"Viernes\",\"Sábado\",\"Domingo\"]', '11:13:00', '11:12:00', NULL, '2023-11-25 05:42:15', '2024-04-13 06:50:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`,`ownerId`,`petId`,`veterinarianId`),
  ADD KEY `ownerId` (`ownerId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`,`productId`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `petinfos`
--
ALTER TABLE `petinfos`
  ADD PRIMARY KEY (`id`,`PetId`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`,`ownerId`),
  ADD KEY `ownerId` (`ownerId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`,`categoryId`);

--
-- Indexes for table `specialities`
--
ALTER TABLE `specialities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD PRIMARY KEY (`id`,`petId`,`vaccineId`,`ownerId`),
  ADD KEY `vaccineId` (`vaccineId`);

--
-- Indexes for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `veterinarians`
--
ALTER TABLE `veterinarians`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `owners` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
