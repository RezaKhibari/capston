<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database connection
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$amount = $data["amount"];
$category_id = $data["category_id"];
$currency_code = $data["currency_code"] ?? "USD";
$description = $data["description"] ?? NULL;
$transaction_date = $data["transaction_date"];
$transaction_type = $data["transaction_type"];
$user_id = $data["user_id"];

$sql = "UPDATE transactions 
        SET amount = ?, category_id = ?, currency_code = ?, description = ?, transaction_date = ?, transaction_type = ?, user_id = ?
        WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("dissssii", $amount, $category_id, $currency_code, $description, $transaction_date, $transaction_type, $user_id, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Transaction updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update transaction."]);
}

$stmt->close();
$conn->close();
?>