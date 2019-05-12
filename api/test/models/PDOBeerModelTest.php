<?php

use domain\Beer;
use models\PDOBeerModel;
use PHPUnit\Framework\TestCase;

class PDOBeerModelTest extends TestCase
{
    private $connection = null;

    public function setUp(): void
    {
        $this->connection = new PDO("sqlite::memory:");
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->connection->exec("DROP TABLE IF EXISTS beers");
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
            $beerId = $beer->getId();
            $beerName = $beer->getName();
            $beerDescription = $beer->getDescription();
            $beerPrice = $beer->getPrice();
            $beerAlcohol = $beer->getAlcohol();
            $beerImage = $beer->getImage();
            $this->connection->exec("INSERT INTO beers ( id, name, description, price, alcohol, image_base64_uri ) 
            VALUES ( $beerId ,'$beerName' , '$beerDescription' , $beerPrice , $beerAlcohol , '$beerImage' );");
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

        $beer1 = new Beer();
        $beer1->setId(1);
        $beer1->setName("Jupiler");
        $beer1->setDescription("Jupiler is the best selling beer in Belgium");
        $beer1->setPrice(3);
        $beer1->setAlcohol(5.2);
        $beer1->setImage($base64EncodedImages[0]);

        $beer2 = new Beer();
        $beer2->setId(2);
        $beer2->setName("Duvel");
        $beer2->setDescription("Duvel is a natural beer with a subtle bitterness");
        $beer2->setPrice(4);
        $beer2->setAlcohol(8.5);
        $beer2->setImage($base64EncodedImages[1]);

        $beer3 = new Beer();
        $beer3->setId(3);
        $beer3->setName("Stella Artois");
        $beer3->setDescription("Stella Artois is a Belgian pilsner which was first brewed by Brouwerij Artois in Leuven Belgium in 1926");
        $beer3->setPrice(2);
        $beer3->setAlcohol(5.2);
        $beer3->setImage($base64EncodedImages[2]);

        return
            [
                $beer1,
                $beer2,
                $beer3
            ];
    }

    public function providerExistingIds()
    {
        return [
            [1],
            [2],
            [3]
        ];
    }

    public function providerNonExistingIds()
    {
        return [
            ["4"],
            ["1000"],
            ["78521"],
            [4],
            [1000],
            [74178],
        ];
    }

    public function providerValidIds()
    {
        return [
            [1],
            [100],
            [147],
            [9999],
        ];
    }

    public function providerInvalidIds()
    {
        return [
            [null],
            [true],
            [false],
            [-1],
            [0],
            ["-1"],
            ["0"],
            ["-9999"]
        ];
    }

    public function providerValidNames()
    {
        return [
            ["name"],
            ["azertyui"],
            [",;:=:feqAZEFé&é7451"]
        ];
    }

    public function providerInvalidNames()
    {
        return [
            ["abc"],
            [""],
            ["7"],
            [",;"]
        ];
    }

    public function providerValidDescription()
    {
        return [
            ["This is a valid"]
        ];
    }

    public function providerInvalidDescription()
    {
        return [
            ["This is a vali"]
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

    /**
     * @dataProvider providerValidIds
     */
    public function testValidateId_validId_void($id)
    {
        $beerModel = new PDOBeerModel($this->connection);
        $this->assertNull($beerModel->validateId($id));
    }

    /**
     * @dataProvider providerInvalidIds
     */
    public function testValidateId_invalidId_throwInvalidArgumentException($id)
    {
        $exceptionMessage = "De id parameter moet een geheel getal, groter dan nul bevatten.";
        $beerModel = new PDOBeerModel($this->connection);
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage($exceptionMessage);
        $beerModel->validateId($id);
    }

    /**
     * @dataProvider providerValidNames
     */
    public function testValidateName_validName_void($name)
    {
        $beerModel = new PDOBeerModel($this->connection);
        $this->assertNull($beerModel->validateName($name));
    }

    /**
     * @dataProvider providerInvalidNames
     */
    public function testValidateName_invalidName_throwInvalidArgumentException($name)
    {
        $exceptionMessage = "De name parameter moet een string van minstens 4 karakters lang zijn.";
        $beerModel = new PDOBeerModel($this->connection);
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage($exceptionMessage);
        $beerModel->validateName($name);
    }

    /**
     * @dataProvider providerValidDescription
     */
    public function testValidateDescription_validDescription_void($description)
    {
        $beerModel = new PDOBeerModel($this->connection);
        $this->assertNull($beerModel->validateDescription($description));
    }

    /**
     * @dataProvider providerInvalidDescription
     */
    public function testValidateDescription_invalidDescription_throwInvalidArgumentException($description)
    {
        $exceptionMessage = "De description parameter moet een string van minstens 15 karakters lang zijn.";
        $beerModel = new PDOBeerModel($this->connection);
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage($exceptionMessage);
        $beerModel->validateDescription($description);
    }

    public function testGetAllBeers_arrayBeers()
    {
        $beerModel = new PDOBeerModel($this->connection);
        $actualBeers = $beerModel->getAllBeers();
        $expectedBeers = $this->providerBeers();
        $this->assertEquals("array", gettype($actualBeers));
        $this->assertEquals(count($expectedBeers), count($actualBeers));
        for ($index = 0; $index < count($actualBeers); $index++) {
            $this->assertEquals($actualBeers[$index], $expectedBeers[$index]);
        }
    }

    /**
     * @dataProvider providerExistingIds
     */
    public function testGetBeerById_existingId_beerObject($id)
    {
        $beerModel = new PDOBeerModel($this->connection);
        $actualBeer = $beerModel->getBeerById($id);
        $expectedBeer = $this->providerBeers()[$id - 1];
        $this->assertEquals("object", gettype($actualBeer));
        $this->assertEquals($expectedBeer, $actualBeer);
    }

    /**
     * @dataProvider providerNonExistingIds
     */
    public function testGetBeerById_nonExistingId_emptyBeerObject($id)
    {
        $beerModel = new PDOBeerModel($this->connection);
        $actualBeer = $beerModel->getBeerById($id);
        $this->assertEquals(new Beer(), $actualBeer);
    }

    public function testAddNewBeer_validBeerObject_beerObject()
    {
        $imagePath = "test/database/img/Heineken.jpg";
        $imageData = file_get_contents($imagePath);
        $imageEncoded = base64_encode($imageData);

        $beer = new Beer();
        $beer->setId(4);
        $beer->setName("Heineken");
        $beer->setDescription("Considered a beer by the uninitiated, but connoisseurs know better...");
        $beer->setPrice(69.66);
        $beer->setAlcohol(0);
        $beer->setImage($imageEncoded);

        $beerModel = new PDOBeerModel($this->connection);
        $actualAddedBeer = $beerModel->addNewBeer($beer);
        $allBeersBefore = $this->providerBeers();
        $allBeersAfter = $beerModel->getAllBeers();

        $this->assertEquals("object", gettype($actualAddedBeer));
        $this->assertEquals(count($allBeersBefore) + 1, count($allBeersAfter));
        $this->assertEquals($actualAddedBeer, $beer);
    }
}
