<?php
require_once "vendor/autoload.php";

/*Firstly, read the database properties from the ../properties.json
 file, and put them in an associative array, from which you can read
the database properties.
*/

$readJson = file_get_contents('../properties.json');
$data = json_decode($readJson, true);

$user = $data["db_user"];
$password = $data["db_passwd"];
$database = $data["db"];
$server = $data["db_ip"];
$pdo = null;


