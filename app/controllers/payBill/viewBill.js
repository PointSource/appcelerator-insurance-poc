var args = arguments[0] || {};
var policyCollection = {};
var currentPolicy = {};

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("payBill/payBill", {currentPolicy: $model});
}

function init() {
	$.autoIcon.text = Alloy.Globals.icomoon.icon("main-auto");
}

init();