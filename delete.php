<?php

// This code is Complete. DO NOT TOUCH.

$host = 'localhost';
$dbname = 'quotes_database';
$user = '(THIS SHOULD BE YOUR USERNAME)';
$pass = '(THIS SHOULD BE YOUR PASSWORD)';
$charset = 'utf8mb4';

// Establish a database connection
$connection = mysqli_connect($host, $user, $pass, $dbname);

// Get the record ID from the JSON request
$data = json_decode(file_get_contents("php://input"), true);
$recordID = $data['id'];

// Validate the record ID (add more validation if needed)
if (!is_numeric($recordID)) {
    http_response_code(400); // Bad request
    echo json_encode(['error' => 'Invalid record ID']);
    exit;
}

// Delete the record from the database
$query = "DELETE FROM quotes WHERE id = $recordID";

if (mysqli_query($connection, $query)) {
    http_response_code(200); // OK
    echo json_encode(['message' => 'Record deleted successfully']);
} else {
    http_response_code(500); // Internal server error
    echo json_encode(['error' => 'Error deleting record: ' . mysqli_error($connection)]);
}

// Close the database connection
mysqli_close($connection);
?>
