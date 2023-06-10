<?php
session_start();  // 啟用交談期
// Start the session
include "index.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$list_id = (int)$data->id;
if ($list_id != "") {
    $sql = "DELETE FROM www.list
    WHERE list.id =$list_id";
    $stmt = $con->prepare($sql);
    // set parameters and execute
    $stmt->execute();
    $dataset = array(
        "status" => "success"
    );
} else {
    $dataset = array(
        "status" => "刪除id不能為空"
    );
}
echo json_encode($dataset);
