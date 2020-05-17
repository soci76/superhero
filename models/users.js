//Mongodb adatmodell
//Kezeli a megadott táblát. itf.
var db,
    Users;
function setConnection( mongodb ) {
    db = mongodb;
    setModel();
}
// Kollekció modell
function setModel() {
    Users = db.model( 'Users', {
        name: String,
        email: String,
        phone: String,
        address: String,
        role: Number,
        meta: {
            birthday: Date,
            hobby: String
        }
    }, 'Users' );

}

// Adatok olvasása a kollekcióból
function read( where, callBack ) {
    // Paraméter vizsgálata.
    if (!where) {
        where = {};
    }

    //Adatbázis olvasása
    Users.find( where, function( err, data) {
        if ( err ) {
            console.error( 'Error in query', where );
            data = [];
        }
        if (callBack) {
            callBack( data );
        }

    });
}

function create( document, callBack ) {

    var user = new Users( document );
    user.save( function( err)  {
        if ( err ) {
            console.error( "Save error: ", err);
            callBack( {} );
        } else {
            callBack( user );
        }
    });

}


// Publikus elemek.
module.exports = {
    setConnection: setConnection,
    read: read,
    create: create
};