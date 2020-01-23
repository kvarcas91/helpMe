$(document).ready(function()
{
    item = window.localStorage.getItem("selectedItem");
    var itemObj = JSON.parse(item);
    var mPhoneNumber = "07958521464";
    console.log("item: " + item);
    
    var offer = "user '" + "lovely user name" + "' has been offered a help. Please fill form bellow to accept it";
    $("#offer").text(offer);
    $("#phone").val(mPhoneNumber);
})

$("#reject").click(function()
{
    window.localStorage.removeItem("selectedItem");
    window.location = "MyAdds.html";
})

$("#confirm").click(function()
{
    window.localStorage.removeItem("selectedItem");
    window.location = "MyAdds.html";
})