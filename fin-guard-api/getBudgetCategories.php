<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$user_id = $_GET['user_id'];

$sql = "SELECT bc.id, bc.category_name, bc.budget_limit, 
               (SELECT SUM(t.amount) 
                FROM transactions t 
                WHERE t.category_id = bc.id 
                  AND t.user_id = bc.user_id 
                  AND MONTH(t.transaction_date) = MONTH(CURRENT_DATE()) 
                  AND YEAR(t.transaction_date) = YEAR(CURRENT_DATE())) AS total_spent
        FROM budget_categories bc
        WHERE bc.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$stmt->close();
$conn->close();
?>