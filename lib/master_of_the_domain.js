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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

var funcs = [];
document.addEventListener("DOMContentLoaded", () => {

  funcs.forEach( (fun)=>{
    fun();
  });

});


window.$l = (selector) => {
  let nodeArray = [];
  if(selector instanceof HTMLElement) {
    nodeArray.push(selector);
  } else if(typeof selector === "string"){
      if(selector[0] === "<" && selector[selector.length - 1] === ">") {
        let element = document.createElement(selector.slice(1, selector.length - 1));
        nodeArray.push(element);
      } else {
        const elementList = document.querySelectorAll(selector);
        nodeArray = Array.from(elementList);
      }
  } else if (typeof selector === "function") {
    if (document.readyState === "loading") {
      funcs.push(selector);
    } else if(document.readyState === "interactive" || document.readyState === "complete"){
      selector();
    }
  }
  return new DOMNodeCollection(nodeArray);
};

window.$l.extend = (...objs) => {
  const newObj = {};
  objs.forEach((obj) => {
    Object.entries(obj).forEach((el)=>{
      newObj[el[0]] = el[1];
    });
  });
  return newObj;
};

window.$l.ajax = (options) => {
  const defaults = {
    method: 'GET',
    url: document.URL,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: "",
    dataType: "json",
    success() {},
    error() {},
  };


  let optionalData = window.$l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(optionalData.method, optionalData.url);
  xhr.onload = function () {
    if(xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error(xhr.response);
    }
  };

  xhr.send(optionalData);

};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
    this.callback = function (){};
  }
}

DOMNodeCollection.prototype.each = function(content) {
  this.htmlElements.forEach(content);
};

DOMNodeCollection.prototype.html = function (content) {
  if(typeof content === "string"){
    this.htmlElements.forEach((el)=>{
      el.innerHTML = content;
    });
  }else if(this.htmlElements.length > 0 ){
    return this.htmlElements[0].innerHTML;
  }
};

DOMNodeCollection.prototype.empty = function () {
  this.htmlElements.forEach((el)=>{
    el.innerHTML = "";
  });
};

DOMNodeCollection.prototype.append = function(content){
  if(typeof content === "string"){
    this.htmlElements.forEach( (el) => {
      el.innerHTML += content;
    });
  } else if (content instanceof HTMLElement ) {
    this.htmlElements.forEach( (el) => {
      el.innerHTML += content.outerHTML;
    });
  } else if (content.constructor.name === "DOMNodeCollection") {
    this.htmlElements.forEach(el => {
      content.htmlElements.forEach(el2 => {
        el.innerHTML += el2.outerHTML;
      });
    });
  }
  else if (Array.isArray(content)) {

    content.forEach((cnt)=>{
      this.htmlElements.forEach( (el) => {

        el.innerHTML += cnt;
      });
    });
  }
};

DOMNodeCollection.prototype.attr = function (key, val) {
  if(val !== undefined) {
    this.each(el => {
      el.setAttribute(key, val);
    });
  } else {
    return this.htmlElements[0].getAttribute(key);
  }
};

DOMNodeCollection.prototype.addClass = function (className) {
  this.htmlElements.forEach( (el) => {
    el.className += " " + className;
  });
};


DOMNodeCollection.prototype.removeClass = function (className) {
  this.htmlElements.forEach( (el) => {
    el.className = stringRemoval(el.className,className);
  });
};

DOMNodeCollection.prototype.children = function(){
  const children = [];
  this.htmlElements.forEach( (el) => {
    children.push(el.children);
  });
  return new DOMNodeCollection(children);
};

DOMNodeCollection.prototype.parent = function(){
  const parent = [];
  this.htmlElements.forEach( (el) => {
    if(parent.includes(el.parentNode)) {
      return;
    } else {
      parent.push(el.parentNode);
    }
  });
  return new DOMNodeCollection(parent);
};

DOMNodeCollection.prototype.find = function (selector) {
  const found = [];
  this.htmlElements.forEach( (el) => {
    found.push(el.querySelectorAll(selector));
  });
  return new DOMNodeCollection(found);
};

DOMNodeCollection.prototype.remove = function() {
  this.htmlElements.forEach( (el) => {
    el.outerHTML = "";
  });
  this.htmlElements = [];
};

DOMNodeCollection.prototype.on = function(action, callback) {
  this.callback = callback;
  this.htmlElements.forEach( (el) => {
    el.addEventListener(action, this.callback);
    el[action] = [callback];
  });
};

DOMNodeCollection.prototype.off = function(action) {
  this.htmlElements.forEach( (el) => {
    el[action].forEach(callback => {
      el.removeEventListener(action, callback);
    });
  });
};


function stringRemoval(str, word) {
  let result = [];
  str.split(" ").forEach( (el) => {
    if(el !== word){
      result.push(el);
    }
  });
  return result.join(" ");
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=master_of_the_domain.js.map