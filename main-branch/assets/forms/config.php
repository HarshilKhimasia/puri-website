<?php
$servername = "localhost";
$username = "puriseleqtuser";
$password = "}0[i2*co9XO$";

try {
	$conn = new PDO("mysql:host=$servername;dbname=puriseleqt_DB", $username, $password);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// echo "Connected successfully";
} catch (PDOException $e) {
	echo "Connection failed: " . $e->getMessage();
}

?>