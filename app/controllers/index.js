var ios_navWindow;

initDrawer();

/**
 * Global Navigation Handler
 */
Alloy.Globals.Navigator = {
	open: function (controllerName, payload) {
		var controller, win, activity, actionBar;

		Titanium.Analytics.navEvent('Somewhere', controllerName, 'nav.messageapp');
		controller = Alloy.createController(controllerName, payload || {});

		this.openController(controller);
	},
	openController: function (controller) {
		if(OS_IOS){
			win = Alloy.Globals.buildIOSWindow({
				controller: controller
			})

			ios_navWindow.openWindow(win);
		}
		else if (OS_ANDROID) {
			// Set page title
			if (controller.title) {
				activity = $.index.getActivity();

				if (activity) {

					actionBar = activity.getActionBar();

					if (actionBar) {
					  	actionBar.title = controller.title;
					}
				};
			}
			Alloy.Globals.open(controller, true)
		}
	}
};



function initDrawer() {
	var dashboardWin, TiDrawerLayout;
	// Set up navigation header
	if (OS_IOS) {
		Alloy.Globals.menu = Alloy.createController('menu', {});
		dashboardWin = Alloy.Globals.buildIOSWindow({
			controller: Alloy.createController("dashboard"),
			hasBackButton: false
		});
		ios_navWindow = Titanium.UI.iOS.createNavigationWindow({
		   window: dashboardWin
		});

		ios_navWindow.open();
	}
	else if (OS_ANDROID) {
	    
		// Load module
		TiDrawerLayout = require('com.tripvi.drawerlayout');

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

	}
}

/**
 * Android callback for {Ti.UI.Window} open event
 */
function onOpen() {
	var activity, actionBar;
	if (OS_ANDROID) {
		activity = $.index.getActivity();

		if (activity) {

			actionBar = activity.getActionBar();

			if (actionBar) {
				actionBar.displayHomeAsUp = true;
				actionBar.title = "Point Insurance";
				actionBar.onHomeIconItemSelected = function() {
					Alloy.Globals.drawer.toggleLeftWindow();
				};
			}
		};

		Alloy.Globals.open(Alloy.createController("dashboard"), true);
	}
}


/**
 * callback for Android back button
 */
function onBack(){
	Alloy.Globals.back();
}

