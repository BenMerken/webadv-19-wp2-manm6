/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _BeerController = __webpack_require__(/*! ./controllers/BeerController */ \"./src/controllers/BeerController.js\");\n\nvar _BeerController2 = _interopRequireDefault(_BeerController);\n\nvar _BeerModel = __webpack_require__(/*! ./models/BeerModel */ \"./src/models/BeerModel.js\");\n\nvar _BeerModel2 = _interopRequireDefault(_BeerModel);\n\nvar _ErrorView = __webpack_require__(/*! ./views/ErrorView */ \"./src/views/ErrorView.js\");\n\nvar _ErrorView2 = _interopRequireDefault(_ErrorView);\n\nvar _BeerView = __webpack_require__(/*! ./views/BeerView */ \"./src/views/BeerView.js\");\n\nvar _BeerView2 = _interopRequireDefault(_BeerView);\n\nvar _BeersView = __webpack_require__(/*! ./views/BeersView */ \"./src/views/BeersView.js\");\n\nvar _BeersView2 = _interopRequireDefault(_BeersView);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar url = 'http://192.168.88.254/api/beers';\n\nvar beerView = void 0;\nvar beersView = void 0;\nvar errorView = void 0;\nvar beerModel = void 0;\nvar beerController = void 0;\n\nwindow.addEventListener(\"load\", handleWindowLoad);\n\nfunction handleWindowLoad() {\n    beerView = new _BeerView2.default();\n    beersView = new _BeersView2.default();\n    errorView = new _ErrorView2.default();\n    beerModel = new _BeerModel2.default(url);\n    beerController = new _BeerController2.default(beerModel, beerView, beersView, errorView);\n\n    //voeg hier de event handlers toe aan knoppen etc en definieer hieronder de functies\n\n    var GETAllBeersButton = document.getElementById(\"getAllBeersButton\");\n    GETAllBeersButton.addEventListener(\"click\", handleClickGetAllBeers);\n    var GETBeerByIdButton = document.getElementById(\"getBeerByIdButton\");\n    GETBeerByIdButton.addEventListener(\"click\", handleClickGetBeerById);\n    var PUTBeerButton = document.getElementById(\"putBeerButton\");\n    PUTBeerButton.addEventListener(\"click\", handleClickPutBeer);\n    var POSTBeerButton = document.getElementById(\"postBeerButton\");\n    POSTBeerButton.addEventListener(\"click\", handleClickPostBeer);\n}\n\n//deze functies kunnen gebruikt worden\nfunction handleClickGetAllBeers() {\n    beerController.listBeers();\n}\n\nfunction handleClickGetBeerById() {\n    var id = document.getElementById(\"getBeerId\").value;\n    beerController.listBeer(id);\n}\n\nfunction handleClickPostBeer() {\n    var name = document.getElementById(\"name\").value;\n    var description = document.getElementById(\"description\").value;\n    var price = document.getElementById(\"price\").value;\n    var alcohol = document.getElementById(\"alcohol\").value;\n    var image = document.getElementById(\"imageFile\").files[0];\n    beerController.addNewBeer(name, description, price, alcohol, image);\n}\n\nfunction handleClickPutBeer() {\n    var id = document.getElementById(\"id\").value;\n    var name = document.getElementById(\"name\").value;\n    var description = document.getElementById(\"description\").value;\n    var price = document.getElementById(\"price\").value;\n    var alcohol = document.getElementById(\"alcohol\").value;\n    var image = document.getElementById(\"imageFile\").files[0];\n    beerController.putBeer(id, name, description, price, alcohol, image);\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/controllers/BeerController.js":
/*!*******************************************!*\
  !*** ./src/controllers/BeerController.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar beerController = function () {\n    function beerController(beerModel, beerView, beersView, errorView) {\n        _classCallCheck(this, beerController);\n\n        this.beerModel = beerModel;\n        this.beerView = beerView;\n        this.beersView = beersView;\n        this.errorView = errorView;\n    }\n\n    _createClass(beerController, [{\n        key: \"listBeers\",\n        value: function listBeers() {\n            var _this = this;\n\n            var promise = this.beerModel.getAllBeers();\n            promise.then(function (beer) {\n                _this.beersView.show({ beers: beer });\n            }).catch(function (error) {\n                _this.errorView.show({ error: error.message });\n            });\n        }\n    }, {\n        key: \"listBeer\",\n        value: function listBeer(id) {\n            var _this2 = this;\n\n            var promise = this.beerModel.getBeerById(id);\n            promise.then(function (beer) {\n                _this2.beerView.show({ beer: beer });\n            }).catch(function (error) {\n                _this2.errorView.show({ error: error.message() });\n            });\n        }\n    }, {\n        key: \"addBeer\",\n        value: function addBeer(name, description, price, alcohol, imageFile) {\n            var _this3 = this;\n\n            var promise = this.beerModel.addBeer(name, description, price, alcohol, imageFile);\n            promise.then(function (beer) {\n                _this3.beerView.show({ beer: beer });\n            }).catch(function (error) {\n                _this3.errorView.show({ error: error.message });\n            });\n        }\n    }, {\n        key: \"putBeer\",\n        value: function putBeer(id, name, description, price, alcohol, imageFile) {\n            var _this4 = this;\n\n            var promise = this.beerModel.addBeer(id, name, description, price, alcohol, imageFile);\n            promise.then(function (beer) {\n                _this4.beerView.show({ beer: beer });\n            }).catch(function (error) {\n                _this4.errorView.show({ error: error.message });\n            });\n        }\n    }]);\n\n    return beerController;\n}();\n\nexports.default = beerController;\n\n//# sourceURL=webpack:///./src/controllers/BeerController.js?");

/***/ }),

