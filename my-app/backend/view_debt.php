<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$email = "jacky";
$password = "jk123";
$con = mysqli_connect("140.127.74.144", "410977004", "410977004", "410977004");
if ($email != "" && $password != "") {
    $sql = "SELECT * FROM `410977004`.list";
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