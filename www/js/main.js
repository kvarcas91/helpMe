var items;

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
function goBack() {
    window.history.back();
}

$(document).ready(function()
{
    getData();
    initializeUI();
    initializeSelection();
    console.log("userID: " + localStorage.getItem("userID"));
})

function getData () 
{
    var allAdds = new Object();
    
    var first = new Object();
    first.ID = 1;
    first.Location = "Luton";
    first.Title = "some lovely title";
    first.Description = "nice and long description";
    first.DueDate = "2020-01-25";
  
    var second = new Object();
    second.ID = 2;
    second.Location = "London";
    second.Title = "some lovely title";
    second.Description = "nice and long description";
    second.DueDate = "2020-01-23";
  
    var third = new Object();
    third.ID = 3;
    third.Location = "Manchester";
    third.Title = "some lovely title claimed";
    third.Description = "nice and long description";
    third.DueDate = "2020-01-23";
  
    allAdds = [first, second];
    var myString = JSON.stringify(allAdds);
    items = jQuery.parseJSON(myString);
}

function initializeUI ()
{

    $('#addListItems').empty();
    $.each(items, function(key,value) {
       
        $('#addListItems').append(
            '<div data-id="'+value.ID+'">' +
            '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
                '<div class="d-flex w-100 justify-content-between">' +
                  '<h5 class="mb-1 title">'+value.Title+ '</h5>' +
                  '<small>'+ value.DueDate +'</small>' +
                '</div>' +
                '<p class="mb-1">'+ value.Description +'</p>' +
                '<small>'+ value.Location +'</small>' +
              '</a></div>'
            );
      }); 
}

function initializeSelection() 
{
  $("#addListItems div").click(function(e) {

    $(".list-group .list-group-item").removeClass("active");
    $(e.target).addClass("active");

    //console.log($(this).attr('data-id'));
    //console.log($(this).attr('data-title'));
    //console.log($(this).attr('data-location'));
     var selectedItem = (getDataById($(this).attr('data-id'), items));
    console.log(selectedItem);
    if (selectedItem != null) {
      //console.log(selectedItem);
    //window.localStorage.setItem("add",selectedItem);
      localStorage.setItem("add", JSON.stringify(selectedItem));
      //console.log("are this one??? " + localStorage.getItem("add"));
      window.location = "adds.html";
    }
      //var element = $('.mb-1 title');
      //console.log("date "+element.text());
     
  });
}

function getDataById(id, dataModel)
{
  console.log('ID as param: ' + id);
  var __found = jQuery.grep(dataModel, function(n, i) {return id == n.ID;})
  console.log(__found);

  return __found[0];
}


