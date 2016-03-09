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

Alloy.Globals.drawer = undefined;

Alloy.Globals.menu = undefined;

Alloy.Globals.contentView = undefined;

var currentCtrl;

var backstack = [];

Alloy.Globals.open = function(controller, addToBackstack) {

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
};



/**
* closes current controller and re-opens the previous one
* if backstack isn't empty
*/
Alloy.Globals.back = function(){

	backstack.pop();

	if (!_.isEmpty(backstack)){
		var previousCtrlId = _.last(backstack);
		Alloy.Globals.menu.select(previousCtrlId, false);
	}else{
		Ti.Android.currentActivity.finish();
	}

};


Alloy.Globals.setUpNavBar = function (options) {
	var win, menuIcon;
	if(OS_IOS){
		// Create window
		win = Ti.UI.createWindow({
			titleAttributes:  {
		        color: "white"
			},
			barColor: Alloy.Globals.Colors.gray_verydark,
			backgroundColor: Alloy.Globals.Colors.gray_light,
			statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
			title: options.controller.title
		});

		// Add main controller view and initialize it
		win.add(options.controller.getView());
		options.controller.init();

		// Add menu and swipe listener to open menu
		win.add(Alloy.Globals.menu.getView());
		win.addEventListener("swipe", function(_event) {
		    if(_event.direction == "left") {
		        Alloy.Globals.menu.openMenu();
		    } else if(_event.direction == "right") {
		        Alloy.Globals.menu.closeMenu();
		    }
		});

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
        win.setRightNavButtons([menuIcon]);


	} else if (OS_ANDROID) {



	}

	return win;
}