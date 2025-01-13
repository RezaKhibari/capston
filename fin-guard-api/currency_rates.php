<?php
header("Content-Type: application/json");

// Replace with your API key
$apiKey = "YOUR_EXCHANGE_RATE_API_KEY";
$apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

try {
    $response = file_get_contents($apiUrl);
    echo $response;
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Unable to fetch currency rates.",
    ]);
}
?>