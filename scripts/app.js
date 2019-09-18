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

    $(document).keydown(function(e) {
        if (e.which == 37) {
            $(".arrowLBlack").removeClass("d-none");
        }

        if (e.which == 39) {
            $(".arrowRBlack").removeClass("d-none");
            return false;
        }
    });

    $(document).keyup(function(e) {
        if (e.which == 37) {
            $(".arrowLBlack").addClass("d-none");
        }

        if (e.which == 39) {
            $(".arrowRBlack").addClass("d-none");
        }
    });

}