DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '留言者姓名',
  `email` varchar(128) NOT NULL COMMENT '留言者信箱',
  `message` text COMMENT '留言者內容',
  `created` datetime DEFAULT NULL COMMENT '新增留言時間',
  `updated` datetime DEFAULT NULL COMMENT '更新留言時間',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;