// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//

// Appcelerator Performance Management
Alloy.Globals.apm = require("com.appcelerator.apm");
Alloy.Globals.apm.init();

Alloy.Globals.url = "http://10.128.64.62:1337"

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

/* Icon Font */
Alloy.Globals.Icomoon = require('/lib/icomoon');

// Dashboard icon size
Alloy.Globals.deviceWidth = Ti.Platform.displayCaps.platformWidth;
Alloy.Globals.deviceHeight = Ti.Platform.displayCaps.platformHeight;
Alloy.Globals.dashboardIconSize = (Alloy.Globals.deviceWidth / 4);

if (OS_ANDROID) {
	Alloy.Globals.dashboardIconSize = (Alloy.Globals.deviceWidth / 4)+"px";
}


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
	var menuIcon, backIcon;
	var sideMenu = Alloy.createController('menu');

	if(OS_IOS){

		options.currentWindow.add(sideMenu.getView());

		options.appWrapper.addEventListener("swipe", function(_event) {
		    if(_event.direction == "left") {
		        sideMenu.openMenu();
		    } else if(_event.direction == "right") {
		        sideMenu.closeMenu();
		    }
		});


		// Set up iOS menu button
        menuIcon = Titanium.UI.createLabel({
        	text: Alloy.Globals.Icomoon.charcode.menu,
        	font: {
        		fontFamily: Alloy.Globals.Icomoon.fontFamily,
        		fontSize: 30
        	},
        	color: "#49a7f7"
        });

		menuIcon.addEventListener("click", function() {
			sideMenu.toggleMenu();
		});

        options.currentWindow.setRightNavButtons([menuIcon]);


		if (options.iosBackButton !== false) {
	        // Set up iOS back button
	        backIcon = Titanium.UI.createLabel({
	        	text: Alloy.Globals.Icomoon.charcode.back_arrow,
	        	font: {
	        		fontFamily: Alloy.Globals.Icomoon.fontFamily,
	        		fontSize: 30
	        	},
	        	color: "#49a7f7"
	        });

			backIcon.addEventListener("click", function() {
				options.currentWindow.close();
			});
	        options.currentWindow.setLeftNavButtons([backIcon]);
		}


	} else if (OS_ANDROID) {

		if (options.androidMenu === true ) {

			// Load module
			var TiDrawerLayout = require('com.tripvi.drawerlayout');

			// define left and center view
			var leftView = sideMenu.getView();
			var centerView = options.appWrapper;

			// create the Drawer
			Alloy.Globals.drawer = TiDrawerLayout.createDrawer({
			    leftView: leftView,
			    centerView: centerView,
			    leftDrawerWidth: "280dp",
			    width: Ti.UI.FILL,
			    height: Ti.UI.FILL
			});

			options.currentWindow.add(Alloy.Globals.drawer);

			options.currentWindow.addEventListener("open", function() {
			    var activity = options.currentWindow.getActivity();

			    var actionbar = activity.getActionBar();
		        if (actionbar){

			        // this makes the drawer indicator visible in the action bar
			        actionbar.displayHomeAsUp = true;

			        // open and close with the app icon
			        actionbar.onHomeIconItemSelected = function() {
			            Alloy.Globals.drawer.toggleLeftWindow();
			        };
			    }

			});
		} else {

			options.currentWindow.addEventListener("open", function() {
			    var activity = options.currentWindow.getActivity();

			    var actionbar = activity.getActionBar();
		        if (actionbar){

			        // this makes the drawer indicator visible in the action bar
			        actionbar.displayHomeAsUp = true;

			        // open and close with the app icon
			        actionbar.onHomeIconItemSelected = function() {
			            options.currentWindow.close();
			        };
			    }

			});
		}


	}


}