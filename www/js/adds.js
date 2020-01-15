var item;

$(document).ready(function()
{
    item = window.localStorage.getItem("add");
    console.log("item:" + item + ";");
   
})

function goBack() {
    window.history.back();
}