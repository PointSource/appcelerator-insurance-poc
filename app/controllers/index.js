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



if(OS_IOS){
	$.nav.open()
}
else{
	$.index.getView().open();
}