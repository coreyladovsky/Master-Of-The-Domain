const DOMNodeCollection = require("./dom_node_collection.js");

var funcs = [];
document.addEventListener("DOMContentLoaded", () => {

  // var para = document.createElement("p");
  // console.log(para);
  // console.log(window.$l(para));
  // const h1 = window.$l("h1");
  // let dnc = new DOMNodeCollection(window.$l("li"));
  // let button = new DOMNodeCollection(window.$l("button"));
  // button.on("click", ()=> console.log("Clicked"));
  // button.off("click");

  // dnc.remove();
  const options = {
    method: 'GET',
    url: "http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=bcb83c4b54aee8418983c2aff3073b3b",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: "",
    dataType: "html",
    success(data) {
      console.log(data);
    },
    error() {
      console.error("An error occurred.");
    }
  };
  window.$l.ajax(options);
  funcs.forEach( (fun)=>{
    fun();
  });

});


window.$l = (selector) => {
  //Nodelist
  let nodeArray = [];
  if(selector instanceof HTMLElement) {
    nodeArray.push(selector);
  } else if(typeof selector === "string"){
    const elementList = document.querySelectorAll(selector);
    nodeArray = Array.from(elementList);
  }else if (typeof selector === "function") {
    if (document.readyState === "loading") {
      funcs.push(selector);
    }else if(document.readyState === "interactive" || document.readyState === "complete"){
      selector();
    }
  }
  return nodeArray;
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
    success(data) {
      console.log(data);
    },
    error() {
      console.error("An error occurred.");
    }
  };
  optionalData = window.$l.extend(defaults, options);

  //step 1 - create xhr object
  const xhr = new XMLHttpRequest();

  // step 2 - specify path and verb
  xhr.open(optionalData.method, optionalData.url);
  // step 3 - register a callback
  xhr.onload = function () {
    console.log(xhr.status); // for status info
    console.log(xhr.responseType); //the type of data that was returned
    console.log(xhr.response); //the actual response. For json api calls, this will be a json string
  };

  // step 4 - send off the request with optional data
  xhr.send(optionalData);

};

//
//
// let name = document.getElementsByClassName("div-class");
