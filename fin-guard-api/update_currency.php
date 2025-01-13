<?php
require_once "db.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['user_id'];
$currency = $data['currency'];

$sql = "UPDATE users SET preferred_currency = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $currency, $userId);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Currency updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update currency"]);
}
?>