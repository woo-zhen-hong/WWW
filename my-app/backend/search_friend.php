<?php
session_start();  // 啟用交談期
// Start the session
// include "index.php";

include "index.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$name = $data->name;
$sql = "SELECT * FROM  `www`.user
             WHERE `www`.user.name = '$name'";
// var_dump($sql);
$stmt = $con->prepare($sql);
// set parameters and execute
$stmt->execute();
// var_dump($stmt);
$result = $stmt->get_result();
$user = $result->fetch_assoc();
// var_dump($user['id']);
if ($user != NULL) {
    // header('Location: main.php');
    $dataset = array(
        "status" => "success",
        "id" => $user['id']
    );
} else {
    $dataset = array(
        "status" => "此人不存在",
    );
}
echo json_encode($dataset);
