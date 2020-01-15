
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



$("#loginbtn").click(function()
    {
        //var form =$("#form").serialize();
        window.location = "addHand.html";
        //console.log(form);

        //$.post("http://localhost/app/index.php", form, function(response)
        //{
            //alert(response);
        //})
    })

$("#registerbtn").click(function()
{
    //var form =$("#form").serialize();
    window.location = "main.html";
    //console.log(form);

    //$.post("http://localhost/app/index.php", form, function(response)
    //{
        //alert(response);
    //})
})