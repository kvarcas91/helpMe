

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var timer = 0; //setting this up as global

$(document).ready( function () {

      /* Showing the overlay */
$('#overlay').addClass('open');
$('#site').addClass('closed');

setTimeout(function () 
{
  /* Hiding the overlay */
  load();
}, 2000);

});

function load ()
{
    $('#overlay').removeClass('open');
    setTimeout(function () 
{
  /* Hiding the overlay */
  $('#site').removeClass('closed');
}, 500);
}




