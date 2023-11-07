<?php

// This code is Complete. DO NOT TOUCH.

$host = 'localhost';
$dbname = 'quotes_database';
$user = '(THIS SHOULD BE YOUR USERNAME)';
$pass = '(THIS SHOULD BE YOUR PASSWORD)';
$charset = 'utf8mb4';

// Establish a database connection using MySQLi
$connection = mysqli_connect($host, $user, $pass, $dbname);

// Function to execute a query and return data as an array
function executeQuery($connection, $sql) {
    $result = mysqli_query($connection, $sql);

    if (!$result) {
        die('Error: ' . mysqli_error($connection));
    }
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    return $data;
}

// Fetch all quotes from the new schema
$sql = "SELECT id, content, author FROM quotes";
$data = executeQuery($connection, $sql);

// Set the response header to specify JSON content type
header('Content-Type: application/json');

// Encode the fetched data as JSON and send it as the HTTP response
echo json_encode($data);

?>
