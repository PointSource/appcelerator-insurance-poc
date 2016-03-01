// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//


/* Colors to be used in TSS */
Alloy.Globals.Colors = {
	pointsource_blue: "#49a7f7",
	gray_verydark: "#282828",
	gray_dark: "#606060",
	gray_medium: "#b2b2b2",
	gray_light: "#eeeeee",
	green: "#9ad275",
	primary_accent: "#ee3c50"
}

/* Custom backbone models */

var vehicleCollection = Backbone.Collection.extend({});
var vehicles = new vehicleCollection();
Alloy.Collections.vehicles = vehicles;


/* Icon Font */

var IconicFont = require('/lib/IconicFont');
Alloy.Globals.icomoon = new IconicFont({
    font: '/lib/icomoon'
});

/* Utility functions */

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

/* Global Layout */
Alloy.Globals.setUpNavBar = function (options) {

	var sideMenu = Alloy.createController('menu');

	options.currentWindow.add(sideMenu.getView());

	options.appWrapper.addEventListener("swipe", function(_event) {
	    if(_event.direction == "left") {
	        sideMenu.openMenu();
	    } else if(_event.direction == "right") {
	        sideMenu.closeMenu();
	    }
	});

	if(OS_IOS){

		// Set up iOS menu button
        var menuIcon = Titanium.UI.createLabel({
        	text: Alloy.Globals.icomoon.icon("menu"),
        	font: {
        		fontFamily: Alloy.Globals.icomoon.fontfamily,
        		fontSize: 30
        	},
        	color: "#49a7f7"
        });

		menuIcon.addEventListener("click", function() {
			sideMenu.toggleMenu();
		});

        options.currentWindow.setRightNavButtons([menuIcon]);

        // Set up iOS back button
        var backIcon = Titanium.UI.createLabel({
        	text: Alloy.Globals.icomoon.icon("back-arrow"),
        	font: {
        		fontFamily: Alloy.Globals.icomoon.fontfamily,
        		fontSize: 30
        	},
        	color: "#49a7f7"
        });

		backIcon.addEventListener("click", function() {
			options.currentWindow.close();
		});

        options.currentWindow.setLeftNavButtons([backIcon]);

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
						sideMenu.toggleMenu();
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