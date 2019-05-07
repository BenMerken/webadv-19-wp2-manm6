<?php namespace models;


interface BeerModel
{
    public function getAllBeers();

    public function getBeerById($beerId);

    public function addNewBeer($name, $description, $price, $alcohol, $image);

    public function putBeer($beerId, $name, $description, $price, $alcohol, $image);

    public function idExists($beerId);

    public function validateId($beerId);

    public function validateName($name);

    public function validateDescription($description);
}
