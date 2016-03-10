var menuOpen = false;


function openMenu() {
	if (OS_IOS) {
	    $.SlideMenu.animate({
	        right: "0dp",
	        duration: 250,
	        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	    });
	    menuOpen = true;
	} else if (OS_ANDROID) {
		Alloy.Globals.drawer.openLeftWindow();
	}
}

function closeMenu() {
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



function addHighlight(e) {
	this.setBackgroundColor(Alloy.Globals.Colors.pointsource_blue);
	this.children[0].setColor(Alloy.Globals.Colors.gray_verydark);
}
function removeHighlight(e) {
	this.setBackgroundColor('transparent');
	this.children[0].setColor(Alloy.Globals.Colors.gray_medium);
	closeMenu();
}


function goToPayBill () {
	Titanium.Analytics.featureEvent('menu.select.payBill');
	select("payBill/billList");
}

function goToHomeInventory () {
	Titanium.Analytics.featureEvent('menu.select.homeInventory');
	select("homeInventory/homeInventory");
}

function select (index, addToBackstack) {
	if (_.isUndefined(addToBackstack)) {
		addToBackstack = true;
	}
	Alloy.Globals.Navigator.open(index);
}

function init () {
	$.callIcon.text = Alloy.Globals.icomoon.icon("menu-call");
	$.emailIcon.text = Alloy.Globals.icomoon.icon("menu-email");
	$.mapIcon.text = Alloy.Globals.icomoon.icon("menu-map");

	// Add swipe listener to iOS
	if (OS_IOS) {
		$.SlideMenu.addEventListener("swipe", function(_event) {
		    if(_event.direction == "right") {
		        closeMenu();
		    }
		});
	}
}

init();

/**
 * Select menu item by index or id
 * @param {Number|String} Index / id
 * @param {Function} callback
 * @param {Boolean} backstack
 */
exports.select = select;
exports.toggleMenu = toggleMenu;
exports.closeMenu = closeMenu;
exports.openMenu = openMenu;