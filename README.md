# web Advanced 2018-2019
## PE WP2

### Uitleg uitwerking

#### PHP
#### Database properties

De properties van de gebruikte database (naam, gebruiker,
wachtwoord en server IP) worden bijgehouden in het bestand
properties.json in de php-folder:

![alt text][img_propertiesJson]

Deze JSON-file wordt ingelezen in een "associative array", en aangeroepen via de volgende code:

![alt text][img_propertiesJsonCode]

Op deze manier kan alle informatie van de gebruikte database centraal op één plaats worden
bijgehouden en eventueel aangepast.

#### MVC
#### Models

In de map php/src/models zitten een BeerModel interface, die alle functies oplijst die de klasse PDOBeerModel moet
implementeren:

![alt text][img_beermodelinterface]

Bij het aanmaken van een nieuw PDOBeerModel-object moet een PDO-object worden meegegeven. Voor de rest zijn de 
afzonderlijke functies vrij vanzelfsprekend:

- getAllBeers() neemt geen parameters en geeft een array van associatieve arrays terug, die Beer-objecten voorstellen.
De verschillende velden van deze afzonderlijke associatieve arrays kunnen via strings tussen [] worden opgevraagd;
- getBeerById() krijgt een integer mee als id, dat in de WHERE van de SQL-query wordt meegegeven. Er wordt een
associatieve array dat een Beer-object voorstelt teruggegeven;
- addNewBeer() krijgt waarden mee voor alle velden in de beers-table van de database (default-waarden voor alle waarden
behalve id en name worden geleverd) en geeft het nieuwe Beer-object in associateve array terug, indien de operatie 
slaagt;
- idExists() gaat na of er een Beer-object bestaat in de database voor het meegegeven id;
- validateId() gaat na of het meegegeven id voldoet aan een regex die controleert of het id enkel uit cijfers bestaat,
dat het cijfer groter is dan nul, en geen boolean waarde is. In het geval dat deze voorwaarden niet voldaan worden, zal
een InvalidArgumentException gegooid worden;
- nameExists() controleert of de geleverde name paramerter een string is, die langer of gelijk is aan 4 karakters.
In het geval dat deze voorwaarden niet voldaan worden, zal een InvalidArgumentException gegooid worden;
- validateDescription() doet hetzelfde als nameExists(), maar test op lengte >= 15 ipv. 4.

Bij database-interactie wordt gebruikt gemaakt van "prepared statements" om SQL-injection te voorkomen:

![alt text][img_addnewbeer]

Merk op dat in de functio addNewBeer() wordt gecontroleerd dat de database provider oftewel 'sqlite' is, ofwel iets
anders. Dit gebeurt, omdat er een andere syntax moet gebruikt worden in de SQL-query, wanneer de provider sqlite is,
de ON DUPLICATE KEY UPDATE... niet gebruikt kan worden.

Om de teruggegeven waarden door een SQL-query in variabelen in PHP te steken, wordt gebruik gemaakt van de bindColumn-
methode: 

![alt text][img_bindcolumn] 

#### Views

In de map php/src/views zitten twee klassen, jsonBeersView en jsonBeerView, respectievelijk voor een array van 
associatieve arrays van Beer-object arrays, en één associatieve Beer-object array. De volgende foto is van de 
klasse jsonBeerView. In deze klasse wordt een HTTP response opgesteld: eerst wordt de header opgesteld, vervolgens
de juiste statuscode (die statuscodes worden meegegeven vanuit de BeerController klasse), die gehaald wordt uit een
meegegeven associatieve array, en de Beer-object array uit dezelfde meemgegeven array wordt geëncodeerd in een 
JSON-string en afgedrukt:

![alt text][img_jsonbeerview]

De jsonBeersView klasse is identiek aan de jsonBeerView klasse, met als enige verschil dat het woord "beer" vervangen
wordt door het meervoud "beers".

#### Controllers

De map php/src/controllers bevat één klasse, BeerController:

![alt text][img_beercontroller]

In de constructor worden meegegeven BeerModel, jsonBeerView en jsonBeersView objecten in instantievariabelen gestopt.
Vervolgens bevat de klasse slechts twee functies: getAllBeers() en addNewBeer(): 
- getAllBeers() maakt gebruik van de getAllBeers() functie van PDOBeerModel. Als deze functie slaagt, wordt de 
statuscode 200 (success) en wordt de teruggegeven array en de statuscode doorgegeven in een array aan de show() functie 
van het jsonBeerView object. Anders wordt een lege array en statuscode 500 (internal server error) doorgegeven;
- addNewBeer() geeft standaard als statuscode 201 (created) door. Indien het gegeven doorgegeven id reeds bestaat in de
database, wordt de statuscode 200 (OK). Hierna wordt een Beer-object aangemaakt in de database, op basis van de 
doorgegeven parameters. Indien een exception wordt opgegooid tijdens deze creatie, wordt de statuscode veranderd in een
foutcode, ofwel 400 (bad request) ofwel 500 (internal server error), al naargelang de soort exception. Ten slotte wordt
de beer array/null object en de statuscode doorgegeven aan de show() functie van het jsonBeerView object.


#### PHPMD

PHPMD moet gebruikt worden om de code "clean" te houden. Download de .phar file van de officiële
PHPMD website:

![alt text][img_phpmdsite]

Zet deze phpmd.phar file in de php-folder in het project:

![alt text][img_phpmdpharlocation]

Navigeer vervolgens naar de folder waar het phpmd.phar archief staat, en open hier een prompt.

![alt text][img_phpmdcommands]

Aldus wordt in de "working directory" een HTML-bestand gegenereerd met alle problemen die PHPMD heeft gevonden.
Hier kan je naar navigeren in je browser:

![alt text][img_phpmdreport]

#### JavaScript
#### "Wat is die bundle.js?"

[VERDER AANVULLEN!!!!]

### Credits

Yusuf Destan, Peter Janssen & Ben Merken @ Hogeschool PXL,Hasselt, 2019.

[img_propertiesJson]:Images/propertiesJson.PNG "properties.json"
[img_propertiesJsonCode]:Images/propertiesJsonCode.PNG "properties.json code"
[img_beermodelinterface]:Images/beermodelinterface.PNG "BeerModel interface"
[img_addnewbeer]:Images/addnewbeer.PNG "PDO bindcolumn"
[img_bindcolumn]:Images/bindcolumn.PNG "PDO bindcolumn"
[img_jsonbeerview]:Images/jsonbeerview.PNG "jsonBeerView"
[img_beercontroller]:Images/beercontroller.PNG "beerController"
[img_phpmdsite]:Images/phpmdsite.PNG "website PHPMD"
[img_phpmdpharlocation]:Images/phpmdpharlocation.PNG "phpmd.phar location in project"
[img_phpmdcommands]: Images/phpmdcommands.PNG "PHPMD commands"
[img_phpmdreport]:Images/phpmdreport.PNG "PHPMD report"
