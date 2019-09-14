// load function when window is ready
window.onload = function() {


    $('#fullpage').fullpage({
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
    });

    //methods
    $.fn.fullpage.setAllowScrolling(true);


}