<?php
session_start();  // 啟用交談期
// Start the session
include "index.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$email = $data->email;
$password = $data->password;
if ($email != "" && $password != "") {
    $sql = "SELECT * FROM  `410977004`.user
             WHERE `410977004`.user.password = '$password' 
             AND `410977004`.user.email= '$email' ";
    // var_dump($sql);
    $stmt = $con->prepare($sql);
    // set parameters and execute
    $stmt->execute();
    // var_dump($stmt);
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    // var_dump($user['id']);
    if ($user != NULL) {
        $_SESSION["user_id"] = $user['id'];
        // header('Location: main.php');
        $dataset = array(
            "status" => "success"
        );
    } else {
        $dataset = array(
            "status" => "帳號密碼錯誤",
        );
    }
} else {
    $dataset = array(
        "status" => "帳號密碼不能為空"
    );
}
echo json_encode($dataset);
session_abort();
