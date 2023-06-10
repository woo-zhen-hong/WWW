<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$status = $data->status;
var_dump($status);
if ($status == 'all') {
    $sql = "SELECT *
            FROM `www`.user
            INNER JOIN `www`.list
            ON `www`.user.id = `www`.list.debt_user_id_1 
            AND `www`.user.email = '111'";
} else if ($status == 'debt') {
    $sql = "";
} else if ($status == 'back') {
    $sql = "";
}

$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "total" => count($array),
    "data" => $array
);

echo json_encode($dataset);
