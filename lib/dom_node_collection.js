class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
    this.callback = function (){};
  }
}

DOMNodeCollection.prototype.html = function (string) {
  debugger
  if(string){
    this.htmlElements.forEach((el)=>{
      el.innerHTML = string;
    });
  }else{
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
  } else if (Array.isArray(content)) {
    content.forEach((cnt)=>{
      this.htmlElements.forEach( (el) => {
        el.innerHTML += cnt.outerHTML;
      });
    });
  }
};

DOMNodeCollection.prototype.attr = function () {
  this.htmlElements[0].getAttribute();
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
    parent.push(el.parentNode);
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
  });
};

DOMNodeCollection.prototype.off = function(action, callback) {
  this.htmlElements.forEach( (el) => {
    el.removeEventListener(action, this.callback);
  });
};

function create(el) {
  return document.createElement(el);
}

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
