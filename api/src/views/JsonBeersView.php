<?php namespace views;

class JsonBeersView
{
    public function show(array $data)
    {
        header('Content-type: application/json');
        header('Access-Control-Allow-Origin: *');
        http_response_code($data["statuscode"]);
        $beers = $data["beers"];
        print (json_encode($beers));
    }
}
