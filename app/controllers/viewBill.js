var args = arguments[0] || {};

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("paybill", {});
}

function init() {
    Alloy.Globals.setUpNavBar({
        currentWindow: $.viewBill,
        appWrapper: $.AppWrapper
    });

	$.autoIcon.text = Alloy.Globals.icomoon.icon("main-auto");

}

init();