<?php namespace controllers;

use domain\Beer;
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
        $beer = new Beer();
        try {
            $beer = $this->beerModel->getBeerById($beerId);
            if ($beer->getId() == null) {
                $statuscode = 404;
            }
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        $this->jsonBeerView->show(["beer" => $beer, "statuscode" => $statuscode]);
    }

    public function addNewBeer(Beer $beer)
    {
        $statuscode = 201;
        try {
            $beer = $this->beerModel->addNewBeer($beer);
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        $this->jsonBeerView->show(["beer" => $beer, "statuscode" => $statuscode]);
    }

    public function putBeer(Beer $beer)
    {
        $statuscode = 201;
        try {
            if ($this->beerModel->idExists($beer->getId())) {
                $statuscode = 200;
            }
            $beer = $this->beerModel->putBeer($beer);
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        $this->jsonBeerView->show(["beer" => $beer, "statuscode" => $statuscode]);
    }
}
