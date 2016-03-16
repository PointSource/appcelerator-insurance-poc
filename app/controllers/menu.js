var controller = {
	menuOpen: false,
	title: "menu"
}

function openMenu() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".opened");
	if (OS_IOS) {
	    $.SlideMenu.animate({
	        right: "0dp",
	        duration: 250,
	        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	    });
	    controller.menuOpen = true;
	} else {
		Alloy.Globals.drawer.openLeftWindow();
	}
}

function closeMenu() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".closed");
	if (OS_IOS) {
		$.SlideMenu.animate({
		    right: "-280dp",
		    duration: 250,
		    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		controller.menuOpen = false;
	} else if (OS_ANDROID) {
		Alloy.Globals.drawer.closeLeftWindow();
	}
}

function toggleMenu() {
	if (!controller.menuOpen) {
	    openMenu();
	} else {
		closeMenu();
	}
}

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
		Ti.Analytics.featureEvent(controller.title+".select."+this.controller);
		Alloy.Globals.Navigator.open(this.controller, {});
	}
}

function init() {
	if (OS_IOS) {
		$.SlideMenu.addEventListener("swipe", function(_event) {
			Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".swiped");
		    if(_event.direction == "right") {
		        closeMenu();
		    }
		});
	}
}

init();

exports.toggleMenu = toggleMenu;
exports.closeMenu = closeMenu;
exports.openMenu = openMenu;