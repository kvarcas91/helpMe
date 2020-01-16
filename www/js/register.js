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

$("#registerbtn").click(function()
{
    var firstnameErr;

    // Validate FirstName
    if (isEmpty($("#firstName")) == true) 
    {
        firstnameErr = "Enter first name";
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
    }
    else if (isEmailUnique($("#email")) == false) 
    {
        firstnameErr = "Email already exists";
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
    }
    else if (isUsernameUnique($("#username")) == false)
    {
        firstnameErr = "Username already exists";
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
    }
    else 
    {
        firstnameErr = "";
    }
    $("#passwordValidation").text(firstnameErr);

    // Validate Vpassword
    if (isEmpty($("#vpassword")) == true) 
    {
        firstnameErr = "Enter password";
    }
    else 
    {
        firstnameErr = "";
    }
    $("#vpasswordValidation").text(firstnameErr);


    // Validate password match
    if (match($("#password"), $("#vpassword")) == false) 
    {
        firstnameErr = "Passwords doesn't match";
    }
    else 
    {
        firstnameErr = "";
    }
    $("#passwordValidation").text(firstnameErr);
    $("#vpasswordValidation").text(firstnameErr);

})

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

function isEmailUnique (param)
{
    return true;
}

function isUsernameUnique (param)
{
    return true;
}

function match (p1, p2)
{
    if (isEmpty(p1) == false && isEmpty(p2) == false)
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
    }
    return false;
}