var data;

$("#add").click(function()
{
     $('#myAddList').empty();

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

    allAdds = [first, second];
    var myString = JSON.stringify(allAdds);
    data = jQuery.parseJSON(myString);
   
    //console.log(myString);
    $.each(data, function(key,value) {
       
        $('#myAddList').append(
            '<div data-id="'+value.ID+'" data-title="'+value.Title+'" data-location="'+value.Location+'">' +
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
      makeSelection();
     //$('#myAddList').append(' <button type="button" class="list-group-item list-group-item-action">Test stuff</button>')
    
    
})

function getDataById(id)
{
  console.log('ID as param: ' + id);
  var __found = jQuery.grep(data, function(n, i) {return id == n.ID;})
  console.log(__found);

  return __found[0];
}

$(document).ready(function()
{
    makeSelection();
})

function makeSelection() 
{
    $(".list-group div").click(function(e) {

      $(".list-group .list-group-item").removeClass("active");
      $(e.target).addClass("active");

      //console.log($(this).attr('data-id'));
      //console.log($(this).attr('data-title'));
      //console.log($(this).attr('data-location'));
       var selectedItem = (getDataById($(this).attr('data-id')));
      
        //var element = $('.mb-1 title');
        //console.log("date "+element.text());
       
});
}
