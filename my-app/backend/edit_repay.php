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
$list_id = (int) $data->list_id;
$note = $data->note;

$alert = (int) $data->alert;
if ($list_id != "" && $id != "" && $amount != "") {
    $sql = "UPDATE www.list 
    SET amount=$amount,debt_note=$note,debt_user_id_2=$id,debt_alert=$alert
    WHERE id=$list_id";
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
