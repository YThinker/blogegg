/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : eggblog

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 22/02/2021 22:23:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `nickName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '昵称',
  `registerTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户角色',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '性别',
  `question` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密保问题',
  `answer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密保答案',
  PRIMARY KEY (`id`, `userId`) USING BTREE,
  UNIQUE INDEX `userId`(`userId`) USING BTREE,
  UNIQUE INDEX `nickName`(`nickName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin2', 'ADNsCLSOVyd50cf8f488717f807c516472fa132f10tWP9AXLC1k', '三千', '2021-01-26 13:27:57', 'admin', '1998-01-02', NULL, '', '');
INSERT INTO `user` VALUES (2, 'admin1', 'rkzGpEsciQ961297fbf2069ce03638a350faafd025fViX8t3NuI', '水笔笔', '2021-01-26 13:38:33', 'admin', NULL, NULL, '', '');
INSERT INTO `user` VALUES (3, 'registerTest', 'DJa2MXu18sd50cf8f488717f807c516472fa132f10gvaUl2DEsX', '注册测试用户', '2021-02-15 21:10:39', 'normal', NULL, NULL, '测试用户', 'MkkAtrOyiid4d808dab0e71ce0cdc21af105f5d72bPFo9EV1t64');
INSERT INTO `user` VALUES (4, 'alldkjisr', 'EZQbQaef3fd50cf8f488717f807c516472fa132f10cpoKY1v8If', 'alldkjisr', '2021-02-21 20:06:16', 'normal', NULL, NULL, '测试问题', 'Og50IR71y2237a329bb6b0fd5233f40a26e1ed4246xLgjkJa5u4');

SET FOREIGN_KEY_CHECKS = 1;
