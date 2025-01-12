<?php
// Include database connection
include 'db.php';

// Set the header to handle JSON response
header("Content-Type: application/json");

// Read input data
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Validate input
if (!empty($email) && !empty($password)) {
    try {
        // Check user in the database
        $query = $conn->prepare("SELECT * FROM users WHERE email = :email");
        $query->bindParam(':email', $email);
        $query->execute();

        // Fetch user
        $user = $query->fetch(PDO::FETCH_ASSOC);

        if ($user && $password === $user['password']) {
            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user" => [
                    "id" => $user['id'],
                    "username" => $user['username'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Email and password are required"]);
}
?>