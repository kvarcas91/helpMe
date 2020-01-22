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
  $('#dueDate').datepicker(
            {
                dateFormat: 'yy-mm-dd'
            }).datepicker('setDate', new Date());
            $('#price').val("0");

});




$("#addHand").click(function()
{
     var form =$("#form").serialize();
     var canProceed = false;

     canProceed = (!IsEmpty($("#title")) && !IsEmpty($("#location")) && IsCorrectPrice($("#price")));

    console.log(($("#dueDate")).val());

     if (canProceed) 
     {
        if($('#price').val() == '') {$('#price').val(0);}
        var hand = {
            
            user_ID : window.localStorage.getItem('userID'), //comment thisline out and uncomment the next one to run on browser
            //user_ID : 5
            cat_ID : $('#category').val(),
            title : $("#title").val().replace("'","''"),
            description : $("#description").val().replace("'","''"),
            price : $("#price").val(),
            deadline : $("#dueDate").val(),
            location : $("#location").val().replace("'","''")
        };
        addHand(hand)
            .then(success => {alert('New ad was created!'); window.location = 'MyAdds.html';},
                error => {alert(error); $('#spinner').hide();});
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

function addHand (hand) {
   
    return new Promise(function(resolve,reject){
        $.ajax({
            url : 'https://dam-valley.000webhostapp.com/addAdAPI.php',
            data : hand,
            datatype : 'json',
            type : 'POST',
            cache : false,
            beforeSend: function(){$('#spinner').show();},
            error: function(error){reject(error.responseText);console.log('error ' +error.responseText);},
            success: function(success){resolve(success.response);console.log('sucess ' +success.response);} 
        })
    })
}