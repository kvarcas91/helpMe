function validate() 
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
    //alert(hand.title + " " + hand.description);
}