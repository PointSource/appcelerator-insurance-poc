// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//


var IconicFont = require('/lib/IconicFont');
Alloy.Globals.icomoon = new IconicFont({
    font: '/lib/icomoon'
});

Alloy.Globals.findChildrenByClass = function (parent, className) {
	var matchingChildren = []
	for (i in parent.children) {
		var child = parent.children[i];
		if (child.classes.indexOf(className) !== -1) {
			matchingChildren.push(child);
		}
	}
	return matchingChildren;
}


Alloy.Globals.setUpNavBar = function (options) {
	options.appWrapper.addEventListener("swipe", function(_event) {
	    if(_event.direction == "left") {
	        options.menu.openMenu();
	    } else if(_event.direction == "right") {
	        options.menu.closeMenu();
	    }
	});

	if(OS_IOS){

		options.menuIcon.text = Alloy.Globals.icomoon.icon("menu");
		options.backIcon.text = Alloy.Globals.icomoon.icon("back-arrow");

	} else if (OS_ANDROID) {

		var abx = require('com.alcoapps.actionbarextras');

		options.currentWindow.addEventListener("open", function() {

		    var activity = options.currentWindow.getActivity();
			
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
						options.menu.toggleMenu();
					});

					// ...then, let abx apply the custom font
					abx.setMenuItemIcon({
						menu: e.menu,
						menuItem: openMenuItem,
						fontFamily: Alloy.Globals.icomoon.fontfamily,
						icon: Alloy.Globals.icomoon.icon("menu"),
						color: "#49a7f7",
						size: 30
					});
				}

	            // Set the left-hand icon to the Point Insurance logo
	            activity.actionBar.displayHomeAsUp = true;
	            activity.actionBar.setHomeButtonEnabled(true);
	            activity.actionBar.setOnHomeIconItemSelected(function () {
	            	options.currentWindow.close();
	            });

			    abx.setHomeAsUpIcon("/images/back-arrow.png");
			}
		});

	}


}