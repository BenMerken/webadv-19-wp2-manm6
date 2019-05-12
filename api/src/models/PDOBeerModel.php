<?php

namespace models;

use domain\Beer;

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
        $statement->execute();
        $statement->bindColumn(1, $beerId, \PDO::PARAM_INT);
        $statement->bindColumn(2, $name, \PDO::PARAM_STR);
        $statement->bindColumn(3, $description, \PDO::PARAM_STR);
        $statement->bindColumn(4, $price, \PDO::PARAM_STR);
        $statement->bindColumn(5, $alcohol, \PDO::PARAM_STR);
        $statement->bindColumn(6, $image, \PDO::PARAM_LOB);

        $beers = [];
        while ($statement->fetch(\PDO::FETCH_BOUND)) {
            $beer = new Beer();
            $beer->setId($beerId);
            $beer->setId($beerId);
            $beer->setName($name);
            $beer->setDescription($description);
            $beer->setPrice($price);
            $beer->setAlcohol($alcohol);
            $beer->setImage($image);

            $beers[] = $beer;
        }

        return $beers;
    }

    public function getBeerById($idExistingBeer): Beer
    {
        $beer = new Beer();
        if ($this->idExists($idExistingBeer)) {

            $statement = $this->pdo->prepare("SELECT * FROM beers WHERE id=:id;");
            $statement->bindParam(":id", $idExistingBeer, \PDO::PARAM_INT);
            $statement->bindColumn(1, $beerId, \PDO::PARAM_INT);
            $statement->bindColumn(2, $name, \PDO::PARAM_STR);
            $statement->bindColumn(3, $description, \PDO::PARAM_STR);
            $statement->bindColumn(4, $price, \PDO::PARAM_STR);
            $statement->bindColumn(5, $alcohol, \PDO::PARAM_STR);
            $statement->bindColumn(6, $image, \PDO::PARAM_LOB);
            $statement->execute();

            while ($statement->fetch(\PDO::FETCH_BOUND)) {
                $beer->setId($beerId);
                $beer->setName($name);
                $beer->setDescription($description);
                $beer->setPrice($price);
                $beer->setAlcohol($alcohol);
                $beer->setImage($image);
            }
        }

        return $beer;
    }

    public function addNewBeer($beer): Beer
    {
        $this->validateName($beer->getName());
        $this->validateDescription($beer->getDescription());

        $query = "INSERT INTO beers(
        name, description, price, alcohol, image_base64_uri) 
        VALUES(:name, :description, :price, :alcohol, :image);";

        $statement = $this->pdo->prepare($query);
        $name = $beer->getName();
        $description = $beer->getDescription();
        $price = $beer->getPrice();
        $alcohol = $beer->getAlcohol();
        $image = $beer->getImage();

        $statement->bindParam(":name", $name, \PDO::PARAM_STR);
        $statement->bindParam(":description", $description, \PDO::PARAM_STR);
        $statement->bindParam(":price", $price, \PDO::PARAM_STR);
        $statement->bindParam(":alcohol", $alcohol, \PDO::PARAM_STR);
        $statement->bindParam(":image", $image, \PDO::PARAM_LOB);
        $statement->execute();

        $beerId = intval($this->pdo->lastInsertId());

        $beer->setId($beerId);
        return $beer;
    }

    public function putBeer($beer)
    {
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
        $statement->bindParam(":id", $beer->getId(), \PDO::PARAM_INT);
        $statement->bindParam("name", $beer->getName(), \PDO::PARAM_STR);
        $statement->bindParam(":description", $beer->getDescription(), \PDO::PARAM_STR);
        $statement->bindParam(":price", $beer->getPrice(), \PDO::PARAM_STR);
        $statement->bindParam(":alcohol", $beer->getAlcohol(), \PDO::PARAM_INT);
        $statement->bindParam(":image", $beer->getImage(), \PDO::PARAM_INT);
        $statement->execute();

        return $beer;
    }

    public function idExists($beerId): bool
    {
        $this->validateId($beerId);
        $statement = $this->pdo->prepare("SELECT id FROM beers WHERE id=:id;");
        $statement->bindParam(":id", $beerId, \PDO::PARAM_INT);
        $statement->execute();
        return ($statement->fetch() == true);
    }

    public function validateId($beerId)
    {
        if (!(preg_match("/^[0-9]+$/", strval($beerId))
            && (int)$beerId > 0
            && !is_bool($beerId))) {

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
