// Userek lekérése
jQuery.getJSON( 'users', function( users ) {
    console.log('users', users);
});

//Check user
function checkUser() {
    //User role check
    if (user.role > 4) {
        return true;
    } else {
        return false;
    }  
}
