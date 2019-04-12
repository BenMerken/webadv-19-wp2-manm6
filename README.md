# web Advanced 2018-2019
## PE WP2

### Uitleg uitwerking

#### Database properties

De properties van de gebruikte database (naam, gebruiker,
wachtwoord en server IP) worden bijgehouden in het bestand
properties.json in de root van het project:

![alt text][img_propertiesJson]

Deze JSON-file wordt ingelezen in een "associative array", en aangeroepen via de volgende code:

![alt text][img_propertiesJsonCode]

Op deze manier kan alle informatie van de gebruikte database centraal op één plaats worden
bijgehouden en eventueel aangepast.

### Troubleshoot

### Credits

Yusuf Destan, Peter Janssen & Ben Merken @ Hogeschool PXL,Hasselt, 2019.

[img_propertiesJson]:Images/propertiesJson.PNG "properties.json"
[img_propertiesJsonCode]:Images/propertiesJsonCode.PNG "properties.json code"
