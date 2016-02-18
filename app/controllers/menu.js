var menuOpen = false;

$.agentPhoto.image = 'images/Point-Insurance-Agent-Photo-menu.png';
$.agentPhoto.height = 100;
$.agentPhoto.width = 100;

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


function test () {
	alert("clicked!");
}

function addTouchState (view) {
	view.addEventListener('touchstart', function(){
		console.log('touchstart');
	    this.setBackgroundColor('#49a7f7');
	    this.children[0].setColor('#282828');
	});
	view.addEventListener('touchend', function(){
	    this.setBackgroundColor('#282828');
	    this.children[0].setColor('#b2b2b2');
		closeMenu();
	});
}

// Add touch states for menu items
for (i in $.menuSection.children) {
	var child = $.menuSection.children[i];
	if (child.className === "menu-clickable") {
		addTouchState(child);
	}
}

// Add touch states for menu items
for (i in $.menuSubSection1.children) {
	var child = $.menuSubSection1.children[i];
	if (child.className === "menu-clickable") {
		addTouchState(child);
	}
}

// Add touch states for menu items
for (i in $.menuSubSection2.children) {
	var child = $.menuSubSection2.children[i];
	if (child.className === "menu-clickable") {
		addTouchState(child);
	}
}

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("paybill", {});
}

function goToHomeInventory (event) {
	Alloy.Globals.Navigator.open("homeInventory", {});
}

exports.toggleMenu = toggleMenu;
exports.closeMenu = closeMenu;
exports.openMenu = openMenu;