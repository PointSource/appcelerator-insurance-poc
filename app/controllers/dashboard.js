var IconicFont = require('/lib/IconicFont');
var icomoon = new IconicFont({
    font: '/lib/icomoon'
});

var args = arguments[0] || {};

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("paybill", {});
}

function goToHomeInventory (event) {
	Alloy.Globals.Navigator.open("homeInventory", {});
}

$.profileIcon.text = icomoon.icon("main-profile");
$.policyIcon.text = icomoon.icon("main-policies");
$.paybillIcon.text = icomoon.icon("main-paybill");
$.maintenanceIcon.text = icomoon.icon("main-maintenance");
$.inventoryIcon.text = icomoon.icon("main-inventory");
$.alertsIcon.text = icomoon.icon("main-alerts");
$.autoIcon.text = icomoon.icon("main-auto");

