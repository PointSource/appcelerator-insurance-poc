var IconicFont = require('/lib/IconicFont');
var icomoon = new IconicFont({
    font: '/lib/icomoon'
});


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
	$.menuIcon.text = icomoon.icon("menu");

	$.nav.open()
}
else if (OS_ANDROID) {
	var abx = require('com.alcoapps.actionbarextras');

	$.index.addEventListener("open", function() {

	    var activity = $.index.getActivity();
		
	    if(activity){

	    	// Add menu items
			activity.onCreateOptionsMenu = function(e){

				// first, create the item...
				var openMenuItem = e.menu.add({
					itemId: 101, // don't forget to set an id here
					title: "Open Menu",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});

				openMenuItem.addEventListener('click', function(){
					toggleMenu();
				});

				// ...then, let abx apply the custom font
				abx.setMenuItemIcon({
					menu: e.menu,
					menuItem: openMenuItem,
					fontFamily: icomoon.fontfamily,
					icon: icomoon.icon("menu"),
					color: "#49a7f7",
					size: 30
				});
			}

			// Hide the title
			abx.title = "Point Insurance";
            abx.setDisplayShowTitleEnabled( false )

            // Set the left-hand icon to the Point Insurance logo
            activity.actionBar.displayHomeAsUp = true;
		    abx.setHomeAsUpIcon("/images/point-insurance-logo.png");
		}
	});

	$.index.open();


}