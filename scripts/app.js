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


}