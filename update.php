<?php

// This code is Complete. DO NOT TOUCH.

$host = 'localhost';
$dbname = 'quotes_database';
$user = '(THIS SHOULD BE YOUR USERNAME)';
$pass = '(THIS SHOULD BE YOUR PASSWORD)';
$charset = 'utf8mb4';

// Establish a database connection
$connection = mysqli_connect($host, $user, $pass, $dbname);

// Get the edited data from the POST request, checking if keys exist
$data = json_decode(file_get_contents("php://input"), true);
$recordID = isset($data['recordID']) ? (int)$data['recordID'] : 0;
$editedContent = isset($data['editedContent']) ? $data['editedContent'] : null;
$editedAuthor = isset($data['editedAuthor']) ? $data['editedAuthor'] : null;

// Update the record in your database
$query = "UPDATE quotes SET content='$editedContent', author='$editedAuthor' WHERE id=$recordID";

// Execute the query
if (mysqli_query($connection, $query)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($connection);
}

// Close the database connection
mysqli_close($connection);
?>
