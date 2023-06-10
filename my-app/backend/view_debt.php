<?php
session_start(); // 啟用交談期
echo json_decode($_SESSION["user_id"]);
// Start the session
include "index.php";
$sql = "SELECT * FROM `www`.list
    WHERE `www`.list.debt_user_id_1=1
    OR `www`.list.debt_user_id_2=1";
$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "total" => count($array),
    "data" => $array
);

echo json_encode($dataset);
