var item;

$(document).ready(function()
{
    item = window.localStorage.getItem("add");
    var itemObj = JSON.parse(item);
    console.log("item: " + item);
    var tit_price = itemObj.title + " (£ " + itemObj.price + ")";
    $("#title").text(tit_price);
    $("#description").text(itemObj.description);
    $("#dueDate").text("Due to " + itemObj.deadline);
    
    $("#location").text(itemObj.location);
   
})

function goBack() {
    window.history.back();
}

$("#claim").click(function()
{
    
    window.location = "main.html";
})
