var menuOpen = false;

/**
 * Global Navigation Handler
 */
Alloy.Globals.Navigator = {

	open: function(controller, payload){
		var win = Alloy.createController(controller, payload || {}).getView();

		if(OS_IOS){
			$.nav.openWindow(win);
		}
		else if(OS_MOBILEWEB){
			$.nav.open(win);
		}
		else {
			win.open();
		}
	}
};


function openMenu() {
    $.SlideMenu.animate({
        right: "0dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
    menuOpen = true;
}

function closeMenu() {
	$.SlideMenu.animate({
	    right: "-200dp",
	    duration: 250,
	    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	menuOpen = false;
}

function toggleMenu() {
	if (!menuOpen) {
	    openMenu();
	} else {
		closeMenu();
	}
}

$.AppWrapper.addEventListener("swipe", function(_event) {
    if(_event.direction == "left") {
        openMenu();
    } else if(_event.direction == "right") {
        closeMenu();
    }
});


if(OS_IOS){
	$.nav.open()
}
else{
	$.index.open();
}