/***/ "./src/models/BeerModel.js":
/*!*********************************!*\
  !*** ./src/models/BeerModel.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar BeerModel = function () {\n    function BeerModel(url) {\n        _classCallCheck(this, BeerModel);\n\n        this.url = url;\n    }\n\n    _createClass(BeerModel, [{\n        key: \"getAllBeers\",\n        value: function getAllBeers() {\n            return fetch(this.url, { method: \"GET\" }).then(function (response) {\n                if (response.status !== 200) {\n                    throw new Error(\"Something went wrong: \" + response.status);\n                }\n\n                return response.json();\n            });\n        }\n    }, {\n        key: \"getBeerById\",\n        value: function getBeerById(id) {\n            return fetch(this.url, { method: \"GET\" }).then(function (response) {\n                if (response.status !== 200) {\n                    throw new Error(\"Something went wrong: \" + response.status);\n                }\n\n                return response.json();\n            });\n        }\n    }, {\n        key: \"addNewBeer\",\n        value: function addNewBeer(name, description, price, alcohol, imageFile) {\n            validate(name, description, price, alcohol);\n\n            var beer = { name: name, description: description, price: price, alcohol: alcohol, image: readFile(imageFile) };\n            return fetch(this.url, {\n                method: \"post\",\n                body: JSON.stringify(beer)\n            }).then(function (response) {\n                if (response.status !== 200) {\n                    throw new Error(\"Something went wrong: \" + response.status);\n                }\n                return response.json();\n            }).catch(function (error) {\n                return console.error('Error:', error);\n            });\n        }\n\n        /*\r\n        //zo kunnen we rechtstreeks een afbeelding verzenden en dan in de server omzetten naar base64\r\n        addNewBeer(name, description,price, alcohol, imageFile){\r\n            let beer = {name:name, description:description , price :price, alcohol:alcohol, image:imageFile}\r\n            let formData = new FormData();\r\n            let fileField = document.querySelector('input[type=\"file\"]');\r\n              formData.append('name', name);\r\n            formData.append('description', description);\r\n            formData.append('price', price);\r\n            formData.append('alcohol', alcohol);\r\n            formData.append('image', fileField.files[0])\r\n            return fetch(this.url,\r\n                {method: \"post\",\r\n                    body :formData } )\r\n                .then((response) => {\r\n                    if (response.status !== 200) {\r\n                        throw new Error(\"Something went wrong: \" + response.status);\r\n                    }\r\n                      return response.json();\r\n                }).\r\n                then(response => console.log('Success:'))\r\n                .catch(error => console.error('Error:', error));\r\n        }*/\n\n    }, {\n        key: \"putBeer\",\n        value: function putBeer(beerId, name, description, price, alcohol, imageFile) {\n            validate(name, description, price, alcohol);\n            var beer = {\n                id: beerId,\n                name: name,\n                description: description,\n                price: price,\n                alcohol: alcohol,\n                image: readFile(imageFile)\n            };\n            return fetch(this.url, {\n                method: \"post\",\n                body: JSON.stringify(beer)\n            }).then(function (response) {\n                if (response.status !== 200) {\n                    throw new Error(\"Something went wrong: \" + response.status);\n                }\n\n                return response.json();\n            }).catch(function (error) {\n                return console.error('Error:', error);\n            });\n        }\n    }]);\n\n    return BeerModel;\n}();\n\n//dit zou de image moeten omzetten naar base64\n\n\nexports.default = BeerModel;\nfunction readFile(imageFile) {\n    var FR = new FileReader();\n    return FR.readAsDataURL(this.files[0]);\n}\n\nfunction validate(name, description, price, alcohol) {\n    if (!(typeof name == 'string' && name.length >= 5)) {\n        return Promise.reject(new Error(\"name moet een string met minstens 5 karakters zijn\"));\n    }\n    if (!(typeof description == 'string' && description.length >= 5)) {\n        return Promise.reject(new Error(\"description moet een string met minstens 5 karakters zijn\"));\n    }\n}\n\n//# sourceURL=webpack:///./src/models/BeerModel.js?");

/***/ }),

