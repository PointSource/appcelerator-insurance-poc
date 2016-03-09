// /**
//  * Global Navigation Handler
//  */
// Alloy.Globals.Navigator = {
// 	open: function(controller, payload){

// 		Titanium.Analytics.navEvent('Somewhere', controller, 'nav.messageapp');
// 		var win = Alloy.createController(controller, payload || {}).getView();

// 		if(OS_IOS){
// 			$.nav.openWindow(win);
// 		}
// 		else {
// 			win.open();
// 		}
// 	},
// 	openWindow: function(win){
// 		if(OS_IOS){
// 			$.nav.openWindow(win);
// 		}
// 		else {
// 			win.open();
// 		}
// 	}
// };

function init() {
	// Set up navigation header
	if(OS_IOS){
		$.nav.open();
	}
	else if (OS_ANDROID) {
	    
		// Load module
		var TiDrawerLayout = require('com.tripvi.drawerlayout');

		// define menu and main content view
		Alloy.Globals.menu = Alloy.createController('menu', {
		  parent : $.index
		});

		// this is just a wrapper
		// actual content views are add to this later
		Alloy.Globals.contentView = Ti.UI.createView({
		  width : Ti.UI.FILL,
		  height : Ti.UI.FILL
		});

		Alloy.Globals.drawer = TiDrawerLayout.createDrawer({
		  leftView: Alloy.Globals.menu.getView(),
		  centerView: Alloy.Globals.contentView,
		  leftDrawerWidth: "260"
		});

		$.index.add(Alloy.Globals.drawer);
	  
		$.index.open();

		Alloy.Globals.open(Alloy.createController("dashboard"), true);
	}
}

/**
 * callback for Android back button
 */
function onBack(){
	console.log("onBack");
  Alloy.Globals.back();
}

init();
