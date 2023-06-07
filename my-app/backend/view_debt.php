<?php
session_start();
include "index.php";
$id = $_SESSION["user_id"];
// fetch records
// $sql = "SELECT * 
// FROM list 
// WHERE list'.'user_id' = 'list'.'debt_user_id' OR 'list'.'user_id' = 'list'.'debt_user_id2'
// AND 'list'.'amount' < 0";
$sql = "SELECT * FROM `410977004`.list
        WHERE `410977004`.list.debt_user_id_1=$id
        OR `410977004`.list.debt_user_id_2=$id
AND     `410977004`.list.amount > 0";
$result = mysqli_query($con, $sql);

while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}

$dataset = array(
    "total" => count($array),
    "data" => $array
);
echo json_encode($dataset);
