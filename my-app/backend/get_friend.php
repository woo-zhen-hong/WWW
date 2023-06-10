<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$user_id = $_SESSION['id'];
$sql = "SELECT * From 
        (
            SELECT user.id 'value', user.name 'label'
            FROM www.user
            LEFT JOIN www.friend ON friend.friend_id_1=user.id
            WHERE friend.friend_id_2=$user_id
        )friend_tmp1
        UNION 
        SELECT * From 
        (
            SELECT user.id 'value', user.name 'label'
            FROM www.user
            LEFT JOIN www.friend ON friend.friend_id_2=user.id
            WHERE friend.friend_id_1=$user_id
        )friend_tmp2";

$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "total" => count($array),
    "data" => $array
);
echo json_encode($dataset);
