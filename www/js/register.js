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

function validateFields()
{
    var firstnameErr;
    var canRegister = true;

    // Validate FirstName
    if (isEmpty($("#firstName")) == true) 
    {
        firstnameErr = "Enter first name";
        canRegister = false;
    }
    else 
    {
        firstnameErr = "";
    }
    $("#firstNameValidation").text(firstnameErr);

    // Validate LastName
    if (isEmpty($("#lastName")) == true) 
    {
        firstnameErr = "Enter last name";
        canRegister = false;
    }
    else 
    {
        firstnameErr = "";
    }
    $("#lastNameValidation").text(firstnameErr);

    // Validate email
    if (isEmailCorrect($("#email")) == false) 
    {
        firstnameErr = "Email is not valid";
        canRegister = false;
    }
    else 
    {
        firstnameErr = "";
    }
    $("#emailValidation").text(firstnameErr);

    // Validate username
    if (isEmpty($("#username")) == true) 
    {
        firstnameErr = "Enter username";
        canRegister = false;
    }
    else 
    {
        firstnameErr = "";
    }
    $("#usernameValidation").text(firstnameErr);

    // Validate password
    if (isEmpty($("#password")) == true) 
    {
        firstnameErr = "Enter password";
        canRegister = false;
    }
    else if($('#password').val().length <8 || $('#password').val().length > 20 )
    {
        firstnameErr = 'Password must be between 8 and 20 characters';
        $('#password').css({"border-color": "red"});
        canRegister = false;
    }
    else 
    {
        firstnameErr = "";
        $('#password').css({"border-color": "#DCDCDC"});
    }
    $("#passwordValidation").text(firstnameErr);

    // Validate Vpassword
    if (isEmpty($("#vpassword")) == true) 
    {
        firstnameErr = "Enter password";
        canRegister = false;
    }
    else if (!match($("#password"), $("#vpassword")))
    {
        firstnameErr = "Passwords don't match";
        canRegister = false;
    }
    else
    {
        firstnameErr = "";
    }
    $("#vpasswordValidation").text(firstnameErr);

    return canRegister;

}

function isEmpty (param) 
{
    var isEmpty = false;
    if ($.trim(param.val()) == "") 
    {
        $(param).css({"border-color": "red"});
        //param.val("");
        isEmpty = true;
    }
    else 
    {
        $(param).css({"border-color": "#DCDCDC"});
    }
    console.log("IsEmpty (param - " + param.val() + "): " + isEmpty + ";");
    return isEmpty;
}

function isEmailCorrect (param) 
{
    var email = (param).val().split("@");
    console.log(param.val());
    if (email[0].trim() != "" && email[1] == "study.beds.ac.uk") 
    {
        $(param).css({"border-color": "#DCDCDC"});
        return true;
    } 
    else 
    {
        $(param).css({"border-color": "red"});

        return false;
    }
}

function isFieldUnique (column,txtfield)
{

    var value = txtfield.val();
    return new Promise(function(resolve,reject){
        $.ajax({
        url : 'https://dam-valley.000webhostapp.com/registerAPI.php',
        data : {'check_field': column, 'value' : value.replace("'","''")},
        dataType : 'json',
        cache : false,
        type : 'GET',
        beforeSend : function(){$('#spinner').show();},
        error : function(error){reject(error);},
        success : function(result)
        {
            //console.log('result: '+ JSON.stringify(result));
            resolve(result.data === 'valid');
            $('#spinner').hide();

        }
    })  
    })             
}

$('#registerbtn').click(function(e){
    e.preventDefault();
    Promise.all([validateFields(),isFieldUnique('username',$('#username')),isFieldUnique('email',$('#email'))])
    .then(values => addNewUser(values),error=>console.log(error)).then(success=> console.log(success),error => console.log(error));
})

function addNewUser(arr)
{
    return new Promise(function(resolve,reject){
        console.log('adding user');
        if(arr.every(x => x))
        {
            $('#spinner_txt').text('Creating your account...');
            const userData = [$('#firstName').val(),$('#lastName').val(),$('#email').val(),
                $('#username').val(),$('#password').val(),$('#phone').val(),$('#address').val()];
            userData.forEach(element => element.replace("'","''"));

            $.ajax({
                url : 'https://dam-valley.000webhostapp.com/registerAPI.php',
                data : {
                    insert_user:1, 
                    fname : userData[0],
                    lname : userData[1],
                    email : userData[2],
                    username : userData[3],
                    password : userData[4],
                    phone : userData[5],
                    address : userData[6] },
                dataType : 'json',
                cache : false,
                type : 'POST',
                error : function(error){console.log(error);reject(error); $('#spinner').hide();},
                success : function(result)
                {
                    resolve(result.response);
                    $('#spinner').hide();
                    alert('user added');
                }
            })
        }
        else {reject('help');}
    })
}

function match (p1, p2)
{
        if (p1.val() == p2.val())
        {
            $(p1).css({"border-color": "#DCDCDC"});
            $(p2).css({"border-color": "#DCDCDC"});
            return true;
        }
        else 
        {
            $(p1).css({"border-color": "red"});
            $(p2).css({"border-color": "red"});
            return false;
        }
   
    return false;
}