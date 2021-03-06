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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@turf/area/index.js":
/*!******************************************!*\
  !*** ./node_modules/@turf/area/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var meta_1 = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/index.js");
// Note: change RADIUS => earthRadius
var RADIUS = 6378137;
/**
 * Takes one or more features and returns their area in square meters.
 *
 * @name area
 * @param {GeoJSON} geojson input GeoJSON feature(s)
 * @returns {number} area in square meters
 * @example
 * var polygon = turf.polygon([[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]);
 *
 * var area = turf.area(polygon);
 *
 * //addToMap
 * var addToMap = [polygon]
 * polygon.properties.area = area
 */
function area(geojson) {
    return meta_1.geomReduce(geojson, function (value, geom) {
        return value + calculateArea(geom);
    }, 0);
}
exports.default = area;
/**
 * Calculate Area
 *
 * @private
 * @param {Geometry} geom GeoJSON Geometries
 * @returns {number} area
 */
function calculateArea(geom) {
    var total = 0;
    var i;
    switch (geom.type) {
        case "Polygon":
            return polygonArea(geom.coordinates);
        case "MultiPolygon":
            for (i = 0; i < geom.coordinates.length; i++) {
                total += polygonArea(geom.coordinates[i]);
            }
            return total;
        case "Point":
        case "MultiPoint":
        case "LineString":
        case "MultiLineString":
            return 0;
    }
    return 0;
}
function polygonArea(coords) {
    var total = 0;
    if (coords && coords.length > 0) {
        total += Math.abs(ringArea(coords[0]));
        for (var i = 1; i < coords.length; i++) {
            total -= Math.abs(ringArea(coords[i]));
        }
    }
    return total;
}
/**
 * @private
 * Calculate the approximate area of the polygon were it projected onto the earth.
 * Note that this area will be positive if ring is oriented clockwise, otherwise it will be negative.
 *
 * Reference:
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for Polygons on a Sphere",
 * JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007 http://trs-new.jpl.nasa.gov/dspace/handle/2014/40409
 *
 * @param {Array<Array<number>>} coords Ring Coordinates
 * @returns {number} The approximate signed geodesic area of the polygon in square meters.
 */
function ringArea(coords) {
    var p1;
    var p2;
    var p3;
    var lowerIndex;
    var middleIndex;
    var upperIndex;
    var i;
    var total = 0;
    var coordsLength = coords.length;
    if (coordsLength > 2) {
        for (i = 0; i < coordsLength; i++) {
            if (i === coordsLength - 2) {
                lowerIndex = coordsLength - 2;
                middleIndex = coordsLength - 1;
                upperIndex = 0;
            }
            else if (i === coordsLength - 1) {
                lowerIndex = coordsLength - 1;
                middleIndex = 0;
                upperIndex = 1;
            }
            else {
                lowerIndex = i;
                middleIndex = i + 1;
                upperIndex = i + 2;
            }
            p1 = coords[lowerIndex];
            p2 = coords[middleIndex];
            p3 = coords[upperIndex];
            total += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]));
        }
        total = total * RADIUS * RADIUS / 2;
    }
    return total;
}
function rad(num) {
    return num * Math.PI / 180;
}


/***/ }),

/***/ "./node_modules/@turf/difference/index.mjs":
/*!*************************************************!*\
  !*** ./node_modules/@turf/difference/index.mjs ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var martinez_polygon_clipping__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! martinez-polygon-clipping */ "./node_modules/martinez-polygon-clipping/dist/martinez.umd.js");
/* harmony import */ var martinez_polygon_clipping__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(martinez_polygon_clipping__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _turf_area__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/area */ "./node_modules/@turf/area/index.js");
/* harmony import */ var _turf_area__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_turf_area__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/index.js");
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_turf_helpers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _turf_invariant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/index.js");
/* harmony import */ var _turf_invariant__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_turf_invariant__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/index.js");
/* harmony import */ var _turf_meta__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_turf_meta__WEBPACK_IMPORTED_MODULE_4__);






/**
 * Finds the difference between two {@link Polygon|polygons} by clipping the second polygon from the first.
 *
 * @name difference
 * @param {Feature<Polygon|MultiPolygon>} polygon1 input Polygon feature
 * @param {Feature<Polygon|MultiPolygon>} polygon2 Polygon feature to difference from polygon1
 * @returns {Feature<Polygon|MultiPolygon>|null} a Polygon or MultiPolygon feature showing the area of `polygon1` excluding the area of `polygon2` (if empty returns `null`)
 * @example
 * var polygon1 = turf.polygon([[
 *   [128, -26],
 *   [141, -26],
 *   [141, -21],
 *   [128, -21],
 *   [128, -26]
 * ]], {
 *   "fill": "#F00",
 *   "fill-opacity": 0.1
 * });
 * var polygon2 = turf.polygon([[
 *   [126, -28],
 *   [140, -28],
 *   [140, -20],
 *   [126, -20],
 *   [126, -28]
 * ]], {
 *   "fill": "#00F",
 *   "fill-opacity": 0.1
 * });
 *
 * var difference = turf.difference(polygon1, polygon2);
 *
 * //addToMap
 * var addToMap = [polygon1, polygon2, difference];
 */
function difference(polygon1, polygon2) {
    var geom1 = Object(_turf_invariant__WEBPACK_IMPORTED_MODULE_3__["getGeom"])(polygon1);
    var geom2 = Object(_turf_invariant__WEBPACK_IMPORTED_MODULE_3__["getGeom"])(polygon2);
    var properties = polygon1.properties || {};

    // Issue #721 - JSTS/Martinez can't handle empty polygons
    geom1 = removeEmptyPolygon(geom1);
    geom2 = removeEmptyPolygon(geom2);
    if (!geom1) return null;
    if (!geom2) return Object(_turf_helpers__WEBPACK_IMPORTED_MODULE_2__["feature"])(geom1, properties);

    var differenced = martinez_polygon_clipping__WEBPACK_IMPORTED_MODULE_0__["diff"](geom1.coordinates, geom2.coordinates);
    if (differenced.length === 0) return null;
    if (differenced.length === 1) return Object(_turf_helpers__WEBPACK_IMPORTED_MODULE_2__["polygon"])(differenced[0], properties);
    return Object(_turf_helpers__WEBPACK_IMPORTED_MODULE_2__["multiPolygon"])(differenced, properties);
}

/**
 * Detect Empty Polygon
 *
 * @private
 * @param {Geometry<Polygon|MultiPolygon>} geom Geometry Object
 * @returns {Geometry<Polygon|MultiPolygon>|null} removed any polygons with no areas
 */
function removeEmptyPolygon(geom) {
    switch (geom.type) {
    case 'Polygon':
        if (_turf_area__WEBPACK_IMPORTED_MODULE_1___default()(geom) > 1) return geom;
        return null;
    case 'MultiPolygon':
        var coordinates = [];
        Object(_turf_meta__WEBPACK_IMPORTED_MODULE_4__["flattenEach"])(geom, function (feature) {
            if (_turf_area__WEBPACK_IMPORTED_MODULE_1___default()(feature) > 1) coordinates.push(feature.geometry.coordinates);
        });
        if (coordinates.length) return {type: 'MultiPolygon', coordinates: coordinates};
    }
}

/* harmony default export */ __webpack_exports__["default"] = (difference);


/***/ }),

/***/ "./node_modules/@turf/helpers/index.js":
/*!*********************************************!*\
  !*** ./node_modules/@turf/helpers/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
exports.earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.factors = {
    centimeters: exports.earthRadius * 100,
    centimetres: exports.earthRadius * 100,
    degrees: exports.earthRadius / 111325,
    feet: exports.earthRadius * 3.28084,
    inches: exports.earthRadius * 39.370,
    kilometers: exports.earthRadius / 1000,
    kilometres: exports.earthRadius / 1000,
    meters: exports.earthRadius,
    metres: exports.earthRadius,
    miles: exports.earthRadius / 1609.344,
    millimeters: exports.earthRadius * 1000,
    millimetres: exports.earthRadius * 1000,
    nauticalmiles: exports.earthRadius / 1852,
    radians: 1,
    yards: exports.earthRadius / 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.370,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / exports.earthRadius,
    yards: 1 / 1.0936,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
exports.feature = feature;
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, options) {
    if (options === void 0) { options = {}; }
    switch (type) {
        case "Point": return point(coordinates).geometry;
        case "LineString": return lineString(coordinates).geometry;
        case "Polygon": return polygon(coordinates).geometry;
        case "MultiPoint": return multiPoint(coordinates).geometry;
        case "MultiLineString": return multiLineString(coordinates).geometry;
        case "MultiPolygon": return multiPolygon(coordinates).geometry;
        default: throw new Error(type + " is invalid");
    }
}
exports.geometry = geometry;
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.point = point;
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
exports.points = points;
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.polygon = polygon;
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
exports.polygons = polygons;
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.lineString = lineString;
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
exports.lineStrings = lineStrings;
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
exports.featureCollection = featureCollection;
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiLineString = multiLineString;
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPoint = multiPoint;
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPolygon = multiPolygon;
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
exports.geometryCollection = geometryCollection;
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
exports.round = round;
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
exports.radiansToLength = radiansToLength;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
exports.lengthToRadians = lengthToRadians;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
exports.bearingToAzimuth = bearingToAzimuth;
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return radians * Math.PI / 180;
}
exports.degreesToRadians = degreesToRadians;
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
exports.convertLength = convertLength;
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted distance
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = exports.areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = exports.areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
exports.convertArea = convertArea;
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num) && !/^\s*$/.test(num);
}
exports.isNumber = isNumber;
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return (!!input) && (input.constructor === Object);
}
exports.isObject = isObject;
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
exports.validateBBox = validateBBox;
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}
exports.validateId = validateId;
// Deprecated methods
function radians2degrees() {
    throw new Error("method has been renamed to `radiansToDegrees`");
}
exports.radians2degrees = radians2degrees;
function degrees2radians() {
    throw new Error("method has been renamed to `degreesToRadians`");
}
exports.degrees2radians = degrees2radians;
function distanceToDegrees() {
    throw new Error("method has been renamed to `lengthToDegrees`");
}
exports.distanceToDegrees = distanceToDegrees;
function distanceToRadians() {
    throw new Error("method has been renamed to `lengthToRadians`");
}
exports.distanceToRadians = distanceToRadians;
function radiansToDistance() {
    throw new Error("method has been renamed to `radiansToLength`");
}
exports.radiansToDistance = radiansToDistance;
function bearingToAngle() {
    throw new Error("method has been renamed to `bearingToAzimuth`");
}
exports.bearingToAngle = bearingToAngle;
function convertDistance() {
    throw new Error("method has been renamed to `convertLength`");
}
exports.convertDistance = convertDistance;


/***/ }),

/***/ "./node_modules/@turf/intersect/index.js":
/*!***********************************************!*\
  !*** ./node_modules/@turf/intersect/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/index.js");
var invariant_1 = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/index.js");
var martinez = __importStar(__webpack_require__(/*! martinez-polygon-clipping */ "./node_modules/martinez-polygon-clipping/dist/martinez.umd.js"));
/**
 * Takes two {@link Polygon|polygon} or {@link MultiPolygon|multi-polygon} geometries and
 * finds their polygonal intersection. If they don't intersect, returns null.
 *
 * @name intersect
 * @param {Feature<Polygon | MultiPolygon>} poly1 the first polygon or multipolygon
 * @param {Feature<Polygon | MultiPolygon>} poly2 the second polygon or multipolygon
 * @param {Object} [options={}] Optional Parameters
 * @param {Object} [options.properties={}] Translate GeoJSON Properties to Feature
 * @returns {Feature|null} returns a feature representing the area they share (either a {@link Polygon} or
 * {@link MultiPolygon}). If they do not share any area, returns `null`.
 * @example
 * var poly1 = turf.polygon([[
 *   [-122.801742, 45.48565],
 *   [-122.801742, 45.60491],
 *   [-122.584762, 45.60491],
 *   [-122.584762, 45.48565],
 *   [-122.801742, 45.48565]
 * ]]);
 *
 * var poly2 = turf.polygon([[
 *   [-122.520217, 45.535693],
 *   [-122.64038, 45.553967],
 *   [-122.720031, 45.526554],
 *   [-122.669906, 45.507309],
 *   [-122.723464, 45.446643],
 *   [-122.532577, 45.408574],
 *   [-122.487258, 45.477466],
 *   [-122.520217, 45.535693]
 * ]]);
 *
 * var intersection = turf.intersect(poly1, poly2);
 *
 * //addToMap
 * var addToMap = [poly1, poly2, intersection];
 */
function intersect(poly1, poly2, options) {
    if (options === void 0) { options = {}; }
    var geom1 = invariant_1.getGeom(poly1);
    var geom2 = invariant_1.getGeom(poly2);
    if (geom1.type === "Polygon" && geom2.type === "Polygon") {
        var intersection = martinez.intersection(geom1.coordinates, geom2.coordinates);
        if (intersection === null || intersection.length === 0) {
            return null;
        }
        if (intersection.length === 1) {
            var start = intersection[0][0][0];
            var end = intersection[0][0][intersection[0][0].length - 1];
            if (start[0] === end[0] && start[1] === end[1]) {
                return helpers_1.polygon(intersection[0], options.properties);
            }
            return null;
        }
        return helpers_1.multiPolygon(intersection, options.properties);
    }
    else if (geom1.type === "MultiPolygon") {
        var resultCoords = [];
        // iterate through the polygon and run intersect with each part, adding to the resultCoords.
        for (var _i = 0, _a = geom1.coordinates; _i < _a.length; _i++) {
            var coords = _a[_i];
            var subGeom = invariant_1.getGeom(helpers_1.polygon(coords));
            var subIntersection = intersect(subGeom, geom2);
            if (subIntersection) {
                var subIntGeom = invariant_1.getGeom(subIntersection);
                if (subIntGeom.type === "Polygon") {
                    resultCoords.push(subIntGeom.coordinates);
                }
                else if (subIntGeom.type === "MultiPolygon") {
                    resultCoords = resultCoords.concat(subIntGeom.coordinates);
                }
                else {
                    throw new Error("intersection is invalid");
                }
            }
        }
        // Make a polygon with the result
        if (resultCoords.length === 0) {
            return null;
        }
        if (resultCoords.length === 1) {
            return helpers_1.polygon(resultCoords[0], options.properties);
        }
        else {
            return helpers_1.multiPolygon(resultCoords, options.properties);
        }
    }
    else if (geom2.type === "MultiPolygon") {
        // geom1 is a polygon and geom2 a multiPolygon,
        // put the multiPolygon first and fallback to the previous case.
        return intersect(geom2, geom1);
    }
    else {
        // handle invalid geometry types
        throw new Error("poly1 and poly2 must be either polygons or multiPolygons");
    }
}
exports.default = intersect;


/***/ }),

/***/ "./node_modules/@turf/invariant/index.js":
/*!***********************************************!*\
  !*** ./node_modules/@turf/invariant/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/index.js");
/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(coord) {
    if (!coord) {
        throw new Error("coord is required");
    }
    if (!Array.isArray(coord)) {
        if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
            return coord.geometry.coordinates;
        }
        if (coord.type === "Point") {
            return coord.coordinates;
        }
    }
    if (Array.isArray(coord) && coord.length >= 2 && !Array.isArray(coord[0]) && !Array.isArray(coord[1])) {
        return coord;
    }
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
exports.getCoord = getCoord;
/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array
 *
 * @name getCoords
 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
 * @returns {Array<any>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coords = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
function getCoords(coords) {
    if (Array.isArray(coords)) {
        return coords;
    }
    // Feature
    if (coords.type === "Feature") {
        if (coords.geometry !== null) {
            return coords.geometry.coordinates;
        }
    }
    else {
        // Geometry
        if (coords.coordinates) {
            return coords.coordinates;
        }
    }
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
exports.getCoords = getCoords;
/**
 * Checks if coordinates contains a number
 *
 * @name containsNumber
 * @param {Array<any>} coordinates GeoJSON Coordinates
 * @returns {boolean} true if Array contains a number
 */
function containsNumber(coordinates) {
    if (coordinates.length > 1 && helpers_1.isNumber(coordinates[0]) && helpers_1.isNumber(coordinates[1])) {
        return true;
    }
    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return containsNumber(coordinates[0]);
    }
    throw new Error("coordinates must only contain numbers");
}
exports.containsNumber = containsNumber;
/**
 * Enforce expectations about types of GeoJSON objects for Turf.
 *
 * @name geojsonType
 * @param {GeoJSON} value any GeoJSON object
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function geojsonType(value, type, name) {
    if (!type || !name) {
        throw new Error("type and name required");
    }
    if (!value || value.type !== type) {
        throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + value.type);
    }
}
exports.geojsonType = geojsonType;
/**
 * Enforce expectations about types of {@link Feature} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name featureOf
 * @param {Feature} feature a feature with an expected geometry type
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} error if value is not the expected type.
 */
function featureOf(feature, type, name) {
    if (!feature) {
        throw new Error("No feature passed");
    }
    if (!name) {
        throw new Error(".featureOf() requires a name");
    }
    if (!feature || feature.type !== "Feature" || !feature.geometry) {
        throw new Error("Invalid input to " + name + ", Feature with geometry required");
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + feature.geometry.type);
    }
}
exports.featureOf = featureOf;
/**
 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name collectionOf
 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function collectionOf(featureCollection, type, name) {
    if (!featureCollection) {
        throw new Error("No featureCollection passed");
    }
    if (!name) {
        throw new Error(".collectionOf() requires a name");
    }
    if (!featureCollection || featureCollection.type !== "FeatureCollection") {
        throw new Error("Invalid input to " + name + ", FeatureCollection required");
    }
    for (var _i = 0, _a = featureCollection.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        if (!feature || feature.type !== "Feature" || !feature.geometry) {
            throw new Error("Invalid input to " + name + ", Feature with geometry required");
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + feature.geometry.type);
        }
    }
}
exports.collectionOf = collectionOf;
/**
 * Get Geometry from Feature or Geometry Object
 *
 * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
 * @returns {Geometry|null} GeoJSON Geometry Object
 * @throws {Error} if geojson is not a Feature or Geometry Object
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getGeom(point)
 * //={"type": "Point", "coordinates": [110, 40]}
 */
function getGeom(geojson) {
    if (geojson.type === "Feature") {
        return geojson.geometry;
    }
    return geojson;
}
exports.getGeom = getGeom;
/**
 * Get GeoJSON object's type, Geometry type is prioritize.
 *
 * @param {GeoJSON} geojson GeoJSON object
 * @param {string} [name="geojson"] name of the variable to display in error message
 * @returns {string} GeoJSON type
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getType(point)
 * //="Point"
 */
function getType(geojson, name) {
    if (geojson.type === "FeatureCollection") {
        return "FeatureCollection";
    }
    if (geojson.type === "GeometryCollection") {
        return "GeometryCollection";
    }
    if (geojson.type === "Feature" && geojson.geometry !== null) {
        return geojson.geometry.type;
    }
    return geojson.type;
}
exports.getType = getType;


/***/ }),

/***/ "./node_modules/@turf/kinks/index.js":
/*!*******************************************!*\
  !*** ./node_modules/@turf/kinks/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/index.js");
/**
 * Takes a {@link LineString|linestring}, {@link MultiLineString|multi-linestring},
 * {@link MultiPolygon|multi-polygon} or {@link Polygon|polygon} and
 * returns {@link Point|points} at all self-intersections.
 *
 * @name kinks
 * @param {Feature<LineString|MultiLineString|MultiPolygon|Polygon>} featureIn input feature
 * @returns {FeatureCollection<Point>} self-intersections
 * @example
 * var poly = turf.polygon([[
 *   [-12.034835, 8.901183],
 *   [-12.060413, 8.899826],
 *   [-12.03638, 8.873199],
 *   [-12.059383, 8.871418],
 *   [-12.034835, 8.901183]
 * ]]);
 *
 * var kinks = turf.kinks(poly);
 *
 * //addToMap
 * var addToMap = [poly, kinks]
 */
function kinks(featureIn) {
    var coordinates;
    var feature;
    var results = {
        type: "FeatureCollection",
        features: [],
    };
    if (featureIn.type === "Feature") {
        feature = featureIn.geometry;
    }
    else {
        feature = featureIn;
    }
    if (feature.type === "LineString") {
        coordinates = [feature.coordinates];
    }
    else if (feature.type === "MultiLineString") {
        coordinates = feature.coordinates;
    }
    else if (feature.type === "MultiPolygon") {
        coordinates = [].concat.apply([], feature.coordinates);
    }
    else if (feature.type === "Polygon") {
        coordinates = feature.coordinates;
    }
    else {
        throw new Error("Input must be a LineString, MultiLineString, " +
            "Polygon, or MultiPolygon Feature or Geometry");
    }
    coordinates.forEach(function (line1) {
        coordinates.forEach(function (line2) {
            for (var i = 0; i < line1.length - 1; i++) {
                // start iteration at i, intersections for k < i have already
                // been checked in previous outer loop iterations
                for (var k = i; k < line2.length - 1; k++) {
                    if (line1 === line2) {
                        // segments are adjacent and always share a vertex, not a kink
                        if (Math.abs(i - k) === 1) {
                            continue;
                        }
                        // first and last segment in a closed lineString or ring always share a vertex, not a kink
                        if (
                        // segments are first and last segment of lineString
                        i === 0 &&
                            k === line1.length - 2 &&
                            // lineString is closed
                            line1[i][0] === line1[line1.length - 1][0] &&
                            line1[i][1] === line1[line1.length - 1][1]) {
                            continue;
                        }
                    }
                    var intersection = lineIntersects(line1[i][0], line1[i][1], line1[i + 1][0], line1[i + 1][1], line2[k][0], line2[k][1], line2[k + 1][0], line2[k + 1][1]);
                    if (intersection) {
                        results.features.push(helpers_1.point([intersection[0], intersection[1]]));
                    }
                }
            }
        });
    });
    return results;
}
exports.default = kinks;
// modified from http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
function lineIntersects(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the
    // intersection (treating the lines as infinite) and booleans for whether
    // line segment 1 or line segment 2 contain the point
    var denominator;
    var a;
    var b;
    var numerator1;
    var numerator2;
    var result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false,
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator === 0) {
        if (result.x !== null && result.y !== null) {
            return result;
        }
        else {
            return false;
        }
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;
    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a >= 0 && a <= 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b >= 0 && b <= 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    if (result.onLine1 && result.onLine2) {
        return [result.x, result.y];
    }
    else {
        return false;
    }
}


/***/ }),

/***/ "./node_modules/@turf/meta/index.js":
/*!******************************************!*\
  !*** ./node_modules/@turf/meta/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var helpers = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/index.js");

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
    // Handles null Geometry -- Skips this GeoJSON
    if (geojson === null) return;
    var j, k, l, geometry, stopG, coords,
        geometryMaybeCollection,
        wrapShrink = 0,
        coordIndex = 0,
        isGeometryCollection,
        type = geojson.type,
        isFeatureCollection = type === 'FeatureCollection',
        isFeature = type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
        geometryMaybeCollection = (isFeatureCollection ? geojson.features[featureIndex].geometry :
            (isFeature ? geojson.geometry : geojson));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
            var multiFeatureIndex = 0;
            var geometryIndex = 0;
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;

            // Handles null Geometry -- Skips this geometry
            if (geometry === null) continue;
            coords = geometry.coordinates;
            var geomType = geometry.type;

            wrapShrink = (excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon')) ? 1 : 0;

            switch (geomType) {
            case null:
                break;
            case 'Point':
                if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                coordIndex++;
                multiFeatureIndex++;
                break;
            case 'LineString':
            case 'MultiPoint':
                for (j = 0; j < coords.length; j++) {
                    if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                    coordIndex++;
                    if (geomType === 'MultiPoint') multiFeatureIndex++;
                }
                if (geomType === 'LineString') multiFeatureIndex++;
                break;
            case 'Polygon':
            case 'MultiLineString':
                for (j = 0; j < coords.length; j++) {
                    for (k = 0; k < coords[j].length - wrapShrink; k++) {
                        if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                        coordIndex++;
                    }
                    if (geomType === 'MultiLineString') multiFeatureIndex++;
                    if (geomType === 'Polygon') geometryIndex++;
                }
                if (geomType === 'Polygon') multiFeatureIndex++;
                break;
            case 'MultiPolygon':
                for (j = 0; j < coords.length; j++) {
                    geometryIndex = 0;
                    for (k = 0; k < coords[j].length; k++) {
                        for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                            if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                            coordIndex++;
                        }
                        geometryIndex++;
                    }
                    multiFeatureIndex++;
                }
                break;
            case 'GeometryCollection':
                for (j = 0; j < geometry.geometries.length; j++)
                    if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
                break;
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
    }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
    var previousValue = initialValue;
    coordEach(geojson, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
        if (coordIndex === 0 && initialValue === undefined) previousValue = currentCoord;
        else previousValue = callback(previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
    }, excludeWrapCoord);
    return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
    var i;
    switch (geojson.type) {
    case 'FeatureCollection':
        for (i = 0; i < geojson.features.length; i++) {
            if (callback(geojson.features[i].properties, i) === false) break;
        }
        break;
    case 'Feature':
        callback(geojson.properties, 0);
        break;
    }
}


/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    propEach(geojson, function (currentProperties, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentProperties;
        else previousValue = callback(previousValue, currentProperties, featureIndex);
    });
    return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
    if (geojson.type === 'Feature') {
        callback(geojson, 0);
    } else if (geojson.type === 'FeatureCollection') {
        for (var i = 0; i < geojson.features.length; i++) {
            if (callback(geojson.features[i], i) === false) break;
        }
    }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    featureEach(geojson, function (currentFeature, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex);
    });
    return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
    var coords = [];
    coordEach(geojson, function (coord) {
        coords.push(coord);
    });
    return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
    var i, j, g, geometry, stopG,
        geometryMaybeCollection,
        isGeometryCollection,
        featureProperties,
        featureBBox,
        featureId,
        featureIndex = 0,
        isFeatureCollection = geojson.type === 'FeatureCollection',
        isFeature = geojson.type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (i = 0; i < stop; i++) {

        geometryMaybeCollection = (isFeatureCollection ? geojson.features[i].geometry :
            (isFeature ? geojson.geometry : geojson));
        featureProperties = (isFeatureCollection ? geojson.features[i].properties :
            (isFeature ? geojson.properties : {}));
        featureBBox = (isFeatureCollection ? geojson.features[i].bbox :
            (isFeature ? geojson.bbox : undefined));
        featureId = (isFeatureCollection ? geojson.features[i].id :
            (isFeature ? geojson.id : undefined));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (g = 0; g < stopG; g++) {
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

            // Handle null Geometry
            if (geometry === null) {
                if (callback(null, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                continue;
            }
            switch (geometry.type) {
            case 'Point':
            case 'LineString':
            case 'MultiPoint':
            case 'Polygon':
            case 'MultiLineString':
            case 'MultiPolygon': {
                if (callback(geometry, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                break;
            }
            case 'GeometryCollection': {
                for (j = 0; j < geometry.geometries.length; j++) {
                    if (callback(geometry.geometries[j], featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                }
                break;
            }
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
        // Only increase `featureIndex` per each feature
        featureIndex++;
    }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    geomEach(geojson, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentGeometry;
        else previousValue = callback(previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId);
    });
    return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
    geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
        // Callback for single geometry
        var type = (geometry === null) ? null : geometry.type;
        switch (type) {
        case null:
        case 'Point':
        case 'LineString':
        case 'Polygon':
            if (callback(helpers.feature(geometry, properties, {bbox: bbox, id: id}), featureIndex, 0) === false) return false;
            return;
        }

        var geomType;

        // Callback for multi-geometry
        switch (type) {
        case 'MultiPoint':
            geomType = 'Point';
            break;
        case 'MultiLineString':
            geomType = 'LineString';
            break;
        case 'MultiPolygon':
            geomType = 'Polygon';
            break;
        }

        for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
            var coordinate = geometry.coordinates[multiFeatureIndex];
            var geom = {
                type: geomType,
                coordinates: coordinate
            };
            if (callback(helpers.feature(geom, properties), featureIndex, multiFeatureIndex) === false) return false;
        }
    });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    flattenEach(geojson, function (currentFeature, featureIndex, multiFeatureIndex) {
        if (featureIndex === 0 && multiFeatureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex, multiFeatureIndex);
    });
    return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
    flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
        var segmentIndex = 0;

        // Exclude null Geometries
        if (!feature.geometry) return;
        // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
        var type = feature.geometry.type;
        if (type === 'Point' || type === 'MultiPoint') return;

        // Generate 2-vertex line segments
        var previousCoords;
        var previousFeatureIndex = 0;
        var previousMultiIndex = 0;
        var prevGeomIndex = 0;
        if (coordEach(feature, function (currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
            // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
            if (previousCoords === undefined || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
                previousCoords = currentCoord;
                previousFeatureIndex = featureIndex;
                previousMultiIndex = multiPartIndexCoord;
                prevGeomIndex = geometryIndex;
                segmentIndex = 0;
                return;
            }
            var currentSegment = helpers.lineString([previousCoords, currentCoord], feature.properties);
            if (callback(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) === false) return false;
            segmentIndex++;
            previousCoords = currentCoord;
        }) === false) return false;
    });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentInex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    var started = false;
    segmentEach(geojson, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
        if (started === false && initialValue === undefined) previousValue = currentSegment;
        else previousValue = callback(previousValue, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex);
        started = true;
    });
    return previousValue;
}

/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @example
 * var multiLine = turf.multiLineString([
 *   [[26, 37], [35, 45]],
 *   [[36, 53], [38, 50], [41, 55]]
 * ]);
 *
 * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function lineEach(geojson, callback) {
    // validation
    if (!geojson) throw new Error('geojson is required');

    flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
        if (feature.geometry === null) return;
        var type = feature.geometry.type;
        var coords = feature.geometry.coordinates;
        switch (type) {
        case 'LineString':
            if (callback(feature, featureIndex, multiFeatureIndex, 0, 0) === false) return false;
            break;
        case 'Polygon':
            for (var geometryIndex = 0; geometryIndex < coords.length; geometryIndex++) {
                if (callback(helpers.lineString(coords[geometryIndex], feature.properties), featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
            }
            break;
        }
    });
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var multiPoly = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentLine
 * });
 */
function lineReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    lineEach(geojson, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentLine;
        else previousValue = callback(previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex);
    });
    return previousValue;
}

/**
 * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 * Point & MultiPoint will always return null.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.segmentIndex=0] Segment Index
 * @param {Object} [options.properties={}] Translate Properties to output LineString
 * @param {BBox} [options.bbox={}] Translate BBox to output LineString
 * @param {number|string} [options.id={}] Translate Id to output LineString
 * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findSegment(multiLine);
 * // => Feature<LineString<[[10, 10], [50, 30]]>>
 *
 * // First Segment of 2nd Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: 1});
 * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
 *
 * // Last Segment of Last Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
 * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
 */
function findSegment(geojson, options) {
    // Optional Parameters
    options = options || {};
    if (!helpers.isObject(options)) throw new Error('options is invalid');
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var segmentIndex = options.segmentIndex || 0;

    // Find FeatureIndex
    var properties = options.properties;
    var geometry;

    switch (geojson.type) {
    case 'FeatureCollection':
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
    case 'Feature':
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
    case 'Polygon':
    case 'MultiLineString':
    case 'MultiPolygon':
        geometry = geojson;
        break;
    default:
        throw new Error('geojson is invalid');
    }

    // Find SegmentIndex
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
        if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
        return helpers.lineString([coords[segmentIndex], coords[segmentIndex + 1]], properties, options);
    case 'Polygon':
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
        return helpers.lineString([coords[geometryIndex][segmentIndex], coords[geometryIndex][segmentIndex + 1]], properties, options);
    case 'MultiLineString':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
        return helpers.lineString([coords[multiFeatureIndex][segmentIndex], coords[multiFeatureIndex][segmentIndex + 1]], properties, options);
    case 'MultiPolygon':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
        return helpers.lineString([coords[multiFeatureIndex][geometryIndex][segmentIndex], coords[multiFeatureIndex][geometryIndex][segmentIndex + 1]], properties, options);
    }
    throw new Error('geojson is invalid');
}

/**
 * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.coordIndex=0] Coord Index
 * @param {Object} [options.properties={}] Translate Properties to output Point
 * @param {BBox} [options.bbox={}] Translate BBox to output Point
 * @param {number|string} [options.id={}] Translate Id to output Point
 * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findPoint(multiLine);
 * // => Feature<Point<[10, 10]>>
 *
 * // First Segment of the 2nd Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: 1});
 * // => Feature<Point<[-10, -10]>>
 *
 * // Last Segment of last Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
 * // => Feature<Point<[-30, -40]>>
 */
function findPoint(geojson, options) {
    // Optional Parameters
    options = options || {};
    if (!helpers.isObject(options)) throw new Error('options is invalid');
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var coordIndex = options.coordIndex || 0;

    // Find FeatureIndex
    var properties = options.properties;
    var geometry;

    switch (geojson.type) {
    case 'FeatureCollection':
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
    case 'Feature':
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
    case 'Polygon':
    case 'MultiLineString':
    case 'MultiPolygon':
        geometry = geojson;
        break;
    default:
        throw new Error('geojson is invalid');
    }

    // Find Coord Index
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
    case 'Point':
        return helpers.point(coords, properties, options);
    case 'MultiPoint':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        return helpers.point(coords[multiFeatureIndex], properties, options);
    case 'LineString':
        if (coordIndex < 0) coordIndex = coords.length + coordIndex;
        return helpers.point(coords[coordIndex], properties, options);
    case 'Polygon':
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[geometryIndex].length + coordIndex;
        return helpers.point(coords[geometryIndex][coordIndex], properties, options);
    case 'MultiLineString':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex].length + coordIndex;
        return helpers.point(coords[multiFeatureIndex][coordIndex], properties, options);
    case 'MultiPolygon':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex][geometryIndex].length - coordIndex;
        return helpers.point(coords[multiFeatureIndex][geometryIndex][coordIndex], properties, options);
    }
    throw new Error('geojson is invalid');
}

exports.coordEach = coordEach;
exports.coordReduce = coordReduce;
exports.propEach = propEach;
exports.propReduce = propReduce;
exports.featureEach = featureEach;
exports.featureReduce = featureReduce;
exports.coordAll = coordAll;
exports.geomEach = geomEach;
exports.geomReduce = geomReduce;
exports.flattenEach = flattenEach;
exports.flattenReduce = flattenReduce;
exports.segmentEach = segmentEach;
exports.segmentReduce = segmentReduce;
exports.lineEach = lineEach;
exports.lineReduce = lineReduce;
exports.findSegment = findSegment;
exports.findPoint = findPoint;


/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "./node_modules/lodash/_assignMergeValue.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_assignMergeValue.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

module.exports = baseHas;


/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_baseMerge.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseMerge.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    baseMergeDeep = __webpack_require__(/*! ./_baseMergeDeep */ "./node_modules/lodash/_baseMergeDeep.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js");

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),

/***/ "./node_modules/lodash/_baseMergeDeep.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseMergeDeep.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/lodash/_cloneBuffer.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/lodash/_cloneTypedArray.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/lodash/_initCloneObject.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPlainObject = __webpack_require__(/*! ./isPlainObject */ "./node_modules/lodash/isPlainObject.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js"),
    toPlainObject = __webpack_require__(/*! ./toPlainObject */ "./node_modules/lodash/toPlainObject.js");

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(/*! ./constant */ "./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    stringToPath = __webpack_require__(/*! ./_stringToPath */ "./node_modules/lodash/_stringToPath.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "./node_modules/lodash/_hasPath.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hasPath.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(/*! ./memoize */ "./node_modules/lodash/memoize.js");

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_safeGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_safeGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;


/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "./node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ "./node_modules/lodash/_memoizeCapped.js");

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js");

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ "./node_modules/lodash/has.js":
/*!************************************!*\
  !*** ./node_modules/lodash/has.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseHas = __webpack_require__(/*! ./_baseHas */ "./node_modules/lodash/_baseHas.js"),
    hasPath = __webpack_require__(/*! ./_hasPath */ "./node_modules/lodash/_hasPath.js");

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

module.exports = has;


/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ "./node_modules/lodash/merge.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/merge.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(/*! ./_baseMerge */ "./node_modules/lodash/_baseMerge.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "./node_modules/lodash/_createAssigner.js");

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;


/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "./node_modules/lodash/toPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/toPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ "./node_modules/martinez-polygon-clipping/dist/martinez.umd.js":
/*!*********************************************************************!*\
  !*** ./node_modules/martinez-polygon-clipping/dist/martinez.umd.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * martinez v0.4.3
 * Martinez polygon clipping algorithm, does boolean operation on polygons (multipolygons, polygons with holes etc): intersection, union, difference, xor
 *
 * @author Alex Milevski <info@w8r.name>
 * @license MIT
 * @preserve
 */

