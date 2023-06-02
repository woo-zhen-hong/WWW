<?php
// db settings
$hostname = '140.127.74.186';
$username = 'jk';
$password = 'jk123';
$database = 'www';

// db connection
$con = mysqli_connect($hostname, $username, $password, $database) or die("Error " . mysqli_error($con));