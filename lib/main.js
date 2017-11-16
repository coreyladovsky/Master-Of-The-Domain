const DOMNodeCollection = require("./dom_node_collection.js");

var funcs = [];
document.addEventListener("DOMContentLoaded", () => {

  funcs.forEach( (fun)=>{
    fun();
  });

});


window.$l = function(selector) {
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

$l.extend = (...objs) => {
  const newObj = {};
  objs.forEach((obj) => {
    Object.entries(obj).forEach((el)=>{
      newObj[el[0]] = el[1];
    });
  });
  return newObj;
};

$l.ajax = (options) => {
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

// export default $l;
