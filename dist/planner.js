/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../build/common.js":
/*!**************************!*\
  !*** ../build/common.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getElementById: () => (/* binding */ getElementById)
/* harmony export */ });
function getElementById(id) {
    const element = document.getElementById(id);
    if (element === null || element === undefined) {
        throw new MediaError;
    }
    return element;
}
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "../build/light_mode_switcher.js":
/*!***************************************!*\
  !*** ../build/light_mode_switcher.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StyleSwitcher: () => (/* binding */ StyleSwitcher)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "../build/common.js");

class StyleModeState {
    constructor(buttonSymbolId, styleClassName) {
        this.buttonSymbol = (0,_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)(buttonSymbolId);
        this.styleClassName = styleClassName;
    }
    hideButtonSymbol() {
        this.buttonSymbol.classList.add(StyleModeState.hiddenSymbolClass);
    }
    showButtonSymbol() {
        this.buttonSymbol.classList.remove(StyleModeState.hiddenSymbolClass);
    }
    applyClassToBody() {
        document.body.classList.add(this.styleClassName);
        console.log(`Style class set to ${this.styleClassName}`);
    }
    removeClassFromBody() {
        document.body.classList.remove(this.styleClassName);
    }
}
StyleModeState.hiddenSymbolClass = "nodisplay";
class StyleSwitcher {
    constructor() {
        this.styles = new Array;
        this.currentStyleIndex = 0;
        this.lastSwitchToken = 0;
        this.switchStyleButton = this.setupStyleButton();
        this.setDefaultStyles();
        this.setStyle(0);
    }
    setupStyleButton() {
        const button = (0,_common__WEBPACK_IMPORTED_MODULE_0__.getElementById)(StyleSwitcher.switchStyleButtonId);
        button.addEventListener('click', ev => this.setNextStyle());
        return button;
    }
    setDefaultStyles() {
        this.styles.push(new StyleModeState('dark_mode_button', 'dark_mode'));
        this.styles.push(new StyleModeState('light_mode_button', 'light_mode'));
    }
    setNextStyle() {
        this.setBodySwitchingStyleClass();
        this.removeStyle(this.currentStyleIndex);
        this.currentStyleIndex = this.getNextStyleIndex();
        this.setStyle(this.currentStyleIndex);
    }
    getNextStyleIndex() {
        return (this.currentStyleIndex + 1) % this.styles.length;
    }
    removeStyle(index) {
        const style = this.styles.at(index);
        style.removeClassFromBody();
    }
    setStyle(index) {
        const style = this.styles.at(index);
        style.applyClassToBody();
        style.hideButtonSymbol();
        const nextStyle = this.styles.at(this.getNextStyleIndex());
        nextStyle.showButtonSymbol();
    }
    setBodySwitchingStyleClass() {
        document.body.classList.add(StyleSwitcher.bodySwitchingStyle);
        const token = Math.random();
        this.lastSwitchToken = token;
        setTimeout(() => this.resetBodySwitchingStyleClass(token), 1000 * StyleSwitcher.bodySwitchingStyleTimeSec);
    }
    resetBodySwitchingStyleClass(token) {
        if (this.lastSwitchToken === token) {
            document.body.classList.remove(StyleSwitcher.bodySwitchingStyle);
        }
    }
}
StyleSwitcher.switchStyleButtonId = "switch_style_button";
StyleSwitcher.bodySwitchingStyle = "switching_style";
StyleSwitcher.bodySwitchingStyleTimeSec = 1;
//# sourceMappingURL=light_mode_switcher.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ../build/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _light_mode_switcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./light_mode_switcher */ "../build/light_mode_switcher.js");

function main() {
    console.log("%cPlanning Zen", "color:green, font-size:64px");
    var styleSwitcher = new _light_mode_switcher__WEBPACK_IMPORTED_MODULE_0__.StyleSwitcher;
}
window.addEventListener('load', main);
//# sourceMappingURL=main.js.map
})();

/******/ })()
;
//# sourceMappingURL=planner.js.map