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

// Make all menu-clickable items have a selected and unselected state
function addTouchState (view) {
	view.addEventListener('touchstart', function(){
	    $.addClass(this, "menu-row-selected");
	    $.addClass(this.children[0], "menu-label-selected");
	});
	view.addEventListener('touchend', function(){
	    $.removeClass(this, "menu-row-selected");
	    $.removeClass(this.children[0], "menu-label-selected");
		closeMenu();
	});
}

var clickableChildren = Alloy.Globals.findChildrenByClass($.menuSection, "menu-clickable");
clickableChildren = clickableChildren.concat(Alloy.Globals.findChildrenByClass($.menuSubSection1, "menu-clickable"));
clickableChildren = clickableChildren.concat(Alloy.Globals.findChildrenByClass($.menuSubSection2, "menu-clickable"));

for (i in clickableChildren) {
	var child = clickableChildren[i];
	addTouchState(child);
}


function goToPayBill (event) {
	Alloy.Globals.Navigator.open("payBill/viewBill", {});
}

function goToHomeInventory (event) {
	Alloy.Globals.Navigator.open("homeInventory/homeInventory", {});
}

exports.toggleMenu = toggleMenu;
exports.closeMenu = closeMenu;
exports.openMenu = openMenu;