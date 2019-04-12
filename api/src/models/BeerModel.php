<?php namespace models;


interface BeerModel
{
    public function getAllBeers();

    public function getBeerById($id);

    public function idExists($id);
}
