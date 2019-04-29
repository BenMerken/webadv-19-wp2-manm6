<?php
require_once "vendor/autoload.php";

use models\PDOBeerModel;
use views\JsonBeerView;
use views\JsonBeersView;
use controllers\BeerController;

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

$beerModel = new PDOBeerModel($pdo);
$jsonBeerView = new JsonBeerView();
$jsonBeersView = new JsonBeersView();
$beerController = new BeerController($beerModel, $jsonBeerView, $jsonBeersView);

try {
    $router = new AltoRouter();
    $router->setBasePath("/api/");

// Router API mappings

    $router->map(
        "GET",
        "beers",
        function () use ($beerController) {
            $beerController->getAllBeers();
        }
    );

    $router->map(
        "GET",
        "beers/[:id]",
        function ($id) use ($beerController) {
            $beerController->getBeerById($id);
        }
    );

    $router->map(
        "POST",
        "beers",
        function () use ($beerController) {
            $requestBody = file_get_contents("php://input", "r");
            $jsonObject = json_decode($requestBody, true);
            if (!(
                isset($jsonObject["id"]) &&
                isset($jsonObject["name"]) &&
                isset($jsonObject["description"]) &&
                isset($jsonObject["price"]) &&
                isset($jsonObject["alcohol"]) &&
                isset($jsonObject["image_base64_uri"]))) {
                throw  new \InvalidArgumentException();
            }
            $beerId = $jsonObject["id"];
            $name = $jsonObject["name"];
            $description = $jsonObject["description"];
            $price = $jsonObject["price"];
            $alcohol = $jsonObject["alcohol"];
            $image = $jsonObject["image_base64_uri"];
            $beerController->addNewBeer($beerId, $name, $description, $price, $alcohol, $image);
        }
    );

    $router->map(
        "PUT",
        "beers/[i:id]",
        function ($id) use ($beerController) {
            $entityBody = file_get_contents("php://input", "r");
            $json = json_decode($entityBody);

            $name = null;
            if (isset($json["name"])) {
                $name = $json["name"];
            }
            $description = null;
            if (isset($json["description"])) {
                $description = $json["description"];
            }
            $price = null;
            if (isset($json["price"])) {
                $price = $json["price"];
            }
            $alcohol = null;
            if (isset($json["alcohol"])) {
                $alcohol = $json["alcohol"];
            }
            $image = null;
            if (isset($json["image_base64_uri"])) {
                $image = $json["image_base64_uri"];
            }
            $beerController->addNewBeer($id, $name, $description, $price, $alcohol, $image);
        }
    );

    $match = $router->match();
    if ($match && is_callable($match["target"])) {
        call_user_func_array($match["target"], $match["params"]);
    } else {
        http_response_code(400);
    }
} catch (InvalidArgumentException $exception) {
    http_response_code(400);

} catch (Exception $exception) {
    http_response_code(500);
}