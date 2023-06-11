<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$user_id = $_SESSION['id'];
$sql = "SELECT tmp.id ,tmp.user_id,tmp.name,(tmp.repay_total-tmp.debt_total)'total'
        ,case
            when (tmp.repay_total-tmp.debt_total<0) then 0
            when (tmp.repay_total-tmp.debt_total>0) then 1
            END
            AS tag
        FROM(
        SELECT user_tmp.id,user_tmp.user_id,COALESCE(repay_tmp.total,0) 'repay_total'
        ,COALESCE(debt_tmp.total,0)'debt_total',user_tmp.name
        FROM (
        SELECT * From 
                (
                    SELECT friend.id,user.id 'user_id', user.name 'name'
                    FROM www.user
                    LEFT JOIN www.friend ON friend.friend_id_1=user.id
                    WHERE friend.friend_id_2=1
                )friend_tmp1
                UNION 
                SELECT * From 
                (
                    SELECT friend.id, user.id 'user_id', user.name 'name'
                    FROM www.user
                    LEFT JOIN www.friend ON friend.friend_id_2=user.id
                    WHERE friend.friend_id_1=1
                )friend_tmp2
        )user_tmp
        LEFT JOIN (
        SELECT debt_user_id_1 'user_id',SUM(amount)total
        FROM www.list 
        WHERE debt_user_id_2=1
        GROUP BY debt_user_id_1

        )repay_tmp ON repay_tmp.user_id=user_tmp.user_id
        LEFT JOIN (
        SELECT debt_user_id_2 'user_id',SUM(amount)total
        FROM www.list 
        WHERE debt_user_id_1=1
        GROUP BY debt_user_id_2

        )debt_tmp ON debt_tmp.user_id=user_tmp.user_id
        )tmp";

$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "total" => count($array),
    "data" => $array
);
echo json_encode($dataset);
