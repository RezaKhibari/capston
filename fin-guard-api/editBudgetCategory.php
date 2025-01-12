<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$budget_limit = $data["budget_limit"];

$sql = "UPDATE budget_categories SET budget_limit = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("di", $budget_limit, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Budget category updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update budget category."]);
}

$stmt->close();
$conn->close();
?>