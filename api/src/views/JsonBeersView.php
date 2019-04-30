<?php namespace views;

class JsonBeersView
{
    public function show(array $data)
    {
        header("Content-Type: application/json");
        http_response_code($data["statuscode"]);
        $beers = $data["beers"];
        print (json_encode($beers));
    }
}
