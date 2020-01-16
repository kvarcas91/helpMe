var item;

$(document).ready(function()
{
    item = window.localStorage.getItem("add");
    console.log("item:" + item + ";");
   
})

function goBack() {
    window.history.back();
}
function initializeUI() {

    $('adddes').empty();
    {

        $('adddes').append(
            '<div data-id="' + value.ID + '">' +
            '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
            '<div class="d-flex w-100 justify-content-between">' +
            '<h5 class="mb-1 title">' + value.Title + '</h5>' +
            '<small>' + value.DueDate + '</small>' +
            '</div>' +
            '<p class="mb-1">' + value.Description + '</p>' +
            '<small>' + value.Location + '</small>' +
            '</a></div>'
        );
    });
}