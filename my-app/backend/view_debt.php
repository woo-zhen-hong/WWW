<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$user_id = $_SESSION['id'];
$sql = "SELECT   list.id 'list_id', list.amount 'money',list.debt_date 'date' 
        ,list.debt_note 'note'
        , user.name 'debt_name'
        , user2.name 'back_name'
        , list.debt_alert 'tag'
        ,list.id 'id'
        FROM www.list
        LEFT JOIN www.user ON list.debt_user_id_1 = user.id 
        LEFT JOIN www.user user2 ON list.debt_user_id_2 = user2.id
        WHERE user2.id = $user_id ";
$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "total" => count($array),
    "data" => $array
);

echo json_encode($dataset);
