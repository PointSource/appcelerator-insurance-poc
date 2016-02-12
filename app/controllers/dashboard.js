var args = arguments[0] || {};
var menuOpen = false;

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("paybill", {});
}

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