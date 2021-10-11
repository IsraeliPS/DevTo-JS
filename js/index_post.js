var data = localStorage.getItem("post");
localStorage.clear(); //clean the localstorage
var value = JSON.parse(data);
console.log(data);
console.log(value);
