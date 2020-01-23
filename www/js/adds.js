var item;
var itemObj;
var errStatus;

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

    item = window.localStorage.getItem("add");
    itemObj = JSON.parse(item);
    console.log("item: " + item);
    var tit_price = itemObj.title + " (£ " + itemObj.price + ")";
    $("#title").text(tit_price);
    $("#description").text(itemObj.description);
    $("#dueDate").text("Due on " + itemObj.deadline);
    
    $("#location").text(itemObj.location);
   
})

function goBack() {
    window.history.back();
}

$("#claim").click(function()
{
    claimAd().then(success=>{
        alert("Your offer for help has been saved! Check under My Adds->My Claims to see if the poster accepted your help");
        window.location = "main.html";},
                    error=>{alert(errStatus);$('#claim').prop('disabled', 'disabled');});
    
})

function claimAd()
{
    var ad_ID = itemObj.ad_ID;
    var user_ID = window.localStorage.getItem('userID');
    console.log('ad_ID: ' + ad_ID + ' user_ID: ' + user_ID);
    return new Promise(function(resolve,reject){
      $.ajax({
        url : 'https://dam-valley.000webhostapp.com/claimAdAPI.php',
        data : {'ad_ID' : ad_ID,'user_ID' : user_ID},
        datatype : 'json',
        type : 'POST',
        cache : false,
        beforeSend : function(){$('#spinner').show();},
        error : function(error){reject(error);},
        success : function(result){console.log('result ' + result.response);resolve(result.response);}
      })
      //console.log('we are here');
      $('#spinner').hide();
      
    })
}