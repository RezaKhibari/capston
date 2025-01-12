<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: http://localhost:3000");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php'; // Database connection


// Read input data
$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Validate input
if (!empty($username) && !empty($email) && !empty($password)) {
    try {
        // Prepare SQL query
        $insertQuery = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");

        // Bind parameters
        $insertQuery->bindParam(':username', $username);
        $insertQuery->bindParam(':email', $email);
        $insertQuery->bindParam(':password', $password);

        // Execute query
        $insertQuery->execute();

        echo json_encode(["status" => "success", "message" => "User registered successfully"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input data"]);
}
?>