(function (global, factory) {
   true ? factory(exports) :
  undefined;
}(this, (function (exports) { 'use strict';

  function DEFAULT_COMPARE (a, b) { return a > b ? 1 : a < b ? -1 : 0; }

  var SplayTree = function SplayTree(compare, noDuplicates) {
    if ( compare === void 0 ) compare = DEFAULT_COMPARE;
    if ( noDuplicates === void 0 ) noDuplicates = false;

    this._compare = compare;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  };

  var prototypeAccessors = { size: { configurable: true } };


  SplayTree.prototype.rotateLeft = function rotateLeft (x) {
    var y = x.right;
    if (y) {
      x.right = y.left;
      if (y.left) { y.left.parent = x; }
      y.parent = x.parent;
    }

    if (!x.parent)              { this._root = y; }
    else if (x === x.parent.left) { x.parent.left = y; }
    else                        { x.parent.right = y; }
    if (y) { y.left = x; }
    x.parent = y;
  };


  SplayTree.prototype.rotateRight = function rotateRight (x) {
    var y = x.left;
    if (y) {
      x.left = y.right;
      if (y.right) { y.right.parent = x; }
      y.parent = x.parent;
    }

    if (!x.parent)             { this._root = y; }
    else if(x === x.parent.left) { x.parent.left = y; }
    else                       { x.parent.right = y; }
    if (y) { y.right = x; }
    x.parent = y;
  };


  SplayTree.prototype._splay = function _splay (x) {
      var this$1 = this;

    while (x.parent) {
      var p = x.parent;
      if (!p.parent) {
        if (p.left === x) { this$1.rotateRight(p); }
        else            { this$1.rotateLeft(p); }
      } else if (p.left === x && p.parent.left === p) {
        this$1.rotateRight(p.parent);
        this$1.rotateRight(p);
      } else if (p.right === x && p.parent.right === p) {
        this$1.rotateLeft(p.parent);
        this$1.rotateLeft(p);
      } else if (p.left === x && p.parent.right === p) {
        this$1.rotateRight(p);
        this$1.rotateLeft(p);
      } else {
        this$1.rotateLeft(p);
        this$1.rotateRight(p);
      }
    }
  };


  SplayTree.prototype.splay = function splay (x) {
      var this$1 = this;

    var p, gp, ggp, l, r;

    while (x.parent) {
      p = x.parent;
      gp = p.parent;

      if (gp && gp.parent) {
        ggp = gp.parent;
        if (ggp.left === gp) { ggp.left= x; }
        else               { ggp.right = x; }
        x.parent = ggp;
      } else {
        x.parent = null;
        this$1._root = x;
      }

      l = x.left; r = x.right;

      if (x === p.left) { // left
        if (gp) {
          if (gp.left === p) {
            /* zig-zig */
            if (p.right) {
              gp.left = p.right;
              gp.left.parent = gp;
            } else { gp.left = null; }

            p.right = gp;
            gp.parent = p;
          } else {
            /* zig-zag */
            if (l) {
              gp.right = l;
              l.parent = gp;
            } else { gp.right = null; }

            x.left  = gp;
            gp.parent = x;
          }
        }
        if (r) {
          p.left = r;
          r.parent = p;
        } else { p.left = null; }

        x.right= p;
        p.parent = x;
      } else { // right
        if (gp) {
          if (gp.right === p) {
            /* zig-zig */
            if (p.left) {
              gp.right = p.left;
              gp.right.parent = gp;
            } else { gp.right = null; }

            p.left = gp;
            gp.parent = p;
          } else {
            /* zig-zag */
            if (r) {
              gp.left = r;
              r.parent = gp;
            } else { gp.left = null; }

            x.right = gp;
            gp.parent = x;
          }
        }
        if (l) {
          p.right = l;
          l.parent = p;
        } else { p.right = null; }

        x.left = p;
        p.parent = x;
      }
    }
  };


  SplayTree.prototype.replace = function replace (u, v) {
    if (!u.parent) { this._root = v; }
    else if (u === u.parent.left) { u.parent.left = v; }
    else { u.parent.right = v; }
    if (v) { v.parent = u.parent; }
  };


  SplayTree.prototype.minNode = function minNode (u) {
      if ( u === void 0 ) u = this._root;

    if (u) { while (u.left) { u = u.left; } }
    return u;
  };


  SplayTree.prototype.maxNode = function maxNode (u) {
      if ( u === void 0 ) u = this._root;

    if (u) { while (u.right) { u = u.right; } }
    return u;
  };


  SplayTree.prototype.insert = function insert (key, data) {
    var z = this._root;
    var p = null;
    var comp = this._compare;
    var cmp;

    if (this._noDuplicates) {
      while (z) {
        p = z;
        cmp = comp(z.key, key);
        if (cmp === 0) { return; }
        else if (comp(z.key, key) < 0) { z = z.right; }
        else { z = z.left; }
      }
    } else {
      while (z) {
        p = z;
        if (comp(z.key, key) < 0) { z = z.right; }
        else { z = z.left; }
      }
    }

    z = { key: key, data: data, left: null, right: null, parent: p };

    if (!p)                        { this._root = z; }
    else if (comp(p.key, z.key) < 0) { p.right = z; }
    else                           { p.left= z; }

    this.splay(z);
    this._size++;
    return z;
  };


  SplayTree.prototype.find = function find (key) {
    var z  = this._root;
    var comp = this._compare;
    while (z) {
      var cmp = comp(z.key, key);
      if    (cmp < 0) { z = z.right; }
      else if (cmp > 0) { z = z.left; }
      else            { return z; }
    }
    return null;
  };

  /**
   * Whether the tree contains a node with the given key
   * @param{Key} key
   * @return {boolean} true/false
   */
  SplayTree.prototype.contains = function contains (key) {
    var node     = this._root;
    var comparator = this._compare;
    while (node){
      var cmp = comparator(key, node.key);
      if    (cmp === 0) { return true; }
      else if (cmp < 0) { node = node.left; }
      else              { node = node.right; }
    }

    return false;
  };


  SplayTree.prototype.remove = function remove (key) {
    var z = this.find(key);

    if (!z) { return false; }

    this.splay(z);

    if (!z.left) { this.replace(z, z.right); }
    else if (!z.right) { this.replace(z, z.left); }
    else {
      var y = this.minNode(z.right);
      if (y.parent !== z) {
        this.replace(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }
      this.replace(z, y);
      y.left = z.left;
      y.left.parent = y;
    }

    this._size--;
    return true;
  };


  SplayTree.prototype.removeNode = function removeNode (z) {
    if (!z) { return false; }

    this.splay(z);

    if (!z.left) { this.replace(z, z.right); }
    else if (!z.right) { this.replace(z, z.left); }
    else {
      var y = this.minNode(z.right);
      if (y.parent !== z) {
        this.replace(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }
      this.replace(z, y);
      y.left = z.left;
      y.left.parent = y;
    }

    this._size--;
    return true;
  };


  SplayTree.prototype.erase = function erase (key) {
    var z = this.find(key);
    if (!z) { return; }

    this.splay(z);

    var s = z.left;
    var t = z.right;

    var sMax = null;
    if (s) {
      s.parent = null;
      sMax = this.maxNode(s);
      this.splay(sMax);
      this._root = sMax;
    }
    if (t) {
      if (s) { sMax.right = t; }
      else { this._root = t; }
      t.parent = sMax;
    }

    this._size--;
  };

  /**
   * Removes and returns the node with smallest key
   * @return {?Node}
   */
  SplayTree.prototype.pop = function pop () {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.left) { node = node.left; }
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  };


  /* eslint-disable class-methods-use-this */

  /**
   * Successor node
   * @param{Node} node
   * @return {?Node}
   */
  SplayTree.prototype.next = function next (node) {
    var successor = node;
    if (successor) {
      if (successor.right) {
        successor = successor.right;
        while (successor && successor.left) { successor = successor.left; }
      } else {
        successor = node.parent;
        while (successor && successor.right === node) {
          node = successor; successor = successor.parent;
        }
      }
    }
    return successor;
  };


  /**
   * Predecessor node
   * @param{Node} node
   * @return {?Node}
   */
  SplayTree.prototype.prev = function prev (node) {
    var predecessor = node;
    if (predecessor) {
      if (predecessor.left) {
        predecessor = predecessor.left;
        while (predecessor && predecessor.right) { predecessor = predecessor.right; }
      } else {
        predecessor = node.parent;
        while (predecessor && predecessor.left === node) {
          node = predecessor;
          predecessor = predecessor.parent;
        }
      }
    }
    return predecessor;
  };
  /* eslint-enable class-methods-use-this */


  /**
   * @param{forEachCallback} callback
   * @return {SplayTree}
   */
  SplayTree.prototype.forEach = function forEach (callback) {
    var current = this._root;
    var s = [], done = false, i = 0;

    while (!done) {
      // Reach the left most Node of the current Node
      if (current) {
        // Place pointer to a tree node on the stack
        // before traversing the node's left subtree
        s.push(current);
        current = current.left;
      } else {
        // BackTrack from the empty subtree and visit the Node
        // at the top of the stack; however, if the stack is
        // empty you are done
        if (s.length > 0) {
          current = s.pop();
          callback(current, i++);

          // We have visited the node and its left
          // subtree. Now, it's right subtree's turn
          current = current.right;
        } else { done = true; }
      }
    }
    return this;
  };


  /**
   * Walk key range from `low` to `high`. Stops if `fn` returns a value.
   * @param{Key}    low
   * @param{Key}    high
   * @param{Function} fn
   * @param{*?}     ctx
   * @return {SplayTree}
   */
  SplayTree.prototype.range = function range (low, high, fn, ctx) {
      var this$1 = this;

    var Q = [];
    var compare = this._compare;
    var node = this._root, cmp;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        node = node.left;
      } else {
        node = Q.pop();
        cmp = compare(node.key, high);
        if (cmp > 0) {
          break;
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node)) { return this$1; } // stop if smth is returned
        }
        node = node.right;
      }
    }
    return this;
  };

  /**
   * Returns all keys in order
   * @return {Array<Key>}
   */
  SplayTree.prototype.keys = function keys () {
    var current = this._root;
    var s = [], r = [], done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.key);
          current = current.right;
        } else { done = true; }
      }
    }
    return r;
  };


  /**
   * Returns `data` fields of all nodes in order.
   * @return {Array<Value>}
   */
  SplayTree.prototype.values = function values () {
    var current = this._root;
    var s = [], r = [], done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.data);
          current = current.right;
        } else { done = true; }
      }
    }
    return r;
  };


  /**
   * Returns node at given index
   * @param{number} index
   * @return {?Node}
   */
  SplayTree.prototype.at = function at (index) {
    // removed after a consideration, more misleading than useful
    // index = index % this.size;
    // if (index < 0) index = this.size - index;

    var current = this._root;
    var s = [], done = false, i = 0;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          if (i === index) { return current; }
          i++;
          current = current.right;
        } else { done = true; }
      }
    }
    return null;
  };

  /**
   * Bulk-load items. Both array have to be same size
   * @param{Array<Key>}  keys
   * @param{Array<Value>}[values]
   * @param{Boolean}     [presort=false] Pre-sort keys and values, using
   *                                       tree's comparator. Sorting is done
   *                                       in-place
   * @return {AVLTree}
   */
  SplayTree.prototype.load = function load (keys, values, presort) {
      if ( keys === void 0 ) keys = [];
      if ( values === void 0 ) values = [];
      if ( presort === void 0 ) presort = false;

    if (this._size !== 0) { throw new Error('bulk-load: tree is not empty'); }
    var size = keys.length;
    if (presort) { sort(keys, values, 0, size - 1, this._compare); }
    this._root = loadRecursive(null, keys, values, 0, size);
    this._size = size;
    return this;
  };


  SplayTree.prototype.min = function min () {
    var node = this.minNode(this._root);
    if (node) { return node.key; }
    else    { return null; }
  };


  SplayTree.prototype.max = function max () {
    var node = this.maxNode(this._root);
    if (node) { return node.key; }
    else    { return null; }
  };

  SplayTree.prototype.isEmpty = function isEmpty () { return this._root === null; };
  prototypeAccessors.size.get = function () { return this._size; };


  /**
   * Create a tree and load it with items
   * @param{Array<Key>}        keys
   * @param{Array<Value>?}      [values]

   * @param{Function?}          [comparator]
   * @param{Boolean?}           [presort=false] Pre-sort keys and values, using
   *                                             tree's comparator. Sorting is done
   *                                             in-place
   * @param{Boolean?}           [noDuplicates=false] Allow duplicates
   * @return {SplayTree}
   */
  SplayTree.createTree = function createTree (keys, values, comparator, presort, noDuplicates) {
    return new SplayTree(comparator, noDuplicates).load(keys, values, presort);
  };

  Object.defineProperties( SplayTree.prototype, prototypeAccessors );


  function loadRecursive (parent, keys, values, start, end) {
    var size = end - start;
    if (size > 0) {
      var middle = start + Math.floor(size / 2);
      var key    = keys[middle];
      var data   = values[middle];
      var node   = { key: key, data: data, parent: parent };
      node.left    = loadRecursive(node, keys, values, start, middle);
      node.right   = loadRecursive(node, keys, values, middle + 1, end);
      return node;
    }
    return null;
  }


  function sort(keys, values, left, right, compare) {
    if (left >= right) { return; }

    var pivot = keys[(left + right) >> 1];
    var i = left - 1;
    var j = right + 1;

    while (true) {
      do { i++; } while (compare(keys[i], pivot) < 0);
      do { j--; } while (compare(keys[j], pivot) > 0);
      if (i >= j) { break; }

      var tmp = keys[i];
      keys[i] = keys[j];
      keys[j] = tmp;

      tmp = values[i];
      values[i] = values[j];
      values[j] = tmp;
    }

    sort(keys, values,  left,     j, compare);
    sort(keys, values, j + 1, right, compare);
  }

  var NORMAL               = 0;
  var NON_CONTRIBUTING     = 1;
  var SAME_TRANSITION      = 2;
  var DIFFERENT_TRANSITION = 3;

  var INTERSECTION = 0;
  var UNION        = 1;
  var DIFFERENCE   = 2;
  var XOR          = 3;

  /**
   * @param  {SweepEvent} event
   * @param  {SweepEvent} prev
   * @param  {Operation} operation
   */
  function computeFields (event, prev, operation) {
    // compute inOut and otherInOut fields
    if (prev === null) {
      event.inOut      = false;
      event.otherInOut = true;

    // previous line segment in sweepline belongs to the same polygon
    } else {
      if (event.isSubject === prev.isSubject) {
        event.inOut      = !prev.inOut;
        event.otherInOut = prev.otherInOut;

      // previous line segment in sweepline belongs to the clipping polygon
      } else {
        event.inOut      = !prev.otherInOut;
        event.otherInOut = prev.isVertical() ? !prev.inOut : prev.inOut;
      }

      // compute prevInResult field
      if (prev) {
        event.prevInResult = (!inResult(prev, operation) || prev.isVertical())
          ? prev.prevInResult : prev;
      }
    }

    // check if the line segment belongs to the Boolean operation
    event.inResult = inResult(event, operation);
  }


  /* eslint-disable indent */
  function inResult(event, operation) {
    switch (event.type) {
      case NORMAL:
        switch (operation) {
          case INTERSECTION:
            return !event.otherInOut;
          case UNION:
            return event.otherInOut;
          case DIFFERENCE:
            // return (event.isSubject && !event.otherInOut) ||
            //         (!event.isSubject && event.otherInOut);
            return (event.isSubject && event.otherInOut) ||
                    (!event.isSubject && !event.otherInOut);
          case XOR:
            return true;
        }
        break;
      case SAME_TRANSITION:
        return operation === INTERSECTION || operation === UNION;
      case DIFFERENT_TRANSITION:
        return operation === DIFFERENCE;
      case NON_CONTRIBUTING:
        return false;
    }
    return false;
  }
  /* eslint-enable indent */

  var SweepEvent = function SweepEvent (point, left, otherEvent, isSubject, edgeType) {

    /**
     * Is left endpoint?
     * @type {Boolean}
     */
    this.left = left;

    /**
     * @type {Array.<Number>}
     */
    this.point = point;

    /**
     * Other edge reference
     * @type {SweepEvent}
     */
    this.otherEvent = otherEvent;

    /**
     * Belongs to source or clipping polygon
     * @type {Boolean}
     */
    this.isSubject = isSubject;

    /**
     * Edge contribution type
     * @type {Number}
     */
    this.type = edgeType || NORMAL;


    /**
     * In-out transition for the sweepline crossing polygon
     * @type {Boolean}
     */
    this.inOut = false;


    /**
     * @type {Boolean}
     */
    this.otherInOut = false;

    /**
     * Previous event in result?
     * @type {SweepEvent}
     */
    this.prevInResult = null;

    /**
     * Does event belong to result?
     * @type {Boolean}
     */
    this.inResult = false;


    // connection step

    /**
     * @type {Boolean}
     */
    this.resultInOut = false;

    this.isExteriorRing = true;
  };


  /**
   * @param{Array.<Number>}p
   * @return {Boolean}
   */
  SweepEvent.prototype.isBelow = function isBelow (p) {
    var p0 = this.point, p1 = this.otherEvent.point;
    return this.left
      ? (p0[0] - p[0]) * (p1[1] - p[1]) - (p1[0] - p[0]) * (p0[1] - p[1]) > 0
      // signedArea(this.point, this.otherEvent.point, p) > 0 :
      : (p1[0] - p[0]) * (p0[1] - p[1]) - (p0[0] - p[0]) * (p1[1] - p[1]) > 0;
      //signedArea(this.otherEvent.point, this.point, p) > 0;
  };


  /**
   * @param{Array.<Number>}p
   * @return {Boolean}
   */
  SweepEvent.prototype.isAbove = function isAbove (p) {
    return !this.isBelow(p);
  };


  /**
   * @return {Boolean}
   */
  SweepEvent.prototype.isVertical = function isVertical () {
    return this.point[0] === this.otherEvent.point[0];
  };


  SweepEvent.prototype.clone = function clone () {
    var copy = new SweepEvent(
      this.point, this.left, this.otherEvent, this.isSubject, this.type);

    copy.inResult     = this.inResult;
    copy.prevInResult = this.prevInResult;
    copy.isExteriorRing = this.isExteriorRing;
    copy.inOut        = this.inOut;
    copy.otherInOut   = this.otherInOut;

    return copy;
  };

  function equals(p1, p2) {
    if (p1[0] === p2[0]) {
      if (p1[1] === p2[1]) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  // const EPSILON = 1e-9;
  // const abs = Math.abs;
  // TODO https://github.com/w8r/martinez/issues/6#issuecomment-262847164
  // Precision problem.
  //
  // module.exports = function equals(p1, p2) {
  //   return abs(p1[0] - p2[0]) <= EPSILON && abs(p1[1] - p2[1]) <= EPSILON;
  // };

  /**
   * Signed area of the triangle (p0, p1, p2)
   * @param  {Array.<Number>} p0
   * @param  {Array.<Number>} p1
   * @param  {Array.<Number>} p2
   * @return {Number}
   */
  function signedArea(p0, p1, p2) {
    return (p0[0] - p2[0]) * (p1[1] - p2[1]) - (p1[0] - p2[0]) * (p0[1] - p2[1]);
  }

  /**
   * @param  {SweepEvent} e1
   * @param  {SweepEvent} e2
   * @return {Number}
   */
  function compareEvents(e1, e2) {
    var p1 = e1.point;
    var p2 = e2.point;

    // Different x-coordinate
    if (p1[0] > p2[0]) { return 1; }
    if (p1[0] < p2[0]) { return -1; }

    // Different points, but same x-coordinate
    // Event with lower y-coordinate is processed first
    if (p1[1] !== p2[1]) { return p1[1] > p2[1] ? 1 : -1; }

    return specialCases(e1, e2, p1, p2);
  }


  /* eslint-disable no-unused-vars */
  function specialCases(e1, e2, p1, p2) {
    // Same coordinates, but one is a left endpoint and the other is
    // a right endpoint. The right endpoint is processed first
    if (e1.left !== e2.left)
      { return e1.left ? 1 : -1; }

    // const p2 = e1.otherEvent.point, p3 = e2.otherEvent.point;
    // const sa = (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1])
    // Same coordinates, both events
    // are left endpoints or right endpoints.
    // not collinear
    if (signedArea(p1, e1.otherEvent.point, e2.otherEvent.point) !== 0) {
      // the event associate to the bottom segment is processed first
      return (!e1.isBelow(e2.otherEvent.point)) ? 1 : -1;
    }

    return (!e1.isSubject && e2.isSubject) ? 1 : -1;
  }
  /* eslint-enable no-unused-vars */

  /**
   * @param  {SweepEvent} se
   * @param  {Array.<Number>} p
   * @param  {Queue} queue
   * @return {Queue}
   */
  function divideSegment(se, p, queue)  {
    var r = new SweepEvent(p, false, se,            se.isSubject);
    var l = new SweepEvent(p, true,  se.otherEvent, se.isSubject);

    /* eslint-disable no-console */
    if (equals(se.point, se.otherEvent.point)) {

      console.warn('what is that, a collapsed segment?', se);
    }
    /* eslint-enable no-console */

    r.contourId = l.contourId = se.contourId;

    // avoid a rounding error. The left event would be processed after the right event
    if (compareEvents(l, se.otherEvent) > 0) {
      se.otherEvent.left = true;
      l.left = false;
    }

    // avoid a rounding error. The left event would be processed after the right event
    // if (compareEvents(se, r) > 0) {}

    se.otherEvent.otherEvent = l;
    se.otherEvent = r;

    queue.push(l);
    queue.push(r);

    return queue;
  }

  //const EPS = 1e-9;

  /**
   * Finds the magnitude of the cross product of two vectors (if we pretend
   * they're in three dimensions)
   *
   * @param {Object} a First vector
   * @param {Object} b Second vector
   * @private
   * @returns {Number} The magnitude of the cross product
   */
  function crossProduct(a, b) {
    return (a[0] * b[1]) - (a[1] * b[0]);
  }

  /**
   * Finds the dot product of two vectors.
   *
   * @param {Object} a First vector
   * @param {Object} b Second vector
   * @private
   * @returns {Number} The dot product
   */
  function dotProduct(a, b) {
    return (a[0] * b[0]) + (a[1] * b[1]);
  }

  /**
   * Finds the intersection (if any) between two line segments a and b, given the
   * line segments' end points a1, a2 and b1, b2.
   *
   * This algorithm is based on Schneider and Eberly.
   * http://www.cimec.org.ar/~ncalvo/Schneider_Eberly.pdf
   * Page 244.
   *
   * @param {Array.<Number>} a1 point of first line
   * @param {Array.<Number>} a2 point of first line
   * @param {Array.<Number>} b1 point of second line
   * @param {Array.<Number>} b2 point of second line
   * @param {Boolean=}       noEndpointTouch whether to skip single touchpoints
   *                                         (meaning connected segments) as
   *                                         intersections
   * @returns {Array.<Array.<Number>>|Null} If the lines intersect, the point of
   * intersection. If they overlap, the two end points of the overlapping segment.
   * Otherwise, null.
   */
  function intersection (a1, a2, b1, b2, noEndpointTouch) {
    // The algorithm expects our lines in the form P + sd, where P is a point,
    // s is on the interval [0, 1], and d is a vector.
    // We are passed two points. P can be the first point of each pair. The
    // vector, then, could be thought of as the distance (in x and y components)
    // from the first point to the second point.
    // So first, let's make our vectors:
    var va = [a2[0] - a1[0], a2[1] - a1[1]];
    var vb = [b2[0] - b1[0], b2[1] - b1[1]];
    // We also define a function to convert back to regular point form:

    /* eslint-disable arrow-body-style */

    function toPoint(p, s, d) {
      return [
        p[0] + s * d[0],
        p[1] + s * d[1]
      ];
    }

    /* eslint-enable arrow-body-style */

    // The rest is pretty much a straight port of the algorithm.
    var e = [b1[0] - a1[0], b1[1] - a1[1]];
    var kross    = crossProduct(va, vb);
    var sqrKross = kross * kross;
    var sqrLenA  = dotProduct(va, va);
    //const sqrLenB  = dotProduct(vb, vb);

    // Check for line intersection. This works because of the properties of the
    // cross product -- specifically, two vectors are parallel if and only if the
    // cross product is the 0 vector. The full calculation involves relative error
    // to account for possible very small line segments. See Schneider & Eberly
    // for details.
    if (sqrKross > 0/* EPS * sqrLenB * sqLenA */) {
      // If they're not parallel, then (because these are line segments) they
      // still might not actually intersect. This code checks that the
      // intersection point of the lines is actually on both line segments.
      var s = crossProduct(e, vb) / kross;
      if (s < 0 || s > 1) {
        // not on line segment a
        return null;
      }
      var t = crossProduct(e, va) / kross;
      if (t < 0 || t > 1) {
        // not on line segment b
        return null;
      }
      if (s === 0 || s === 1) {
        // on an endpoint of line segment a
        return noEndpointTouch ? null : [toPoint(a1, s, va)];
      }
      if (t === 0 || t === 1) {
        // on an endpoint of line segment b
        return noEndpointTouch ? null : [toPoint(b1, t, vb)];
      }
      return [toPoint(a1, s, va)];
    }

    // If we've reached this point, then the lines are either parallel or the
    // same, but the segments could overlap partially or fully, or not at all.
    // So we need to find the overlap, if any. To do that, we can use e, which is
    // the (vector) difference between the two initial points. If this is parallel
    // with the line itself, then the two lines are the same line, and there will
    // be overlap.
    //const sqrLenE = dotProduct(e, e);
    kross = crossProduct(e, va);
    sqrKross = kross * kross;

    if (sqrKross > 0 /* EPS * sqLenB * sqLenE */) {
    // Lines are just parallel, not the same. No overlap.
      return null;
    }

    var sa = dotProduct(va, e) / sqrLenA;
    var sb = sa + dotProduct(va, vb) / sqrLenA;
    var smin = Math.min(sa, sb);
    var smax = Math.max(sa, sb);

    // this is, essentially, the FindIntersection acting on floats from
    // Schneider & Eberly, just inlined into this function.
    if (smin <= 1 && smax >= 0) {

      // overlap on an end point
      if (smin === 1) {
        return noEndpointTouch ? null : [toPoint(a1, smin > 0 ? smin : 0, va)];
      }

      if (smax === 0) {
        return noEndpointTouch ? null : [toPoint(a1, smax < 1 ? smax : 1, va)];
      }

      if (noEndpointTouch && smin === 0 && smax === 1) { return null; }

      // There's overlap on a segment -- two points of intersection. Return both.
      return [
        toPoint(a1, smin > 0 ? smin : 0, va),
        toPoint(a1, smax < 1 ? smax : 1, va)
      ];
    }

    return null;
  }

  /**
   * @param  {SweepEvent} se1
   * @param  {SweepEvent} se2
   * @param  {Queue}      queue
   * @return {Number}
   */
  function possibleIntersection (se1, se2, queue) {
    // that disallows self-intersecting polygons,
    // did cost us half a day, so I'll leave it
    // out of respect
    // if (se1.isSubject === se2.isSubject) return;
    var inter = intersection(
      se1.point, se1.otherEvent.point,
      se2.point, se2.otherEvent.point
    );

    var nintersections = inter ? inter.length : 0;
    if (nintersections === 0) { return 0; } // no intersection

    // the line segments intersect at an endpoint of both line segments
    if ((nintersections === 1) &&
        (equals(se1.point, se2.point) ||
         equals(se1.otherEvent.point, se2.otherEvent.point))) {
      return 0;
    }

    if (nintersections === 2 && se1.isSubject === se2.isSubject) {
      // if(se1.contourId === se2.contourId){
      // console.warn('Edges of the same polygon overlap',
      //   se1.point, se1.otherEvent.point, se2.point, se2.otherEvent.point);
      // }
      //throw new Error('Edges of the same polygon overlap');
      return 0;
    }

    // The line segments associated to se1 and se2 intersect
    if (nintersections === 1) {

      // if the intersection point is not an endpoint of se1
      if (!equals(se1.point, inter[0]) && !equals(se1.otherEvent.point, inter[0])) {
        divideSegment(se1, inter[0], queue);
      }

      // if the intersection point is not an endpoint of se2
      if (!equals(se2.point, inter[0]) && !equals(se2.otherEvent.point, inter[0])) {
        divideSegment(se2, inter[0], queue);
      }
      return 1;
    }

    // The line segments associated to se1 and se2 overlap
    var events        = [];
    var leftCoincide  = false;
    var rightCoincide = false;

    if (equals(se1.point, se2.point)) {
      leftCoincide = true; // linked
    } else if (compareEvents(se1, se2) === 1) {
      events.push(se2, se1);
    } else {
      events.push(se1, se2);
    }

    if (equals(se1.otherEvent.point, se2.otherEvent.point)) {
      rightCoincide = true;
    } else if (compareEvents(se1.otherEvent, se2.otherEvent) === 1) {
      events.push(se2.otherEvent, se1.otherEvent);
    } else {
      events.push(se1.otherEvent, se2.otherEvent);
    }

    if ((leftCoincide && rightCoincide) || leftCoincide) {
      // both line segments are equal or share the left endpoint
      se2.type = NON_CONTRIBUTING;
      se1.type = (se2.inOut === se1.inOut)
        ? SAME_TRANSITION : DIFFERENT_TRANSITION;

      if (leftCoincide && !rightCoincide) {
        // honestly no idea, but changing events selection from [2, 1]
        // to [0, 1] fixes the overlapping self-intersecting polygons issue
        divideSegment(events[1].otherEvent, events[0].point, queue);
      }
      return 2;
    }

    // the line segments share the right endpoint
    if (rightCoincide) {
      divideSegment(events[0], events[1].point, queue);
      return 3;
    }

    // no line segment includes totally the other one
    if (events[0] !== events[3].otherEvent) {
      divideSegment(events[0], events[1].point, queue);
      divideSegment(events[1], events[2].point, queue);
      return 3;
    }

    // one line segment includes the other one
    divideSegment(events[0], events[1].point, queue);
    divideSegment(events[3].otherEvent, events[2].point, queue);

    return 3;
  }

  /**
   * @param  {SweepEvent} le1
   * @param  {SweepEvent} le2
   * @return {Number}
   */
  function compareSegments(le1, le2) {
    if (le1 === le2) { return 0; }

    // Segments are not collinear
    if (signedArea(le1.point, le1.otherEvent.point, le2.point) !== 0 ||
      signedArea(le1.point, le1.otherEvent.point, le2.otherEvent.point) !== 0) {

      // If they share their left endpoint use the right endpoint to sort
      if (equals(le1.point, le2.point)) { return le1.isBelow(le2.otherEvent.point) ? -1 : 1; }

      // Different left endpoint: use the left endpoint to sort
      if (le1.point[0] === le2.point[0]) { return le1.point[1] < le2.point[1] ? -1 : 1; }

      // has the line segment associated to e1 been inserted
      // into S after the line segment associated to e2 ?
      if (compareEvents(le1, le2) === 1) { return le2.isAbove(le1.point) ? -1 : 1; }

      // The line segment associated to e2 has been inserted
      // into S after the line segment associated to e1
      return le1.isBelow(le2.point) ? -1 : 1;
    }

    if (le1.isSubject === le2.isSubject) { // same polygon
      var p1 = le1.point, p2 = le2.point;
      if (p1[0] === p2[0] && p1[1] === p2[1]/*equals(le1.point, le2.point)*/) {
        p1 = le1.otherEvent.point; p2 = le2.otherEvent.point;
        if (p1[0] === p2[0] && p1[1] === p2[1]) { return 0; }
        else { return le1.contourId > le2.contourId ? 1 : -1; }
      }
    } else { // Segments are collinear, but belong to separate polygons
      return le1.isSubject ? -1 : 1;
    }

    return compareEvents(le1, le2) === 1 ? 1 : -1;
  }

  function subdivide(eventQueue, subject, clipping, sbbox, cbbox, operation) {
    var sweepLine = new SplayTree(compareSegments);
    var sortedEvents = [];

    var rightbound = Math.min(sbbox[2], cbbox[2]);

    var prev, next, begin;

    while (eventQueue.length !== 0) {
      var event = eventQueue.pop();
      sortedEvents.push(event);

      // optimization by bboxes for intersection and difference goes here
      if ((operation === INTERSECTION && event.point[0] > rightbound) ||
          (operation === DIFFERENCE   && event.point[0] > sbbox[2])) {
        break;
      }

      if (event.left) {
        next  = prev = sweepLine.insert(event);
        begin = sweepLine.minNode();

        if (prev !== begin) { prev = sweepLine.prev(prev); }
        else                { prev = null; }

        next = sweepLine.next(next);

        var prevEvent = prev ? prev.key : null;
        var prevprevEvent = (void 0);
        computeFields(event, prevEvent, operation);
        if (next) {
          if (possibleIntersection(event, next.key, eventQueue) === 2) {
            computeFields(event, prevEvent, operation);
            computeFields(event, next.key, operation);
          }
        }

        if (prev) {
          if (possibleIntersection(prev.key, event, eventQueue) === 2) {
            var prevprev = prev;
            if (prevprev !== begin) { prevprev = sweepLine.prev(prevprev); }
            else                    { prevprev = null; }

            prevprevEvent = prevprev ? prevprev.key : null;
            computeFields(prevEvent, prevprevEvent, operation);
            computeFields(event,     prevEvent,     operation);
          }
        }
      } else {
        event = event.otherEvent;
        next = prev = sweepLine.find(event);

        if (prev && next) {

          if (prev !== begin) { prev = sweepLine.prev(prev); }
          else                { prev = null; }

          next = sweepLine.next(next);
          sweepLine.remove(event);

          if (next && prev) {
            possibleIntersection(prev.key, next.key, eventQueue);
          }
        }
      }
    }
    return sortedEvents;
  }

  /**
   * @param  {Array.<SweepEvent>} sortedEvents
   * @return {Array.<SweepEvent>}
   */
  function orderEvents(sortedEvents) {
    var event, i, len, tmp;
    var resultEvents = [];
    for (i = 0, len = sortedEvents.length; i < len; i++) {
      event = sortedEvents[i];
      if ((event.left && event.inResult) ||
        (!event.left && event.otherEvent.inResult)) {
        resultEvents.push(event);
      }
    }
    // Due to overlapping edges the resultEvents array can be not wholly sorted
    var sorted = false;
    while (!sorted) {
      sorted = true;
      for (i = 0, len = resultEvents.length; i < len; i++) {
        if ((i + 1) < len &&
          compareEvents(resultEvents[i], resultEvents[i + 1]) === 1) {
          tmp = resultEvents[i];
          resultEvents[i] = resultEvents[i + 1];
          resultEvents[i + 1] = tmp;
          sorted = false;
        }
      }
    }


    for (i = 0, len = resultEvents.length; i < len; i++) {
      event = resultEvents[i];
      event.pos = i;
    }

    // imagine, the right event is found in the beginning of the queue,
    // when his left counterpart is not marked yet
    for (i = 0, len = resultEvents.length; i < len; i++) {
      event = resultEvents[i];
      if (!event.left) {
        tmp = event.pos;
        event.pos = event.otherEvent.pos;
        event.otherEvent.pos = tmp;
      }
    }

    return resultEvents;
  }


  /**
   * @param  {Number} pos
   * @param  {Array.<SweepEvent>} resultEvents
   * @param  {Object>}    processed
   * @return {Number}
   */
  function nextPos(pos, resultEvents, processed, origIndex) {
    var newPos = pos + 1;
    var length = resultEvents.length;
    if (newPos > length - 1) { return pos - 1; }
    var p  = resultEvents[pos].point;
    var p1 = resultEvents[newPos].point;


    // while in range and not the current one by value
    while (newPos < length && p1[0] === p[0] && p1[1] === p[1]) {
      if (!processed[newPos]) {
        return newPos;
      } else   {
        newPos++;
      }
      p1 = resultEvents[newPos].point;
    }

    newPos = pos - 1;

    while (processed[newPos] && newPos >= origIndex) {
      newPos--;
    }
    return newPos;
  }


  /**
   * @param  {Array.<SweepEvent>} sortedEvents
   * @return {Array.<*>} polygons
   */
  function connectEdges(sortedEvents, operation) {
    var i, len;
    var resultEvents = orderEvents(sortedEvents);

    // "false"-filled array
    var processed = {};
    var result = [];
    var event;

    for (i = 0, len = resultEvents.length; i < len; i++) {
      if (processed[i]) { continue; }
      var contour = [[]];

      if (!resultEvents[i].isExteriorRing) {
        if (operation === DIFFERENCE && !resultEvents[i].isSubject && result.length === 0) {
          result.push(contour);
        } else if (result.length === 0) {
          result.push([[contour]]);
        } else {
          result[result.length - 1].push(contour[0]);
        }
      } else if (operation === DIFFERENCE && !resultEvents[i].isSubject && result.length > 1) {
        result[result.length - 1].push(contour[0]);
      } else {
        result.push(contour);
      }

      var ringId = result.length - 1;
      var pos = i;

      var initial = resultEvents[i].point;
      contour[0].push(initial);

      while (pos >= i) {
        event = resultEvents[pos];
        processed[pos] = true;

        if (event.left) {
          event.resultInOut = false;
          event.contourId   = ringId;
        } else {
          event.otherEvent.resultInOut = true;
          event.otherEvent.contourId   = ringId;
        }

        pos = event.pos;
        processed[pos] = true;
        contour[0].push(resultEvents[pos].point);
        pos = nextPos(pos, resultEvents, processed, i);
      }

      pos = pos === -1 ? i : pos;

      event = resultEvents[pos];
      processed[pos] = processed[event.pos] = true;
      event.otherEvent.resultInOut = true;
      event.otherEvent.contourId   = ringId;
    }

    // Handle if the result is a polygon (eg not multipoly)
    // Commented it again, let's see what do we mean by that
    // if (result.length === 1) result = result[0];
    return result;
  }

  var tinyqueue = TinyQueue;
  var default_1 = TinyQueue;

  function TinyQueue(data, compare) {
      var this$1 = this;

      if (!(this instanceof TinyQueue)) { return new TinyQueue(data, compare); }

      this.data = data || [];
      this.length = this.data.length;
      this.compare = compare || defaultCompare;

      if (this.length > 0) {
          for (var i = (this.length >> 1) - 1; i >= 0; i--) { this$1._down(i); }
      }
  }

  function defaultCompare(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
  }

  TinyQueue.prototype = {

      push: function (item) {
          this.data.push(item);
          this.length++;
          this._up(this.length - 1);
      },

      pop: function () {
          if (this.length === 0) { return undefined; }

          var top = this.data[0];
          this.length--;

          if (this.length > 0) {
              this.data[0] = this.data[this.length];
              this._down(0);
          }
          this.data.pop();

          return top;
      },

      peek: function () {
          return this.data[0];
      },

      _up: function (pos) {
          var data = this.data;
          var compare = this.compare;
          var item = data[pos];

          while (pos > 0) {
              var parent = (pos - 1) >> 1;
              var current = data[parent];
              if (compare(item, current) >= 0) { break; }
              data[pos] = current;
              pos = parent;
          }

          data[pos] = item;
      },

      _down: function (pos) {
          var this$1 = this;

          var data = this.data;
          var compare = this.compare;
          var halfLength = this.length >> 1;
          var item = data[pos];

          while (pos < halfLength) {
              var left = (pos << 1) + 1;
              var right = left + 1;
              var best = data[left];

              if (right < this$1.length && compare(data[right], best) < 0) {
                  left = right;
                  best = data[right];
              }
              if (compare(best, item) >= 0) { break; }

              data[pos] = best;
              pos = left;
          }

          data[pos] = item;
      }
  };
  tinyqueue.default = default_1;

  var max = Math.max;
  var min = Math.min;

  var contourId = 0;


  function processPolygon(contourOrHole, isSubject, depth, Q, bbox, isExteriorRing) {
    var i, len, s1, s2, e1, e2;
    for (i = 0, len = contourOrHole.length - 1; i < len; i++) {
      s1 = contourOrHole[i];
      s2 = contourOrHole[i + 1];
      e1 = new SweepEvent(s1, false, undefined, isSubject);
      e2 = new SweepEvent(s2, false, e1,        isSubject);
      e1.otherEvent = e2;

      if (s1[0] === s2[0] && s1[1] === s2[1]) {
        continue; // skip collapsed edges, or it breaks
      }

      e1.contourId = e2.contourId = depth;
      if (!isExteriorRing) {
        e1.isExteriorRing = false;
        e2.isExteriorRing = false;
      }
      if (compareEvents(e1, e2) > 0) {
        e2.left = true;
      } else {
        e1.left = true;
      }

      var x = s1[0], y = s1[1];
      bbox[0] = min(bbox[0], x);
      bbox[1] = min(bbox[1], y);
      bbox[2] = max(bbox[2], x);
      bbox[3] = max(bbox[3], y);

      // Pushing it so the queue is sorted from left to right,
      // with object on the left having the highest priority.
      Q.push(e1);
      Q.push(e2);
    }
  }


  function fillQueue(subject, clipping, sbbox, cbbox, operation) {
    var eventQueue = new tinyqueue(null, compareEvents);
    var polygonSet, isExteriorRing, i, ii, j, jj; //, k, kk;

    for (i = 0, ii = subject.length; i < ii; i++) {
      polygonSet = subject[i];
      for (j = 0, jj = polygonSet.length; j < jj; j++) {
        isExteriorRing = j === 0;
        if (isExteriorRing) { contourId++; }
        processPolygon(polygonSet[j], true, contourId, eventQueue, sbbox, isExteriorRing);
      }
    }

    for (i = 0, ii = clipping.length; i < ii; i++) {
      polygonSet = clipping[i];
      for (j = 0, jj = polygonSet.length; j < jj; j++) {
        isExteriorRing = j === 0;
        if (operation === DIFFERENCE) { isExteriorRing = false; }
        if (isExteriorRing) { contourId++; }
        processPolygon(polygonSet[j], false, contourId, eventQueue, cbbox, isExteriorRing);
      }
    }

    return eventQueue;
  }

  var EMPTY = [];


  function trivialOperation(subject, clipping, operation) {
    var result = null;
    if (subject.length * clipping.length === 0) {
      if        (operation === INTERSECTION) {
        result = EMPTY;
      } else if (operation === DIFFERENCE) {
        result = subject;
      } else if (operation === UNION ||
                 operation === XOR) {
        result = (subject.length === 0) ? clipping : subject;
      }
    }
    return result;
  }


  function compareBBoxes(subject, clipping, sbbox, cbbox, operation) {
    var result = null;
    if (sbbox[0] > cbbox[2] ||
        cbbox[0] > sbbox[2] ||
        sbbox[1] > cbbox[3] ||
        cbbox[1] > sbbox[3]) {
      if        (operation === INTERSECTION) {
        result = EMPTY;
      } else if (operation === DIFFERENCE) {
        result = subject;
      } else if (operation === UNION ||
                 operation === XOR) {
        result = subject.concat(clipping);
      }
    }
    return result;
  }


  function boolean(subject, clipping, operation) {
    if (typeof subject[0][0][0] === 'number') {
      subject = [subject];
    }
    if (typeof clipping[0][0][0] === 'number') {
      clipping = [clipping];
    }
    var trivial = trivialOperation(subject, clipping, operation);
    if (trivial) {
      return trivial === EMPTY ? null : trivial;
    }
    var sbbox = [Infinity, Infinity, -Infinity, -Infinity];
    var cbbox = [Infinity, Infinity, -Infinity, -Infinity];

    //console.time('fill queue');
    var eventQueue = fillQueue(subject, clipping, sbbox, cbbox, operation);
    //console.timeEnd('fill queue');

    trivial = compareBBoxes(subject, clipping, sbbox, cbbox, operation);
    if (trivial) {
      return trivial === EMPTY ? null : trivial;
    }
    //console.time('subdivide edges');
    var sortedEvents = subdivide(eventQueue, subject, clipping, sbbox, cbbox, operation);
    //console.timeEnd('subdivide edges');

    //console.time('connect vertices');
    var result = connectEdges(sortedEvents, operation);
    //console.timeEnd('connect vertices');
    return result;
  }

  function union (subject, clipping) {
    return boolean(subject, clipping, UNION);
  }

  function diff (subject, clipping) {
    return boolean(subject, clipping, DIFFERENCE);
  }

  function xor (subject, clipping){
    return boolean(subject, clipping, XOR);
  }

  function intersection$1 (subject, clipping) {
    return boolean(subject, clipping, INTERSECTION);
  }

  /**
   * @enum {Number}
   */
  var operations = { UNION: UNION, DIFFERENCE: DIFFERENCE, INTERSECTION: INTERSECTION, XOR: XOR };

  exports.union = union;
  exports.diff = diff;
  exports.xor = xor;
  exports.intersection = intersection$1;
  exports.operations = operations;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=martinez.umd.js.map


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, keywords, files, main, dependencies, devDependencies, peerDependencies, scripts, repository, author, license, bugs, homepage, prettier, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"@geoman-io/leaflet-geoman-free\",\"version\":\"2.5.0\",\"description\":\"A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0\",\"keywords\":[\"leaflet\",\"polygon management\",\"geometry editing\",\"map data\",\"map overlay\",\"polygon\",\"geojson\",\"leaflet-draw\",\"data-field-geojson\",\"ui-leaflet-draw\"],\"files\":[\"dist\"],\"main\":\"dist/leaflet-geoman.min.js\",\"dependencies\":{\"@turf/difference\":\"^6.0.2\",\"@turf/intersect\":\"^6.1.3\",\"@turf/kinks\":\"6.x\",\"lodash\":\"^4.17.15\"},\"devDependencies\":{\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"babel-loader\":\"^8.0.6\",\"css-loader\":\"^3.4.2\",\"cypress\":\"^3.8.3\",\"eslint\":\"^4.19.1\",\"eslint-config-airbnb-base\":\"^12.1.0\",\"eslint-config-prettier\":\"^3.6.0\",\"eslint-plugin-cypress\":\"^2.9.0\",\"eslint-plugin-import\":\"^2.20.1\",\"file-loader\":\"^4.3.0\",\"leaflet\":\"^1.6.0\",\"mini-css-extract-plugin\":\"^0.8.2\",\"prettier\":\"^1.19.1\",\"uglifyjs-webpack-plugin\":\"^2.2.0\",\"url-loader\":\"^2.3.0\",\"webpack\":\"^4.41.5\",\"webpack-cli\":\"^3.3.10\"},\"peerDependencies\":{\"leaflet\":\"^1.2.0\"},\"scripts\":{\"start\":\"npm run dev\",\"dev\":\"./node_modules/.bin/webpack --config=webpack.dev.js\",\"test\":\"./node_modules/.bin/cypress run\",\"cypress\":\"./node_modules/.bin/cypress open\",\"build\":\"./node_modules/.bin/webpack --config=webpack.build.js\",\"buildnew\":\"./node_modules/.bin/webpack --config=webpack.buildnew.js\",\"prepare\":\"npm run build\",\"eslint-check\":\"eslint --print-config . | eslint-config-prettier-check\",\"eslint\":\"eslint src/ --fix\",\"prettier\":\"prettier --write '{src,cypress}/**/*.{js,css}'\",\"lint\":\"npm run eslint && npm run prettier\"},\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/geoman-io/leaflet-geoman.git\"},\"author\":{\"name\":\"Sumit Kumar\",\"email\":\"sk@outlook.com\",\"url\":\"http://twitter.com/TweetsOfSumit\"},\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/geoman-io/leaflet-geoman/issues\"},\"homepage\":\"https://geoman.io/leaflet-geoman\",\"prettier\":{\"trailingComma\":\"es5\",\"tabWidth\":2,\"semi\":true,\"singleQuote\":true}}");

/***/ }),

/***/ "./src/assets/translations/de.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/de.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Platziere den Marker mit Klick\",\"firstVertex\":\"Platziere den ersten Marker mit Klick\",\"continueLine\":\"Klicke, um weiter zu zeichnen\",\"finishLine\":\"Beende mit Klick auf existierenden Marker\",\"finishPoly\":\"Beende mit Klick auf ersten Marker\",\"finishRect\":\"Beende mit Klick\",\"startCircle\":\"Platziere das Kreiszentrum mit Klick\",\"finishCircle\":\"Beende den Kreis mit Klick\",\"placeCircleMarker\":\"Platziere den Kreismarker mit Klick\"},\"actions\":{\"finish\":\"Beenden\",\"cancel\":\"Abbrechen\",\"removeLastVertex\":\"Letzten Vertex löschen\"},\"buttonTitles\":{\"drawMarkerButton\":\"Marker zeichnen\",\"drawPolyButton\":\"Polygon zeichnen\",\"drawLineButton\":\"Polyline zeichnen\",\"drawCircleButton\":\"Kreis zeichnen\",\"drawRectButton\":\"Rechteck zeichnen\",\"editButton\":\"Layer editieren\",\"dragButton\":\"Layer bewegen\",\"cutButton\":\"Layer schneiden\",\"deleteButton\":\"Layer löschen\",\"drawCircleMarkerButton\":\"Kreismarker zeichnen\"}}");

/***/ }),

/***/ "./src/assets/translations/en.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/en.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Click to place marker\",\"firstVertex\":\"Click to place first vertex\",\"continueLine\":\"Click to continue drawing\",\"finishLine\":\"Click any existing marker to finish\",\"finishPoly\":\"Click first marker to finish\",\"finishRect\":\"Click to finish\",\"startCircle\":\"Click to place circle center\",\"finishCircle\":\"Click to finish circle\",\"placeCircleMarker\":\"Click to place circle marker\"},\"actions\":{\"finish\":\"Finish\",\"cancel\":\"Cancel\",\"removeLastVertex\":\"Remove Last Vertex\"},\"buttonTitles\":{\"drawMarkerButton\":\"Draw Marker\",\"drawPolyButton\":\"Draw Polygons\",\"drawLineButton\":\"Draw Polyline\",\"drawCircleButton\":\"Draw Circle\",\"drawRectButton\":\"Draw Rectangle\",\"editButton\":\"Edit Layers\",\"dragButton\":\"Drag Layers\",\"cutButton\":\"Cut Layers\",\"deleteButton\":\"Remove Layers\",\"drawCircleMarkerButton\":\"Draw Circle Marker\",\"snappingButton\":\"Snap dragged marker to other layers and vertices\",\"pinningButton\":\"Pin shared vertices together\"}}");

/***/ }),

/***/ "./src/assets/translations/es.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/es.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Presiona para colocar un marcador\",\"firstVertex\":\"Presiona para colocar el primer vértice\",\"continueLine\":\"Presiona para continuar dibujando\",\"finishLine\":\"Presiona cualquier marcador existente para finalizar\",\"finishPoly\":\"Presiona el primer marcador para finalizar\",\"finishRect\":\"Presiona para finalizar\",\"startCircle\":\"Presiona para colocar el centro del circulo\",\"finishCircle\":\"Presiona para finalizar el circulo\",\"placeCircleMarker\":\"Presiona para colocar un marcador de circulo\"},\"actions\":{\"finish\":\"Finalizar\",\"cancel\":\"Cancelar\",\"removeLastVertex\":\"Remover ultimo vértice\"},\"buttonTitles\":{\"drawMarkerButton\":\"Dibujar Marcador\",\"drawPolyButton\":\"Dibujar Polígono\",\"drawLineButton\":\"Dibujar Línea\",\"drawCircleButton\":\"Dibujar Circulo\",\"drawRectButton\":\"Dibujar Rectángulo\",\"editButton\":\"Editar Capas\",\"dragButton\":\"Arrastrar Capas\",\"cutButton\":\"Cortar Capas\",\"deleteButton\":\"Remover Capas\",\"drawCircleMarkerButton\":\"Dibujar Marcador de Circulo\"}}");

