<?php

use models\PDOBeerModel;
use PHPUnit\Framework\TestCase;

class PDOBeerModelTest extends TestCase
{
    private $connection = null;

    public function setUp(): void
    {
        $readJson = file_get_contents("properties.json");
        $data = json_decode($readJson, true);

        $user = $data["db_user"];
        $password = $data["db_passwd"];
        $databaseName = $data["testdb_name"];
        $server = $data["db_ip"];
        $this->connection = new PDO("mysql:host=$server;dbname=$databaseName", $user, $password);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->connection->exec("DROP TABLE IF EXISTS beersTest");
        $this->connection->exec(
            "CREATE TABLE beers(
                      id INT, 
                      name VARCHAR(255), 
                      description VARCHAR(255),
                      price FLOAT(4,2),  
                      alcohol FLOAT(4,2), 
                      image_base64_uri BLOB,
                      PRIMARY KEY (id))");

        $beers = $this->providerBeers();
        foreach ($beers as $beer) {
            $beerId = $beer["id"];
            $beerName = $beer["name"];
            $beerDescription = $beer["description"];
            $beerPrice = $beer["price"];
            $beerAlcohol = $beer["alcohol"];
            $beerImage = $beer["image_base64_uri"];
            $this->connection->exec("INSERT INTO beers ( id, name, description, price, alcohol, image_base64_uri ) 
            VALUES ( $beerId ,'$beerName' , '$beerDescription' , $beerPrice , $beerAlcohol , '$beerImage' )");
        }
    }

    public function tearDown(): void
    {
        $this->connection = null;
    }

    public function providerBeers()
    {
        $imageFolder = 'test/database/img/';
        $imagePaths = [
            $imageFolder . 'Jupiler.jpg',
            $imageFolder . 'Duvel.jpg',
            $imageFolder . 'StellaArtois.jpg',
        ];
        $base64EncodedImages = [];
        foreach ($imagePaths as $path) {
            $imgData = file_get_contents($path);
            $image = base64_encode($imgData);
            array_push($base64EncodedImages, $image);
        }

        return [
            [
                'id' => 1,
                'name' => 'Jupiler',
                'description' => 'Jupiler is the best selling beer in Belgium',
                'price' => 3,
                'alcohol' => 5.2,
                'image_base64_uri' => $base64EncodedImages[0]
            ],
            [
                'id' => 2,
                'name' => 'Duvel',
                'description' => 'Duvel is a natural beer with a subtle bitterness',
                'price' => 4,
                'alcohol' => 8.5,
                'image_base64_uri' => $base64EncodedImages[1]
            ],
            [
                'id' => 3,
                'name' => 'Stella Artois',
                'description' => 'Stella Artois is a Belgian pilsner which was first brewed by Brouwerij Artois in Leuven Belgium in 1926',
                'price' => 2,
                'alcohol' => 5.2,
                'image_base64_uri' => $base64EncodedImages[2]
            ],
        ];
    }

    public function providerExistingIds()
    {
        return [
            ["1"],
            ["2"],
            ["3"]
        ];
    }

    public function providerNonExistingIds()
    {
        return [
            [0],
            [11],
            ["abc"],
            [true],
            [null],
            [-1]
        ];
    }


    /**
     * @dataProvider providerExistingIds
     */
    public function testIdExists_existingId_true($id)
    {
        $beerModel = new PDOBeerModel($this->connection);
        $this->assertTrue($beerModel->idExists($id));
    }

    /**
     * @dataProvider providerNonExistingIds
     */
    public function testIdExists_nonExistingId_false($id)
    {
        $beerModel = new PDOBeerModel($this->connection);
        $this->assertFalse($beerModel->idExists($id));
    }

    public function testGetAllBeers()
    {

    }

    public function testAddNewBeer()
    {

    }

    public function testValidateId()
    {

    }

    public function testValidateName()
    {

    }

    public function testGetBeerById()
    {

    }
}
