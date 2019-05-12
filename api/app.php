<?php
require_once "vendor/autoload.php";

use models\PDOBeerModel;
use views\JsonBeerView;
use views\JsonBeersView;
use controllers\BeerController;
use domain\Beer;

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
        "beers/[i:id]",
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
                isset($jsonObject["name"]) &&
                isset($jsonObject["description"]) &&
                isset($jsonObject["price"]) &&
                isset($jsonObject["alcohol"]))) {
                throw  new \InvalidArgumentException();
            }
            $name = $jsonObject["name"];
            $description = $jsonObject["description"];
            $price = $jsonObject["price"];
            $alcohol = $jsonObject["alcohol"];
            $image = isset($jsonObject["image_base64_uri"]) ? $jsonObject["image_base64_uri"] : "";

            $beer = new Beer();
            $beer->setName($name);
            $beer->setDescription($description);
            $beer->setPrice($price);
            $beer->setAlcohol($alcohol);
            $beer->setImage($image);

            $beerController->addNewBeer($beer);
        }
    );

    $router->map(
        "PUT",
        "beers/[i:id]",
        function ($id) use ($beerController) {
            $entityBody = file_get_contents("php://input", "r");
            $json = json_decode($entityBody, true);

            $name = "";
            if (isset($json["name"])) {
                $name = $json["name"];
            }
            $description = "";
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
            $image = "";
            if (isset($json["image_base64_uri"])) {
                $image = $json["image_base64_uri"];
            }

            $beer = new Beer();
            $beer->setId($id);
            $beer->setName($name);
            $beer->setDescription($description);
            $beer->setPrice($price);
            $beer->setAlcohol($alcohol);
            $beer->setImage($image);

            $beerController->putBeer($beer);
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
