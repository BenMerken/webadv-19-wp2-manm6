<?php

namespace models;


use http\Exception\InvalidArgumentException;

class PDOBeerModel implements BeerModel
{
    private $pdo = null;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllBeers(): array
    {
        $statement = $this->pdo->prepare("SELECT * FROM beers");
        $statement->bindColumn(1, $id, \PDO::PARAM_INT);
        $statement->bindColumn(2, $name, \PDO::PARAM_STR);
        $statement->bindColumn(3, $description, \PDO::PARAM_STR);
        $statement->bindColumn(4, $alcohol, \PDO::PARAM_STR);
        $statement->bindColumn(5, $image, \PDO::PARAM_LOB);
        $statement->execute();

        $beers = [];
        while ($statement->fetch(\PDO::FETCH_BOUND)) {

            $beers[] = [
                "id" => $id,
                "name" => $name,
                "description" => $description,
                "alcohol" => floatval($alcohol),
                "image_base64_uri" => $image
            ];
        }

        return $beers;
    }

    public function getBeerById($idExistingBeer): array
    {
        if ($this->idExists($idExistingBeer)) {

            $statement = $this->pdo->prepare("SELECT * FROM beers WHERE id=?");
            $statement->bindParam(1, $idExistingBeer);
            $statement->bindColumn(1, $id, \PDO::PARAM_INT);
            $statement->bindColumn(2, $name, \PDO::PARAM_STR);
            $statement->bindColumn(3, $description, \PDO::PARAM_STR);
            $statement->bindColumn(4, $alcohol, \PDO::PARAM_STR);
            $statement->bindColumn(5, $image, \PDO::PARAM_LOB);
            $statement->execute();

            $beer = [
                "id" => $id,
                "name" => $name,
                "description" => $description,
                "alcohol" => floatval($alcohol),
                "image_base64_uri" => $image
            ];

            return $beer;
        }

        return null;
    }

    public function addNewBeer($id, $name, $description = "", $alcohol = 0, $image = "")
    {
        $this->validateId($id);
        $this->validateName($name);

        $statement = $this->pdo->prepare(
            "INSERT INTO beers(
        id, name, description, alcohol, image) 
        VALUES(:id,:name,:description,:alcohol,:image) 
        ON DUPLICATE KEY UPDATE id=:id+1");
        $statement->bindParam(":id", $id, \PDO::PARAM_INT);
        $statement->bindParam(":name", $name, \PDO::PARAM_STR);
        $statement->bindParam(":description", $description, \PDO::PARAM_STR);
        $statement->bindParam(":alcohol", $alcohol, \PDO::PARAM_STR);
        $statement->bindParam(":image_base64_uri", $image, \PDO::PARAM_LOB);
        $statement->execute();

        return [
            "id" => $id,
            "name" => $name,
            "description" => $description,
            "alcohol" => $alcohol,
            "image_base64_uri" => $image
        ];
    }

    public function idExists($id): bool
    {
        $this->validateId($id);
        $statement = $this->pdo->prepare("SELECT id FROM beers WHERE id=?");
        $statement->bindParam(1, $id, \PDO::PARAM_INT);
        $statement->execute();
        if ($statement->fetch() === false) {
            return false;
        }

        return true;
    }

    public function validateId($id)
    {
        if (!(is_string($id) &&
            preg_match("/^[0-9]+$/", $id)
            && (int)$id > 0)) {

            throw new \InvalidArgumentException(
                "De id parameter moet een geheel getal, groter dan nul bevatten.");
        }
    }

    public function validateName($name)
    {
        if (!(is_string($name) &&
            strlen($name) >= 4)) {

            throw new InvalidArgumentException(
                "De name parameter moet een string van minstens 4 karakters lang zijn.");
        }
    }
}
