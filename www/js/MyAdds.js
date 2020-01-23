var data;
var claimedData;


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function goBack() {
  window.history.back();
}

function getDataById(id, dataModel)
{
  console.log('ID as param: ' + id);
  var __found = jQuery.grep(dataModel, function(n, i) {return id == n.ad_ID;})
  console.log(__found);

  return __found[0];
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

    getData().then(success=> {console.log(success); data = success[0]; 
                                    claimedData = success[1];
                                    initializeMyAdds();
                                    initializeSelection();},
      error=> alert(JSON.stringify(error)));
})


function initializeMyAdds () 
{
  $('#myAddList').empty();

  console.log(data + claimedData);
  if(!(data=='empty'))
  {
     $.each(data, function(key,value) {
       
      var status = "Status: " + value.status;

        $('#myAddList').append(
            '<div data-id="'+value.ad_ID+'">' +
            '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
                '<div class="d-flex w-100 justify-content-between">' +
                  '<h5 class="mb-1 title">'+value.title+ '</h5>' +
                  '<small>'+ value.deadline +'</small>' +
                '</div>' +
                '<p class="mb-1">'+ value.description +'</p>' +
                '<small>'+ value.location +'</small>' +
                '<p>'+ status +'</p>' +  
              '</a>' +
              
              '</div>'
            );
      }); 
  }

  $('#myClaimList').empty();

  if(!(claimedData=='empty'))
  {  //console.log(myString);
    $.each(claimedData, function(key,value) {
       
        $('#myClaimList').append(
            '<div data-id="'+value.ad_ID+'">' +
            '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
                '<div class="d-flex w-100 justify-content-between">' +
                  '<h5 class="mb-1 title">'+value.title+ '</h5>' +
                  '<small>'+ value.deadline +'</small>' +
                '</div>' +
                '<p class="mb-1">'+ value.description +'</p>' +
                '<small>'+ value.location +'</small>' +
              '</a></div>'
            );
      }); 
  }
}

function initializeSelection() 
{
  $("#myAddList div").click(function(e) {

    $(".list-group .list-group-item").removeClass("active");
    $(e.target).addClass("active");

     var selectedItem = (getDataById($(this).attr('data-id'), data));
     if (selectedItem.status != "claimed") alert("No one has been offered a help");
     else{
      window.localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
      window.location = "ConfirmClaim.html";
     }
  });

  $("#myClaimList div").click(function(e) {

    $(".list-group .list-group-item").removeClass("active");
    $(e.target).addClass("active");

    //console.log($(this).attr('data-id'));
    //console.log($(this).attr('data-title'));
    //console.log($(this).attr('data-location'));
     var selectedItem = (getDataById($(this).attr('data-id'), claimedData));
    
      //var element = $('.mb-1 title');
      //console.log("date "+element.text());
     
  });
}

function getData () 
{
    console.log('getting data');
    var userID = window.localStorage.getItem('userID');
    console.log(userID);
    return new Promise(function(resolve,reject){
      $.ajax({
        url : 'https://dam-valley.000webhostapp.com/MyAddsClaimsAPI.php',
        data : {'view_ads' : 1,'userID' : userID},
        datatype : 'json',
        type : 'GET',
        cache : false,
        error : function(error){console.log('error ' + error);reject(error);},
        success : function(result){console.log('result ' + result.data[1]);resolve(result.data);}
      })
      //console.log('we are here');
      $('#spinner').hide();
      $('#spinner2').hide();
    })
}
