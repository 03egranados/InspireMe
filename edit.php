<?php

// This code is Complete. DO NOT TOUCH.

$host = 'localhost';
$dbname = 'quotes_database';
$user = '(THIS SHOULD BE YOUR USERNAME)';
$pass = '(THIS SHOULD BE YOUR PASSWORD)';
$charset = 'utf8mb4';

// Establish a database connection
$connection = mysqli_connect($host, $user, $pass, $dbname);

// Get the record ID from the request
$recordID = $_GET['id'];

// Retrieve the record from the database
$query = "SELECT * FROM quotes WHERE id=$recordID";
$result = mysqli_query($connection, $query);

if ($result && mysqli_num_rows($result) > 0) {
    $record = mysqli_fetch_assoc($result);

    // Return the record data as JSON
    header('Content-Type: application/json');
    echo json_encode($record);
} else {
    // Handle the case where the record is not found
    echo "Record not found";
}

// Close the database connection
mysqli_close($connection);
?>
