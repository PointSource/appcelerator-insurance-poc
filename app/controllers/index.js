/**
 * Global Navigation Handler
 */
Alloy.Globals.Navigator = {
	open: function(controller, payload, fromWin){

		if (fromWin) {
			Ti.Analytics.navEvent(fromWin, controller, 'nav.messageapp');
			Ti.Analytics.featureEvent(fromWin+"-to-"+controller);
		}
		var win = Alloy.createController(controller, payload || {}).getView();

		if(OS_IOS){
			$.nav.openWindow(win);
		}
		else {
			win.open();
		}
	}
};


function init() {
	// Set up navigation header
	if(OS_IOS){
		$.nav.open();
	}
	else if (OS_ANDROID) {
		Alloy.Globals.Navigator.open("dashboard");
	}
}

init();