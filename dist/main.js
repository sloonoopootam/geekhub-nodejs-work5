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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__);\n\nvar slider = document.getElementById('slider');\nvar sliderItems = document.getElementById('items');\nvar prev = document.getElementById('prev');\nvar next = document.getElementById('next');\n\nvar slide = function slide(wrapper, items, prev, next) {\n  var posX1 = 0;\n  var posX2 = 0;\n  var posInitial;\n  var posFinal;\n  var threshold = 100;\n  var slides = items.getElementsByClassName('slide');\n  var slidesLength = slides.length;\n  var slideSize = items.getElementsByClassName('slide')[0].offsetWidth;\n  var firstSlide = slides[0];\n  var lastSlide = slides[slidesLength - 1];\n  var cloneFirst = firstSlide.cloneNode(true);\n  var cloneLast = lastSlide.cloneNode(true);\n  var index = 0;\n  var allowShift = true;\n\n  var shiftSlide = function shiftSlide(dir, action) {\n    items.classList.add('shifting');\n\n    if (allowShift) {\n      if (!action) {\n        posInitial = items.offsetLeft;\n      }\n\n      if (dir === 1) {\n        items.style.left = posInitial - slideSize + \"px\";\n        index++;\n      } else if (dir === -1) {\n        items.style.left = posInitial + slideSize + \"px\";\n        index--;\n      }\n    }\n\n    allowShift = false;\n  };\n\n  var dragAction = function dragAction(e) {\n    if (e.type === 'touchmove') {\n      posX2 = posX1 - e.touches[0].clientX;\n      posX1 = e.touches[0].clientX;\n    } else {\n      posX2 = posX1 - e.clientX;\n      posX1 = e.clientX;\n    }\n\n    items.style.left = items.offsetLeft - posX2 + \"px\";\n  };\n\n  var dragEnd = function dragEnd(e) {\n    posFinal = items.offsetLeft;\n\n    if (posFinal - posInitial < -threshold) {\n      shiftSlide(1, 'drag');\n    } else if (posFinal - posInitial > threshold) {\n      shiftSlide(-1, 'drag');\n    } else {\n      items.style.left = posInitial + \"px\";\n    }\n\n    document.onmouseup = null;\n    document.onmousemove = null;\n  };\n\n  var dragStart = function dragStart(e) {\n    e.preventDefault();\n    posInitial = items.offsetLeft;\n\n    if (e.type === 'touchstart') {\n      posX1 = e.touches[0].clientX;\n    } else {\n      posX1 = e.clientX;\n      document.onmouseup = dragEnd;\n      document.onmousemove = dragAction;\n    }\n  };\n\n  var checkIndex = function checkIndex(_) {\n    items.classList.remove('shifting');\n\n    if (index === -1) {\n      items.style.left = -(slidesLength * slideSize) + \"px\";\n      index = slidesLength - 1;\n    }\n\n    if (index === slidesLength) {\n      items.style.left = -(1 * slideSize) + \"px\";\n      index = 0;\n    }\n\n    allowShift = true;\n  };\n\n  items.appendChild(cloneFirst);\n  items.insertBefore(cloneLast, firstSlide);\n  wrapper.classList.add('loaded');\n  items.onmousedown = dragStart;\n  items.addEventListener('touchstart', dragStart);\n  items.addEventListener('touchend', dragEnd);\n  items.addEventListener('touchmove', dragAction);\n  prev.addEventListener('click', function () {\n    shiftSlide(-1);\n  });\n  next.addEventListener('click', function () {\n    shiftSlide(1);\n  });\n  items.addEventListener('transitionend', checkIndex);\n};\n\nslide(slider, sliderItems, prev, next);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles.css?");

/***/ })

/******/ });