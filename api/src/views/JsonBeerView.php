<?php namespace views;

class JsonBeerView
{
    public function show(array $data)
    {
        header("Content-Type: application/json");
        http_response_code($data["statuscode"]);
        $beer = $data["beer"];
        print (json_encode($beer));
    }
}
