//Code to be added to js file for login page

$(document).ready(function() 
{
  $(document).ajaxError(function(e, xhr, opt){
        var errStatus;
        switch (xhr.status) {
            case 0:
                errStatus = "###### Not connect. Verify Network. #####";
                break;
            case 404:
                errStatus = "###### Requested page not found. [404] #####";
                break;
            case 500:
                errStatus = "###### Internal Server Error [500] #####";
                break;
            default:
                errStatus=  "###### Unknown Error!! #####"
        }

        console.log("Error requesting:  "
            + opt.url + "\n Status: "
            + errStatus + "\n Status Text: "
            + xhr.statusText+ "\n Element id: "
            +e.currentTarget.activeElement['id']);

   })
});

//Method for onclick event (no code or reference needed in HTML)

$("#loginBtn").click(function(e){

    var email = $('#emailField').val();
    var password = $('#passwordField').val();
    e.preventDefault();
    $.ajax({
        url : 'https://dam-valley.000webhostapp.com/logInAPI.php',
        data : {'email':email, 'password' : password},
        dataType : 'json',
        cache : false,
        type : 'GET',
        success : function(result){
            switch (result.data)
            {
                case ('login_verified'):
                    // param (key, value)
                    localStorage.setItem("userID", "");
                    alert("userID: " + "");
                    window.location = 'main.html';
                    break;
                default:
                    $('#errorLbl').text('Incorrect email or password');
                    alert(JSON.stringify(result));
            }}
    });
});