/***/ "./src/views/BeerView.js":
/*!*******************************!*\
  !*** ./src/views/BeerView.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _View2 = __webpack_require__(/*! ./View */ \"./src/views/View.js\");\n\nvar _View3 = _interopRequireDefault(_View2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar PersonView = function (_View) {\n    _inherits(PersonView, _View);\n\n    function PersonView() {\n        _classCallCheck(this, PersonView);\n\n        return _possibleConstructorReturn(this, (PersonView.__proto__ || Object.getPrototypeOf(PersonView)).apply(this, arguments));\n    }\n\n    _createClass(PersonView, [{\n        key: \"show\",\n        value: function show(data) {\n            var beer = data.beer;\n            var output = JSON.stringify(beer);\n            _get(PersonView.prototype.__proto__ || Object.getPrototypeOf(PersonView.prototype), \"show\", this).call(this, output);\n        }\n    }]);\n\n    return PersonView;\n}(_View3.default);\n\nexports.default = PersonView;\n\n//# sourceURL=webpack:///./src/views/BeerView.js?");

/***/ }),

/***/ "./src/views/BeersView.js":
/*!********************************!*\
  !*** ./src/views/BeersView.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _View2 = __webpack_require__(/*! ./View */ \"./src/views/View.js\");\n\nvar _View3 = _interopRequireDefault(_View2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar BeersView = function (_View) {\n    _inherits(BeersView, _View);\n\n    function BeersView() {\n        _classCallCheck(this, BeersView);\n\n        return _possibleConstructorReturn(this, (BeersView.__proto__ || Object.getPrototypeOf(BeersView)).apply(this, arguments));\n    }\n\n    _createClass(BeersView, [{\n        key: \"show\",\n        value: function show(data) {\n            var numberOfBeers = data.beers.length;\n            var output = document.createElement(\"maindiv\");\n\n            var _iteratorNormalCompletion = true;\n            var _didIteratorError = false;\n            var _iteratorError = undefined;\n\n            try {\n                for (var _iterator = data.beers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n                    var beer = _step.value;\n\n                    // output = output + `${person.id} ${person.name}\\n`;\n                    var div = document.createElement(\"div\");\n                    var titleBar = document.createElement(\"h2\");\n                    titleBar.innerHTML = beer.title;\n                    div.appendChild(titleBar);\n\n                    var img = document.createElement(\"img\");\n                    var src = \"data:\".concat(\"image/png\", \";base64,\", beer.image);\n                    img.setAttribute(\"src\", src);\n                    div.appendChild(img);\n\n                    output.appendChild(div);\n                }\n            } catch (err) {\n                _didIteratorError = true;\n                _iteratorError = err;\n            } finally {\n                try {\n                    if (!_iteratorNormalCompletion && _iterator.return) {\n                        _iterator.return();\n                    }\n                } finally {\n                    if (_didIteratorError) {\n                        throw _iteratorError;\n                    }\n                }\n            }\n\n            _get(BeersView.prototype.__proto__ || Object.getPrototypeOf(BeersView.prototype), \"show\", this).call(this, output);\n        }\n    }]);\n\n    return BeersView;\n}(_View3.default);\n\nexports.default = BeersView;\n\n//# sourceURL=webpack:///./src/views/BeersView.js?");

/***/ }),

/***/ "./src/views/ErrorView.js":
/*!********************************!*\
  !*** ./src/views/ErrorView.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _View2 = __webpack_require__(/*! ./View */ \"./src/views/View.js\");\n\nvar _View3 = _interopRequireDefault(_View2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ErrorView = function (_View) {\n    _inherits(ErrorView, _View);\n\n    function ErrorView() {\n        _classCallCheck(this, ErrorView);\n\n        return _possibleConstructorReturn(this, (ErrorView.__proto__ || Object.getPrototypeOf(ErrorView)).apply(this, arguments));\n    }\n\n    _createClass(ErrorView, [{\n        key: \"show\",\n        value: function show(data) {\n            var error = data.error;\n            _get(ErrorView.prototype.__proto__ || Object.getPrototypeOf(ErrorView.prototype), \"show\", this).call(this, error);\n        }\n    }]);\n\n    return ErrorView;\n}(_View3.default);\n\nexports.default = ErrorView;\n\n//# sourceURL=webpack:///./src/views/ErrorView.js?");

/***/ }),

/***/ "./src/views/View.js":
/*!***************************!*\
  !*** ./src/views/View.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar View = function () {\n    function View() {\n        _classCallCheck(this, View);\n\n        this.outputElement = document.getElementById('output');\n    }\n\n    _createClass(View, [{\n        key: \"show\",\n        value: function show(data) {\n\n            while (this.outputElement.hasChildNodes()) {\n                this.outputElement.removeChild(this.outputElement.firstChild);\n            }\n            //let textNode = document.createTextNode(data);\n            //this.outputElement.appendChild(textnode);\n            this.outputElement.appendChild(data);\n        }\n    }]);\n\n    return View;\n}();\n\nexports.default = View;\n\n//# sourceURL=webpack:///./src/views/View.js?");

/***/ })

/******/ });