<?php
session_start();  // 啟用交談期
$amount = "";
$id = null;
$note = "";
$date = date("Y-m-d");
$alert = null;
// Start the session
include "index.php";
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$amount = (int) $data->amount;
$id = (int) $data->id;
$note = $data->note;
$user_id = $_SESSION['id'];
$alert = (int) $data->alert;
if ($user_id != "" && $id != "" && $amount != "") {
    $sql = "REPLACE INTO www.list 
    (amount,debt_date,debt_note,debt_user_id_1,debt_user_id_2,debt_alert,repay_alert)
    VALUES ($amount,'$date','$note',$id,$user_id,0,$alert)";
    $stmt = $con->prepare($sql);
    // set parameters and execute
    $stmt->execute();
    $dataset = array(
        "status" => "success"
    );
} else {
    $dataset = array(
        "status" => "fail"
    );
}
echo json_encode($dataset);
