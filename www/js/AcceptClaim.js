$(document).ready(function()
{
    item = window.localStorage.getItem("selectedItem");
    var itemObj = JSON.parse(item);
    var mPhoneNumber = "07958521464";
    console.log("item: " + item);
    
    var offer = "user '" + "lovely user name" + "' has accepted your claim";
    $("#offer").text(offer);
    $("#phone").val(mPhoneNumber);
})
