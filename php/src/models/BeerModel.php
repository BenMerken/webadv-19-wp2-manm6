<?php namespace models;


interface BeerModel
{
    public function getAllBeers();

    public function getBeerById($id);

    public function addNewBeer($id, $name, $description = "", $alcohol = 0, $image = "");

    public function idExists($id);

    public function validateId($id);

    public function validateName($name);

    public function validateDescription($description);
}
