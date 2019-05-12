<?php namespace domain;

class Beer implements \JsonSerializable
{
    private $id;
    private $name;
    private $description;
    private $price;
    private $alcohol;
    private $image;

    public function __construct()
    {
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName($name): void
    {
        $this->name = $name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription($description): void
    {
        $this->description = $description;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice($price): void
    {
        $this->price = $price;
    }

    public function getAlcohol(): float
    {
        return $this->alcohol;
    }

    public function setAlcohol($alcohol): void
    {
        $this->alcohol = $alcohol;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function setImage($image): void
    {
        $this->image = $image;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }
}
