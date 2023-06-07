<?php
include "index_1.php";
// fetch records
$sql = "SELECT * 
FROM `list` 
WHERE ('list'.'user_id' = 'list'.'debt_user_id' OR 'list'.'user_id' = 'list'.'debt_user_id2') 
AND 'list'.'amount' < 0";
$result = mysqli_query($con, $sql);

while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}

$dataset = array(
    "echo" => 1,
    "totalrecords" => count($array),
    "totaldisplayrecords" => count($array),
    "data" => $array
);
echo json_encode($dataset);