// JavaScript code that handles the styles, media queries and transitions
$(function() {
    var container = $(".container-fluid");
    
    //Handle click event of Hamburger Icon
    $("#ham_icon").click(function(e) {
        if(sidebar.classList.contains("open")){
            sidebar.classList.remove("open");
            container.css({"margin-left":"auto"});
            google.maps.event.trigger(map, 'resize');
        }
        else {
            sidebar.classList.add("open");
            container.css({"margin-left":"250px"});
            google.maps.event.trigger(map, 'resize');
        }
        e.stopPropagation();
    });

    // Make Sidebar open by default for wider screens 
    if(window.matchMedia("screen and (min-width: 768px)").matches){
        sidebar.classList.add('open');
        container.css({"margin-left":"250px"});
    }

    // Make Sidebar automatically open or close on the basis of screen resize
    $(window).resize(function(){
        if(window.matchMedia("screen and (min-width: 768px)").matches){
            sidebar.classList.add('open');
            container.css({"margin-left":"250px"});
        }
        else {
            sidebar.classList.remove('open');
            container.css({"margin-left":"auto"});
        }
    });
});