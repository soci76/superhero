// Beolvassuk a szükséges csomagokat
var express = require('express');
var fs = require('fs');
var itf = require('./my_modules/itf_module');

var str = 'ItFactory Meatup....';
itf.tu( str, function(err, newStr) {
    if (err) {
        console.error(err);
    } else {
        console.log('New string is', newStr);
    }
} );
// Globális változók.
var port = 3333;
var staticDir = 'build';

//Létrehoznuk egy express szerver pédányt
var app = express();

// Statikus fájlok
app.use(express.static(staticDir));

// Definiáljuk a szerver működését
app.get('/', function (req, res) {
    //res.send('Hello World');
    fs.readFile('./'+staticDir+'build/index.html', 'utf8', function(err, data)  {
        res.send(data);
    });
});

// Felhasználó modell
function handleUsers(req, res) {
    fs.readFile('./users.json', 'utf8', function(err, data)  {
        if (err) throw err;
        //var path = req.url.split( '/');
        var users = JSON.parse( data );
        var _user ={};
        // Ha nem kaptunk id-t
        if ( !req.params.id) {
            _users = users;
        } else {
            console.log("Jo hely");
            for (var k in users)  {
                //if ( path [2] == users[k].id) {
                    if ( req.params.id == users[k].id) {
                    _users = users[k];
                }
            }
        }

        //console.log(data);
        res.send( JSON.stringify(_users) );
      });
}

// Felhasználók beolvasása
app.get('/users/:id*?',  function (req, res) {
    //res.send('Hello World');
    handleUsers(req, res);
  });
  


// Megadjuk, hogy a szerver melyik portot figyelje
app.listen(port);
console.log("Server runining in localhost: "+port);