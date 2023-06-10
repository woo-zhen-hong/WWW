<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$use_id = $_SESSION['id'];
$sql = "
     ";

$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "total" => count($array),
    "data" => $array
);
echo json_encode($dataset);
