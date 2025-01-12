<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$category_name = $data["category_name"];
$budget_limit = $data["budget_limit"];

$sql = "INSERT INTO budget_categories (user_id, category_name, budget_limit) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isd", $user_id, $category_name, $budget_limit);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Budget category added successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add budget category."]);
}

$stmt->close();
$conn->close();
?>