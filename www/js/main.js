function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
function goBack() {
    window.history.back();
}
var myitems = [{ name: 'a', lname: 'b' }, { name: 'c', lname: 'd' }]
function populate() {
    alert('function works');
    for (var i = 0; i < myitems.length; i++) {
        $("#items").append('<div class = "items"> <h2>' + myitems[i].name + '</h2><p>' + myitems[i].lname + '</p>');
    }

}

