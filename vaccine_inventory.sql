-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2021 at 02:18 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vaccine_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `injection`
--

CREATE TABLE `injection` (
  `injectionID` int(11) NOT NULL,
  `itemNumber` varchar(255) NOT NULL,
  `patientsID` int(11) NOT NULL,
  `patientsName` varchar(255) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `injectionDate` date NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `unitPrice` float(10,0) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `injection`
--

INSERT INTO `injection` (`injectionID`, `itemNumber`, `patientsID`, `patientsName`, `itemName`, `injectionDate`, `quantity`, `unitPrice`) VALUES
(18, '01234', 14, 'Steve Jobs', 'Astrazenecca', '2018-05-24', 1, 20),
(19, '01234', 14, 'Steve Jobs', 'Astrazenecca', '2018-05-24', 1, 20),
(26, '01234', 14, 'Steve Jobs', 'Astrazenecca', '2018-05-24', 1, 20),
(27, '01234', 14, 'Steve Jobs', 'Astrazenecca', '2018-05-24', 1, 20),
(28, '01234', 14, 'Steve Jobs', 'Astrazenecca', '2018-05-24', 1, 20),
(29, '01234', 14, 'Steve Jobs', 'Astrazenecca', '2018-05-24', 1, 20);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `productID` int(11) NOT NULL,
  `itemNumber` varchar(255) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `unitPrice` float NOT NULL DEFAULT 0,
  `imageURL` varchar(255) NOT NULL DEFAULT 'imageNotAvailable.jpg',
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`productID`, `itemNumber`, `itemName`, `stock`, `unitPrice`, `imageURL`, `status`, `description`) VALUES
(50, '01234', 'Astrazenecca', 30, 20, '1625919215_AstraZeneca-vaccine-300x225.jpg', 'Active', ''),
(51, '1', 'Pfizer-BioNTech', 30, 50, '1625919321_yq-vaccines-29032021.jpg', 'Active', ''),
(52, '2', 'Moderna', 82, 45, '1625919270_shutterstock_1891094320_h2.jpg', 'Active', ''),
(53, '3', 'Johnson &amp; Johnson', 100, 37, 'imageNotAvailable.jpg', 'Active', ''),
(54, '4', 'Sinovac', 50, 12, '1625919381_files-uruguay-health-virus-vaccine-151201.jpg', 'Active', '');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patientsID` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patientsID`, `fullName`, `email`, `mobile`, `address`, `address2`, `city`, `state`, `status`, `createdOn`) VALUES
(43, 'Pakmaaon', 'pak@g.com', 601425296, 'no 5', 'tepi kain', 'selanngot', '', 'Active', '2021-07-07 16:09:30');

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `purchaseID` int(11) NOT NULL,
  `itemNumber` varchar(255) NOT NULL,
  `purchaseDate` date NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `unitPrice` float NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `vendorName` varchar(255) NOT NULL DEFAULT 'Test Vendor',
  `vendorID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase`
--

INSERT INTO `purchase` (`purchaseID`, `itemNumber`, `purchaseDate`, `itemName`, `unitPrice`, `quantity`, `vendorName`, `vendorID`) VALUES
(53, '01234', '2018-05-24', 'Astrazenecca', 0, 1, 'Astrzenneca', 11),
(54, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(55, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(56, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(57, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(58, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(59, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(60, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(61, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(62, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(63, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(64, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(65, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(66, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(67, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(68, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(69, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(70, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(71, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(72, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(73, '01234', '2018-05-24', 'Astrazenecca', 0, 2, 'ABC Company', 1),
(74, '1', '2018-05-24', 'Pfizer-BioNTech', 30, 7, 'ABC Company', 1),
(75, '2', '2018-05-24', 'Moderna', 300, 2, 'moderna inc', 16),
(76, '2', '2018-05-24', 'Moderna', 30, 50, 'moderna inc', 16);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `fullName`, `username`, `password`, `status`) VALUES
(5, 'Guest', 'guest', '81dc9bdb52d04dc20036dbd8313ed055', 'Active'),
(6, 'a', 'a', '0cc175b9c0f1b6a831c399e269772661', 'Active'),
(7, 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `vendorID` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` int(11) NOT NULL,
  `phone2` int(11) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`vendorID`, `fullName`, `email`, `mobile`, `phone2`, `address`, `address2`, `city`, `state`, `status`, `createdOn`) VALUES
(1, 'ABC Company', '', 2343567, 0, '80, Ground Floor, ABC Shopping Complex', '46th Avenue', 'Kolpetty', 'Colombo', 'Active', '2018-05-05 05:48:44'),
(3, 'Johnson and Johnsons Co.', '', 32323, 0, 'Gourge Town', 'Malibu', 'Maharagama', 'PULAU PENANG', 'Active', '2018-05-05 06:28:33'),
(11, 'Astrzenneca', 'astra@g.com', 601342423, 0, 'e.ssdasd, asdasdasd,', 'U12 DESA ALAM', 'SHAH ALAM', 'Colombo', 'Active', '2021-07-03 13:02:39'),
(12, 'Sinovac China', 'anamustafa@gmail.com', 2147483647, 0, 'no 9', 'jalan megah', 'bangi', '', 'Active', '2021-07-05 14:28:22'),
(13, 'Pfizer', '', 603251672, 0, 'NO 2', 'U12 DESA ALAM', 'SHAH ALAM', '', 'Active', '2021-07-05 14:30:19'),
(16, 'moderna inc', '', 333459536, NULL, 'NO 2', 'U12 DESA ALAM, JALAN PEGAGA A U12/A SEKSYEN U12', 'SHAH ALAM', 'Selangor', 'Active', '2021-07-07 16:07:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `injection`
--
ALTER TABLE `injection`
  ADD PRIMARY KEY (`injectionID`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`productID`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patientsID`);

--
-- Indexes for table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`purchaseID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`vendorID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `injection`
--
ALTER TABLE `injection`
  MODIFY `injectionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patientsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `purchaseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `vendorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
