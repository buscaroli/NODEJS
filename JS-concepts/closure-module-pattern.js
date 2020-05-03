function User() {
    let name, password;

    function doLogin(nm, pw) {  // nm and pw are in doLogin's scope.
        name = nm;              // Now doLogin has a closure over name and password
        password = pw;          // which means it will be able to remember and use them.
    }

    let publicAPI = {           // I am exposing the methods I want to be able to access
        login: doLogin,         // from the instantiated object (in this case matt).
        greet: doGreet
    }

    function doGreet() {
        console.log("Good Day " + name + "!"); 
    }

    return publicAPI;           // With this I make the methods available to the outside 
}                               // scope, while keeping the variables unaccessible.

let matt = User();
matt.login('matteo', '123456');
console.log(matt);              // Object
console.log(matt.name);         // undefined
matt.greet();                   // Good Day matteo!