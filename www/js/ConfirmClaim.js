var URL = 'https://dam-valley.000webhostapp.com/acceptClaimAPI.php';
var itemObj;

$(document).ready(function()
{
    $(document).ajaxError(function(e, xhr, opt){
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
        alert(errStatus);
        

   })

    item = window.localStorage.getItem("selectedItem");
    itemObj = JSON.parse(item); 
    getClaimerInfo(itemObj).then(success=>{console.log(success);setUpPage(success)},error=>{alert(JSON.stringify(error));});
    
    console.log("item: " + item);
    
    
    
})

function setUpPage(data)
{
    var username;   
    $("#phone").val(data.phone); 
    username = data.username;
    var offer = "User '" + username + "' has offered to help. Please fill form bellow to accept it";
    $("#offer").text(offer);
}

$("#reject").click(function()
{
    updateClaim(0).then(success=>{window.localStorage.removeItem("selectedItem");
                window.location = "MyAdds.html";},error=>alert(JSON.stringify(error)));
})

$("#confirm").click(function()
{
    if(validateFields())
    {
        updateClaim(1).then(success=>{window.localStorage.removeItem("selectedItem");
               },error=>alert(JSON.stringify(error)));
    }
})

function validateFields()
{   
    if($("#phone").val() == '' || $("#c_info").val() == '')
    {
        $('#errorLabel').text('Please fill in phone number and contact details');
        return false;
    }
    else{return true;}
}

function getClaimerInfo(obj)
{
    var user_ID = obj.user_ID;
    return new Promise(function(resolve,reject){
        $.ajax({
            url : URL,
            data : {'user_info' : user_ID},
            datatype : 'json',
            type : 'GET',
            cache : false,
            error : function(error){reject(error);},
            success : function(success){resolve(success.data);}
        })
    })
}

function updateClaim(int)
{
    var info = $('#c_info').val();
    var userID = window.localStorage.getItem('userID');
    var adID = itemObj.ad_ID;
    console.log(int + 'inf0: '+ info + ' user: ' + userID + ' ad: ' + adID);
    return new Promise(function(resolve,reject){
        $.ajax({
            url : URL,
            data : {'update_claim' : int, 'contact_info' : info, 'user_ID' : userID, 'ad_ID' : adID},
            datatype : 'json',
            type : 'POST',
            cache : false,
            error : function(error){console.log('error ' +JSON.stringify(error));reject(error);},
            success : function(success){console.log('success ' + JSON.stringify(success));resolve(success.response);}

        })
    })
}


        