/***/ }),

/***/ "./src/assets/translations/fr.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/fr.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Cliquez pour placer un marqueur\",\"firstVertex\":\"Cliquez pour placer le premier sommet\",\"continueLine\":\"Cliquez pour continuer à dessiner\",\"finishLine\":\"Cliquez sur n'importe quel marqueur pour terminer\",\"finishPoly\":\"Cliquez sur le premier marqueur pour terminer\",\"finishRect\":\"Cliquez pour terminer\",\"startCircle\":\"Cliquez pour placer le centre du cercle\",\"finishCircle\":\"Cliquez pour finir le cercle\"},\"actions\":{\"finish\":\"Terminer\",\"cancel\":\"Annuler\",\"removeLastVertex\":\"Retirer le dernier sommet\"},\"buttonTitles\":{\"drawMarkerButton\":\"Placer des marqueurs\",\"drawPolyButton\":\"Dessiner des polygones\",\"drawLineButton\":\"Dessiner des polylignes\",\"drawCircleButton\":\"Dessiner un cercle\",\"drawRectButton\":\"Dessiner un rectangle\",\"editButton\":\"Éditer des calques\",\"dragButton\":\"Déplacer des calques\",\"cutButton\":\"Couper des calques\",\"deleteButton\":\"Supprimer des calques\"}}");

/***/ }),

/***/ "./src/assets/translations/id.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/id.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Klik untuk menempatkan marker\",\"firstVertex\":\"Klik untuk menempatkan vertex pertama\",\"continueLine\":\"Klik untuk meneruskan digitasi\",\"finishLine\":\"Klik pada sembarang marker yang ada untuk mengakhiri\",\"finishPoly\":\"Klik marker pertama untuk mengakhiri\",\"finishRect\":\"Klik untuk mengakhiri\",\"startCircle\":\"Klik untuk menempatkan titik pusat lingkaran\",\"finishCircle\":\"Klik untuk mengakhiri lingkaran\"},\"actions\":{\"finish\":\"Selesai\",\"cancel\":\"Batal\",\"removeLastVertex\":\"Hilangkan Vertex Terakhir\"},\"buttonTitles\":{\"drawMarkerButton\":\"Digitasi Marker\",\"drawPolyButton\":\"Digitasi Polygon\",\"drawLineButton\":\"Digitasi Polyline\",\"drawCircleButton\":\"Digitasi Lingkaran\",\"drawRectButton\":\"Digitasi Segi Empat\",\"editButton\":\"Edit Layer\",\"dragButton\":\"Geser Layer\",\"cutButton\":\"Potong Layer\",\"deleteButton\":\"Hilangkan Layer\"}}");

/***/ }),

/***/ "./src/assets/translations/index.js":
/*!******************************************!*\
  !*** ./src/assets/translations/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _en_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en.json */ "./src/assets/translations/en.json");
var _en_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./en.json */ "./src/assets/translations/en.json", 1);
/* harmony import */ var _de_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./de.json */ "./src/assets/translations/de.json");
var _de_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./de.json */ "./src/assets/translations/de.json", 1);
/* harmony import */ var _it_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./it.json */ "./src/assets/translations/it.json");
var _it_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./it.json */ "./src/assets/translations/it.json", 1);
/* harmony import */ var _id_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./id.json */ "./src/assets/translations/id.json");
var _id_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./id.json */ "./src/assets/translations/id.json", 1);
/* harmony import */ var _ro_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ro.json */ "./src/assets/translations/ro.json");
var _ro_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./ro.json */ "./src/assets/translations/ro.json", 1);
/* harmony import */ var _ru_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ru.json */ "./src/assets/translations/ru.json");
var _ru_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./ru.json */ "./src/assets/translations/ru.json", 1);
/* harmony import */ var _es_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./es.json */ "./src/assets/translations/es.json");
var _es_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./es.json */ "./src/assets/translations/es.json", 1);
/* harmony import */ var _nl_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nl.json */ "./src/assets/translations/nl.json");
var _nl_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./nl.json */ "./src/assets/translations/nl.json", 1);
/* harmony import */ var _fr_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fr.json */ "./src/assets/translations/fr.json");
var _fr_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./fr.json */ "./src/assets/translations/fr.json", 1);
/* harmony import */ var _zh_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./zh.json */ "./src/assets/translations/zh.json");
var _zh_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./zh.json */ "./src/assets/translations/zh.json", 1);
/* harmony import */ var _pt_br_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pt_br.json */ "./src/assets/translations/pt_br.json");
var _pt_br_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./pt_br.json */ "./src/assets/translations/pt_br.json", 1);
/* harmony import */ var _pl_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pl.json */ "./src/assets/translations/pl.json");
var _pl_json__WEBPACK_IMPORTED_MODULE_11___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./pl.json */ "./src/assets/translations/pl.json", 1);
/* harmony import */ var _sv_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sv.json */ "./src/assets/translations/sv.json");
var _sv_json__WEBPACK_IMPORTED_MODULE_12___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./sv.json */ "./src/assets/translations/sv.json", 1);













/* harmony default export */ __webpack_exports__["default"] = ({
  en: _en_json__WEBPACK_IMPORTED_MODULE_0__,
  de: _de_json__WEBPACK_IMPORTED_MODULE_1__,
  it: _it_json__WEBPACK_IMPORTED_MODULE_2__,
  id: _id_json__WEBPACK_IMPORTED_MODULE_3__,
  ro: _ro_json__WEBPACK_IMPORTED_MODULE_4__,
  ru: _ru_json__WEBPACK_IMPORTED_MODULE_5__,
  es: _es_json__WEBPACK_IMPORTED_MODULE_6__,
  nl: _nl_json__WEBPACK_IMPORTED_MODULE_7__,
  fr: _fr_json__WEBPACK_IMPORTED_MODULE_8__,
  pt_br: _pt_br_json__WEBPACK_IMPORTED_MODULE_10__,
  zh: _zh_json__WEBPACK_IMPORTED_MODULE_9__,
  pl: _pl_json__WEBPACK_IMPORTED_MODULE_11__,
  sv: _sv_json__WEBPACK_IMPORTED_MODULE_12__
});

/***/ }),

/***/ "./src/assets/translations/it.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/it.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Clicca per posizionare un Marker\",\"firstVertex\":\"Clicca per posizionare il primo vertice\",\"continueLine\":\"Clicca per continuare a disegnare\",\"finishLine\":\"Clicca qualsiasi marker esistente per terminare\",\"finishPoly\":\"Clicca il primo marker per terminare\",\"finishRect\":\"Clicca per terminare\",\"startCircle\":\"Clicca per posizionare il punto centrale del cerchio\",\"finishCircle\":\"Clicca per terminare il cerchio\",\"placeCircleMarker\":\"Clicca per posizionare un Marker del cherchio\"},\"actions\":{\"finish\":\"Termina\",\"cancel\":\"Annulla\",\"removeLastVertex\":\"Rimuovi l'ultimo vertice\"},\"buttonTitles\":{\"drawMarkerButton\":\"Disegna Marker\",\"drawPolyButton\":\"Disegna Poligoni\",\"drawLineButton\":\"Disegna Polilinea\",\"drawCircleButton\":\"Disegna Cerchio\",\"drawRectButton\":\"Disegna Rettangolo\",\"editButton\":\"Modifica Livelli\",\"dragButton\":\"Sposta Livelli\",\"cutButton\":\"Ritaglia Livelli\",\"deleteButton\":\"Elimina Livelli\",\"drawCircleMarkerButton\":\"Disegna Marker del Cherchio\"}}");

/***/ }),

/***/ "./src/assets/translations/nl.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/nl.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Klik om een marker te plaatsen\",\"firstVertex\":\"Klik om het eerste punt te plaatsen\",\"continueLine\":\"Klik om te blijven tekenen\",\"finishLine\":\"Klik op een bestaand punt om te beëindigen\",\"finishPoly\":\"Klik op het eerst punt om te beëindigen\",\"finishRect\":\"Klik om te beëindigen\",\"startCircle\":\"Klik om het middelpunt te plaatsen\",\"finishCircle\":\"Klik om de cirkel te beëindigen\",\"placeCircleMarker\":\"Klik om een marker te plaatsen\"},\"actions\":{\"finish\":\"Bewaar\",\"cancel\":\"Annuleer\",\"removeLastVertex\":\"Verwijder laatste punt\"},\"buttonTitles\":{\"drawMarkerButton\":\"Plaats Marker\",\"drawPolyButton\":\"Teken een vlak\",\"drawLineButton\":\"Teken een lijn\",\"drawCircleButton\":\"Teken een cirkel\",\"drawRectButton\":\"Teken een vierkant\",\"editButton\":\"Bewerk\",\"dragButton\":\"Verplaats\",\"cutButton\":\"Knip\",\"deleteButton\":\"Verwijder\",\"drawCircleMarkerButton\":\"Plaats Marker\"}}");

/***/ }),

/***/ "./src/assets/translations/pl.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/pl.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Kliknij, aby ustawić znacznik\",\"firstVertex\":\"Kliknij, aby ustawić pierwszy punkt\",\"continueLine\":\"Kliknij, aby kontynuować rysowanie\",\"finishLine\":\"Kliknij dowolny punkt, aby zakończyć\",\"finishPoly\":\"Kliknij pierwszy punkt, aby zakończyć\",\"finishRect\":\"Kliknij, aby zakończyć\",\"startCircle\":\"Kliknij, aby ustawić środek koła\",\"finishCircle\":\"Kliknij, aby zakończyć rysowanie koła\",\"placeCircleMarker\":\"Kliknij, aby ustawić okrągły znacznik\"},\"actions\":{\"finish\":\"Zakończ\",\"cancel\":\"Anuluj\",\"removeLastVertex\":\"Usuń ostatni punkt\"},\"buttonTitles\":{\"drawMarkerButton\":\"Narysuj znacznik\",\"drawPolyButton\":\"Narysuj wielokąt\",\"drawLineButton\":\"Narysuj ścieżkę\",\"drawCircleButton\":\"Narysuj koło\",\"drawRectButton\":\"Narysuj prostokąt\",\"editButton\":\"Edytuj\",\"dragButton\":\"Przesuń\",\"cutButton\":\"Wytnij\",\"deleteButton\":\"Usuń\",\"drawCircleMarkerButton\":\"Narysuj okrągły znacznik\"}}");

/***/ }),

/***/ "./src/assets/translations/pt_br.json":
/*!********************************************!*\
  !*** ./src/assets/translations/pt_br.json ***!
  \********************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Clique para posicionar o marcador\",\"firstVertex\":\"Clique para posicionar o primeiro vértice\",\"continueLine\":\"Clique para continuar desenhando\",\"finishLine\":\"Clique em qualquer marcador existente para finalizar\",\"finishPoly\":\"Clique no primeiro ponto para fechar o polígono\",\"finishRect\":\"Clique para finalizar\",\"startCircle\":\"Clique para posicionar o centro do círculo\",\"finishCircle\":\"Clique para fechar o círculo\"},\"actions\":{\"finish\":\"Finalizar\",\"cancel\":\"Cancelar\",\"removeLastVertex\":\"Remover último vértice\"},\"buttonTitles\":{\"drawMarkerButton\":\"Desenhar um marcador\",\"drawPolyButton\":\"Desenhar um polígono\",\"drawLineButton\":\"Desenhar uma polilinha\",\"drawCircleButton\":\"Desenhar um círculo\",\"drawRectButton\":\"Desenhar um retângulo\",\"editButton\":\"Editar camada(s)\",\"dragButton\":\"Mover camada(s)\",\"cutButton\":\"Recortar camada(s)\",\"deleteButton\":\"Remover camada(s)\"}}");

/***/ }),

/***/ "./src/assets/translations/ro.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/ro.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Adaugă un punct\",\"firstVertex\":\"Apasă aici pentru a adăuga primul Vertex\",\"continueLine\":\"Apasă aici pentru a continua desenul\",\"finishLine\":\"Apasă pe orice obiect pentru a finisa desenul\",\"finishPoly\":\"Apasă pe primul obiect pentru a finisa\",\"finishRect\":\"Apasă pentru a finisa\",\"startCircle\":\"Apasă pentru a desena un cerc\",\"finishCircle\":\"Apasă pentru a finisa un cerc\",\"placeCircleMarker\":\"Adaugă un punct\"},\"actions\":{\"finish\":\"Termină\",\"cancel\":\"Anulează\",\"removeLastVertex\":\"Șterge ultimul Vertex\"},\"buttonTitles\":{\"drawMarkerButton\":\"Adaugă o bulină\",\"drawPolyButton\":\"Desenează un poligon\",\"drawLineButton\":\"Desenează o linie\",\"drawCircleButton\":\"Desenează un cerc\",\"drawRectButton\":\"Desenează un dreptunghi\",\"editButton\":\"Editează straturile\",\"dragButton\":\"Mută straturile\",\"cutButton\":\"Taie straturile\",\"deleteButton\":\"Șterge straturile\",\"placeCircleMarker\":\"Adaugă o bulină\"}}");

/***/ }),

/***/ "./src/assets/translations/ru.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/ru.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Щелкните, чтобы поместить маркер\",\"firstVertex\":\"Нажмите, чтобы поместить первый объект\",\"continueLine\":\"Нажмите, чтобы продолжить рисование\",\"finishLine\":\"Щелкните любой существующий маркер для завершения\",\"finishPoly\":\"Выберите первую точку, чтобы закончить\",\"finishRect\":\"Нажмите, чтобы закончить\",\"startCircle\":\"Нажмите чтобы добавить круг\",\"finishCircle\":\"Нажмите чтобы закончить круг\",\"placeCircleMarker\":\"Click to place circle marker\"},\"actions\":{\"finish\":\"Заканчивать\",\"cancel\":\"Отмена\",\"removeLastVertex\":\"Удалить последний объект на карте\"},\"buttonTitles\":{\"drawMarkerButton\":\"Добавить маркер\",\"drawPolyButton\":\"Рисовать полигон\",\"drawLineButton\":\"Рисовать Полилинию\",\"drawCircleButton\":\"Рисовать круг\",\"drawRectButton\":\"Рисовать Прямоугольник\",\"editButton\":\"Редактировать слой\",\"dragButton\":\"Перетаскивать слой\",\"cutButton\":\"Вырезать слой\",\"deleteButton\":\"Удалить слой\",\"placeCircleMarker\":\"Щелкните, чтобы поместить маркер\"}}");

/***/ }),

/***/ "./src/assets/translations/sv.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/sv.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"Klicka för att placera punkt\",\"firstVertex\":\"Klicka för att placera första vertex\",\"continueLine\":\"Klicka för att fortsätta rita\",\"finishLine\":\"Klicka på en existerande punkt för att slutföra\",\"finishPoly\":\"Klicka på den första punkten för att slutföra\",\"finishRect\":\"Klicka för att slutföra\",\"startCircle\":\"Klicka för att placera cirkelns centrum\",\"finishCircle\":\"Klicka för att slutföra cirkeln\",\"placeCircleMarker\":\"Klicka för att placera cirkelmakör\"},\"actions\":{\"finish\":\"Slutför\",\"cancel\":\"Avbryt\",\"removeLastVertex\":\"Ta bort sista vertex\"},\"buttonTitles\":{\"drawMarkerButton\":\"Rita Punkt\",\"drawPolyButton\":\"Rita Rolygoner\",\"drawLineButton\":\"Rita Polyline\",\"drawCircleButton\":\"Rta Cirkel\",\"drawRectButton\":\"Rita Rectangle\",\"editButton\":\"Redigera Lager\",\"dragButton\":\"Dra Lager\",\"cutButton\":\"Klipp i Lager\",\"deleteButton\":\"Ta bort Lager\",\"drawCircleMarkerButton\":\"Rita Cirkelmakör\"}}");

/***/ }),

/***/ "./src/assets/translations/zh.json":
/*!*****************************************!*\
  !*** ./src/assets/translations/zh.json ***!
  \*****************************************/
/*! exports provided: tooltips, actions, buttonTitles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"tooltips\":{\"placeMarker\":\"单击放置标记\",\"firstVertex\":\"单击放置首个顶点\",\"continueLine\":\"单击继续绘制\",\"finishLine\":\"单击任何存在的标记以完成\",\"finishPoly\":\"单击第一个标记以完成\",\"finishRect\":\"单击完成\",\"startCircle\":\"单击放置圆心\",\"finishCircle\":\"单击完成圆形\"},\"actions\":{\"finish\":\"完成\",\"cancel\":\"取消\",\"removeLastVertex\":\"移除最后的顶点\"},\"buttonTitles\":{\"drawMarkerButton\":\"绘制标记\",\"drawPolyButton\":\"绘制多边形\",\"drawLineButton\":\"绘制线段\",\"drawCircleButton\":\"绘制圆形\",\"drawRectButton\":\"绘制长方形\",\"editButton\":\"编辑图层\",\"dragButton\":\"拖拽图层\",\"cutButton\":\"剪切图层\",\"deleteButton\":\"删除图层\"}}");

/***/ }),

/***/ "./src/css/controls.css":
/*!******************************!*\
  !*** ./src/css/controls.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/css/layers.css":
/*!****************************!*\
  !*** ./src/css/layers.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/js/Draw/L.PM.Draw.Circle.js":
/*!*****************************************!*\
  !*** ./src/js/Draw/L.PM.Draw.Circle.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Draw */ "./src/js/Draw/L.PM.Draw.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers/index.js");


_L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].Circle = _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Circle';
    this.toolbarButtonName = 'drawCircle';
  },
  enable: function enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);
    this.options.radius = 0; // enable draw mode

    this._enabled = true; // create a new layergroup

    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;

    this._layerGroup.addTo(this._map); // this is the circle we want to draw


    this._layer = L.circle([0, 0], this.options.templineStyle);
    this._layer._pmTempLayer = true;

    this._layerGroup.addLayer(this._layer); // this is the marker in the center of the circle


    this._centerMarker = L.marker([0, 0], {
      icon: L.divIcon({
        className: 'marker-icon'
      }),
      draggable: false,
      zIndexOffset: 100
    });
    this._centerMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._centerMarker); // this is the hintmarker on the mouse cursor


    this._hintMarker = L.marker([0, 0], {
      icon: L.divIcon({
        className: 'marker-icon cursor-marker'
      })
    });
    this._hintMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._hintMarker); // show the hintmarker if the option is set


    if (this.options.cursorMarker) {
      L.DomUtil.addClass(this._hintMarker._icon, 'visible');
    } // add tooltip to hintmarker


    if (this.options.tooltips) {
      this._hintMarker.bindTooltip(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('tooltips.startCircle'), {
        permanent: true,
        offset: L.point(0, 10),
        direction: 'bottom',
        opacity: 0.8
      }).openTooltip();
    } // this is the hintline from the hint marker to the center marker

    /* remove by liwei
    this._hintline = L.polyline([], this.options.hintlineStyle);
    this._hintline._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintline);
    */
    // change map cursor


    this._map._container.style.cursor = 'crosshair'; // create a polygon-point on click

    this._map.on('click', this._placeCenterMarker, this); // sync hint marker with mouse cursor


    this._map.on('mousemove', this._syncHintMarker, this); // fire drawstart event


    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer
    }); // toggle the draw button of the Toolbar in case drawing mode got enabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true); // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?


    this._otherSnapLayers = [];
  },
  disable: function disable() {
    // disable drawing mode
    // cancel, if drawing mode isn't event enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false; // reset cursor

    this._map._container.style.cursor = ''; // unbind listeners

    this._map.off('click', this._finishShape, this);

    this._map.off('click', this._placeCenterMarker, this);

    this._map.off('mousemove', this._syncHintMarker, this); // remove helping layers


    this._map.removeLayer(this._layerGroup); // fire drawend event


    this._map.fire('pm:drawend', {
      shape: this._shape
    }); // toggle the draw button of the Toolbar in case drawing mode got disabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false); // cleanup snapping


    if (this.options.snappable) {
      this._cleanupSnapping();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  toggle: function toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  _syncHintLine: function _syncHintLine() {
    var latlng = this._centerMarker.getLatLng(); // set coords for hintline from marker to last vertex of drawin polyline


    this._hintline.setLatLngs([latlng, this._hintMarker.getLatLng()]);
  },
  _syncCircleRadius: function _syncCircleRadius() {
    var A = this._centerMarker.getLatLng();

    var B = this._hintMarker.getLatLng();

    var distance = A.distanceTo(B);

    this._layer.setRadius(distance);
  },
  _syncHintMarker: function _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng); // if snapping is enabled, do it


    if (this.options.snappable) {
      var fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;

      this._handleSnapping(fakeDragEvent);
    }
  },
  _placeCenterMarker: function _placeCenterMarker(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var latlng = this._hintMarker.getLatLng();

    this._centerMarker.setLatLng(latlng);

    this._map.off('click', this._placeCenterMarker, this);

    this._map.on('click', this._finishShape, this);

    this._placeCircleCenter();
  },
  _placeCircleCenter: function _placeCircleCenter() {
    var latlng = this._centerMarker.getLatLng();

    if (latlng) {
      this._layer.setLatLng(latlng); // sync the hintline with hint marker

      /* this._hintMarker.on('move', this._syncHintLine, this); remove by liwei */


      this._hintMarker.on('move', this._syncCircleRadius, this);

      this._hintMarker.setTooltipContent(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('tooltips.finishCircle'));

      this._layer.fire('pm:centerplaced', {
        shape: this._shape,
        workingLayer: this._layer,
        latlng: latlng
      });
    }
  },
  _finishShape: function _finishShape(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // calc the radius


    var center = this._centerMarker.getLatLng();

    var latlng = this._hintMarker.getLatLng();

    var radius = center.distanceTo(latlng);
    var options = Object.assign({}, this.options.pathOptions, {
      radius: radius
    }); // create the final circle layer

    var circleLayer = L.circle(center, options).addTo(this._map); // disable drawing

    this.disable(); // fire the pm:create event and pass shape and layer

    this._map.fire('pm:create', {
      shape: this._shape,
      layer: circleLayer
    });
  },
  _createMarker: function _createMarker(latlng) {
    // create the new marker
    var marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._pmTempLayer = true; // add it to the map

    this._layerGroup.addLayer(marker);

    return marker;
  }
});

/***/ }),

/***/ "./src/js/Draw/L.PM.Draw.CircleMarker.js":
/*!***********************************************!*\
  !*** ./src/js/Draw/L.PM.Draw.CircleMarker.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Draw */ "./src/js/Draw/L.PM.Draw.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers/index.js");


_L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].CircleMarker = _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].Marker.extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'CircleMarker';
    this.toolbarButtonName = 'drawCircleMarker';
  },
  enable: function enable(options) {
    var _this = this;

    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options); // change enabled state

    this._enabled = true; // create a marker on click on the map

    this._map.on('click', this._createMarker, this); // toggle the draw button of the Toolbar in case drawing mode got enabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true); // this is the hintmarker on the mouse cursor


    this._hintMarker = L.circleMarker([0, 0], this.options.templineStyle);
    this._hintMarker._pmTempLayer = true;

    this._hintMarker.addTo(this._map); // add tooltip to hintmarker


    if (this.options.tooltips) {
      this._hintMarker.bindTooltip(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('tooltips.placeCircleMarker'), {
        permanent: true,
        offset: L.point(0, 10),
        direction: 'bottom',
        opacity: 0.8
      }).openTooltip();
    } // this is just to keep the snappable mixin happy


    this._layer = this._hintMarker; // sync hint marker with mouse cursor

    this._map.on('mousemove', this._syncHintMarker, this); // fire drawstart event


    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer
    }); // enable edit mode for existing markers


    this._map.eachLayer(function (layer) {
      if (_this.isRelevantMarker(layer)) {
        layer.pm.enable();
      }
    });
  },
  isRelevantMarker: function isRelevantMarker(layer) {
    return layer instanceof L.CircleMarker && !(layer instanceof L.Circle) && layer.pm && !layer._pmTempLayer;
  },
  _createMarker: function _createMarker(e) {
    if (!e.latlng) {
      return;
    } // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor


    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var latlng = this._hintMarker.getLatLng(); // create marker


    var marker = L.circleMarker(latlng, this.options.pathOptions); // add marker to the map

    marker.addTo(this._map); // enable editing for the marker

    marker.pm.enable(); // fire the pm:create event and pass shape and marker

    this._map.fire('pm:create', {
      shape: this._shape,
      marker: marker,
      // DEPRECATED
      layer: marker
    });

    this._cleanupSnapping();
  }
});

/***/ }),

/***/ "./src/js/Draw/L.PM.Draw.Cut.js":
/*!**************************************!*\
  !*** ./src/js/Draw/L.PM.Draw.Cut.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _turf_intersect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/intersect */ "./node_modules/@turf/intersect/index.js");
/* harmony import */ var _turf_intersect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_turf_intersect__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _turf_difference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/difference */ "./node_modules/@turf/difference/index.mjs");
/* harmony import */ var _L_PM_Draw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./L.PM.Draw */ "./src/js/Draw/L.PM.Draw.js");



_L_PM_Draw__WEBPACK_IMPORTED_MODULE_2__["default"].Cut = _L_PM_Draw__WEBPACK_IMPORTED_MODULE_2__["default"].Polygon.extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Cut';
    this.toolbarButtonName = 'cutPolygon';
  },
  _cut: function _cut(layer) {
    var _this = this;

    var all = this._map._layers; // find all layers that intersect with `layer`, the just drawn cutting layer

    var layers = Object.keys(all) // convert object to array
    .map(function (l) {
      return all[l];
    }) // only layers handled by leaflet-geoman
    .filter(function (l) {
      return l.pm;
    }) // only polygons
    .filter(function (l) {
      return l instanceof L.Polygon;
    }) // exclude the drawn one
    .filter(function (l) {
      return l !== layer;
    }) // only layers with intersections
    .filter(function (l) {
      try {
        return !!_turf_intersect__WEBPACK_IMPORTED_MODULE_0___default()(layer.toGeoJSON(15), l.toGeoJSON(15));
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error('You cant cut polygons with self-intersections');
        return false;
      }
    }); // loop through all layers that intersect with the drawn (cutting) layer

    layers.forEach(function (l) {
      // find layer difference
      var diff = Object(_turf_difference__WEBPACK_IMPORTED_MODULE_1__["default"])(l.toGeoJSON(15), layer.toGeoJSON(15)); // the resulting layer after the cut

      var resultingLayer = L.geoJSON(diff, l.options).addTo(_this._map); // give the new layer the original options

      resultingLayer.pm.enable(_this.options);
      resultingLayer.pm.disable(); // add templayer prop so pm:remove isn't fired

      l._pmTempLayer = true;
      layer._pmTempLayer = true; // remove old layer and cutting layer

      l.remove();
      layer.remove();

      if (resultingLayer.getLayers().length === 0) {
        _this._map.pm.removeLayer({
          target: resultingLayer
        });
      } // fire pm:cut on the cutted layer


      l.fire('pm:cut', {
        shape: _this._shape,
        layer: resultingLayer,
        originalLayer: l
      }); // fire pm:cut on the map

      _this._map.fire('pm:cut', {
        shape: _this._shape,
        layer: resultingLayer,
        originalLayer: l
      });
    });
  },
  _finishShape: function _finishShape() {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    }

    var coords = this._layer.getLatLngs();

    var polygonLayer = L.polygon(coords, this.options.pathOptions);

    this._cut(polygonLayer); // disable drawing


    this.disable(); // clean up snapping states

    this._cleanupSnapping(); // remove the first vertex from "other snapping layers"


    this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);

    delete this._tempSnapLayerIndex;
  }
});

/***/ }),

/***/ "./src/js/Draw/L.PM.Draw.Line.js":
/*!***************************************!*\
  !*** ./src/js/Draw/L.PM.Draw.Line.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _turf_kinks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/kinks */ "./node_modules/@turf/kinks/index.js");
/* harmony import */ var _turf_kinks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_turf_kinks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _L_PM_Draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./L.PM.Draw */ "./src/js/Draw/L.PM.Draw.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers/index.js");



