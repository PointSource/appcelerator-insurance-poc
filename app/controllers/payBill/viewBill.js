var args = arguments[0] || {};
var policyCollection = {};
var currentPolicy = {};

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("payBill/payBill", {currentPolicy: $model});
}

function init() {
	switch ($model.get("type")) {
		case "AUTO":
			$.typeIcon.text = Alloy.Globals.icomoon.icon("main-auto");
			break;
		case "RENTERS":
		case "HOME":
			$.typeIcon.text = Alloy.Globals.icomoon.icon("main-home");
			break;
		default:
			$.typeIcon.text = Alloy.Globals.icomoon.icon("main-auto");
	}
}

init();