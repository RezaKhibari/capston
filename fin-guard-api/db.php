<?php
    header("Content-Type: application/json");

    $host = 'localhost';
    $dbname = 'fin_guard';
    $username = 'root';
    $password = '123456';

    try {
        // Create a new PDO connection
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

        // Set error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }

?>