_L_PM_Draw__WEBPACK_IMPORTED_MODULE_1__["default"].Line = _L_PM_Draw__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Line';
    this.toolbarButtonName = 'drawPolyline';
    this._doesSelfIntersect = false;
  },
  enable: function enable(options) {
    L.Util.setOptions(this, options); // fallback option for finishOnDoubleClick
    // TODO: remove in a later release

    if (this.options.finishOnDoubleClick && !this.options.finishOn) {
      this.options.finishOn = 'dblclick';
    } // enable draw mode


    this._enabled = true; // create a new layergroup

    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;

    this._layerGroup.addTo(this._map); // this is the polyLine that'll make up the polygon


    this._layer = L.polyline([], this.options.templineStyle);
    this._layer._pmTempLayer = true;

    this._layerGroup.addLayer(this._layer); // this is the hintline from the mouse cursor to the last marker


    this._hintline = L.polyline([], this.options.hintlineStyle);
    this._hintline._pmTempLayer = true;

    this._layerGroup.addLayer(this._hintline); // this is the hintmarker on the mouse cursor


    this._hintMarker = L.marker(this._map.getCenter(), {
      icon: L.divIcon({
        className: 'marker-icon cursor-marker'
      })
    });
    this._hintMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._hintMarker); // show the hintmarker if the option is set


    if (this.options.cursorMarker) {
      L.DomUtil.addClass(this._hintMarker._icon, 'visible');
    } // add tooltip to hintmarker


    if (this.options.tooltips) {
      this._hintMarker.bindTooltip(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getTranslation"])('tooltips.firstVertex'), {
        permanent: true,
        offset: L.point(0, 10),
        direction: 'bottom',
        opacity: 0.8
      }).openTooltip();
    } // change map cursor


    this._map._container.style.cursor = 'crosshair'; // create a polygon-point on click

    this._map.on('click', this._createVertex, this); // finish on layer event
    // #http://leafletjs.com/reference-1.2.0.html#interactive-layer-click


    if (this.options.finishOn) {
      this._map.on(this.options.finishOn, this._finishShape, this);
    } // prevent zoom on double click if finishOn is === dblclick


    if (this.options.finishOn === 'dblclick') {
      this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled;

      if (this.tempMapDoubleClickZoomState) {
        this._map.doubleClickZoom.disable();
      }
    } // sync hint marker with mouse cursor


    this._map.on('mousemove', this._syncHintMarker, this); // sync the hintline with hint marker


    this._hintMarker.on('move', this._syncHintLine, this); // fire drawstart event


    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer
    }); // toggle the draw button of the Toolbar in case drawing mode got enabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true); // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?


    this._otherSnapLayers = [];
  },
  disable: function disable() {
    // disable draw mode
    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false; // reset cursor

    this._map._container.style.cursor = ''; // unbind listeners

    this._map.off('click', this._createVertex, this);

    this._map.off('mousemove', this._syncHintMarker, this);

    if (this.options.finishOn) {
      this._map.off(this.options.finishOn, this._finishShape, this);
    }

    if (this.tempMapDoubleClickZoomState) {
      this._map.doubleClickZoom.enable();
    } // remove layer


    this._map.removeLayer(this._layerGroup); // fire drawend event


    this._map.fire('pm:drawend', {
      shape: this._shape
    }); // toggle the draw button of the Toolbar in case drawing mode got disabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false); // cleanup snapping


    if (this.options.snappable) {
      this._cleanupSnapping();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  toggle: function toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  hasSelfIntersection: function hasSelfIntersection() {
    // check for self intersection of the layer and return true/false
    var selfIntersection = _turf_kinks__WEBPACK_IMPORTED_MODULE_0___default()(this._layer.toGeoJSON(15));
    return selfIntersection.features.length > 0;
  },
  _syncHintLine: function _syncHintLine() {
    var polyPoints = this._layer.getLatLngs();

    if (polyPoints.length > 0) {
      var lastPolygonPoint = polyPoints[polyPoints.length - 1]; // set coords for hintline from marker to last vertex of drawin polyline

      this._hintline.setLatLngs([lastPolygonPoint, this._hintMarker.getLatLng()]);
    }
  },
  _syncHintMarker: function _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng); // if snapping is enabled, do it


    if (this.options.snappable) {
      var fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;

      this._handleSnapping(fakeDragEvent);
    } // if self-intersection is forbidden, handle it


    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(true, e.latlng);
    }
  },
  _handleSelfIntersection: function _handleSelfIntersection(addVertex, latlng) {
    // ok we need to check the self intersection here
    // problem: during draw, the marker on the cursor is not yet part
    // of the layer. So we need to clone the layer, add the
    // potential new vertex (cursor markers latlngs) and check the self
    // intersection on the clone. Phew... - let's do it 💪
    // clone layer (polyline is enough, even when it's a polygon)
    var clone = L.polyline(this._layer.getLatLngs());

    if (addVertex) {
      // get vertex from param or from hintmarker
      if (!latlng) {
        latlng = this._hintMarker.getLatLng();
      } // add the vertex


      clone.addLatLng(latlng);
    } // check the self intersection


    var selfIntersection = _turf_kinks__WEBPACK_IMPORTED_MODULE_0___default()(clone.toGeoJSON(15));
    this._doesSelfIntersect = selfIntersection.features.length > 0; // change the style based on self intersection

    if (this._doesSelfIntersect) {
      this._hintline.setStyle({
        color: 'red'
      });
    } else if (!this._hintline.isEmpty()) {
      this._hintline.setStyle(this.options.hintlineStyle);
    }
  },
  _removeLastVertex: function _removeLastVertex() {
    // remove last coords
    var coords = this._layer.getLatLngs();

    var removedCoord = coords.pop(); // if all coords are gone, cancel drawing

    if (coords.length < 1) {
      this.disable();
      return;
    } // find corresponding marker


    var marker = this._layerGroup.getLayers().filter(function (l) {
      return l instanceof L.Marker;
    }).filter(function (l) {
      return !L.DomUtil.hasClass(l._icon, 'cursor-marker');
    }).find(function (l) {
      return l.getLatLng() === removedCoord;
    }); // remove that marker


    this._layerGroup.removeLayer(marker); // update layer with new coords


    this._layer.setLatLngs(coords); // sync the hintline again


    this._syncHintLine();
  },
  _createVertex: function _createVertex(e) {
    // don't create a vertex if we have a selfIntersection and it is not allowed
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(true, e.latlng);

      if (this._doesSelfIntersect) {
        return;
      }
    } // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor


    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var latlng = this._hintMarker.getLatLng(); // check if the first and this vertex have the same latlng


    if (latlng.equals(this._layer.getLatLngs()[0])) {
      // yes? finish the polygon
      this._finishShape(e); // "why?", you ask? Because this happens when we snap the last vertex to the first one
      // and then click without hitting the last marker. Click happens on the map
      // in 99% of cases it's because the user wants to finish the polygon. So...


      return;
    } // is this the first point?


    var first = this._layer.getLatLngs().length === 0;

    this._layer.addLatLng(latlng);

    var newMarker = this._createMarker(latlng, first);

    this._hintline.setLatLngs([latlng, latlng]);

    this._layer.fire('pm:vertexadded', {
      shape: this._shape,
      workingLayer: this._layer,
      marker: newMarker,
      latlng: latlng
    });
  },
  _finishShape: function _finishShape() {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    } // get coordinates


    var coords = this._layer.getLatLngs(); // if there is only one coords, don't finish the shape!


    if (coords.length <= 1) {
      return;
    } // create the leaflet shape and add it to the map


    var polylineLayer = L.polyline(coords, this.options.pathOptions).addTo(this._map); // disable drawing

    this.disable(); // fire the pm:create event and pass shape and layer

    this._map.fire('pm:create', {
      shape: this._shape,
      layer: polylineLayer
    });

    if (this.options.snappable) {
      this._cleanupSnapping();
    }
  },
  _createMarker: function _createMarker(latlng, first) {
    // create the new marker
    var marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._pmTempLayer = true; // add it to the map

    this._layerGroup.addLayer(marker); // a click on any marker finishes this shape


    marker.on('click', this._finishShape, this); // handle tooltip text

    if (first) {
      this._hintMarker.setTooltipContent(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getTranslation"])('tooltips.continueLine'));
    }

    var second = this._layer.getLatLngs().length === 2;

    if (second) {
      this._hintMarker.setTooltipContent(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getTranslation"])('tooltips.finishLine'));
    }

    return marker;
  }
});

/***/ }),

/***/ "./src/js/Draw/L.PM.Draw.Marker.js":
/*!*****************************************!*\
  !*** ./src/js/Draw/L.PM.Draw.Marker.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Draw */ "./src/js/Draw/L.PM.Draw.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers/index.js");


_L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].Marker = _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Marker';
    this.toolbarButtonName = 'drawMarker';
  },
  enable: function enable(options) {
    var _this = this;

    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options); // change enabled state

    this._enabled = true; // create a marker on click on the map

    this._map.on('click', this._createMarker, this); // toggle the draw button of the Toolbar in case drawing mode got enabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true); // this is the hintmarker on the mouse cursor


    this._hintMarker = L.marker([0, 0], this.options.markerStyle);
    this._hintMarker._pmTempLayer = true;

    this._hintMarker.addTo(this._map); // add tooltip to hintmarker


    if (this.options.tooltips) {
      this._hintMarker.bindTooltip(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('tooltips.placeMarker'), {
        permanent: true,
        offset: L.point(0, 10),
        direction: 'bottom',
        opacity: 0.8
      }).openTooltip();
    } // this is just to keep the snappable mixin happy


    this._layer = this._hintMarker; // sync hint marker with mouse cursor

    this._map.on('mousemove', this._syncHintMarker, this); // fire drawstart event


    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer
    }); // enable edit mode for existing markers


    this._map.eachLayer(function (layer) {
      if (_this.isRelevantMarker(layer)) {
        layer.pm.enable();
      }
    });
  },
  disable: function disable() {
    var _this2 = this;

    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    } // undbind click event, don't create a marker on click anymore


    this._map.off('click', this._createMarker, this); // remove hint marker


    this._hintMarker.remove(); // remove event listener to sync hint marker


    this._map.off('mousemove', this._syncHintMarker, this); // disable dragging and removing for all markers


    this._map.eachLayer(function (layer) {
      if (_this2.isRelevantMarker(layer)) {
        layer.pm.disable();
      }
    }); // fire drawend event


    this._map.fire('pm:drawend', {
      shape: this._shape
    }); // toggle the draw button of the Toolbar in case drawing mode got disabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false); // cleanup snapping


    if (this.options.snappable) {
      this._cleanupSnapping();
    } // change enabled state


    this._enabled = false;
  },
  isRelevantMarker: function isRelevantMarker(layer) {
    return layer instanceof L.Marker && layer.pm && !layer._pmTempLayer;
  },
  enabled: function enabled() {
    return this._enabled;
  },
  toggle: function toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  _createMarker: function _createMarker(e) {
    if (!e.latlng) {
      return;
    } // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor


    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var latlng = this._hintMarker.getLatLng(); // create marker


    var marker = new L.Marker(latlng, this.options.markerStyle); // add marker to the map

    marker.addTo(this._map); // enable editing for the marker

    marker.pm.enable(); // fire the pm:create event and pass shape and marker

    this._map.fire('pm:create', {
      shape: this._shape,
      marker: marker,
      // DEPRECATED
      layer: marker
    });

    this._cleanupSnapping();
  },
  _syncHintMarker: function _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng); // if snapping is enabled, do it


    if (this.options.snappable) {
      var fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;

      this._handleSnapping(fakeDragEvent);
    }
  }
});

/***/ }),

/***/ "./src/js/Draw/L.PM.Draw.Polygon.js":
/*!******************************************!*\
  !*** ./src/js/Draw/L.PM.Draw.Polygon.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Draw */ "./src/js/Draw/L.PM.Draw.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers/index.js");


_L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].Polygon = _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].Line.extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Polygon';
    this.toolbarButtonName = 'drawPolygon';
  },
  _finishShape: function _finishShape(e) {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    } // get coordinates


    var coords = this._layer.getLatLngs(); // only finish the shape if there are 3 or more vertices


    if (coords.length <= 2) {
      return;
    } // create the leaflet shape and add it to the map


    if (e && e.type === 'dblclick') {
      // Leaflet creates an extra node with double click
      coords.splice(coords.length - 1, 1);
    }

    var polygonLayer = L.polygon(coords, this.options.pathOptions).addTo(this._map); // disable drawing

    this.disable(); // fire the pm:create event and pass shape and layer

    this._map.fire('pm:create', {
      shape: this._shape,
      layer: polygonLayer
    }); // clean up snapping states


    this._cleanupSnapping(); // remove the first vertex from "other snapping layers"


    this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);

    delete this._tempSnapLayerIndex;
  },
  _createMarker: function _createMarker(latlng, first) {
    // create the new marker
    var marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    }); // mark this marker as temporary

    marker._pmTempLayer = true; // add it to the map

    this._layerGroup.addLayer(marker); // if the first marker gets clicked again, finish this shape


    if (first) {
      marker.on('click', this._finishShape, this); // add the first vertex to "other snapping layers" so the polygon is easier to finish

      this._tempSnapLayerIndex = this._otherSnapLayers.push(marker) - 1;

      if (this.options.snappable) {
        this._cleanupSnapping();
      }
    } // handle tooltip text


    if (first) {
      this._hintMarker.setTooltipContent(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('tooltips.continueLine'));
    }

    var third = this._layer.getLatLngs().length === 3;

    if (third) {
      this._hintMarker.setTooltipContent(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('tooltips.finishPoly'));
    }

    return marker;
  }
});

/***/ }),

/***/ "./src/js/Draw/L.PM.Draw.Rectangle.js":
/*!********************************************!*\
  !*** ./src/js/Draw/L.PM.Draw.Rectangle.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Draw */ "./src/js/Draw/L.PM.Draw.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers/index.js");


_L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].Rectangle = _L_PM_Draw__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  initialize: function initialize(map) {
    this._map = map;
    this._shape = 'Rectangle';
    this.toolbarButtonName = 'drawRectangle';
  },
  enable: function enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options); // enable draw mode

    this._enabled = true; // create a new layergroup

    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;

    this._layerGroup.addTo(this._map); // the rectangle we want to draw


    this._layer = L.rectangle([[0, 0], [0, 0]], this.options.pathOptions);
    this._layer._pmTempLayer = true; // this is the marker at the origin of the rectangle
    // this needs to be present, for tracking purposes, but we'll make it invisible if a user doesn't want to see it!

    this._startMarker = L.marker([0, 0], {
      icon: L.divIcon({
        className: 'marker-icon rect-start-marker'
      }),
      draggable: false,
      zIndexOffset: 100,
      opacity: this.options.cursorMarker ? 1 : 0
    });
    this._startMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._startMarker); // this is the hintmarker on the mouse cursor


    this._hintMarker = L.marker([0, 0], {
      icon: L.divIcon({
        className: 'marker-icon cursor-marker'
      })
    });
    this._hintMarker._pmTempLayer = true;

    this._layerGroup.addLayer(this._hintMarker); // add tooltip to hintmarker


    if (this.options.tooltips) {
      this._hintMarker.bindTooltip(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('tooltips.firstVertex'), {
        permanent: true,
        offset: L.point(0, 10),
        direction: 'bottom',
        opacity: 0.8
      }).openTooltip();
    } // show the hintmarker if the option is set


    if (this.options.cursorMarker) {
      L.DomUtil.addClass(this._hintMarker._icon, 'visible'); // Add two more matching style markers, if cursor marker is rendered

      this._styleMarkers = [];

      for (var i = 0; i < 2; i += 1) {
        var styleMarker = L.marker([0, 0], {
          icon: L.divIcon({
            className: 'marker-icon rect-style-marker'
          }),
          draggable: false,
          zIndexOffset: 100
        });
        styleMarker._pmTempLayer = true;

        this._layerGroup.addLayer(styleMarker);

        this._styleMarkers.push(styleMarker);
      }
    } // change map cursor


    this._map._container.style.cursor = 'crosshair'; // create a polygon-point on click

    this._map.on('click', this._placeStartingMarkers, this); // sync hint marker with mouse cursor


    this._map.on('mousemove', this._syncHintMarker, this); // fire drawstart event


    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer
    }); // toggle the draw button of the Toolbar in case drawing mode got enabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true); // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?


    this._otherSnapLayers = [];
  },
  disable: function disable() {
    // disable drawing mode
    // cancel, if drawing mode isn't event enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false; // reset cursor

    this._map._container.style.cursor = ''; // unbind listeners

    this._map.off('click', this._finishShape, this);

    this._map.off('click', this._placeStartingMarkers, this);

    this._map.off('mousemove', this._syncHintMarker, this); // remove helping layers


    this._map.removeLayer(this._layerGroup); // fire drawend event


    this._map.fire('pm:drawend', {
      shape: this._shape
    }); // toggle the draw button of the Toolbar in case drawing mode got disabled without the button


    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false); // cleanup snapping


    if (this.options.snappable) {
      this._cleanupSnapping();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  toggle: function toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  _placeStartingMarkers: function _placeStartingMarkers(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var latlng = this._hintMarker.getLatLng(); // show and place start marker


    L.DomUtil.addClass(this._startMarker._icon, 'visible');

    this._startMarker.setLatLng(latlng); // if we have the other two visibilty markers, show and place them now


    if (this.options.cursorMarker && this._styleMarkers) {
      this._styleMarkers.forEach(function (styleMarker) {
        L.DomUtil.addClass(styleMarker._icon, 'visible');
        styleMarker.setLatLng(latlng);
      });
    }

    this._map.off('click', this._placeStartingMarkers, this);

    this._map.on('click', this._finishShape, this); // change tooltip text


    this._hintMarker.setTooltipContent(Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('tooltips.finishRect'));

    this._setRectangleOrigin();
  },
  _setRectangleOrigin: function _setRectangleOrigin() {
    var latlng = this._startMarker.getLatLng();

    if (latlng) {
      // show it first
      this._layerGroup.addLayer(this._layer);

      this._layer.setLatLngs([latlng, latlng]);

      this._hintMarker.on('move', this._syncRectangleSize, this);
    }
  },
  _syncHintMarker: function _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng); // if snapping is enabled, do it


    if (this.options.snappable) {
      var fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;

      this._handleSnapping(fakeDragEvent);
    }
  },
  _syncRectangleSize: function _syncRectangleSize() {
    var _this = this;

    // Create a box using corners A & B (A = Starting Position, B = Current Mouse Position)
    var A = this._startMarker.getLatLng();

    var B = this._hintMarker.getLatLng();

    this._layer.setBounds([A, B]); // Add matching style markers, if cursor marker is shown


    if (this.options.cursorMarker && this._styleMarkers) {
      var corners = this._findCorners();

      var unmarkedCorners = []; // Find two corners not currently occupied by starting marker and hint marker

      corners.forEach(function (corner) {
        if (!corner.equals(_this._startMarker.getLatLng()) && !corner.equals(_this._hintMarker.getLatLng())) {
          unmarkedCorners.push(corner);
        }
      }); // Reposition style markers

      unmarkedCorners.forEach(function (unmarkedCorner, index) {
        _this._styleMarkers[index].setLatLng(unmarkedCorner);
      });
    }
  },
  _finishShape: function _finishShape(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    } // get coordinate for new vertex by hintMarker (cursor marker)


    var B = this._hintMarker.getLatLng(); // get already placed corner from the startmarker


    var A = this._startMarker.getLatLng(); // create the final rectangle layer, based on opposite corners A & B


    var rectangleLayer = L.rectangle([A, B], this.options.pathOptions).addTo(this._map); // disable drawing

    this.disable(); // fire the pm:create event and pass shape and layer

    this._map.fire('pm:create', {
      shape: this._shape,
      layer: rectangleLayer
    });
  },
  _findCorners: function _findCorners() {
    var corners = this._layer.getBounds();

    var northwest = corners.getNorthWest();
    var northeast = corners.getNorthEast();
    var southeast = corners.getSouthEast();
    var southwest = corners.getSouthWest();
    return [northwest, northeast, southeast, southwest];
  }
});

/***/ }),

/***/ "./src/js/Draw/L.PM.Draw.js":
/*!**********************************!*\
  !*** ./src/js/Draw/L.PM.Draw.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mixins_Snapping__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Mixins/Snapping */ "./src/js/Mixins/Snapping.js");

var Draw = L.Class.extend({
  includes: [_Mixins_Snapping__WEBPACK_IMPORTED_MODULE_0__["default"]],
  options: {
    snappable: true,
    snapDistance: 20,
    tooltips: true,
    cursorMarker: true,
    finishOnDoubleClick: false,
    finishOn: null,
    allowSelfIntersection: true,
    templineStyle: {},
    hintlineStyle: {
      color: '#3388ff',
      dashArray: '5,5'
    },
    markerStyle: {
      draggable: true
    }
  },
  setOptions: function setOptions(options) {
    L.Util.setOptions(this, options);
  },
  initialize: function initialize(map) {
    var _this = this;

    // save the map
    this._map = map; // define all possible shapes that can be drawn

    this.shapes = ['Marker', 'CircleMarker', 'Line', 'Polygon', 'Rectangle', 'Circle', 'Cut']; // initiate drawing class for our shapes

    this.shapes.forEach(function (shape) {
      _this[shape] = new L.PM.Draw[shape](_this._map);
    });
  },
  setPathOptions: function setPathOptions(options) {
    this.options.pathOptions = options;
  },
  getShapes: function getShapes() {
    // if somebody wants to know what shapes are available
    return this.shapes;
  },
  enable: function enable(shape, options) {
    if (!shape) {
      throw new Error("Error: Please pass a shape as a parameter. Possible shapes are: ".concat(this.getShapes().join(',')));
    } // disable drawing for all shapes


    this.disable(); // enable draw for a shape

    this[shape].enable(options);
  },
  disable: function disable() {
    var _this2 = this;

    // there can only be one drawing mode active at a time on a map
    // so it doesn't matter which one should be disabled.
    // just disable all of them
    this.shapes.forEach(function (shape) {
      _this2[shape].disable();
    });
  },
  addControls: function addControls() {
    var _this3 = this;

    // add control buttons for our shapes
    this.shapes.forEach(function (shape) {
      _this3[shape].addButton();
    });
  }
});
/* harmony default export */ __webpack_exports__["default"] = (Draw);

/***/ }),

/***/ "./src/js/Edit/L.PM.Edit.Circle.js":
/*!*****************************************!*\
  !*** ./src/js/Edit/L.PM.Edit.Circle.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Edit */ "./src/js/Edit/L.PM.Edit.js");

_L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].Circle = _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  initialize: function initialize(layer) {
    this._layer = layer;
    this._enabled = false;
  },
  applyOptions: function applyOptions() {
    if (this.options.snappable) {
      this._initSnappableMarkers(); // sync the hintline with hint marker

      /* this._outerMarker.on('move', this._syncHintLine, this); remove ty liwei */


      this._outerMarker.on('move', this._syncCircleRadius, this);

      this._centerMarker.on('move', this._moveCircle, this);
    } else {
      this._disableSnapping();
    }
  },
  _disableSnapping: function _disableSnapping() {
    var _this = this;

    this._markers.forEach(function (marker) {
      /* marker.off('move', this._syncHintLine, this); remove by liwei*/
      marker.off('move', _this._syncCircleRadius, _this);
      marker.off('drag', _this._handleSnapping, _this);
      marker.off('dragend', _this._cleanupSnapping, _this);
    });

    this._layer.off('pm:dragstart', this._unsnap, this);
  },
  toggleEdit: function toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  enable: function enable(options) {
    var _this2 = this;

    L.Util.setOptions(this, options);
    this._map = this._layer._map;

    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    } // change state


    this._enabled = true; // init markers

    this._initMarkers();

    this.applyOptions(); // if polygon gets removed from map, disable edit mode

    this._layer.on('remove', function (e) {
      _this2.disable(e.target);
    });
  },
  disable: function disable() {
    var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._layer;

    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return false;
    } // prevent disabling if layer is being dragged


    if (layer.pm._dragging) {
      return false;
    }

    layer.pm._enabled = false;

    layer.pm._helperLayers.clearLayers(); // clean up draggable


    layer.off('mousedown');
    layer.off('mouseup'); // remove draggable class

    var el = layer._path ? layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable');

    this._layer.fire('pm:disable');

    if (this._layerEdited) {
      this._layer.fire('pm:update', {});
    }

    this._layerEdited = false;
    return true;
  },
  _initMarkers: function _initMarkers() {
    var map = this._map; // cleanup old ones first

    if (this._helperLayers) {
      this._helperLayers.clearLayers();
    } // add markerGroup to map, markerGroup includes regular and middle markers


    this._helperLayers = new L.LayerGroup();
    this._helperLayers._pmTempLayer = true;

    this._helperLayers.addTo(map); // create marker for each coordinate


    var center = this._layer.getLatLng();

    var radius = this._layer._radius;

    var outer = this._getLatLngOnCircle(center, radius);

    this._centerMarker = this._createCenterMarker(center);
    this._outerMarker = this._createOuterMarker(outer);
    this._markers = [this._centerMarker, this._outerMarker];
    /* this._createHintLine(this._centerMarker, this._outerMarker); remove by liwei */
  },
  _getLatLngOnCircle: function _getLatLngOnCircle(center, radius) {
    var pointA = this._map.project(center);

    var pointB = L.point(pointA.x + radius, pointA.y);
    return this._map.unproject(pointB);
  },
  _resizeCircle: function _resizeCircle() {
    /*this._syncHintLine(); remove by liwei*/
    this._syncCircleRadius();
  },
  _moveCircle: function _moveCircle(e) {
    var center = e.latlng;

    this._layer.setLatLng(center);

    var radius = this._layer._radius;

    var outer = this._getLatLngOnCircle(center, radius);

    this._outerMarker.setLatLng(outer);
    /*this._syncHintLine(); remove by liwei */


    this._layer.fire('pm:centerplaced', {
      layer: this._layer,
      latlng: center
    });
  },
  _onMarkerDragStart: function _onMarkerDragStart(e) {
    this._layer.fire('pm:markerdragstart', {
      markerEvent: e
    });
  },
  _onMarkerDragEnd: function _onMarkerDragEnd(e) {
    // fire edit event
    this._fireEdit(); // fire markerdragend event


    this._layer.fire('pm:markerdragend', {
      markerEvent: e
    });
  },
  _syncCircleRadius: function _syncCircleRadius() {
    var A = this._centerMarker.getLatLng();

    var B = this._outerMarker.getLatLng();

    var distance = A.distanceTo(B);

    this._layer.setRadius(distance);
  },
  _syncHintLine: function _syncHintLine() {
    var A = this._centerMarker.getLatLng();

    var B = this._outerMarker.getLatLng(); // set coords for hintline from marker to last vertex of drawin polyline


    this._hintline.setLatLngs([A, B]);
  },
  _createHintLine: function _createHintLine(markerA, markerB) {
    var A = markerA.getLatLng();
    var B = markerB.getLatLng();
    this._hintline = L.polyline([A, B], this.options.hintlineStyle);
    this._hintline._pmTempLayer = true;

    this._helperLayers.addLayer(this._hintline);
  },
  _createCenterMarker: function _createCenterMarker(latlng) {
    var marker = this._createMarker(latlng);

    L.DomUtil.addClass(marker._icon, 'leaflet-pm-draggable'); // TODO: switch back to move event once this leaflet issue is solved:
    // https://github.com/Leaflet/Leaflet/issues/6492

    marker.on('drag', this._moveCircle, this); // marker.on('contextmenu', this._removeMarker, this);

    return marker;
  },
  _createOuterMarker: function _createOuterMarker(latlng) {
    var marker = this._createMarker(latlng);

    marker.on('drag', this._resizeCircle, this);
    return marker;
  },
  _createMarker: function _createMarker(latlng) {
    var marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._origLatLng = latlng;
    marker._pmTempLayer = true;
    marker.on('dragstart', this._onMarkerDragStart, this);
    marker.on('dragend', this._onMarkerDragEnd, this);

    this._helperLayers.addLayer(marker);

    return marker;
  },
  _fireEdit: function _fireEdit() {
    // fire edit event
    this._layer.fire('pm:edit');

    this._layerEdited = true;
  }
});

/***/ }),

/***/ "./src/js/Edit/L.PM.Edit.CircleMarker.js":
/*!***********************************************!*\
  !*** ./src/js/Edit/L.PM.Edit.CircleMarker.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Edit */ "./src/js/Edit/L.PM.Edit.js");

_L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].CircleMarker = _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  initialize: function initialize(layer) {
    this._layer = layer;
    this._enabled = false;
  },
  applyOptions: function applyOptions() {
    if (this.options.draggable) {
      this.enableLayerDrag();
    } else {
      this.disableLayerDrag();
    }

    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    } // enable removal for the marker


    if (!this.options.preventMarkerRemoval) {
      this._layer.on('contextmenu', this._removeMarker, this);
    }
  },
  toggleEdit: function toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  enabled: function enabled() {
    return this._enabled;
  },
  enable: function enable() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      draggable: true,
      snappable: true
    };
    L.Util.setOptions(this, options);
    this._map = this._layer._map; // cancel when map isn't available, this happens when the polygon is removed before this fires

    if (!this._map) {
      return;
    }

    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    }

    this.applyOptions(); // change state

    this._enabled = true;

    this._layer.on('pm:dragend', this._onMarkerDragEnd, this);
  },
  disable: function disable() {
    var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._layer;

    // prevent disabling if layer is being dragged
    if (layer.pm._dragging) {
      return false;
    } // disable dragging, as this could have been active even without being enabled


    this.disableLayerDrag(); // only fire events if it was enabled before

    if (!this.enabled()) {
      this._layer.fire('pm:disable');

      if (this._layerEdited) {
        this._layer.fire('pm:update', {});
      }

      this._layerEdited = false;
    }

    layer.pm._enabled = false;
    return true;
  },
  _moveMarker: function _moveMarker(e) {
    var center = e.latlng;

    this._layer.setLatLng(center).redraw();
  },
  _removeMarker: function _removeMarker() {
    this._layer.fire('pm:remove');

    this._layer.remove();
  },
  _fireEdit: function _fireEdit() {
    // fire edit event
    this._layer.fire('pm:edit');

    this._layerEdited = true;
  },
  _onMarkerDragEnd: function _onMarkerDragEnd(e) {
    this._layer.fire('pm:markerdragend', {
      markerEvent: e
    });

    this._fireEdit();
  },
  // overwrite initSnappableMarkers from Snapping.js Mixin
  _initSnappableMarkers: function _initSnappableMarkers() {
    var marker = this._layer;
    this.options.snapDistance = this.options.snapDistance || 30;
    marker.off('pm:drag', this._handleSnapping, this);
    marker.on('pm:drag', this._handleSnapping, this);
    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.on('pm:dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
    marker.on('pm:dragstart', this._unsnap, this);
  },
  _disableSnapping: function _disableSnapping() {
    var marker = this._layer;
    marker.off('pm:drag', this._handleSnapping, this);
    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
  }
});

