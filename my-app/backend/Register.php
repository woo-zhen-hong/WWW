<?php
session_start();  // 啟用交談期
// Start the session
include "index.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$name = $data->name;
$email = $data->email;
$password = $data->password;
if ($name != "" && $email != "" && $password != "") {
    $sql = "INSERT INTO `www`.user (name,email,password)
            VALUES ('$name', '$email', '$password')";
    $stmt = $con->prepare($sql);
    // set parameters and execute
    $stmt->execute();
    $dataset = array(
        "status" => "success"
    );
} else {
    $dataset = array(
        "status" => "帳號密碼不能為空"
    );
}
echo json_encode($dataset);
