<?php
session_start();
//銷燬session
session_destroy();
$dataset = array(
    "status" => "success",
);
echo json_encode($dataset);
