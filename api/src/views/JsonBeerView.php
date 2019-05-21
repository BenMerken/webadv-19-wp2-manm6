<?php namespace views;

class JsonBeerView
{
    public function show(array $data)
    {
        header('Content-type: application/json');
        header('Access-Control-Allow-Origin: *');
        http_response_code($data["statuscode"]);
        $beer = $data["beer"];
        print (json_encode($beer));
    }
}
