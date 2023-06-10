<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$email = "jacky";
$password = "jk123";
$con = mysqli_connect("36.238.120.118", "jk", "jk123", "www");

if ($email != "" && $password != "") {
    $sql = "SELECT *
    FROM `www`.user
    INNER JOIN `www`.list
    ON `www`.user.id = `www`.list.debt_user_id_1 
    AND `www`.user.email = '111'";
    // var_dump($sql);
    $stmt = $con->prepare($sql);
    // set parameters and execute
    $stmt->execute();
    // var_dump($stmt);
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    // var_dump($user['id']);
    $_SESSION["user_id"] = $user['id'];
    // header('Location: main.php');
    $result = mysqli_query($con, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $array[] = $row;
    }
    $dataset = array(
        "total" => count($array),
        "data" => $array
    );
}

echo json_encode($dataset);