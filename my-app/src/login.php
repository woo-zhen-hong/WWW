<?php
session_start();  // 啟用交談期
$account = "";
$password = "";
// 取得表單欄位值
if (!empty($_POST['account']) and !empty($_POST['password'])) {
    $account = $_POST['account'];
    $password = $_POST['password'];
}
// 檢查是否輸入使用者名稱和密碼
if ($account != "" && $password != "") {
    $username = "jk";
    $passwordforlogin = "jk123";
    $hostname = "140.127.74.186";
    //connection string with database  
    $dbhandle = mysqli_connect($hostname, $username, $passwordforlogin)
        or die("Unable to connect to phpmyadmin");
    // connect with database  
    $selected = mysqli_select_db($dbhandle, "410977002")
        or die("Could not select database");
    $sql = "SELECT * FROM `account` WHERE password='";
    $sql .= $password . "' AND account='" . $account . "';";
    // 執行SQL查詢
    echo $sql;
    $result = mysqli_query($dbhandle, $sql);
    $total_records = mysqli_num_rows($result);
    $user = mysqli_fetch_assoc($result);

    // 是否有查詢到使用者記錄
    if ($total_records > 0) {
        // 成功登入, 指定Session變數
        $_SESSION['account'] = $account;
        $_SESSION["login_session"] = true;
        if($user['identity'] == 1){
            header("Refresh: 0; url=manager.html");
        }
        if($user['identity'] == 2){
            header("Refresh: 0; url=shipper.html");
        }
        if($user['identity'] == 3){
            header("Refresh: 0; url=home.html");
        }
        echo "success";
    } else {  // 登入失敗
        $_SESSION["login_session"] = false;
        echo "<script> {window.alert('使用者名稱或密碼錯誤！');location.href='login.html'} </script>";
    }
    //   mysqli_close($link);  // 關閉資料庫連接  
} else {
    echo "<script> {window.alert('請輸入帳號密碼！');location.href='login.php'} </script>";
}