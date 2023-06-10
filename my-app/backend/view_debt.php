<?php
session_start(); // 啟用交談期
echo json_decode($_SESSION["user_id"]);
// Start the session
include "index.php";
$sql = "SELECT  list.amount 'money',list.debt_date 'date' 
,list.debt_note 'note'
, user.name 'debt_name'
, user2.name 'back_name'
, list.debt_alert 'tag'
FROM www.list
LEFT JOIN www.user ON list.debt_user_id_1 = user.id 
LEFT JOIN www.user user2 ON list.debt_user_id_2 = user2.id
WHERE user2.id = 1  ";
$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "total" => count($array),
    "data" => $array
);

echo json_encode($dataset);
