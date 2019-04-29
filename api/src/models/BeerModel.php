<?php namespace models;


interface BeerModel
{
    public function getAllBeers();

    public function getBeerById($beerId);

    public function addNewBeer($beerId, $name, $description = "", $alcohol = 0, $image = "");

    public function idExists($beerId);

    public function validateId($beerId);

    public function validateName($name);

    public function validateDescription($description);
}
