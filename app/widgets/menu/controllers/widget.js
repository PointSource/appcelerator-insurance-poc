var IconicFont = require('/lib/IconicFont');
var icomoon = new IconicFont({
    font: '/lib/icomoon'
});

var menuOpen = false;

$.agentPhoto.image = WPATH('images/Point-Insurance-Agent-Photo-menu.png');
$.agentPhoto.height = 100;
$.agentPhoto.width = 100;

$.callIcon.text = icomoon.icon("menu-call");
$.emailIcon.text = icomoon.icon("menu-email");
$.mapIcon.text = icomoon.icon("menu-map");


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
	    right: "-280dp",
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


$.SlideMenu.addEventListener("swipe", function(_event) {
    if(_event.direction == "right") {
        closeMenu();
    }
});


exports.toggleMenu = toggleMenu;
exports.closeMenu = closeMenu;
exports.openMenu = openMenu;