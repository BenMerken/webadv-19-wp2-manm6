<?php namespace domain;

class Beer implements \JsonSerializable
{
    private $beerId;
    private $name;
    private $description;
    private $price;
    private $alcohol;
    private $image;

    public function __construct()
    {
    }

    public function getId()
    {
        return $this->beerId;
    }

    public function setId($beerId)
    {
        $this->beerId = $beerId;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getAlcohol()
    {
        return $this->alcohol;
    }

    public function setAlcohol($alcohol)
    {
        $this->alcohol = $alcohol;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setImage($image)
    {
        $this->image = $image;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }
}