/***/ }),

/***/ "./src/js/Edit/L.PM.Edit.LayerGroup.js":
/*!*********************************************!*\
  !*** ./src/js/Edit/L.PM.Edit.LayerGroup.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Edit */ "./src/js/Edit/L.PM.Edit.js");
 // LayerGroup doesn't inherit from L.PM.Edit because it's just calling L.PM.Edit.Polygon
// (which inherits from L.PM.Edit) for each layer,
// so it's not really a parent class

_L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].LayerGroup = L.Class.extend({
  initialize: function initialize(layerGroup) {
    var _this = this;

    this._layerGroup = layerGroup;
    this._layers = this.findLayers(); // init all layers of the group

    this._layers.forEach(function (layer) {
      return _this._initLayer(layer);
    }); // if a new layer is added to the group, reinitialize
    // This only works for FeatureGroups, not LayerGroups
    // https://github.com/Leaflet/Leaflet/issues/4861


    this._layerGroup.on('layeradd', function (e) {
      if (e.target._pmTempLayer) {
        return;
      }

      _this._layers = _this.findLayers(); // init the newly added layer

      if (e.layer.pm) {
        _this._initLayer(e.layer);
      } // if editing was already enabled for this group, enable it again
      // so the new layers are enabled


      if (e.target.pm.enabled()) {
        _this.enable(_this.getOptions());
      }
    }); // if a layer is removed from the group, calc the layers list again


    this._layerGroup.on('layerremove', function (e) {
      if (e.target._pmTempLayer) {
        return;
      }

      _this._layers = _this.findLayers();
    });
  },
  findLayers: function findLayers() {
    // get all layers of the layer group
    var layers = this._layerGroup.getLayers(); // filter out layers that are no layerGroup


    layers = layers.filter(function (layer) {
      return !(layer instanceof L.LayerGroup);
    }); // filter out layers that don't have leaflet-geoman

    layers = layers.filter(function (layer) {
      return !!layer.pm;
    }); // filter out everything that's leaflet-geoman specific temporary stuff

    layers = layers.filter(function (layer) {
      return !layer._pmTempLayer;
    }); // return them

    return layers;
  },
  _initLayer: function _initLayer(layer) {
    var _this2 = this;

    // available events
    var availableEvents = ['pm:edit', 'pm:update', 'pm:remove', 'pm:dragstart', 'pm:drag', 'pm:dragend', 'pm:snap', 'pm:unsnap', 'pm:cut', 'pm:intersect', 'pm:raiseMarkers', 'pm:markerdragend', 'pm:markerdragstart', 'pm:vertexadded', 'pm:vertexremoved', 'pm:centerplaced']; // listen to the events of the layers in this group

    availableEvents.forEach(function (event) {
      layer.on(event, _this2._fireEvent, _this2);
    }); // add reference for the group to each layer inside said group

    layer.pm._layerGroup = this._layerGroup;
  },
  _fireEvent: function _fireEvent(e) {
    this._layerGroup.fireEvent(e.type, e);
  },
  toggleEdit: function toggleEdit(options) {
    this._options = options;

    this._layers.forEach(function (layer) {
      layer.pm.toggleEdit(options);
    });
  },
  enable: function enable(options) {
    this._options = options;

    this._layers.forEach(function (layer) {
      layer.pm.enable(options);
    });
  },
  disable: function disable() {
    this._layers.forEach(function (layer) {
      layer.pm.disable();
    });
  },
  enabled: function enabled() {
    var enabled = this._layers.find(function (layer) {
      return layer.pm.enabled();
    });

    return !!enabled;
  },
  dragging: function dragging() {
    var dragging = this._layers.find(function (layer) {
      return layer.pm.dragging();
    });

    return !!dragging;
  },
  getOptions: function getOptions() {
    return this._options;
  }
});

/***/ }),

/***/ "./src/js/Edit/L.PM.Edit.Line.js":
/*!***************************************!*\
  !*** ./src/js/Edit/L.PM.Edit.Line.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _turf_kinks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @turf/kinks */ "./node_modules/@turf/kinks/index.js");
/* harmony import */ var _turf_kinks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_turf_kinks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _L_PM_Edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./L.PM.Edit */ "./src/js/Edit/L.PM.Edit.js");
/* harmony import */ var _L_PM_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../L.PM.Utils */ "./src/js/L.PM.Utils.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers/index.js");
/* harmony import */ var _Mixins_MarkerLimits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Mixins/MarkerLimits */ "./src/js/Mixins/MarkerLimits.js");





 // Shit's getting complicated in here with Multipolygon Support. So here's a quick note about it:
// Multipolygons with holes means lots of nested, multidimensional arrays.
// In order to find a value inside such an array you need a path to adress it directly.
// Example: var arr = [[['a', 'b'], ['c']]];
// The indexPath to 'b' is [0, 0, 1]. The indexPath to 'c' is [0, 1, 0].
// So I can get 'b' with: arr[0][0][1].
// Got it? Now you know what is meant when you read "indexPath" around here. Have fun 👍

_L_PM_Edit__WEBPACK_IMPORTED_MODULE_2__["default"].Line = _L_PM_Edit__WEBPACK_IMPORTED_MODULE_2__["default"].extend({
  includes: [_Mixins_MarkerLimits__WEBPACK_IMPORTED_MODULE_5__["default"]],
  initialize: function initialize(layer) {
    this._layer = layer;
    this._enabled = false;
  },
  applyOptions: function applyOptions() {
    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    }
  },
  toggleEdit: function toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }

    return this.enabled();
  },
  enable: function enable(options) {
    L.Util.setOptions(this, options);
    this._map = this._layer._map; // cancel when map isn't available, this happens when the polygon is removed before this fires

    if (!this._map) {
      return;
    }

    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    } // change state


    this._enabled = true; // init markers

    this._initMarkers();

    this.applyOptions(); // if polygon gets removed from map, disable edit mode

    this._layer.on('remove', this._onLayerRemove, this);

    if (!this.options.allowSelfIntersection) {
      this._layer.on('pm:vertexremoved', this._handleSelfIntersectionOnVertexRemoval, this);
    }

    if (!this.options.allowSelfIntersection) {
      this.cachedColor = this._layer.options.color;
      this.isRed = false;

      this._handleLayerStyle();
    }
  },
  _onLayerRemove: function _onLayerRemove(e) {
    this.disable(e.target);
  },
  enabled: function enabled() {
    return this._enabled;
  },
  disable: function disable() {
    var poly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._layer;

    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return false;
    } // prevent disabling if polygon is being dragged


    if (poly.pm._dragging) {
      return false;
    }

    poly.pm._enabled = false;

    poly.pm._markerGroup.clearLayers(); // clean up draggable


    poly.off('mousedown');
    poly.off('mouseup'); // remove onRemove listener

    this._layer.off('remove', this._onLayerRemove, this);

    if (!this.options.allowSelfIntersection) {
      this._layer.off('pm:vertexremoved', this._handleSelfIntersectionOnVertexRemoval);
    } // remove draggable class


    var el = poly._path ? poly._path : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable'); // remove invalid class if layer has self intersection

    if (this.hasSelfIntersection()) {
      L.DomUtil.removeClass(el, 'leaflet-pm-invalid');
    }

    this._layer.fire('pm:disable');

    if (this._layerEdited) {
      this._layer.fire('pm:update', {});
    }

    this._layerEdited = false;
    return true;
  },
  hasSelfIntersection: function hasSelfIntersection() {
    // check for self intersection of the layer and return true/false
    var selfIntersection = _turf_kinks__WEBPACK_IMPORTED_MODULE_0___default()(this._layer.toGeoJSON(15));
    return selfIntersection.features.length > 0;
  },
  _handleSelfIntersectionOnVertexRemoval: function _handleSelfIntersectionOnVertexRemoval() {
    // check for selfintersection again (mainly to reset the style)
    this._handleLayerStyle(true);

    if (this.hasSelfIntersection()) {
      // reset coordinates
      this._layer.setLatLngs(this._coordsBeforeEdit);

      this._coordsBeforeEdit = null; // re-enable markers for the new coords

      this._initMarkers();
    }
  },
  _handleLayerStyle: function _handleLayerStyle(flash) {
    var _this = this;

    var layer = this._layer;

    if (this.hasSelfIntersection()) {
      if (this.isRed) {
        return;
      } // if it does self-intersect, mark or flash it red


      if (flash) {
        layer.setStyle({
          color: 'red'
        });
        this.isRed = true;
        window.setTimeout(function () {
          layer.setStyle({
            color: _this.cachedColor
          });
          _this.isRed = false;
        }, 200);
      } else {
        layer.setStyle({
          color: 'red'
        });
        this.isRed = true;
      } // fire intersect event


      this._layer.fire('pm:intersect', {
        intersection: _turf_kinks__WEBPACK_IMPORTED_MODULE_0___default()(this._layer.toGeoJSON(15))
      });
    } else {
      // if not, reset the style to the default color
      layer.setStyle({
        color: this.cachedColor
      });
      this.isRed = false;
    }
  },
  _initMarkers: function _initMarkers() {
    var _this2 = this;

    var map = this._map;

    var coords = this._layer.getLatLngs(); // cleanup old ones first


    if (this._markerGroup) {
      this._markerGroup.clearLayers();
    } // add markerGroup to map, markerGroup includes regular and middle markers


    this._markerGroup = new L.LayerGroup();
    this._markerGroup._pmTempLayer = true; // handle coord-rings (outer, inner, etc)

    var handleRing = function handleRing(coordsArr) {
      // if there is another coords ring, go a level deep and do this again
      if (Array.isArray(coordsArr[0])) {
        return coordsArr.map(handleRing, _this2);
      } // the marker array, it includes only the markers of vertexes (no middle markers)


      var ringArr = coordsArr.map(_this2._createMarker, _this2); // create small markers in the middle of the regular markers

      coordsArr.map(function (v, k) {
        // find the next index fist
        var nextIndex = _this2.isPolygon() ? (k + 1) % coordsArr.length : k + 1; // create the marker

        return _this2._createMiddleMarker(ringArr[k], ringArr[nextIndex]);
      });
      return ringArr;
    }; // create markers


    this._markers = handleRing(coords); // handle possible limitation: maximum number of markers

    this.filterMarkerGroup(); // add markerGroup to map

    map.addLayer(this._markerGroup);
  },
  // creates initial markers for coordinates
  _createMarker: function _createMarker(latlng) {
    var marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._pmTempLayer = true;
    marker.on('dragstart', this._onMarkerDragStart, this);
    marker.on('move', this._onMarkerDrag, this);
    marker.on('dragend', this._onMarkerDragEnd, this);

    if (!this.options.preventMarkerRemoval) {
      marker.on('contextmenu', this._removeMarker, this);
    }

    this._markerGroup.addLayer(marker);

    return marker;
  },
  // creates the middle markes between coordinates
  _createMiddleMarker: function _createMiddleMarker(leftM, rightM) {
    var _this3 = this;

    // cancel if there are no two markers
    if (!leftM || !rightM) {
      return false;
    }

    var latlng = _L_PM_Utils__WEBPACK_IMPORTED_MODULE_3__["default"].calcMiddleLatLng(this._map, leftM.getLatLng(), rightM.getLatLng());

    var middleMarker = this._createMarker(latlng);

    var middleIcon = L.divIcon({
      className: 'marker-icon marker-icon-middle'
    });
    middleMarker.setIcon(middleIcon); // save reference to this middle markers on the neighboor regular markers

    leftM._middleMarkerNext = middleMarker;
    rightM._middleMarkerPrev = middleMarker;
    middleMarker.on('click', function () {
      // TODO: move the next two lines inside _addMarker() as soon as
      // https://github.com/Leaflet/Leaflet/issues/4484
      // is fixed
      var icon = L.divIcon({
        className: 'marker-icon'
      });
      middleMarker.setIcon(icon);

      _this3._addMarker(middleMarker, leftM, rightM);
    });
    middleMarker.on('movestart', function () {
      // TODO: This is a workaround. Remove the moveend listener and
      // callback as soon as this is fixed:
      // https://github.com/Leaflet/Leaflet/issues/4484
      middleMarker.on('moveend', function () {
        var icon = L.divIcon({
          className: 'marker-icon'
        });
        middleMarker.setIcon(icon);
        middleMarker.off('moveend');
      });

      _this3._addMarker(middleMarker, leftM, rightM);
    });
    return middleMarker;
  },
  // adds a new marker from a middlemarker
  _addMarker: function _addMarker(newM, leftM, rightM) {
    // first, make this middlemarker a regular marker
    newM.off('movestart');
    newM.off('click'); // now, create the polygon coordinate point for that marker
    // and push into marker array
    // and associate polygon coordinate with marker coordinate

    var latlng = newM.getLatLng();
    var coords = this._layer._latlngs; // the index path to the marker inside the multidimensional marker array

    var _this$findDeepMarkerI = this.findDeepMarkerIndex(this._markers, leftM),
        indexPath = _this$findDeepMarkerI.indexPath,
        index = _this$findDeepMarkerI.index,
        parentPath = _this$findDeepMarkerI.parentPath; // define the coordsRing that is edited


    var coordsRing = indexPath.length > 1 ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(coords, parentPath) : coords; // define the markers array that is edited

    var markerArr = indexPath.length > 1 ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this._markers, parentPath) : this._markers; // add coordinate to coordinate array

    coordsRing.splice(index + 1, 0, latlng); // add marker to marker array

    markerArr.splice(index + 1, 0, newM); // set new latlngs to update polygon

    this._layer.setLatLngs(coords); // create the new middlemarkers


    this._createMiddleMarker(leftM, newM);

    this._createMiddleMarker(newM, rightM); // fire edit event


    this._fireEdit();

    this._layer.fire('pm:vertexadded', {
      layer: this._layer,
      marker: newM,
      indexPath: this.findDeepMarkerIndex(this._markers, newM).indexPath,
      latlng: latlng
    });

    if (this.options.snappable) {
      this._initSnappableMarkers();
    }
  },
  _removeMarker: function _removeMarker(e) {
    // if self intersection isn't allowed, save the coords upon dragstart
    // in case we need to reset the layer
    if (!this.options.allowSelfIntersection) {
      var c = this._layer.getLatLngs();

      this._coordsBeforeEdit = JSON.parse(JSON.stringify(c));
    } // the marker that should be removed


    var marker = e.target; // coords of the layer

    var coords = this._layer.getLatLngs(); // the index path to the marker inside the multidimensional marker array


    var _this$findDeepMarkerI2 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI2.indexPath,
        index = _this$findDeepMarkerI2.index,
        parentPath = _this$findDeepMarkerI2.parentPath; // only continue if this is NOT a middle marker (those can't be deleted)


    if (!indexPath) {
      return;
    } // define the coordsRing that is edited


    var coordsRing = indexPath.length > 1 ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(coords, parentPath) : coords; // define the markers array that is edited

    var markerArr = indexPath.length > 1 ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this._markers, parentPath) : this._markers; // remove coordinate

    coordsRing.splice(index, 1); // set new latlngs to the polygon

    this._layer.setLatLngs(coords); // if the ring of the poly has no coordinates left, remove the last coord too


    if (coordsRing.length <= 1) {
      coordsRing.splice(0, coordsRing.length); // set new coords

      this._layer.setLatLngs(coords); // re-enable editing so unnecessary markers are removed
      // TODO: kind of an ugly workaround maybe do it better?


      this.disable();
      this.enable(this.options);
    } // TODO: we may should remove all empty coord-rings here as well.
    // if no coords are left, remove the layer


    if (Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["isEmptyDeep"])(coords)) {
      this._layer.remove();
    } // now handle the middle markers
    // remove the marker and the middlemarkers next to it from the map


    if (marker._middleMarkerPrev) {
      this._markerGroup.removeLayer(marker._middleMarkerPrev);
    }

    if (marker._middleMarkerNext) {
      this._markerGroup.removeLayer(marker._middleMarkerNext);
    } // remove the marker from the map


    this._markerGroup.removeLayer(marker);

    var rightMarkerIndex;
    var leftMarkerIndex;

    if (this.isPolygon()) {
      // find neighbor marker-indexes
      rightMarkerIndex = (index + 1) % markerArr.length;
      leftMarkerIndex = (index + (markerArr.length - 1)) % markerArr.length;
    } else {
      // find neighbor marker-indexes
      leftMarkerIndex = index - 1 < 0 ? undefined : index - 1;
      rightMarkerIndex = index + 1 >= markerArr.length ? undefined : index + 1;
    } // don't create middlemarkers if there is only one marker left


    if (rightMarkerIndex !== leftMarkerIndex) {
      var leftM = markerArr[leftMarkerIndex];
      var rightM = markerArr[rightMarkerIndex];

      this._createMiddleMarker(leftM, rightM);
    } // remove the marker from the markers array


    markerArr.splice(index, 1); // fire edit event

    this._fireEdit(); // fire vertex removal event


    this._layer.fire('pm:vertexremoved', {
      layer: this._layer,
      marker: marker,
      indexPath: indexPath // TODO: maybe add latlng as well?

    });
  },
  findDeepMarkerIndex: function findDeepMarkerIndex(arr, marker) {
    // thanks for the function, Felix Heck
    var result;

    var run = function run(path) {
      return function (v, i) {
        var iRes = path.concat(i);

        if (v._leaflet_id === marker._leaflet_id) {
          result = iRes;
          return true;
        }

        return Array.isArray(v) && v.some(run(iRes));
      };
    };

    arr.some(run([]));
    var returnVal = {};

    if (result) {
      returnVal = {
        indexPath: result,
        index: result[result.length - 1],
        parentPath: result.slice(0, result.length - 1)
      };
    }

    return returnVal;
  },
  updatePolygonCoordsFromMarkerDrag: function updatePolygonCoordsFromMarkerDrag(marker) {
    // update polygon coords
    var coords = this._layer.getLatLngs(); // get marker latlng


    var latlng = marker.getLatLng(); // get indexPath of Marker

    var _this$findDeepMarkerI3 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI3.indexPath,
        index = _this$findDeepMarkerI3.index,
        parentPath = _this$findDeepMarkerI3.parentPath; // update coord


    var parent = indexPath.length > 1 ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(coords, parentPath) : coords;
    parent.splice(index, 1, latlng); // set new coords on layer

    this._layer.setLatLngs(coords);
  },
  _onMarkerDrag: function _onMarkerDrag(e) {
    // dragged marker
    var marker = e.target;

    var _this$findDeepMarkerI4 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI4.indexPath,
        index = _this$findDeepMarkerI4.index,
        parentPath = _this$findDeepMarkerI4.parentPath; // only continue if this is NOT a middle marker


    if (!indexPath) {
      return;
    }

    this.updatePolygonCoordsFromMarkerDrag(marker); // the dragged markers neighbors

    var markerArr = indexPath.length > 1 ? lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this._markers, parentPath) : this._markers; // find the indizes of next and previous markers

    var nextMarkerIndex = (index + 1) % markerArr.length;
    var prevMarkerIndex = (index + (markerArr.length - 1)) % markerArr.length; // update middle markers on the left and right
    // be aware that "next" and "prev" might be interchanged, depending on the geojson array

    var markerLatLng = marker.getLatLng(); // get latlng of prev and next marker

    var prevMarkerLatLng = markerArr[prevMarkerIndex].getLatLng();
    var nextMarkerLatLng = markerArr[nextMarkerIndex].getLatLng();

    if (marker._middleMarkerNext) {
      var middleMarkerNextLatLng = _L_PM_Utils__WEBPACK_IMPORTED_MODULE_3__["default"].calcMiddleLatLng(this._map, markerLatLng, nextMarkerLatLng);

      marker._middleMarkerNext.setLatLng(middleMarkerNextLatLng);
    }

    if (marker._middleMarkerPrev) {
      var middleMarkerPrevLatLng = _L_PM_Utils__WEBPACK_IMPORTED_MODULE_3__["default"].calcMiddleLatLng(this._map, markerLatLng, prevMarkerLatLng);

      marker._middleMarkerPrev.setLatLng(middleMarkerPrevLatLng);
    } // if self intersection is not allowed, handle it


    if (!this.options.allowSelfIntersection) {
      this._handleLayerStyle();
    }
  },
  _onMarkerDragEnd: function _onMarkerDragEnd(e) {
    var marker = e.target;

    var _this$findDeepMarkerI5 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI5.indexPath; // if self intersection is not allowed but this edit caused a self intersection,
    // reset and cancel; do not fire events


    if (!this.options.allowSelfIntersection && this.hasSelfIntersection()) {
      // reset coordinates
      this._layer.setLatLngs(this._coordsBeforeEdit);

      this._coordsBeforeEdit = null; // re-enable markers for the new coords

      this._initMarkers(); // check for selfintersection again (mainly to reset the style)


      this._handleLayerStyle();

      return;
    }

    this._layer.fire('pm:markerdragend', {
      markerEvent: e,
      indexPath: indexPath
    }); // fire edit event


    this._fireEdit();
  },
  _onMarkerDragStart: function _onMarkerDragStart(e) {
    var marker = e.target;

    var _this$findDeepMarkerI6 = this.findDeepMarkerIndex(this._markers, marker),
        indexPath = _this$findDeepMarkerI6.indexPath;

    this._layer.fire('pm:markerdragstart', {
      markerEvent: e,
      indexPath: indexPath
    }); // if self intersection isn't allowed, save the coords upon dragstart
    // in case we need to reset the layer


    if (!this.options.allowSelfIntersection) {
      this._coordsBeforeEdit = this._layer.getLatLngs();
    }

    this.cachedColor = this._layer.options.color;
  },
  _fireEdit: function _fireEdit() {
    // fire edit event
    this._layerEdited = true;

    this._layer.fire('pm:edit');
  }
});

/***/ }),

/***/ "./src/js/Edit/L.PM.Edit.Marker.js":
/*!*****************************************!*\
  !*** ./src/js/Edit/L.PM.Edit.Marker.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Edit */ "./src/js/Edit/L.PM.Edit.js");

_L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].Marker = _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  initialize: function initialize(layer) {
    // layer is a marker in this case :-)
    this._layer = layer;
    this._enabled = false; // register dragend event e.g. to fire pm:edit

    this._layer.on('dragend', this._onDragEnd, this);
  },
  applyOptions: function applyOptions() {
    // console.log('apply options', this.options)
    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    }

    if (this.options.draggable) {
      this._layer.dragging.enable();
    } // enable removal for the marker


    if (!this.options.preventMarkerRemoval) {
      this._layer.on('contextmenu', this._removeMarker, this);
    }
  },
  toggleEdit: function toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  enable: function enable() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      draggable: true
    };
    L.Util.setOptions(this, options);
    this._map = this._layer._map;

    if (this.enabled()) {
      return;
    }

    this._enabled = true;
    this.applyOptions();
  },
  enabled: function enabled() {
    return this._enabled;
  },
  disable: function disable() {
    this._enabled = false; // disable dragging and removal for the marker

    if (this._layer.dragging) {
      this._layer.dragging.disable();
    }

    this._layer.off('contextmenu', this._removeMarker, this);

    this._layer.off('dragstart', this._onPinnedMarkerDragStart, this);

    this._layer.fire('pm:disable');

    if (this._layerEdited) {
      this._layer.fire('pm:update', {});
    }

    this._layerEdited = false;
  },
  _removeMarker: function _removeMarker(e) {
    var marker = e.target;
    marker.remove(); // TODO: find out why this is fired manually, shouldn't it be catched by L.PM.Map 'layerremove'?

    marker.fire('pm:remove');
  },
  _onDragEnd: function _onDragEnd(e) {
    var marker = e.target; // fire the pm:edit event and pass shape and marker

    marker.fire('pm:edit');
    this._layerEdited = true;
  },
  // overwrite initSnappableMarkers from Snapping.js Mixin
  _initSnappableMarkers: function _initSnappableMarkers() {
    var marker = this._layer;
    this.options.snapDistance = this.options.snapDistance || 30;
    marker.off('drag', this._handleSnapping, this);
    marker.on('drag', this._handleSnapping, this);
    marker.off('dragend', this._cleanupSnapping, this);
    marker.on('dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
    marker.on('pm:dragstart', this._unsnap, this);
  },
  _disableSnapping: function _disableSnapping() {
    var marker = this._layer;
    marker.off('drag', this._handleSnapping, this);
    marker.off('dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
  }
});

/***/ }),

/***/ "./src/js/Edit/L.PM.Edit.Polygon.js":
/*!******************************************!*\
  !*** ./src/js/Edit/L.PM.Edit.Polygon.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Edit */ "./src/js/Edit/L.PM.Edit.js");

_L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].Polygon = _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].Line.extend({// this is a bit weird but... Polygons are completely supported by L.PM.Edit.Line now 😲.
  // I'll keep this class in case there is something Polygon-specific that we'd need in the future.
});

/***/ }),

/***/ "./src/js/Edit/L.PM.Edit.Rectangle.js":
/*!********************************************!*\
  !*** ./src/js/Edit/L.PM.Edit.Rectangle.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.PM.Edit */ "./src/js/Edit/L.PM.Edit.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Corner detection based on Leaflet Draw's Edit.Rectangle.js Class:
// https://github.com/Leaflet/Leaflet.draw/blob/master/src/edit/handler/Edit.Rectangle.js

_L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].Rectangle = _L_PM_Edit__WEBPACK_IMPORTED_MODULE_0__["default"].Polygon.extend({
  // initializes Rectangle Markers
  _initMarkers: function _initMarkers() {
    var map = this._map;

    var corners = this._findCorners(); // cleanup old ones first


    if (this._markerGroup) {
      this._markerGroup.clearLayers();
    } // add markerGroup to map, markerGroup includes regular and middle markers


    this._markerGroup = new L.LayerGroup();
    this._markerGroup._pmTempLayer = true;
    map.addLayer(this._markerGroup); // create markers for four corners of rectangle

    this._markers = []; // nest set of corner markers in a 2D array so that we can Cut this Rectangle, if needed

    this._markers[0] = corners.map(this._createMarker, this); // convenience alias, for better readability

    var _this$_markers = _slicedToArray(this._markers, 1);

    this._cornerMarkers = _this$_markers[0];

    if (this.options.snappable) {
      this._initSnappableMarkers();
    }
  },
  // creates initial markers for coordinates
  _createMarker: function _createMarker(latlng, index) {
    var marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({
        className: 'marker-icon'
      })
    });
    marker._origLatLng = latlng;
    marker._index = index;
    marker._pmTempLayer = true;
    marker.on('dragstart', this._onMarkerDragStart, this);
    marker.on('drag', this._onMarkerDrag, this);
    marker.on('dragend', this._onMarkerDragEnd, this);
    marker.on('pm:snap', this._adjustRectangleForMarkerSnap, this);

    if (!this.options.preventMarkerRemoval) {
      marker.on('contextmenu', this._removeMarker, this);
    }

    this._markerGroup.addLayer(marker);

    return marker;
  },
  // Empty callback for 'contextmenu' binding set in L.PM.Edit.Line.js's _createMarker method (AKA, right-click on marker event)
  // (A Rectangle is designed to always remain a "true" rectangle -- if you want it editable, use Polygon Tool instead!!!)
  _removeMarker: function _removeMarker() {
    // The method, it does nothing!!!
    return null;
  },
  _onMarkerDragStart: function _onMarkerDragStart(e) {
    // dragged marker
    var draggedMarker = e.target; // Store/update a reference to marker in opposite corner

    var corners = this._findCorners();

    draggedMarker._oppositeCornerLatLng = corners[(draggedMarker._index + 2) % 4]; // Automatically unsnap all markers on drag start (they'll snap back if close enough to another snappable object)
    // (Without this, it's occasionally possible for a marker to get stuck as 'snapped,' which prevents Rectangle resizing)

    draggedMarker._snapped = false;

    this._layer.fire('pm:markerdragstart', {
      markerEvent: e
    });
  },
  _onMarkerDrag: function _onMarkerDrag(e) {
    // dragged marker
    var draggedMarker = e.target; // only continue if this is NOT a middle marker (should NEVER be one, but this is just a safety check)

    if (draggedMarker._index === undefined) {
      return;
    } // If marker is currently snapped to an object, then ignore all drag events (as this resets rectangle shape)


    if (!draggedMarker._snapped) {
      this._adjustRectangleForMarkerMove(draggedMarker);
    }
  },
  _onMarkerDragEnd: function _onMarkerDragEnd(e) {
    var corners = this._findCorners(); // Reposition ALL markers (so that indices are correctly correlated with corner order (NW, NE, SE, SW))


    this._adjustAllMarkers(corners); // Clean-up data attributes


    this._cornerMarkers.forEach(function (m) {
      delete m._oppositeCornerLatLng;
    }); // Update bounding box


    this._layer.setLatLngs(corners);

    this._layer.fire('pm:markerdragend', {
      markerEvent: e
    }); // fire edit event


    this._fireEdit();
  },
  // adjusts the rectangle's size and bounds whenever a marker is moved
  // params: movedMarker -- the Marker object
  _adjustRectangleForMarkerMove: function _adjustRectangleForMarkerMove(movedMarker) {
    // update moved marker coordinates
    L.extend(movedMarker._origLatLng, movedMarker._latlng); // update rectangle boundaries, based on moved marker's new LatLng and cached opposite corner's LatLng

    var movedLatLng = movedMarker.getLatLng();

    this._layer.setBounds(L.latLngBounds(movedLatLng, movedMarker._oppositeCornerLatLng)); // Reposition the markers at each corner


    this._adjustAdjacentMarkers(movedMarker); // Redraw the shape (to update altered rectangle)


    this._layer.redraw();
  },
  // adjusts the rectangle's size and bounds whenever a marker snaps to another polygon
  // params: e -- the snap event
  _adjustRectangleForMarkerSnap: function _adjustRectangleForMarkerSnap(e) {
    if (!this.options.snappable) {
      return;
    }

    var snappedMarker = e.target;

    this._adjustRectangleForMarkerMove(snappedMarker);
  },
  // adjusts the position of all Markers
  // params: markerLatLngs -- an array of exactly LatLng objects
  _adjustAllMarkers: function _adjustAllMarkers(markerLatLngs) {
    if (!markerLatLngs.length || markerLatLngs.length !== 4) {
      /* eslint-disable-next-line no-console */
      console.error('_adjustAllMarkers() requires an array of EXACTLY 4 LatLng coordinates');
      return;
    }

    this._cornerMarkers.forEach(function (marker, index) {
      marker.setLatLng(markerLatLngs[index]);
    });
  },
  // adjusts the position of the two Markers adjacent to the Marker specified
  // params: anchorMarker -- the Marker object used to determine adjacent Markers
  _adjustAdjacentMarkers: function _adjustAdjacentMarkers(anchorMarker) {
    if (!anchorMarker || !anchorMarker.getLatLng || !anchorMarker._oppositeCornerLatLng) {
      /* eslint-disable-next-line no-console */
      console.error('_adjustAdjacentMarkers() requires a valid Marker object');
      return;
    }

    var anchorLatLng = anchorMarker.getLatLng();
    var oppositeLatLng = anchorMarker._oppositeCornerLatLng; // Find two corners not currently occupied by dragged marker and its opposite corner

    var unmarkedCorners = [];

    var corners = this._findCorners();

    corners.forEach(function (corner) {
      if (!corner.equals(anchorLatLng) && !corner.equals(oppositeLatLng)) {
        unmarkedCorners.push(corner);
      }
    }); // reposition markers for those corners

    var unmarkedCornerIndex = 0;

    if (unmarkedCorners.length === 2) {
      this._cornerMarkers.forEach(function (marker) {
        var markerLatLng = marker.getLatLng();

        if (!markerLatLng.equals(anchorLatLng) && !markerLatLng.equals(oppositeLatLng)) {
          marker.setLatLng(unmarkedCorners[unmarkedCornerIndex]);
          unmarkedCornerIndex += 1;
        }
      });
    }
  },
  // finds the 4 corners of the current bounding box
  // returns array of 4 LatLng objects in this order: Northwest corner, Northeast corner, Southeast corner, Southwest corner
  _findCorners: function _findCorners() {
    var corners = this._layer.getBounds();

    var northwest = corners.getNorthWest();
    var northeast = corners.getNorthEast();
    var southeast = corners.getSouthEast();
    var southwest = corners.getSouthWest();
    return [northwest, northeast, southeast, southwest];
  }
});

