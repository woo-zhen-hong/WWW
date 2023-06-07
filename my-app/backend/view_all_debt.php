<?php
session_start(); 
include "index.php";
$id = $_SESSION["user_id"];
// fetch records
$sql = "SELECT * 
FROM `list` 
WHERE ('list'.'user_id' = 'list'.'debt_user_id' OR 'list'.'user_id' = 'list'.'debt_user_id2')";
$result = mysqli_query($con, $sql);

while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "echo" => 1,
    "totalrecords" => count($array),
    "totaldisplayrecords" => count($array),
    "data" => $array
);
if($dataset !=''){
    echo "帳號密碼錯誤",
}
echo json_encode($dataset);