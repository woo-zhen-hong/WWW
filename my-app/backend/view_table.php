<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$status = $data->status;
if ($status == 'all') {
    $sql = "";
} else if ($status == 'debt') {
    $sql = "";
} else if ($status == 'back') {
    $sql = "";
}
// $stmt = $con->prepare($sql);
// // set parameters and execute
// $stmt->execute();
// $result = $stmt->get_result();
// $user = $result->fetch_assoc();
$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "total" => count($array),
    "data" => $array
);
