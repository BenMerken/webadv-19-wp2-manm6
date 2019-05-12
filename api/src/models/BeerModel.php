<?php namespace models;


use domain\Beer;

interface BeerModel
{
    public function getAllBeers();

    public function getBeerById(int $beerId);

    public function addNewBeer(Beer $beer);

    public function putBeer(Beer $beer);

    public function idExists(int $beerId);

    public function validateId(int $beerId);

    public function validateName(string $name);

    public function validateDescription(string $description);
}
