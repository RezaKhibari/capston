<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
include 'db.php';

$sql = "SELECT t.id, t.amount, t.category_id, t.currency_code, t.description, t.transaction_date, t.transaction_type, t.user_id, 
               c.name AS category_name
        FROM transactions t 
        LEFT JOIN categories c ON t.category_id = c.id 
        ORDER BY t.transaction_date DESC";

$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);

$conn->close();
?>