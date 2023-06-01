<?php
$servername = "36.238.114.4:3306";
$username = "jk";
$password = "jk123";
$dbname = "www";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//$userid = $_GET["id"];
// prepare and bind
$stmt = $conn->prepare("SELECT name,email,password FROM `www`;");
//$stmt->bind_param("i", $userid);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) { // output data of each row 
    while($row = $result->fetch_assoc()) {
        echo "name: " . $row["name"]. " email: " . $row["email"]. " password: " . $row["password"]. "<br>";
    }
}
else {
    echo "0 results";
}

echo "New records created successfully";

$stmt->close();
$conn->close();
?>