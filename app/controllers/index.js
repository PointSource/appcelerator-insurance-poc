/**
 * Global Navigation Handler
 */
Alloy.Globals.Navigator = {
	open: function(controller, payload){

		Titanium.Analytics.navEvent('Somewhere', controller, 'nav.messageapp');
		var win = Alloy.createController(controller, payload || {}).getView();

		if(OS_IOS){
			$.nav.openWindow(win);
		}
		else {
			win.open();
		}
	},
	openWindow: function(win){
		if(OS_IOS){
			$.nav.openWindow(win);
		}
		else {
			win.open();
		}
	}
};



// Set up navigation header
if(OS_IOS){
	$.nav.open();
}
else if (OS_ANDROID) {
	Alloy.Globals.Navigator.open("dashboard");
}
