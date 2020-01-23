﻿var items;

// Navigation drawer
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
    getData().then(success => {console.log("success: " + success);items = success; initializeUI(); initializeSelection();}, error => alert(JSON.stringify(error)));
    console.log("userID: " + localStorage.getItem("userID"));

    $("#bell").click(function() 
{
  $('.notification-menu').toggle(); 
})
})

function getData () 
{
    return new Promise(function(resolve,reject){
      $.ajax({
        url : 'https://dam-valley.000webhostapp.com/mainAPI.php',
        data : {'all_ads' : 1},
        datatype : 'json',
        type : 'GET',
        cache : false,
        //beforeSend : function(){$('#spinner').show()},
        error : function(error){reject(error);},
        success : function(result){resolve(result.data);}
      })
      //console.log('we are here');
      $('#spinner').hide();
    })
}

function initializeUI ()
{

    $('#addListItems').empty();
    console.log(items);
    if(!(items == 'no ads available'))
    {
      $.each(items, function(key,value) {
        console.log("value: " + value);

          var tit_price = value.title + " (£ " + value.price + ")";
          var descr = value.description;
          if (descr.length > 50)
          {
            descr = descr.substring(0, 47) + "...";
          }

          $('#addListItems').append(
              '<div data-id="'+value.ad_ID+'">' +
              '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
                  '<div class="d-flex w-100 justify-content-between">' +
                    '<h5 class="mb-1 title">'+tit_price+ '</h5>' +
                    '<small>'+ value.deadline +'</small>' +
                  '</div>' +
                  '<p class="mb-1">'+ descr +'</p>' +
                  '<small>'+ value.location +'</small>' +
                '</a></div>'
              );
        }); 
    }    
  }


function initializeSelection() 
{
  $("#addListItems div").click(function(e) {

    $(".list-group .list-group-item").removeClass("active");
    $(e.target).addClass("active");

     var selectedItem = (getDataById($(this).attr('data-id'), items));
    console.log("selected item: " + selectedItem);
    if (selectedItem != null) {
     
      localStorage.setItem("add", JSON.stringify(selectedItem));
      window.location = "adds.html";
    }
     
  });
}

function getDataById(id, dataModel)
{
 
  var __found = jQuery.grep(dataModel, function(n, i) 
  {
  
    return id == n.ad_ID;
  })
  console.log("found: " + __found);

  return __found[0];
}




