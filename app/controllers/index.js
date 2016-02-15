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

function toggleMenu () {
	$.menu.toggleMenu();
}
function openMenu () {
	$.menu.openMenu();
}
function closeMenu () {
	$.menu.closeMenu();
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