/***/ }),

/***/ "./src/js/Edit/L.PM.Edit.js":
/*!**********************************!*\
  !*** ./src/js/Edit/L.PM.Edit.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mixins_Snapping__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Mixins/Snapping */ "./src/js/Mixins/Snapping.js");
/* harmony import */ var _Mixins_Dragging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Mixins/Dragging */ "./src/js/Mixins/Dragging.js");


var Edit = L.Class.extend({
  includes: [_Mixins_Dragging__WEBPACK_IMPORTED_MODULE_1__["default"], _Mixins_Snapping__WEBPACK_IMPORTED_MODULE_0__["default"]],
  options: {
    snappable: true,
    snapDistance: 20,
    allowSelfIntersection: true,
    draggable: true,
    limitMarkersToCount: -1
  },
  setOptions: function setOptions(options) {
    L.Util.setOptions(this, options);
  },
  applyOptions: function applyOptions() {},
  isPolygon: function isPolygon() {
    // if it's a polygon, it means the coordinates array is multi dimensional
    return this._layer instanceof L.Polygon;
  }
});
/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ }),

/***/ "./src/js/L.PM.Map.js":
/*!****************************!*\
  !*** ./src/js/L.PM.Map.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_translations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/translations */ "./src/assets/translations/index.js");
/* harmony import */ var _L_PM_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./L.PM.Utils */ "./src/js/L.PM.Utils.js");
/* harmony import */ var _Mixins_Modes_Mode_Edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Mixins/Modes/Mode.Edit */ "./src/js/Mixins/Modes/Mode.Edit.js");
/* harmony import */ var _Mixins_Modes_Mode_Drag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Mixins/Modes/Mode.Drag */ "./src/js/Mixins/Modes/Mode.Drag.js");
/* harmony import */ var _Mixins_Modes_Mode_Removal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Mixins/Modes/Mode.Removal */ "./src/js/Mixins/Modes/Mode.Removal.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var findLayers = _L_PM_Utils__WEBPACK_IMPORTED_MODULE_2__["default"].findLayers;
var Map = L.Class.extend({
  includes: [_Mixins_Modes_Mode_Edit__WEBPACK_IMPORTED_MODULE_3__["default"], _Mixins_Modes_Mode_Drag__WEBPACK_IMPORTED_MODULE_4__["default"], _Mixins_Modes_Mode_Removal__WEBPACK_IMPORTED_MODULE_5__["default"]],
  initialize: function initialize(map) {
    this.map = map;
    this.Draw = new L.PM.Draw(map);
    this.Toolbar = new L.PM.Toolbar(map);
    this._globalRemovalMode = false;
    this.globalOptions = {
      snappable: true
    };
  },
  setLang: function setLang() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
    var t = arguments.length > 1 ? arguments[1] : undefined;
    var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

    if (t) {
      _assets_translations__WEBPACK_IMPORTED_MODULE_1__["default"][lang] = lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(_assets_translations__WEBPACK_IMPORTED_MODULE_1__["default"][fallback], t);
    }

    L.PM.activeLang = lang;
    this.map.pm.Toolbar.reinit();
  },
  addControls: function addControls(options) {
    this.Toolbar.addControls(options);
  },
  removeControls: function removeControls() {
    this.Toolbar.removeControls();
  },
  toggleControls: function toggleControls() {
    this.Toolbar.toggleControls();
  },
  controlsVisible: function controlsVisible() {
    return this.Toolbar.isVisible;
  },
  enableDraw: function enableDraw() {
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Polygon';
    var options = arguments.length > 1 ? arguments[1] : undefined;

    // backwards compatible, remove after 3.0
    if (shape === 'Poly') {
      shape = 'Polygon';
    }

    this.Draw.enable(shape, options);
  },
  disableDraw: function disableDraw() {
    var shape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Polygon';

    // backwards compatible, remove after 3.0
    if (shape === 'Poly') {
      shape = 'Polygon';
    }

    this.Draw.disable(shape);
  },
  setPathOptions: function setPathOptions(options) {
    this.Draw.setPathOptions(options);
  },
  getGlobalOptions: function getGlobalOptions() {
    return this.globalOptions;
  },
  setGlobalOptions: function setGlobalOptions(o) {
    var _this = this;

    // merge passed and existing options
    var options = _objectSpread({}, this.globalOptions, {}, o); // enable options for Drawing Shapes


    this.map.pm.Draw.shapes.forEach(function (shape) {
      _this.map.pm.Draw[shape].setOptions(options);
    }); // enable options for Editing

    var layers = findLayers(this.map);
    layers.forEach(function (layer) {
      layer.pm.setOptions(options);
    }); // apply the options (actually trigger the functionality)

    this.applyGlobalOptions(); // store options

    this.globalOptions = options;
  },
  applyGlobalOptions: function applyGlobalOptions() {
    var layers = findLayers(this.map);
    layers.forEach(function (layer) {
      if (layer.pm.enabled()) {
        layer.pm.applyOptions();
      }
    });
  }
});
/* harmony default export */ __webpack_exports__["default"] = (Map);

/***/ }),

/***/ "./src/js/L.PM.Utils.js":
/*!******************************!*\
  !*** ./src/js/L.PM.Utils.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Utils = {
  calcMiddleLatLng: function calcMiddleLatLng(map, latlng1, latlng2) {
    // calculate the middle coordinates between two markers
    var p1 = map.project(latlng1);
    var p2 = map.project(latlng2);
    return map.unproject(p1._add(p2)._divideBy(2));
  },
  findLayers: function findLayers(map) {
    var layers = [];
    map.eachLayer(function (layer) {
      if (layer instanceof L.Polyline || layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.CircleMarker) {
        layers.push(layer);
      }
    }); // filter out layers that don't have the leaflet-geoman instance

    layers = layers.filter(function (layer) {
      return !!layer.pm;
    }); // filter out everything that's leaflet-geoman specific temporary stuff

    layers = layers.filter(function (layer) {
      return !layer._pmTempLayer;
    });
    return layers;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Utils);

/***/ }),

/***/ "./src/js/L.PM.js":
/*!************************!*\
  !*** ./src/js/L.PM.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills */ "./src/js/polyfills.js");
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfills__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../package.json */ "./package.json");
var _package_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../package.json */ "./package.json", 1);
/* harmony import */ var _L_PM_Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./L.PM.Map */ "./src/js/L.PM.Map.js");
/* harmony import */ var _Toolbar_L_PM_Toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Toolbar/L.PM.Toolbar */ "./src/js/Toolbar/L.PM.Toolbar.js");
/* harmony import */ var _Draw_L_PM_Draw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Draw/L.PM.Draw */ "./src/js/Draw/L.PM.Draw.js");
/* harmony import */ var _Draw_L_PM_Draw_Marker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Draw/L.PM.Draw.Marker */ "./src/js/Draw/L.PM.Draw.Marker.js");
/* harmony import */ var _Draw_L_PM_Draw_Line__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Draw/L.PM.Draw.Line */ "./src/js/Draw/L.PM.Draw.Line.js");
/* harmony import */ var _Draw_L_PM_Draw_Polygon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Draw/L.PM.Draw.Polygon */ "./src/js/Draw/L.PM.Draw.Polygon.js");
/* harmony import */ var _Draw_L_PM_Draw_Rectangle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Draw/L.PM.Draw.Rectangle */ "./src/js/Draw/L.PM.Draw.Rectangle.js");
/* harmony import */ var _Draw_L_PM_Draw_Circle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Draw/L.PM.Draw.Circle */ "./src/js/Draw/L.PM.Draw.Circle.js");
/* harmony import */ var _Draw_L_PM_Draw_CircleMarker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Draw/L.PM.Draw.CircleMarker */ "./src/js/Draw/L.PM.Draw.CircleMarker.js");
/* harmony import */ var _Draw_L_PM_Draw_Cut__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Draw/L.PM.Draw.Cut */ "./src/js/Draw/L.PM.Draw.Cut.js");
/* harmony import */ var _Edit_L_PM_Edit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Edit/L.PM.Edit */ "./src/js/Edit/L.PM.Edit.js");
/* harmony import */ var _Edit_L_PM_Edit_LayerGroup__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Edit/L.PM.Edit.LayerGroup */ "./src/js/Edit/L.PM.Edit.LayerGroup.js");
/* harmony import */ var _Edit_L_PM_Edit_Marker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Edit/L.PM.Edit.Marker */ "./src/js/Edit/L.PM.Edit.Marker.js");
/* harmony import */ var _Edit_L_PM_Edit_Line__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Edit/L.PM.Edit.Line */ "./src/js/Edit/L.PM.Edit.Line.js");
/* harmony import */ var _Edit_L_PM_Edit_Polygon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Edit/L.PM.Edit.Polygon */ "./src/js/Edit/L.PM.Edit.Polygon.js");
/* harmony import */ var _Edit_L_PM_Edit_Rectangle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Edit/L.PM.Edit.Rectangle */ "./src/js/Edit/L.PM.Edit.Rectangle.js");
/* harmony import */ var _Edit_L_PM_Edit_Circle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Edit/L.PM.Edit.Circle */ "./src/js/Edit/L.PM.Edit.Circle.js");
/* harmony import */ var _Edit_L_PM_Edit_CircleMarker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Edit/L.PM.Edit.CircleMarker */ "./src/js/Edit/L.PM.Edit.CircleMarker.js");
/* harmony import */ var _css_layers_css__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../css/layers.css */ "./src/css/layers.css");
/* harmony import */ var _css_layers_css__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_css_layers_css__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _css_controls_css__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../css/controls.css */ "./src/css/controls.css");
/* harmony import */ var _css_controls_css__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_css_controls_css__WEBPACK_IMPORTED_MODULE_21__);
/* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
 * Copyright (C) Geoman.io and Sumit Kumar - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sumit Kumar <sumit@geoman.io>, January 2020
 * Twitter: @TweetsOfSumit
 * OSS Repo: https://github.com/geoman-io/leaflet-geoman
 * Get Pro: https://geoman.io/leaflet-geoman#pro
 */






















L.PM = L.PM || {
  version: _package_json__WEBPACK_IMPORTED_MODULE_1__["version"],
  Map: _L_PM_Map__WEBPACK_IMPORTED_MODULE_2__["default"],
  Toolbar: _Toolbar_L_PM_Toolbar__WEBPACK_IMPORTED_MODULE_3__["default"],
  Draw: _Draw_L_PM_Draw__WEBPACK_IMPORTED_MODULE_4__["default"],
  Edit: _Edit_L_PM_Edit__WEBPACK_IMPORTED_MODULE_12__["default"],
  activeLang: 'en',
  initialize: function initialize(options) {
    this.addInitHooks(options);
  },
  addInitHooks: function addInitHooks() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    function initMap() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Map(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Map(this);
      }
    }

    L.Map.addInitHook(initMap);

    function initLayerGroup() {
      // doesn't need pmIgnore condition as the init hook of the individual layers will check it
      this.pm = new L.PM.Edit.LayerGroup(this);
    }

    L.LayerGroup.addInitHook(initLayerGroup);

    function initMarker() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Marker(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Marker(this);
      }
    }

    L.Marker.addInitHook(initMarker);

    function initCircleMarker() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.CircleMarker(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.CircleMarker(this);
      }
    }

    L.CircleMarker.addInitHook(initCircleMarker);

    function initPolyline() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Line(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Line(this);
      }
    }

    L.Polyline.addInitHook(initPolyline);

    function initPolygon() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Polygon(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Polygon(this);
      }
    }

    L.Polygon.addInitHook(initPolygon);

    function initRectangle() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Rectangle(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Rectangle(this);
      }
    }

    L.Rectangle.addInitHook(initRectangle);

    function initCircle() {
      this.pm = undefined;

      if (options.optIn) {
        if (this.options.pmIgnore === false) {
          this.pm = new L.PM.Edit.Circle(this);
        }
      } else if (!this.options.pmIgnore) {
        this.pm = new L.PM.Edit.Circle(this);
      }
    }

    L.Circle.addInitHook(initCircle);
  }
}; // initialize leaflet-geoman

L.PM.initialize();

/***/ }),

/***/ "./src/js/Mixins/Dragging.js":
/*!***********************************!*\
  !*** ./src/js/Mixins/Dragging.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var DragMixin = {
  enableLayerDrag: function enableLayerDrag() {
    // before enabling layer drag, disable layer editing
    this.disable();

    if (this._layer instanceof L.Marker) {
      this._layer.dragging.enable();

      return;
    } // temporary coord variable for delta calculation


    this._tempDragCoord = null; // add CSS class

    var el = this._layer._path ? this._layer._path : this._layer._renderer._container;
    L.DomUtil.addClass(el, 'leaflet-pm-draggable');
    this._originalMapDragState = this._layer._map.dragging._enabled; // can we reliably save the map's draggable state?
    // (if the mouse up event happens outside the container, then the map can become undraggable)

    this._safeToCacheDragState = true; // add mousedown event to trigger drag

    this._layer.on('mousedown', this._dragMixinOnMouseDown, this);
  },
  disableLayerDrag: function disableLayerDrag() {
    if (this._layer instanceof L.Marker) {
      this._layer.dragging.disable();

      return;
    } // remove CSS class


    var el = this._layer._path ? this._layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable'); // no longer save the drag state

    this._safeToCacheDragState = false; // disable mousedown event

    this._layer.off('mousedown', this._dragMixinOnMouseDown, this);
  },
  _dragMixinOnMouseUp: function _dragMixinOnMouseUp() {
    var _this = this;

    var el = this._layer._path ? this._layer._path : this._layer._renderer._container; // re-enable map drag

    if (this._originalMapDragState) {
      this._layer._map.dragging.enable();
    } // if mouseup event fired, it's safe to cache the map draggable state on the next mouse down


    this._safeToCacheDragState = true; // clear up mousemove event

    this._layer._map.off('mousemove', this._dragMixinOnMouseMove, this); // clear up mouseup event


    this._layer._map.off('mouseup', this._dragMixinOnMouseUp, this); // if no drag happened, don't do anything


    if (!this._dragging) {
      return false;
    } // timeout to prevent click event after drag :-/
    // TODO: do it better as soon as leaflet has a way to do it better :-)


    window.setTimeout(function () {
      // set state
      _this._dragging = false;
      L.DomUtil.removeClass(el, 'leaflet-pm-dragging'); // fire pm:dragend event

      _this._layer.fire('pm:dragend'); // fire edit


      _this._fireEdit();
    }, 10);
    return true;
  },
  _dragMixinOnMouseMove: function _dragMixinOnMouseMove(e) {
    var el = this._layer._path ? this._layer._path : this._layer._renderer._container;

    if (!this._dragging) {
      // set state
      this._dragging = true;
      L.DomUtil.addClass(el, 'leaflet-pm-dragging'); // bring it to front to prevent drag interception

      this._layer.bringToFront(); // disbale map drag


      if (this._originalMapDragState) {
        this._layer._map.dragging.disable();
      } // fire pm:dragstart event


      this._layer.fire('pm:dragstart');
    }

    this._onLayerDrag(e);
  },
  _dragMixinOnMouseDown: function _dragMixinOnMouseDown(e) {
    // cancel if mouse button is NOT the left button
    if (e.originalEvent.button > 0) {
      return;
    } // save current map dragging state


    if (this._safeToCacheDragState) {
      this._originalMapDragState = this._layer._map.dragging._enabled; // don't cache the state again until another mouse up is registered

      this._safeToCacheDragState = false;
    } // save for delta calculation


    this._tempDragCoord = e.latlng;

    this._layer._map.on('mouseup', this._dragMixinOnMouseUp, this); // listen to mousemove on map (instead of polygon),
    // otherwise fast mouse movements stop the drag


    this._layer._map.on('mousemove', this._dragMixinOnMouseMove, this);
  },
  dragging: function dragging() {
    return this._dragging;
  },
  _onLayerDrag: function _onLayerDrag(e) {
    // latLng of mouse event
    var latlng = e.latlng; // delta coords (how far was dragged)

    var deltaLatLng = {
      lat: latlng.lat - this._tempDragCoord.lat,
      lng: latlng.lng - this._tempDragCoord.lng
    }; // move the coordinates by the delta

    var moveCoords = function moveCoords(coords) {
      return (// alter the coordinates
        coords.map(function (currentLatLng) {
          if (Array.isArray(currentLatLng)) {
            // do this recursively as coords might be nested
            return moveCoords(currentLatLng);
          } // move the coord and return it


          return {
            lat: currentLatLng.lat + deltaLatLng.lat,
            lng: currentLatLng.lng + deltaLatLng.lng
          };
        })
      );
    };

    if (this._layer instanceof L.CircleMarker) {
      // set new coordinates and redraw
      this._layer.setLatLng(latlng);
    } else {
      // create the new coordinates array
      var newCoords = moveCoords(this._layer.getLatLngs()); // set new coordinates and redraw

      this._layer.setLatLngs(newCoords);
    } // save current latlng for next delta calculation


    this._tempDragCoord = latlng; // fire pm:dragstart event

    this._layer.fire('pm:drag', e);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (DragMixin);

/***/ }),

/***/ "./src/js/Mixins/MarkerLimits.js":
/*!***************************************!*\
  !*** ./src/js/Mixins/MarkerLimits.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var MarkerLimits = {
  filterMarkerGroup: function filterMarkerGroup() {
    // don't do it if the option is disabled
    // define cache
    this.markerCache = [];
    this.createCache(); // refresh cache when layer was edited (e.g. when a vertex was added or removed)

    this._layer.on('pm:edit', this.createCache, this); // apply filter for the first time


    this.applyLimitFilters({}); // remove events when edit mode is disabled

    this._layer.on('pm:disable', this._removeMarkerLimitEvents, this); // add markers closest to the mouse


    if (this.options.limitMarkersToCount > -1) {
      // re-init markers when a vertex is removed. 
      // The reason is that syncing this cache with a removed marker was impossible to do
      this._layer.on('pm:vertexremoved', this._initMarkers, this);

      this._map.on('mousemove', this.applyLimitFilters, this);
    }
  },
  _removeMarkerLimitEvents: function _removeMarkerLimitEvents() {
    this._map.off('mousemove', this.applyLimitFilters, this);

    this._layer.off('pm:edit', this.createCache, this);

    this._layer.off('pm:disable', this._removeMarkerLimitEvents, this);

    this._layer.off('pm:vertexremoved', this._initMarkers, this);
  },
  createCache: function createCache() {
    var allMarkers = [].concat(_toConsumableArray(this._markerGroup.getLayers()), _toConsumableArray(this.markerCache));
    this.markerCache = allMarkers.filter(function (v, i, s) {
      return s.indexOf(v) === i;
    });
  },
  renderLimits: function renderLimits(markers) {
    var _this = this;

    this.markerCache.forEach(function (l) {
      if (markers.includes(l)) {
        _this._markerGroup.addLayer(l);
      } else {
        _this._markerGroup.removeLayer(l);
      }
    });
  },
  applyLimitFilters: function applyLimitFilters(_ref) {
    var _ref$latlng = _ref.latlng,
        latlng = _ref$latlng === void 0 ? {
      lat: 0,
      lng: 0
    } : _ref$latlng;

    // find markers near the cursor
    var makersNearCursor = this._filterClosestMarkers(latlng); // all markers that we want to show


    var markersToAdd = _toConsumableArray(makersNearCursor);

    this.renderLimits(markersToAdd);
  },
  _filterClosestMarkers: function _filterClosestMarkers(latlng) {
    var markers = _toConsumableArray(this.markerCache);

    var limit = this.options.limitMarkersToCount; // sort markers by distance to cursor

    markers.sort(function (l, t) {
      var distanceA = l._latlng.distanceTo(latlng);

      var distanceB = t._latlng.distanceTo(latlng);

      return distanceA - distanceB;
    }); // reduce markers to number of limit

    var closest = markers.filter(function (l, i) {
      return limit > -1 ? i < limit : true;
    });
    return closest;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (MarkerLimits);

/***/ }),

/***/ "./src/js/Mixins/Modes/Mode.Drag.js":
/*!******************************************!*\
  !*** ./src/js/Mixins/Modes/Mode.Drag.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../L.PM.Utils */ "./src/js/L.PM.Utils.js");

var findLayers = _L_PM_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].findLayers;
var GlobalDragMode = {
  globalDragModeEnabled: function globalDragModeEnabled() {
    return !!this._globalDragMode;
  },
  enableGlobalDragMode: function enableGlobalDragMode() {
    var layers = findLayers(this.map);
    this._globalDragMode = true;
    layers.forEach(function (layer) {
      layer.pm.enableLayerDrag();
    });

    if (!this.throttledReInitDrag) {
      this.throttledReInitDrag = L.Util.throttle(this.reinitGlobalDragMode, 100, this);
    } // add map handler


    this.map.on('layeradd', this.throttledReInitDrag, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('dragMode', this._globalDragMode);

    this._fireDragModeEvent(true);
  },
  disableGlobalDragMode: function disableGlobalDragMode() {
    var layers = findLayers(this.map);
    this._globalDragMode = false;
    layers.forEach(function (layer) {
      layer.pm.disableLayerDrag();
    }); // remove map handler

    this.map.off('layeradd', this.throttledReInitDrag, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('dragMode', this._globalDragMode);

    this._fireDragModeEvent(false);
  },
  _fireDragModeEvent: function _fireDragModeEvent(enabled) {
    this.map.fire('pm:globaldragmodetoggled', {
      enabled: enabled,
      map: this.map
    });
  },
  toggleGlobalDragMode: function toggleGlobalDragMode() {
    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
    } else {
      this.enableGlobalDragMode();
    }
  },
  reinitGlobalDragMode: function reinitGlobalDragMode(_ref) {
    var layer = _ref.layer;
    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily	
    var isRelevant = !!layer.pm && !layer._pmTempLayer;

    if (!isRelevant) {
      return;
    } // re-enable global drag mode if it's enabled already


    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
      this.enableGlobalDragMode();
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GlobalDragMode);

/***/ }),

/***/ "./src/js/Mixins/Modes/Mode.Edit.js":
/*!******************************************!*\
  !*** ./src/js/Mixins/Modes/Mode.Edit.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../L.PM.Utils */ "./src/js/L.PM.Utils.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// this mixin adds a global edit mode to the map

var findLayers = _L_PM_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].findLayers;
var GlobalEditMode = {
  _globalEditMode: false,
  globalEditEnabled: function globalEditEnabled() {
    return this._globalEditMode;
  },
  setGlobalEditStatus: function setGlobalEditStatus(status) {
    // set status
    this._globalEditMode = status; // fire event

    this._fireEditModeEvent(this._globalEditMode);
  },
  enableGlobalEditMode: function enableGlobalEditMode(o) {
    var options = _objectSpread({
      snappable: this._globalSnappingEnabled
    }, o);

    var status = true; // Set toolbar button to currect status

    this.Toolbar.toggleButton('editMode', status); // find all layers handled by leaflet-geoman

    var layers = findLayers(this.map); // enable all layers

    layers.forEach(function (layer) {
      layer.pm.enable(options);
    });

    if (!this.throttledReInitEdit) {
      this.throttledReInitEdit = L.Util.throttle(this.handleLayerAdditionInGlobalEditMode, 100, this);
    } // handle layers that are added while in removal mode


    this.map.on('layeradd', this.throttledReInitEdit, this);
    this.setGlobalEditStatus(status);
  },
  disableGlobalEditMode: function disableGlobalEditMode() {
    var status = false; // find all layers handles by leaflet-geoman

    var layers = findLayers(this.map); // disable all layers

    layers.forEach(function (layer) {
      layer.pm.disable();
    }); // cleanup layer off event

    this.map.off('layeroff', this.throttledReInitEdit, this); // Set toolbar button to currect status

    this.Toolbar.toggleButton('editMode', status);
    this.setGlobalEditStatus(status);
  },
  toggleGlobalEditMode: function toggleGlobalEditMode() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.globalOptions;

    // console.log('toggle global edit mode', options);
    if (this.globalEditEnabled()) {
      // disable
      this.disableGlobalEditMode();
    } else {
      // enable
      this.enableGlobalEditMode(options);
    }
  },
  handleLayerAdditionInGlobalEditMode: function handleLayerAdditionInGlobalEditMode(_ref) {
    var layer = _ref.layer;
    // when global edit mode is enabled and a layer is added to the map,
    // enable edit for that layer if it's relevant
    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily	
    var isRelevant = !!layer.pm && !layer._pmTempLayer;

    if (!isRelevant) {
      return;
    }

    if (this.globalEditEnabled()) {
      layer.pm.enable(_objectSpread({}, this.globalOptions, {
        snappable: this._globalSnappingEnabled
      }));
    }
  },
  _fireEditModeEvent: function _fireEditModeEvent(enabled) {
    this.map.fire('pm:globaleditmodetoggled', {
      enabled: enabled,
      map: this.map
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GlobalEditMode);

/***/ }),

/***/ "./src/js/Mixins/Modes/Mode.Removal.js":
/*!*********************************************!*\
  !*** ./src/js/Mixins/Modes/Mode.Removal.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var GlobalRemovalMode = {
  disableGlobalRemovalMode: function disableGlobalRemovalMode() {
    var _this = this;

    this._globalRemovalMode = false;
    this.map.eachLayer(function (layer) {
      layer.off('click', _this.removeLayer, _this);
    }); // remove map handler

    this.map.off('layeradd', this.throttledReInitRemoval, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);

    this._fireRemovalModeEvent(false);
  },
  enableGlobalRemovalMode: function enableGlobalRemovalMode() {
    var _this2 = this;

    var isRelevant = function isRelevant(layer) {
      return layer.pm && !(layer.pm.options && layer.pm.options.preventMarkerRemoval) && !(layer instanceof L.LayerGroup);
    };

    this._globalRemovalMode = true; // handle existing layers

    this.map.eachLayer(function (layer) {
      if (isRelevant(layer)) {
        layer.on('click', _this2.removeLayer, _this2);
      }
    });

    if (!this.throttledReInitRemoval) {
      this.throttledReInitRemoval = L.Util.throttle(this.reinitGlobalRemovalMode, 100, this);
    } // handle layers that are added while in removal  xmode


    this.map.on('layeradd', this.throttledReInitRemoval, this); // toogle the button in the toolbar if this is called programatically

    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);

    this._fireRemovalModeEvent(true);
  },
  _fireRemovalModeEvent: function _fireRemovalModeEvent(enabled) {
    this.map.fire('pm:globalremovalmodetoggled', {
      enabled: enabled,
      map: this.map
    });
  },
  toggleGlobalRemovalMode: function toggleGlobalRemovalMode() {
    // toggle global edit mode
    if (this.globalRemovalEnabled()) {
      this.disableGlobalRemovalMode();
    } else {
      this.enableGlobalRemovalMode();
    }
  },
  globalRemovalEnabled: function globalRemovalEnabled() {
    return !!this._globalRemovalMode;
  },
  removeLayer: function removeLayer(e) {
    var layer = e.target; // only remove layer, if it's handled by leaflet-geoman,
    // not a tempLayer and not currently being dragged

    var removeable = !layer._pmTempLayer && (!layer.pm || !layer.pm.dragging());

    if (removeable) {
      layer.remove();
      this.map.fire('pm:remove', {
        layer: layer
      });
    }
  },
  reinitGlobalRemovalMode: function reinitGlobalRemovalMode(_ref) {
    var layer = _ref.layer;
    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily	
    var isRelevant = !!layer.pm && !layer._pmTempLayer;

    if (!isRelevant) {
      return;
    } // re-enable global removal mode if it's enabled already


    if (this.globalRemovalEnabled()) {
      this.disableGlobalRemovalMode();
      this.enableGlobalRemovalMode();
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GlobalRemovalMode);

/***/ }),

