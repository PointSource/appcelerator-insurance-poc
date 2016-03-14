var menuOpen = false;
var title = "menu";
Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".viewed");

$.callIcon.text = Alloy.Globals.icomoon.icon("menu-call");
$.emailIcon.text = Alloy.Globals.icomoon.icon("menu-email");
$.mapIcon.text = Alloy.Globals.icomoon.icon("menu-map");

function openMenu() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".opened");
	if (OS_IOS) {
	    $.SlideMenu.animate({
	        right: "0dp",
	        duration: 250,
	        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	    });
	    menuOpen = true;
	} else {
		Alloy.Globals.drawer.openLeftWindow();
	}
}

function closeMenu() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".closed");
	if (OS_IOS) {
		$.SlideMenu.animate({
		    right: "-280dp",
		    duration: 250,
		    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		menuOpen = false;
	} else if (OS_ANDROID) {
		Alloy.Globals.drawer.closeLeftWindow();
	}
}

function toggleMenu() {
	if (!menuOpen) {
	    openMenu();
	} else {
		closeMenu();
	}
}


$.SlideMenu.addEventListener("swipe", function(_event) {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".swiped");
    if(_event.direction == "right") {
        closeMenu();
    }
});

function addHighlight(e) {
	this.setBackgroundColor(Alloy.Globals.Colors.pointsource_blue);
	this.children[0].setColor(Alloy.Globals.Colors.gray_verydark);
}

function removeHighlight(e) {
	this.setBackgroundColor('transparent');
	this.children[0].setColor(Alloy.Globals.Colors.gray_medium);
    closeMenu();
}

function selectMenuItem (event) {
	if (this.controller) {
		Ti.Analytics.featureEvent(title+".select."+this.controller);
		Alloy.Globals.Navigator.open(this.controller, {});
	}
}

exports.toggleMenu = toggleMenu;
exports.closeMenu = closeMenu;
exports.openMenu = openMenu;