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
	    getPosterInfo(itemObj.ad_ID).then(success=>{console.log(success);setUpPage(success)},error=>{alert(JSON.stringify(error));});
})

function setUpPage(data)
{
    var username;   
    $("#phone").val(data.phone); 
    username = data.username;
    var offer = "User '" + username + "' has accepted your help. Please fill form bellow to accept it";
    $("#offer").text(offer);
    $('#c_info').val(data.contact_info);
}

function getPosterInfo(ad_ID)
{
    return new Promise(function(resolve,reject){
        $.ajax({
            url : 'https://dam-valley.000webhostapp.com/MyAddsClaimsAPI.php',
            data : {'poster_details' : ad_ID},
            datatype : 'json',
            type : 'GET',
            cache : false,
            error : function(error){reject(error);},
            success : function(success){resolve(success.data);}
        })
    })
}


