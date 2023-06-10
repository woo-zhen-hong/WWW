<?php
session_start();  // 啟用交談期
// Start the session
include "index.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$email = $data->email;
if ($email != "" && $password != "") {
    $sql = "SELECT * FROM  `www`.user
             WHERE `www`.user.email= '$email' ";
    // var_dump($sql);
    $stmt = $con->prepare($sql);
    // set parameters and execute
    $stmt->execute();
    // var_dump($stmt);
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    if ($user != NULL) {
        $password = $user['password'];
        $dataset = array(
            "status" => "success",
            "password" => $password,
        );
    } else {
        $dataset = array(
            "status" => "此帳號不存在",
        );
    }
} else {
    $dataset = array(
        "status" => "帳號密碼不能為空"
    );
}
echo json_encode($dataset);
