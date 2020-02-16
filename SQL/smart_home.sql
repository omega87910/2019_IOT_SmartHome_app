-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- 主機: localhost
-- 產生時間： 2019 年 11 月 02 日 07:42
-- 伺服器版本: 5.6.45
-- PHP 版本： 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `smart_home`
--

-- --------------------------------------------------------

--
-- 資料表結構 `air_auto_state`
--

CREATE TABLE IF NOT EXISTS `air_auto_state` (
  `air_auto_state` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `air_auto_state`
--

INSERT INTO `air_auto_state` (`air_auto_state`) VALUES
(1);

-- --------------------------------------------------------

--
-- 資料表結構 `air_state`
--

CREATE TABLE IF NOT EXISTS `air_state` (
  `air_state` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `air_state`
--

INSERT INTO `air_state` (`air_state`) VALUES
(1);

-- --------------------------------------------------------

--
-- 資料表結構 `curtain_auto_state`
--

CREATE TABLE IF NOT EXISTS `curtain_auto_state` (
  `curtain_auto_state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `curtain_auto_state`
--

INSERT INTO `curtain_auto_state` (`curtain_auto_state`) VALUES
(1);

-- --------------------------------------------------------

--
-- 資料表結構 `curtain_state`
--

CREATE TABLE IF NOT EXISTS `curtain_state` (
  `curtain_state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `curtain_state`
--

INSERT INTO `curtain_state` (`curtain_state`) VALUES
(1);

-- --------------------------------------------------------

--
-- 資料表結構 `danger_state`
--

CREATE TABLE IF NOT EXISTS `danger_state` (
  `danger_state` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `danger_state`
--

INSERT INTO `danger_state` (`danger_state`) VALUES
(0);

-- --------------------------------------------------------

--
-- 資料表結構 `Homemode_state`
--

CREATE TABLE IF NOT EXISTS `Homemode_state` (
  `state` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `Homemode_state`
--

INSERT INTO `Homemode_state` (`state`) VALUES
(0);

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `USER` char(4) NOT NULL,
  `pwd` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`USER`, `pwd`) VALUES
('user', '0000');

-- --------------------------------------------------------

--
-- 資料表結構 `person_num`
--

CREATE TABLE IF NOT EXISTS `person_num` (
  `num` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `person_num`
--

INSERT INTO `person_num` (`num`) VALUES
(0);

-- --------------------------------------------------------

--
-- 資料表結構 `RGB_state`
--

CREATE TABLE IF NOT EXISTS `RGB_state` (
  `RGB_state` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `RGB_state`
--

INSERT INTO `RGB_state` (`RGB_state`) VALUES
('white');

-- --------------------------------------------------------

--
-- 資料表結構 `temp_humi_num`
--

CREATE TABLE IF NOT EXISTS `temp_humi_num` (
  `temp` int(3) NOT NULL,
  `humi` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `temp_humi_num`
--

INSERT INTO `temp_humi_num` (`temp`, `humi`) VALUES
(27, 89);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
