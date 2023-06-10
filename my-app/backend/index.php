<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type:text/html; charset=utf-8");
header('Access-Control-Allow-Methods: GET, POST, DELETE,PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// db settings
$hostname = '36.238.120.118';
$username = 'jk';
$password = 'jk123';
$database = 'www';
// $hostname = '140.127.74.144';
// $username = '410977004';
// $password = '410977004';
// $database = '410977004';

// db connection
$con = mysqli_connect($hostname, $username, $password, $database) or die("Error " . mysqli_error($con));

$_SESSION['id'] = 3;
