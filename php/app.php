<?php
require_once "vendor/autoload.php";

use models\PDOBeerModel;

/* Firstly, read the database properties from the ../properties.json
 file, and put them in an associative array, from which you can read
the database properties.
*/

$readJson = file_get_contents('properties.json');
$data = json_decode($readJson, true);

$user = $data["db_user"];
$password = $data["db_passwd"];
$databaseName = $data["db_name"];
$server = $data["db_ip"];
$pdo = null;

try {
    $pdo = new PDO("mysql:host=$server;dbname=$databaseName", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    http_response_code(500);
    exit;
}

$personModel = new PDOBeerModel($pdo);
