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
            $beers= $this->beerModel->getAllBeers();
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        $this->jsonBeersView->show(["beers" => $beers, "statuscode" => $statuscode]);
    }

    public function addNewBeer($id, $name, $description = "", $price = 0, $alcohol = 0, $image = "")
    {
        $statuscode = 201;
        $beer = [];
        try {
            if ($this->beerModel->idExists($id)) {
                $statuscode = 200;
            }
            $beer = $this->beerModel->addNewBeer($id, $name, $description, $price, $alcohol, $image);
        } catch (\InvalidArgumentException $exception) {
            $statuscode = 400;
        } catch (\PDOException $exception) {
            $statuscode = 500;
        }
        $this->jsonBeerView->show(['beer' => $beer, 'statuscode' => $statuscode]);
    }
}
