// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//

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

var IconicFont = require('/lib/IconicFont');
Alloy.Globals.icomoon = new IconicFont({
    font: '/lib/icomoon'
});

/* Utility functions */

Alloy.Globals.findChildrenByClass = function (parent, className) {
	var matchingChildren = [];
	var child;
	for (i in parent.children) {
		child = parent.children[i];
		if (child.classes.indexOf(className) !== -1) {
			matchingChildren.push(child);
		}
	}
	return matchingChildren;
}

/* Global Layout */

Alloy.Globals.drawer = undefined;

Alloy.Globals.ios_window = undefined;

Alloy.Globals.menu = undefined;

Alloy.Globals.contentView = undefined;

var currentCtrl;

var backstack = [];

Alloy.Globals.open = function(controller, addToBackstack) {

	if (OS_ANDROID) {
		if (currentCtrl) {
			Alloy.Globals.contentView.remove(currentCtrl.getView());
			_.isFunction(currentCtrl.cleanup) && currentCtrl.cleanup();
		}

		currentCtrl = controller;
		Alloy.Globals.contentView.add(currentCtrl.getView());
		currentCtrl.init();

		if (addToBackstack && _.has(currentCtrl, 'id')){
			!_.contains(backstack, currentCtrl.id) && backstack.push(currentCtrl.id);
		}
	}
};

Alloy.Globals.close = function(){

	if (OS_IOS && Alloy.Globals.ios_window) {
		Alloy.Globals.ios_window.close();
	}
	else if (OS_ANDROID) {
		Alloy.Globals.back();
	}
}


/**
* closes current controller and re-opens the previous one
* if backstack isn't empty
*/
Alloy.Globals.back = function(){
	var previousCtrlId;

	if (OS_ANDROID) {

		backstack.pop();

		if (!_.isEmpty(backstack)){
			previousCtrlId = _.last(backstack);
			Alloy.Globals.menu.select(previousCtrlId, false);
		}else{
			Ti.Android.currentActivity.finish();
		}
	}

};


Alloy.Globals.buildIOSWindow = function (options) {
	var menuIcon, backIcon;
	if (OS_IOS) {
		// Add menu button
        menuIcon = Titanium.UI.createLabel({
        	text: Alloy.Globals.icomoon.icon("menu"),
        	font: {
        		fontFamily: Alloy.Globals.icomoon.fontfamily,
        		fontSize: 30
        	},
        	color: "#49a7f7"
        });
		menuIcon.addEventListener("click", function() {
			Alloy.Globals.menu.toggleMenu();
		});

		// Add back button
        if (options.hasBackButton !== false) {
	        backIcon = Titanium.UI.createLabel({
	        	text: Alloy.Globals.icomoon.icon("back-arrow"),
	        	font: {
	        		fontFamily: Alloy.Globals.icomoon.fontfamily,
	        		fontSize: 30
	        	},
	        	color: "#49a7f7"
	        });

			backIcon.addEventListener("click", function() {
				Alloy.Globals.ios_window.close();
			});
        }


		// Create window
		Alloy.Globals.ios_window = Ti.UI.createWindow({
			titleAttributes:  {
		        color: "white"
			},
			barColor: Alloy.Globals.Colors.gray_verydark,
			backgroundColor: Alloy.Globals.Colors.gray_light,
			statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
			title: options.controller.title,
			rightNavButton: menuIcon,
			leftNavButton: backIcon
		});

		// Add main controller view and initialize it
		Alloy.Globals.ios_window.add(options.controller.getView());
		options.controller.init();

		// Add menu and swipe listener to open menu
		Alloy.Globals.ios_window.add(Alloy.Globals.menu.getView());
		Alloy.Globals.ios_window.addEventListener("swipe", function(_event) {
		    if(_event.direction == "left") {
		        Alloy.Globals.menu.openMenu();
		    } else if(_event.direction == "right") {
		        Alloy.Globals.menu.closeMenu();
		    }
		});
	}

	return Alloy.Globals.ios_window;
}