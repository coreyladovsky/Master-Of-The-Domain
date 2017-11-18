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

DOMNodeCollection.prototype.show = function(id) {
  this.htmlElements.forEach((el) => {
    document.getElementById(id).style.display = "block";
  });
};

DOMNodeCollection.prototype.hide = function(id) {
  this.htmlElements.forEach((el) => {
    document.getElementById(el).style.display = "none";
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
