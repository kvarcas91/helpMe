$(document).ready(function() 
    {
        $('#dueDate').datepicker(
            {
                dateFormat: 'yy-mm-dd'
            }).datepicker('setDate', new Date());
    })


$("#addHand").click(function()
{
     var form =$("#form").serialize();
     var canProceed = false;

     canProceed = (!IsEmpty($("#title")) && !IsEmpty($("#location")) && IsCorrectPrice($("#price")));

    console.log(($("#dueDate")).val());

     if (canProceed) 
     {
        addHand(($("#category")).val(), ($("#title")).val(), ($("#price")).val(), ($("#location")).val(), ($("#dueDate")).val(), ($("#description")).val());
        window.location = "MyAdds.html";
    }
})


function IsEmpty (param) 
{
    var isEmpty = false;
    if ($.trim(param.val()) == "") 
    {
        $(param).css({"border-color": "red"});
        param.val("");
        isEmpty = true;
    }
    else 
    {
        $(param).css({"border-color": "#DCDCDC"});
    }
    console.log("IsEmpty (param - " + param.val() + "): " + isEmpty + ";");
    return isEmpty;
}

function IsCorrectPrice (param) 
{
    var isCorrect = true;
    if (isNaN(param.val())) 
        {
            $(param).css({"border-color": "red"});
            alert("Incorrect price format");
            isCorrect = false;
        }
        else 
        {
            $(param).css({"border-color": "#DCDCDC"})
        }
        console.log("isCorrect (param - " + param.val() + "): " + isCorrect + ";");
        return isCorrect;
}



function validateTemp() 
   {
   
    var title = document.getElementById("title").value;
    var price = document.getElementById("price").value;
    var location = document.getElementById("location").value;
    var dueDate = document.getElementById("deadline").value;
    
    if (title.trim() == '' || price.trim() == '' || location.trim() == '' || dueDate.trim() == '')
    {
        return;
    }
    
    if (isNaN(price)) 
    {
        document.getElementById("price").css("border-color", "red");
        return; 
    }
    else 
    {
        var sel = document.getElementById("category");
        var opt = sel.options[sel.selectedIndex].text;
    
        var description = document.getElementById("description").value;
        addHand(opt, title, price, location, dueDate, description);
        alert(opt + " " + title + " " + price + " " + location + " " + dueDate + " " + description);
    }
} 

function addHand (c, t, p, l, date, descr) {
    var hand = 
    {
        category : c,
        title : t,
        price : p,
        location : l,
        dueDate : date,
        description : descr
    };
    console.log(hand);
    //alert(hand.title);
}