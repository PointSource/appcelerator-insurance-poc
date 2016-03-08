var menuOpen = false;

$.callIcon.text = Alloy.Globals.icomoon.icon("menu-call");
$.emailIcon.text = Alloy.Globals.icomoon.icon("menu-email");
$.mapIcon.text = Alloy.Globals.icomoon.icon("menu-map");


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

function addHighlight(e) {
	this.setBackgroundColor(Alloy.Globals.Colors.pointsource_blue);
	this.children[0].setColor(Alloy.Globals.Colors.gray_verydark);
}
function removeHighlight(e) {
	this.setBackgroundColor('transparent');
	this.children[0].setColor(Alloy.Globals.Colors.gray_medium);
}


function goToPayBill () {
	Titanium.Analytics.featureEvent('menu.select.payBill');
	Alloy.Globals.Navigator.open("payBill/billList", {});
}

function goToHomeInventory () {
	Titanium.Analytics.featureEvent('menu.select.homeInventory');
	Alloy.Globals.Navigator.open("homeInventory/homeInventory", {});
}

exports.toggleMenu = toggleMenu;
exports.closeMenu = closeMenu;
exports.openMenu = openMenu;