/***/ "./src/js/Mixins/Snapping.js":
/*!***********************************!*\
  !*** ./src/js/Mixins/Snapping.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_PM_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../L.PM.Utils */ "./src/js/L.PM.Utils.js");

var SnapMixin = {
  _initSnappableMarkers: function _initSnappableMarkers() {
    this.options.snapDistance = this.options.snapDistance || 30;

    this._assignEvents(this._markers);

    this._layer.off('pm:dragstart', this._unsnap, this);

    this._layer.on('pm:dragstart', this._unsnap, this);
  },
  _disableSnapping: function _disableSnapping() {
    this._layer.off('pm:dragstart', this._unsnap, this);
  },
  _assignEvents: function _assignEvents(markerArr) {
    var _this = this;

    // loop through marker array and assign events to the markers
    markerArr.forEach(function (marker) {
      // if the marker is another array (Multipolygon stuff), recursively do this again
      if (Array.isArray(marker)) {
        _this._assignEvents(marker);

        return;
      } // add handleSnapping event on drag


      marker.off('drag', _this._handleSnapping, _this);
      marker.on('drag', _this._handleSnapping, _this); // cleanup event on dragend

      marker.off('dragend', _this._cleanupSnapping, _this);
      marker.on('dragend', _this._cleanupSnapping, _this);
    });
  },
  _unsnap: function _unsnap() {
    // delete the last snap
    delete this._snapLatLng;
  },
  _cleanupSnapping: function _cleanupSnapping() {
    // delete it, we need to refresh this with each start of a drag because
    // meanwhile, new layers could've been added to the map
    delete this._snapList; // remove map event

    this._map.off('pm:remove', this._handleSnapLayerRemoval, this);

    if (this.debugIndicatorLines) {
      this.debugIndicatorLines.forEach(function (line) {
        line.remove();
      });
    }
  },
  _handleSnapLayerRemoval: function _handleSnapLayerRemoval(_ref) {
    var layer = _ref.layer;

    // find the layers index in snaplist
    var index = this._snapList.findIndex(function (e) {
      return e._leaflet_id === layer._leaflet_id;
    }); // remove it from the snaplist


    this._snapList.splice(index, 1);
  },
  _handleSnapping: function _handleSnapping(e) {
    var _this2 = this;

    function throttledList() {
      return L.Util.throttle(this._createSnapList, 100, this);
    } // if snapping is disabled via holding ALT during drag, stop right here


    if (e.originalEvent.altKey) {
      return false;
    } // create a list of layers that the marker could snap to
    // this isn't inside a movestart/dragstart callback because middlemarkers are initialized
    // after dragstart/movestart so it wouldn't fire for them


    if (this._snapList === undefined) {
      this._createSnapList(); // re-create the snaplist again when a layer is added during draw


      this._map.off('layeradd', throttledList, this);

      this._map.on('layeradd', throttledList, this);
    } // if there are no layers to snap to, stop here


    if (this._snapList.length <= 0) {
      return false;
    }

    var marker = e.target; // get the closest layer, it's closest latlng, segment and the distance

    var closestLayer = this._calcClosestLayer(marker.getLatLng(), this._snapList);

    var isMarker = closestLayer.layer instanceof L.Marker || closestLayer.layer instanceof L.CircleMarker; // find the final latlng that we want to snap to

    var snapLatLng;

    if (!isMarker) {
      snapLatLng = this._checkPrioritiySnapping(closestLayer);
    } else {
      snapLatLng = closestLayer.latlng;
    } // minimal distance before marker snaps (in pixels)


    var minDistance = this.options.snapDistance; // event info for pm:snap and pm:unsnap

    var eventInfo = {
      marker: marker,
      snapLatLng: snapLatLng,
      segment: closestLayer.segment,
      layer: this._layer,
      layerInteractedWith: closestLayer.layer,
      // for lack of a better property name
      distance: closestLayer.distance
    };
    eventInfo.marker.fire('pm:snapdrag', eventInfo);

    this._layer.fire('pm:snapdrag', eventInfo);

    if (closestLayer.distance < minDistance) {
      // snap the marker
      marker.setLatLng(snapLatLng);
      marker._snapped = true;

      var triggerSnap = function triggerSnap() {
        _this2._snapLatLng = snapLatLng;
        marker.fire('pm:snap', eventInfo);

        _this2._layer.fire('pm:snap', eventInfo);
      }; // check if the snapping position differs from the last snap
      // Thanks Max & car2go Team


      var a = this._snapLatLng || {};
      var b = snapLatLng || {};

      if (a.lat !== b.lat || a.lng !== b.lng) {
        triggerSnap();
      }
    } else if (this._snapLatLng) {
      // no more snapping
      // if it was previously snapped...
      // ...unsnap
      this._unsnap(eventInfo);

      marker._snapped = false; // and fire unsnap event

      eventInfo.marker.fire('pm:unsnap', eventInfo);

      this._layer.fire('pm:unsnap', eventInfo);
    }

    return true;
  },
  // we got the point we want to snap to (C), but we need to check if a coord of the polygon
  // receives priority over C as the snapping point. Let's check this here
  _checkPrioritiySnapping: function _checkPrioritiySnapping(closestLayer) {
    var map = this._map; // A and B are the points of the closest segment to P (the marker position we want to snap)

    var A = closestLayer.segment[0];
    var B = closestLayer.segment[1]; // C is the point we would snap to on the segment.
    // The closest point on the closest segment of the closest polygon to P. That's right.

    var C = closestLayer.latlng; // distances from A to C and B to C to check which one is closer to C

    var distanceAC = this._getDistance(map, A, C);

    var distanceBC = this._getDistance(map, B, C); // closest latlng of A and B to C


    var closestVertexLatLng = distanceAC < distanceBC ? A : B; // distance between closestVertexLatLng and C

    var shortestDistance = distanceAC < distanceBC ? distanceAC : distanceBC; // snap to middle (M) of segment if option is enabled

    if (this.options.snapMiddle) {
      var M = _L_PM_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].calcMiddleLatLng(map, A, B);

      var distanceMC = this._getDistance(map, M, C);

      if (distanceMC < distanceAC && distanceMC < distanceBC) {
        // M is the nearest vertex
        closestVertexLatLng = M;
        shortestDistance = distanceMC;
      }
    } // the distance that needs to be undercut to trigger priority


    var priorityDistance = this.options.snapDistance; // the latlng we ultemately want to snap to

    var snapLatlng; // if C is closer to the closestVertexLatLng (A, B or M) than the snapDistance,
    // the closestVertexLatLng has priority over C as the snapping point.

    if (shortestDistance < priorityDistance) {
      snapLatlng = closestVertexLatLng;
    } else {
      snapLatlng = C;
    } // return the copy of snapping point


    return Object.assign({}, snapLatlng);
  },
  _createSnapList: function _createSnapList() {
    var _this3 = this;

    var layers = [];
    var debugIndicatorLines = [];
    var map = this._map;
    map.off('pm:remove', this._handleSnapLayerRemoval, this);
    map.on('pm:remove', this._handleSnapLayerRemoval, this); // find all layers that are or inherit from Polylines... and markers that are not
    // temporary markers of polygon-edits

    map.eachLayer(function (layer) {
      if ((layer instanceof L.Polyline || layer instanceof L.Marker || layer instanceof L.CircleMarker) && layer.options.snapIgnore !== true) {
        layers.push(layer); // this is for debugging

        var debugLine = L.polyline([], {
          color: 'red',
          pmIgnore: true
        });
        debugLine._pmTempLayer = true;
        debugIndicatorLines.push(debugLine); // uncomment 👇 this line to show helper lines for debugging
        // debugLine.addTo(map);
      }
    }); // ...except myself

    layers = layers.filter(function (layer) {
      return _this3._layer !== layer;
    }); // also remove everything that has no coordinates yet

    layers = layers.filter(function (layer) {
      return layer._latlng || layer._latlngs && layer._latlngs.length > 0;
    }); // finally remove everything that's leaflet-geoman specific temporary stuff

    layers = layers.filter(function (layer) {
      return !layer._pmTempLayer;
    }); // save snaplist from layers and the other snap layers added from other classes/scripts

    if (this._otherSnapLayers) {
      this._snapList = layers.concat(this._otherSnapLayers);
    } else {
      this._snapList = layers;
    }

    this.debugIndicatorLines = debugIndicatorLines;
  },
  _calcClosestLayer: function _calcClosestLayer(latlng, layers) {
    var _this4 = this;

    // the closest polygon to our dragged marker latlng
    var closestLayer = {}; // loop through the layers

    layers.forEach(function (layer, index) {
      // find the closest latlng, segment and the distance of this layer to the dragged marker latlng
      var results = _this4._calcLayerDistances(latlng, layer); // show indicator lines, it's for debugging


      _this4.debugIndicatorLines[index].setLatLngs([latlng, results.latlng]); // save the info if it doesn't exist or if the distance is smaller than the previous one


      if (closestLayer.distance === undefined || results.distance < closestLayer.distance) {
        closestLayer = results;
        closestLayer.layer = layer;
      }
    }); // return the closest layer and it's data
    // if there is no closest layer, return undefined

    return closestLayer;
  },
  _calcLayerDistances: function _calcLayerDistances(latlng, layer) {
    var _this5 = this;

    var map = this._map; // is this a marker?

    var isMarker = layer instanceof L.Marker || layer instanceof L.CircleMarker; // is it a polygon?

    var isPolygon = layer instanceof L.Polygon; // the point P which we want to snap (probpably the marker that is dragged)

    var P = latlng; // the coords of the layer

    var latlngs = isMarker ? layer.getLatLng() : layer.getLatLngs();

    if (isMarker) {
      // return the info for the marker, no more calculations needed
      return {
        latlng: Object.assign({}, latlngs),
        distance: this._getDistance(map, latlngs, P)
      };
    } // the closest segment (line between two points) of the layer


    var closestSegment; // the shortest distance from P to closestSegment

    var shortestDistance; // loop through the coords of the layer

    var loopThroughCoords = function loopThroughCoords(coords) {
      coords.forEach(function (coord, index) {
        if (Array.isArray(coord)) {
          loopThroughCoords(coord);
          return;
        } // take this coord (A)...


        var A = coord;
        var nextIndex; // and the next coord (B) as points

        if (isPolygon) {
          nextIndex = index + 1 === coords.length ? 0 : index + 1;
        } else {
          nextIndex = index + 1 === coords.length ? undefined : index + 1;
        }

        var B = coords[nextIndex];

        if (B) {
          // calc the distance between P and AB-segment
          var distance = _this5._getDistanceToSegment(map, P, A, B); // is the distance shorter than the previous one? Save it and the segment


          if (shortestDistance === undefined || distance < shortestDistance) {
            shortestDistance = distance;
            closestSegment = [A, B];
          }
        }
      });
    };

    loopThroughCoords(latlngs); // now, take the closest segment (closestSegment) and calc the closest point to P on it.

    var C = this._getClosestPointOnSegment(map, latlng, closestSegment[0], closestSegment[1]); // return the latlng of that sucker


    return {
      latlng: Object.assign({}, C),
      segment: closestSegment,
      distance: shortestDistance
    };
  },
  _getClosestPointOnSegment: function _getClosestPointOnSegment(map, latlng, latlngA, latlngB) {
    var maxzoom = map.getMaxZoom();

    if (maxzoom === Infinity) {
      maxzoom = map.getZoom();
    }

    var P = map.project(latlng, maxzoom);
    var A = map.project(latlngA, maxzoom);
    var B = map.project(latlngB, maxzoom);
    var closest = L.LineUtil.closestPointOnSegment(P, A, B);
    return map.unproject(closest, maxzoom);
  },
  _getDistanceToSegment: function _getDistanceToSegment(map, latlng, latlngA, latlngB) {
    var P = map.latLngToLayerPoint(latlng);
    var A = map.latLngToLayerPoint(latlngA);
    var B = map.latLngToLayerPoint(latlngB);
    return L.LineUtil.pointToSegmentDistance(P, A, B);
  },
  _getDistance: function _getDistance(map, latlngA, latlngB) {
    return map.latLngToLayerPoint(latlngA).distanceTo(map.latLngToLayerPoint(latlngB));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (SnapMixin);

/***/ }),

/***/ "./src/js/Toolbar/L.Controls.js":
/*!**************************************!*\
  !*** ./src/js/Toolbar/L.Controls.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers/index.js");

var PMButton = L.Control.extend({
  options: {
    position: 'topleft'
  },
  // TODO: clean up variable names like _button should be _options and that domNodeVariable stuff
  initialize: function initialize(options) {
    // replaced setOptions with this because classNames returned undefined 🤔
    this._button = Object.assign({}, this.options, options);
  },
  onAdd: function onAdd(map) {
    this._map = map;

    if (this._button.tool === 'edit') {
      this._container = this._map.pm.Toolbar.editContainer;
    } else if (this._button.tool === 'options') {
      this._container = this._map.pm.Toolbar.optionsContainer;
    } else {
      this._container = this._map.pm.Toolbar.drawContainer;
    }

    this.buttonsDomNode = this._makeButton(this._button);

    this._container.appendChild(this.buttonsDomNode);

    return this._container;
  },
  onRemove: function onRemove() {
    this.buttonsDomNode.remove();
    return this._container;
  },
  getText: function getText() {
    return this._button.text;
  },
  getIconUrl: function getIconUrl() {
    return this._button.iconUrl;
  },
  destroy: function destroy() {
    this._button = {};

    this._update();
  },
  toggle: function toggle(e) {
    if (typeof e === 'boolean') {
      this._button.toggleStatus = e;
    } else {
      this._button.toggleStatus = !this._button.toggleStatus;
    }

    this._applyStyleClasses();

    return this._button.toggleStatus;
  },
  toggled: function toggled() {
    return this._button.toggleStatus;
  },
  onCreate: function onCreate() {
    this.toggle(false);
  },
  _triggerClick: function _triggerClick(e) {
    this._button.onClick(e);

    this._clicked(e);

    this._button.afterClick(e);
  },
  _makeButton: function _makeButton(button) {
    var _this = this;

    // button container
    var buttonContainer = L.DomUtil.create('div', 'button-container', this._container); // the button itself

    var newButton = L.DomUtil.create('a', 'leaflet-buttons-control-button', buttonContainer); // the buttons actions

    var actionContainer = L.DomUtil.create('div', 'leaflet-pm-actions-container', buttonContainer);
    var activeActions = button.actions;
    var actions = {
      cancel: {
        text: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getTranslation"])('actions.cancel'),
        onClick: function onClick() {
          this._triggerClick();
        }
      },
      finishMode: {
        text: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getTranslation"])('actions.finish'),
        onClick: function onClick() {
          this._triggerClick();
        }
      },
      removeLastVertex: {
        text: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getTranslation"])('actions.removeLastVertex'),
        onClick: function onClick() {
          this._map.pm.Draw[button.jsClass]._removeLastVertex();
        }
      },
      finish: {
        text: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getTranslation"])('actions.finish'),
        onClick: function onClick(e) {
          this._map.pm.Draw[button.jsClass]._finishShape(e);
        }
      }
    };
    activeActions.forEach(function (name) {
      var action = actions[name];
      var actionNode = L.DomUtil.create('a', "leaflet-pm-action action-".concat(name), actionContainer);
      actionNode.innerHTML = action.text;
      L.DomEvent.addListener(actionNode, 'click', action.onClick, _this);
      L.DomEvent.disableClickPropagation(actionNode);
    });

    if (button.toggleStatus) {
      L.DomUtil.addClass(buttonContainer, 'active');
    }

    var image = L.DomUtil.create('div', 'control-icon', newButton);

    if (button.title) {
      image.setAttribute('title', button.title);
    }

    if (button.iconUrl) {
      image.setAttribute('src', button.iconUrl);
    }

    if (button.className) {
      L.DomUtil.addClass(image, button.className);
    } // before the actual click, trigger a click on currently toggled buttons to
    // untoggle them and their functionality


    L.DomEvent.addListener(newButton, 'click', function () {
      if (_this._button.disableOtherButtons) {
        _this._map.pm.Toolbar.triggerClickOnToggledButtons(_this);
      }
    });
    L.DomEvent.addListener(newButton, 'click', this._triggerClick, this);
    L.DomEvent.disableClickPropagation(newButton);
    return buttonContainer;
  },
  _applyStyleClasses: function _applyStyleClasses() {
    if (!this._container) {
      return;
    }

    if (!this._button.toggleStatus) {
      L.DomUtil.removeClass(this.buttonsDomNode, 'active');
    } else {
      L.DomUtil.addClass(this.buttonsDomNode, 'active');
    }
  },
  _clicked: function _clicked() {
    if (this._button.doToggle) {
      this.toggle();
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (PMButton);

/***/ }),

/***/ "./src/js/Toolbar/L.PM.Toolbar.js":
/*!****************************************!*\
  !*** ./src/js/Toolbar/L.PM.Toolbar.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _L_Controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./L.Controls */ "./src/js/Toolbar/L.Controls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers/index.js");


L.Control.PMButton = _L_Controls__WEBPACK_IMPORTED_MODULE_0__["default"];
var Toolbar = L.Class.extend({
  options: {
    drawMarker: true,
    drawRectangle: true,
    drawPolyline: true,
    drawPolygon: true,
    drawCircle: true,
    drawCircleMarker: true,
    editMode: true,
    dragMode: true,
    cutPolygon: true,
    removalMode: true,
    snappingOption: true,
    position: 'topleft'
  },
  initialize: function initialize(map) {
    this.init(map);
  },
  reinit: function reinit() {
    var addControls = this.isVisible;
    this.removeControls();

    this._defineButtons();

    if (addControls) {
      this.addControls();
    }
  },
  init: function init(map) {
    this.map = map;
    this.buttons = {};
    this.isVisible = false;
    this.drawContainer = L.DomUtil.create('div', 'leaflet-pm-toolbar leaflet-pm-draw leaflet-bar leaflet-control');
    this.editContainer = L.DomUtil.create('div', 'leaflet-pm-toolbar leaflet-pm-edit leaflet-bar leaflet-control');
    this.optionsContainer = L.DomUtil.create('div', 'leaflet-pm-toolbar leaflet-pm-options leaflet-bar leaflet-control');

    this._defineButtons();
  },
  getButtons: function getButtons() {
    return this.buttons;
  },
  addControls: function addControls() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options;

    // adds all buttons to the map specified inside options
    // make button renaming backwards compatible
    if (typeof options.editPolygon !== 'undefined') {
      options.editMode = options.editPolygon;
    }

    if (typeof options.deleteLayer !== 'undefined') {
      options.removalMode = options.deleteLayer;
    } // first set the options


    L.Util.setOptions(this, options);
    this.applyIconStyle(); // now show the specified buttons

    this._showHideButtons();

    this.isVisible = true;
  },
  applyIconStyle: function applyIconStyle() {
    var buttons = this.getButtons();
    var iconClasses = {
      geomanIcons: {
        drawMarker: 'control-icon leaflet-pm-icon-marker',
        drawPolyline: 'control-icon leaflet-pm-icon-polyline',
        drawRectangle: 'control-icon leaflet-pm-icon-rectangle',
        drawPolygon: 'control-icon leaflet-pm-icon-polygon',
        drawCircle: 'control-icon leaflet-pm-icon-circle',
        drawCircleMarker: 'control-icon leaflet-pm-icon-circle-marker',
        editMode: 'control-icon leaflet-pm-icon-edit',
        dragMode: 'control-icon leaflet-pm-icon-drag',
        cutPolygon: 'control-icon leaflet-pm-icon-cut',
        removalMode: 'control-icon leaflet-pm-icon-delete'
      }
    };

    for (var name in buttons) {
      var button = buttons[name];
      L.Util.setOptions(button, {
        className: iconClasses.geomanIcons[name]
      });
    }
  },
  removeControls: function removeControls() {
    // grab all buttons to loop through
    var buttons = this.getButtons(); // remove all buttons

    for (var btn in buttons) {
      buttons[btn].remove();
    }

    this.isVisible = false;
  },
  toggleControls: function toggleControls() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options;

    if (this.isVisible) {
      this.removeControls();
    } else {
      this.addControls(options);
    }
  },
  _addButton: function _addButton(name, button) {
    this.buttons[name] = button;
    this.options[name] = this.options[name] || false;
    return this.buttons[name];
  },
  triggerClickOnToggledButtons: function triggerClickOnToggledButtons(exceptThisButton) {
    // this function is used when - e.g. drawing mode is enabled and a possible
    // other active mode (like removal tool) is already active.
    // we can't have two active modes because of possible event conflicts
    // so, we trigger a click on all currently active (toggled) buttons
    // the options toolbar should not be disabled during the different modes
    // TODO: probably need to abstract this a bit so different options are automatically
    // disabled for different modes, like pinning for circles
    var exceptOptionButtons = ['snappingOption'];

    for (var name in this.buttons) {
      if (!exceptOptionButtons.includes(name) && this.buttons[name] !== exceptThisButton && this.buttons[name].toggled()) {
        this.buttons[name]._triggerClick();
      }
    }
  },
  toggleButton: function toggleButton(name, status) {
    var disableOthers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    // does not fire the events/functionality of the button
    // this just changes the state and is used if a functionality (like Draw)
    // is enabled manually via script
    // backwards compatibility with button rename
    if (name === 'editPolygon') {
      name = 'editMode';
    }

    if (name === 'deleteLayer') {
      name = 'removalMode';
    } // as some mode got enabled, we still have to trigger the click on the other buttons
    // to disable their mode


    if (disableOthers) {
      this.triggerClickOnToggledButtons(this.buttons[name]);
    } // now toggle the state of the button


    return this.buttons[name].toggle(status);
  },
  _defineButtons: function _defineButtons() {
    var _this = this;

    // some buttons are still in their respective classes, like L.PM.Draw.Polygon
    var drawMarkerButton = {
      className: 'control-icon leaflet-pm-icon-marker',
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.drawMarkerButton'),
      jsClass: 'Marker',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Marker.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel']
    };
    var drawPolyButton = {
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.drawPolyButton'),
      className: 'control-icon leaflet-pm-icon-polygon',
      jsClass: 'Polygon',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Polygon.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['finish', 'removeLastVertex', 'cancel']
    };
    var drawLineButton = {
      className: 'control-icon leaflet-pm-icon-polyline',
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.drawLineButton'),
      jsClass: 'Line',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Line.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['finish', 'removeLastVertex', 'cancel']
    };
    var drawCircleButton = {
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.drawCircleButton'),
      className: 'control-icon leaflet-pm-icon-circle',
      jsClass: 'Circle',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Circle.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel']
    };
    var drawCircleMarkerButton = {
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.drawCircleMarkerButton'),
      className: 'control-icon leaflet-pm-icon-circle-marker',
      jsClass: 'CircleMarker',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.CircleMarker.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel']
    };
    var drawRectButton = {
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.drawRectButton'),
      className: 'control-icon leaflet-pm-icon-rectangle',
      jsClass: 'Rectangle',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // toggle drawing mode
        _this.map.pm.Draw.Rectangle.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel']
    };
    var editButton = {
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.editButton'),
      className: 'control-icon leaflet-pm-icon-edit',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        _this.map.pm.toggleGlobalEditMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finishMode']
    };
    var dragButton = {
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.dragButton'),
      className: 'control-icon leaflet-pm-icon-drag',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        _this.map.pm.toggleGlobalDragMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finishMode']
    };
    var cutButton = {
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.cutButton'),
      className: 'control-icon leaflet-pm-icon-cut',
      jsClass: 'Cut',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        // enable polygon drawing mode without snap
        _this.map.pm.Draw.Cut.toggle({
          snappable: true,
          cursorMarker: true,
          allowSelfIntersection: false
        });
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finish', 'removeLastVertex', 'cancel']
    };
    var deleteButton = {
      title: Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getTranslation"])('buttonTitles.deleteButton'),
      className: 'control-icon leaflet-pm-icon-delete',
      onClick: function onClick() {},
      afterClick: function afterClick() {
        _this.map.pm.toggleGlobalRemovalMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finishMode']
    };

    this._addButton('drawMarker', new L.Control.PMButton(drawMarkerButton));

    this._addButton('drawPolyline', new L.Control.PMButton(drawLineButton));

    this._addButton('drawRectangle', new L.Control.PMButton(drawRectButton));

    this._addButton('drawPolygon', new L.Control.PMButton(drawPolyButton));

    this._addButton('drawCircle', new L.Control.PMButton(drawCircleButton));

    this._addButton('drawCircleMarker', new L.Control.PMButton(drawCircleMarkerButton));

    this._addButton('editMode', new L.Control.PMButton(editButton));

    this._addButton('dragMode', new L.Control.PMButton(dragButton));

    this._addButton('cutPolygon', new L.Control.PMButton(cutButton));

    this._addButton('removalMode', new L.Control.PMButton(deleteButton));
  },
  _showHideButtons: function _showHideButtons() {
    // remove all buttons, that's because the Toolbar can be added again with
    // different options so it's basically a reset and add again
    this.removeControls();
    var buttons = this.getButtons();

    for (var btn in buttons) {
      if (this.options[btn]) {
        // if options say the button should be visible, add it to the map
        buttons[btn].setPosition(this.options.position);
        buttons[btn].addTo(this.map);
      }
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (Toolbar);

/***/ }),

/***/ "./src/js/helpers/index.js":
/*!*********************************!*\
  !*** ./src/js/helpers/index.js ***!
  \*********************************/
/*! exports provided: getTranslation, isEmptyDeep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyDeep", function() { return isEmptyDeep; });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/has */ "./node_modules/lodash/has.js");
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_has__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_translations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/translations */ "./src/assets/translations/index.js");



function getTranslation(path) {
  var lang = L.PM.activeLang;

  if (!lodash_has__WEBPACK_IMPORTED_MODULE_1___default()(_assets_translations__WEBPACK_IMPORTED_MODULE_2__["default"], lang)) {
    lang = 'en';
  }

  return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(_assets_translations__WEBPACK_IMPORTED_MODULE_2__["default"][lang], path);
}
function isEmptyDeep(l) {
  // thanks for the function, Felix Heck
  var flatten = function flatten(list) {
    return list.filter(function (x) {
      return ![null, '', undefined].includes(x);
    }).reduce(function (a, b) {
      return a.concat(Array.isArray(b) ? flatten(b) : b);
    }, []);
  };

  return !flatten(l).length;
}

/***/ }),

/***/ "./src/js/polyfills.js":
/*!*****************************!*\
  !*** ./src/js/polyfills.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable */
// Array.findIndex Polyfill
Array.prototype.findIndex = Array.prototype.findIndex || function (callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.findIndex called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  var list = Object(this); // Makes sures is always has an positive integer as length.

  var length = list.length >>> 0;
  var thisArg = arguments[1];

  for (var i = 0; i < length; i++) {
    if (callback.call(thisArg, list[i], i, list)) {
      return i;
    }
  }

  return -1;
}; // Array.find Polyfill for IE<12.
// Requested here: https://github.com/geoman-io/leaflet-geoman/issues/173


Array.prototype.find = Array.prototype.find || function (callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  var list = Object(this); // Makes sures is always has an positive integer as length.

  var length = list.length >>> 0;
  var thisArg = arguments[1];

  for (var i = 0; i < length; i++) {
    var element = list[i];

    if (callback.call(thisArg, element, i, list)) {
      return element;
    }
  }
}; // Polyfill for Object.assign()
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill


if (typeof Object.assign != 'function') {
  Object.assign = function (target) {
    'use strict';

    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];

      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }

    return target;
  };
} // Polyfill for Element.remove()
// https://developer.mozilla.org/de/docs/Web/API/ChildNode/remove#Polyfill


(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]); // Polyfill for Array.includes()
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill


if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function value(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      } // 1. Let O be ? ToObject(this value).


      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. If len is 0, return false.

      if (len === 0) {
        return false;
      } // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)


      var n = fromIndex | 0; // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.

      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
      } // 7. Repeat, while k < len


      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        } // c. Increase k by 1. 


        k++;
      } // 8. Return false


      return false;
    }
  });
}

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/js/L.PM.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/L.PM.js */"./src/js/L.PM.js");


/***/ })

/******/ });
//# sourceMappingURL=leaflet-geoman.js.map