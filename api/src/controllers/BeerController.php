<?php namespace controllers;

use models\BeerModel;
use views\JsonBeerView;
use views\JsonBeersView;

class BeerController
{
    private $beerModel;
    private $jsonBeerView;
    private $jsonBeersView;

    public function __construct(BeerModel $beerModel, JsonBeerView $jsonBeerView, JsonBeersView $jsonBeersView)
    {
        $this->beerModel = $beerModel;
        $this->jsonBeerView = $jsonBeerView;
        $this->jsonBeersView = $jsonBeersView;
    }

    public function getAllBeers()
    {
        $statuscode = 200;
        $beers = [];
        try {
            $beers = $this->beerModel->getAllBeers();
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        $this->jsonBeersView->show(["beers" => $beers, "statuscode" => $statuscode]);
    }

    public function getBeerById($beerId)
    {
        $statuscode = 200;
        $beer = [];
        try {
            $beer = $this->beerModel->getBeerById($beerId);
            if ($beer == []) {
                $statuscode = 404;
            }
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        $this->jsonBeerView->show(["beer" => $beer, "statuscode" => $statuscode]);
    }

    public function addNewBeer($name, $description, $price = 0, $alcohol = 0, $image = "")
    {
        $statuscode = 201;
        $beer = [];
        try {
            $beer = $this->beerModel->addNewBeer($name, $description, $price, $alcohol, $image);
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        $this->jsonBeerView->show(["beer" => $beer, "statuscode" => $statuscode]);
    }

    public function putBeer($beerId, $name, $description, $price = 0, $alcohol = 0, $image = "")
    {
        $statuscode = 201;
        $beer = null;
        try {
            if ($this->beerModel->idExists($beerId)) {
                $statuscode = 200;
            }
            $beer = $this->beerModel->putBeer($beerId, $name, $description, $price, $alcohol, $image);
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        $this->jsonBeerView->show(["beer" => $beer, "statuscode" => $statuscode]);

    }
}
