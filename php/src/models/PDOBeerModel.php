<?php

namespace models;

class PDOBeerModel implements BeerModel
{
    private $pdo = null;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllBeers(): array
    {
        $statement = $this->pdo->prepare("SELECT * FROM beers;");
        $statement->bindColumn(1, $id, \PDO::PARAM_INT);
        $statement->bindColumn(2, $name, \PDO::PARAM_STR);
        $statement->bindColumn(3, $description, \PDO::PARAM_STR);
        $statement->bindColumn(4, $price, \PDO::PARAM_STR);
        $statement->bindColumn(5, $alcohol, \PDO::PARAM_STR);
        $statement->bindColumn(6, $image, \PDO::PARAM_LOB);
        $statement->execute();

        $beers = [];
        while ($statement->fetch(\PDO::FETCH_BOUND)) {

            array_push($beers,
                [
                    "id" => $id,
                    "name" => $name,
                    "description" => $description,
                    "price" => floatval($price),
                    "alcohol" => floatval($alcohol),
                    "image_base64_uri" => $image
                ]);
        }

        return $beers;
    }

    public function getBeerById($idExistingBeer): array
    {
        if ($this->idExists($idExistingBeer)) {

            $statement = $this->pdo->prepare("SELECT * FROM beers WHERE id=:id;");
            $statement->bindParam(":id", $idExistingBeer, \PDO::PARAM_INT);
            $statement->bindColumn(1, $id, \PDO::PARAM_INT);
            $statement->bindColumn(2, $name, \PDO::PARAM_STR);
            $statement->bindColumn(3, $description, \PDO::PARAM_STR);
            $statement->bindColumn(4, $price, \PDO::PARAM_STR);
            $statement->bindColumn(5, $alcohol, \PDO::PARAM_STR);
            $statement->bindColumn(6, $image, \PDO::PARAM_LOB);
            $statement->execute();

            $beer = [];
            while ($statement->fetch(\PDO::FETCH_BOUND)) {
                $beer = [
                    "id" => $id,
                    "name" => $name,
                    "description" => $description,
                    "price" => $price,
                    "alcohol" => floatval($alcohol),
                    "image_base64_uri" => $image
                ];
            }

            return $beer;
        }

        return [];
    }

    public function addNewBeer($id, $name, $description = "", $price = 0, $alcohol = 0, $image = ""): array
    {
        $this->validateId($id);
        $this->validateName($name);
        $this->validateDescription($description);

        $query = "INSERT INTO beers(
        id, name, description, price, alcohol, image_base64_uri) 
        VALUES(:id, :name, :description, :price, :alcohol, :image) 
        ON DUPLICATE KEY UPDATE id=:id, name=:name, description=:description, price=:price, alchol=:alcohol, image_base64_uri=:image;";
        if ($this->pdo->getAttribute(\PDO::ATTR_DRIVER_NAME) == "sqlite") {
            $query = "INSERT INTO beers(
        id, name, description, price, alcohol, image_base64_uri) 
        VALUES(:id, :name, :description, :price, :alcohol, :image);";
        }
        $statement = $this->pdo->prepare($query);
        $statement->bindParam(":id", $id, \PDO::PARAM_INT);
        $statement->bindParam(":name", $name, \PDO::PARAM_STR);
        $statement->bindParam(":description", $description, \PDO::PARAM_STR);
        $statement->bindParam(":price", $price, \PDO::PARAM_STR);
        $statement->bindParam(":alcohol", $alcohol, \PDO::PARAM_STR);
        $statement->bindParam(":image", $image, \PDO::PARAM_LOB);
        $statement->execute();

        return [
            "id" => $id,
            "name" => $name,
            "description" => $description,
            "price" => $price,
            "alcohol" => $alcohol,
            "image_base64_uri" => $image
        ];
    }

    public function idExists($id): bool
    {
        $this->validateId($id);
        $statement = $this->pdo->prepare("SELECT id FROM beers WHERE id=:id;");
        $statement->bindParam(":id", $id, \PDO::PARAM_INT);
        $statement->execute();
        return ($statement->fetch() == true);
    }

    public function validateId($id)
    {
        if (!(preg_match("/^[0-9]+$/", strval($id))
            && (int)$id > 0
            && !is_bool($id))) {

            throw new \InvalidArgumentException(
                "De id parameter moet een geheel getal, groter dan nul bevatten.");
        }
    }

    public function validateName($name)
    {
        if (!(is_string($name) &&
            strlen($name) >= 4)) {

            throw new \InvalidArgumentException(
                "De name parameter moet een string van minstens 4 karakters lang zijn.");
        }
    }

    public function validateDescription($description)
    {
        if (!(is_string($description) &&
            strlen($description) >= 15)) {

            throw new \InvalidArgumentException(
                "De description parameter moet een string van minstens 15 karakters lang zijn.");
        }
    }
}
