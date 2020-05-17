// Beolvassuk a szükséges csomagokat
var express = require('express');
var fs = require('fs');
//var itf = require('./modules/itf_module');
var mongoose = require('mongoose');

//Kapcsolódás az adatbázishoz
mongoose.connect('mongodb://localhost/superhero');

//itf tábla modell
var Users = require('./models/users');
Users.setConnection( mongoose );
//Write data
/*Users.create( {
    name: 'John Doe',
    email: 'joh.doe@gmail.com',
    phone: +3614565666,
    address: '1122 Budapest, Kiss u. 10',
    role: 3,
    meta: {
        birthday: new Date('1997-07-04'),
        hobby: 'golf'
    } 
}, function( saved ) {
    console.info( "Saved method: ", saved  );
});*/
Users.read( {'role': 1}, function( users ) {
    console.info( "Users:", users );
} );
//Read data
/*Users.read( { 'name': 'Joe' }, function( data) {
    console.log( data );
} );*/

// Globális változók.
var port = 3333;
var staticDir = 'build';

//Létrehoznuk egy express szerver pédányt
var app = express();
app.set('view engine', 'pug')
app.set('views', './src/view')

// Statikus fájlok
app.use(express.static(staticDir));

//Express use használat
app.use( function ( req, res, next) {
    if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
        //console.log('Ajax kérés folyamatban');
        res.send( JSON.stringify ( {'hello': 'word'} ) );
    } else {
        next();
    }
    //console.log( 'request url:', req.headers);
    //next();
});

// Definiáljuk a szerver működését
app.get('/', function (req, res) {
    handleUsers( req, res, false, function( allUsers) {
    //res.send('Hello World');
    
    //Hagyományos módszer, már nem használt....
    /*fs.readFile('./'+staticDir+'build/index.html', 'utf8', function(err, data)  {
        res.send(data);
    });*/

    //View engine-es módszer
        res.render('index', { 
            title: 'ItFactory Web Superhero', 
            message: 'Yes, it is!' ,
            users: allUsers
        });
    });
});

// Felhasználó modell
function handleUsers(req, res, next, callBack) {
    fs.readFile('./users.json', 'utf8', function(err, data)  {
        if (err) throw err;
        //var path = req.url.split( '/');
        var users = JSON.parse( data );
        
        if ( callBack ) {
            callBack( users);
            return;
        }

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
app.get('/users/:id*?',  function (req, res, next) {
    //res.send('Hello World');
    handleUsers(req, res);
  });
  


// Megadjuk, hogy a szerver melyik portot figyelje
app.listen(port);
console.log("Server runining in localhost: "+port);