// load function when window is ready
window.onload = function() {


    $('#fullpage').fullpage({
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        scrollOverflow: true,

    });

    //methods
    $.fn.fullpage.setAllowScrolling(true);


    // left and right keydown change color of arrow
    $(document).keydown(function(e) {
        if (e.which == 37) {
            $(".arrowLBlack").removeClass("d-none");
        }

        if (e.which == 39) {
            $(".arrowRBlack").removeClass("d-none");
            return false;
        }
    });

    // left and right keyup change color back
    $(document).keyup(function(e) {
        if (e.which == 37) {
            $(".arrowLBlack").addClass("d-none");
        }

        if (e.which == 39) {
            $(".arrowRBlack").addClass("d-none");
        }
    });


}

// function to simulate search
function mockupSearchResults() {
    // empty before loading
    $("#addResult").empty();

    // add variables for mockup info
    var business = "Burger Joint";
    var imgSrc = "src/burger-icon.png";
    var location = "Sydney";
    var category = "Burgers";
    var price = "$$";


    // Creates a div to hold the movie
    for (var i = 0; i < 11; i++) {

        // vars to create elements
        var tr = $("<tr>");

        // prepend to relevant table rows
        $("#addResult").prepend(tr);

        // add table contents
        $(tr).append("<td class='bubbleFont'>" + "<img src='src/burger-icon.png' class='mr-3 rounded food-icon'>" + business);
        $(tr).append("<td>" + location);
        $(tr).append("<td class='d-none d-md-block'>" + category);
        $(tr).append("<td class='bubbleFont'>" + price);
        $(tr).append("<td class='d-none d-md-block'>" + "<button class='btn-table'>Website</button>");
        $(tr).append("<td>" + "<button class='btn-table'>Add Bite</button>");
    }

}

function mockupBiteCards() {
    // empty before loading
    $("#addBites").empty();

    // add variables for mockup info
    var business = "Burger Joint";
    var imgSrc = "src/burger-icon.png";
    var location = "Sydney";
    var category = "Burgers";
    var price = "$$";

    // Creates a div to hold the movie
    for (var i = 0; i < 15; i++) {

        // vars to create elements
        var divCard = $("<div class='card mr-2 mb-2 bg-dark'>");
        var divCol = $("<div class='col-12'>");
        var divFlex = $('<div class="d-flex">');
        // buttons for card
        var removeBtn = $('<a id="removeBite" href="#"><img src="src/exit-icon.png" class="remove"></a>');
        var shareBtn = $('<a id="shareButton" href="#"><img src="src/share-link.png" class="share"></a>');
        var webBtn = $('<a id="webButton" href="#"><img src="src/web-link.png" class="web"></a>');

        // prepend relevant divs
        $("#addBites").prepend(divCard);
        $(divCard).prepend(divCol);
        $(divCol).prepend(removeBtn);
        $(divCol).prepend(shareBtn);
        $(divCol).prepend(webBtn);

        // add table contents
        $(divCol).append('<div class="d-flex"><h2 class="pr-3">' + business + '</h2><h2>' + price + '</h2></div>');
        $(divCol).append('<div class="d-flex"><p class="pr-3">' + location + '</p><p>' + category + '</p></div>');
        $(divCol).append('<div class="d-flex"><div class="btn-group btn-group-toggle mr-2" data-toggle="buttons"><label class="btn btn-green"><input type="radio" name="options" id="option1" autocomplete="off" checked>Try</label><label class="btn btn-pink"><input type="radio" name="options" id="option2" autocomplete="off"><img src="src/heart-icon.png" class="heart"></label></div><div class="dropdown"><button id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-table dropdown-toggle">Add Cookies</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" href="#">Sydney</a><a class="dropdown-item" href="#">Tokyo</a><a class="dropdown-item" href="#">Hawaii</a></div></div></div>');
    }
}

function mockupCookies() {
    // empty before loading
    $("#addCookies").empty();

    // add variables for mockup info
    var cookieName = "Sydney";

    // vars to create elements
    var divCardContain = $('<div id="cardContain" class="w-100 d-flex align-items-center">');
    var addCard = $('<div class="cardCookies justify-content-center mr-2 bg-pink d-flex align-items-center"><button id="tripButton" class="text-white" href="#" data-toggle="modal" data-target="#tripModal"><h2>+ Add</h2></button></div>')

    // prepend relevant divs
    $("#addCookies").prepend(divCardContain);
    $(divCardContain).prepend(addCard);

    // Creates a div to hold the movie
    for (var i = 0; i < 10; i++) {

        // prepend relevant divs
        $("#addCookies").prepend(divCardContain);

        // add table contents
        $(divCardContain).append('<div class="cardCookies justify-content-center mr-2 bg-dark d-flex align-items-center"><a id="removeBite" href="#"><img src="src/exit-icon.png" class="remove2"></a><a id="edit" href="#"><img src="src/edit-icon.png" class="edit"></a><h2 class="text-light">' + cookieName + '</h2></div>');

    }
}

mockupBiteCards();
mockupSearchResults();
mockupCookies();