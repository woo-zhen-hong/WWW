<?php
session_start();  // 啟用交談期
// Start the session
include "index.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$id1 = $_SESSION['id'];
$id2 = $data->id;
if ($id1 != "" && $id2 != "") {
    $sql = "REPLACE INTO `www`.friend (friend_id_1,friend_id_2)
            VALUES ('$id1', '$id2')";
    $stmt = $con->prepare($sql);
    // set parameters and execute
    $stmt->execute();
    $dataset = array(
        "status" => "success"
    );
} else {
    $dataset = array(
        "status" => "fail"
    );
}
echo json_encode($dataset);
