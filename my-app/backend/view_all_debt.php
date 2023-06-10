<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$sql = "SELECT  list.amount 'money',list.debt_date 'date',list.debt_alert 'tags' 
,list.debt_note 'note'
, list.debt_user_id_1 'note', user.name 'debt_name'
, list.debt_user_id_2 'note', user2.name 'back_name'
FROM www.list
LEFT JOIN www.user ON list.debt_user_id_1 = user.id AND user.id 
LEFT JOIN www.user user2 ON list.debt_user_id_2 = user2.id
WHERE user.id = 1 or user2.id = 1 
     ";

$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = $array;
print_r($data);
echo json_encode($dataset);