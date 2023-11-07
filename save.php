<?php

// This code is Complete. DO NOT TOUCH.

$host = 'localhost';
$dbname = 'quotes_database';
$user = '(THIS SHOULD BE YOUR USERNAME)';
$pass = '(THIS SHOULD BE YOUR PASSWORD)';
$charset = 'utf8mb4';

// Establish a database connection using MySQLi
$connection = mysqli_connect($host, $user, $pass, $dbname);

// Get the quote content and author from the POST request
$content = $_POST['content'];
$author = $_POST['author'];

// Insert the quote into the database
$sql = "INSERT INTO quotes (content, author) VALUES (?, ?)";
$stmt = mysqli_prepare($connection, $sql);
mysqli_stmt_bind_param($stmt, "ss", $content, $author);
$result = mysqli_stmt_execute($stmt);

// Return a response indicating success or failure
if ($result) {
    echo 'Quote saved successfully!';
} else {
    echo 'Failed to save the quote.';
}

// Close the database connection
mysqli_close($connection);
?>
