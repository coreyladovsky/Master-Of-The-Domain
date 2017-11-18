# Master Of The Domain

Master Of The Domain is a JavaScript DOM manipulator inspired by the wonderful jQuery.You can see it in action ![here]("http://www.coreyladovsky.com/Master-Of-The-Domain/")

With the aid of Master Of The Domain users are able to:
 * Select single and multiple DOM elements.
 * Manipulate DOM elements
 * Clear node content
 * Add and remove classes
 * Traverse DOM elements.
 * And MORE!

 ## How to start?
  Starting to use Master Of The Domain is as easy as downloading it and including "./lib/master_of_the_domain.js" in your HTML file.

 ### $l(selector)
 This is used as a global variable wrapper for all methods in Master Of The Domain.
 The most common functionality is to pass it a single string argument. It will then return a DOMNodeCollection object (array of HTMLElements) that includes all instances of that CSS selector.
 If the argument passed in is an HTML element, the $l selector will return an instance of the DOMNodeCollection.
 If given a function it will add it to a queue to be invoked upon complete loading of the document.

### html

Can optionally receive a string as an argument. If a string is passed it will become innerHTML,
otherwise it will return the innerHTML of the first node in the array.

### empty

This method clears out the conent of all nodes in the internal array.

### append

This method accepts a Master Of The Domain wrapped collection, and HTML element or a string.
I will append the outerHTML of each element in the argument to the innerHTML of elemnt in the DOMNodeCollection.

### attr
If given a key and value pair, it will set the value of the selected node to that key.
If only a key is given, it will return the value at that selected node.

### addClass
Takes in a class and adds it to the HTML elements.

### removeClass
Will remove a specified class from a selected HTML element.


## Traversal

### children
Will return a DOMNodeCollection of all children of all nodes in an array.

### parent
Returns a DOMNodeCollection of the parents of each of the nodes.

### find
Returns a DOMNodeCollection of all the nodes matching the selector that are
descendants of the nodes.

### remove
Removes the html of all the nodes in the array from the DOM as well as all the
nodes from the array.

## Event Handling

### on
Adds an event handler to a selected node.

### off
Removes an even handler from a select node.

## AJAX

### $l.extend
Is a merge like function that is non mutating. Used to combine multiple objects.

### $l.ajax
Will return a JSON response after an ajax request has been submitted.
Uses a XMLHttpRequest to make the actual request.

























/
