var item;

$(document).ready(function()
{
    item = window.localStorage.getItem("add");
    var itemObj = JSON.parse(item);
    console.log(itemObj.Title);
    $("#title").text(itemObj.Title);
    $("#description").text(itemObj.Description);
    $("#dueDate").text("Due to " + itemObj.DueDate);
    $("#location").text(itemObj.Location);
   
})

function goBack() {
    window.history.back();
}

$("#claim").click(function()
{
    
    window.plugins.CallNumber.callNumber(onSuccess, onError, 'tel:07956339711', false);
    //window.location = "main.html";
})

function onSuccess(result){

    console.log(result);
    
    }
    
    function onError(result) {
    
    console.log(result);
    
    }
