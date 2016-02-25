var args = arguments[0] || {};

function goToPayBillLanding (event) {
	Alloy.Globals.Navigator.open("payBillLanding", {});
}

function goToHomeInventory (event) {
	Alloy.Globals.Navigator.open("homeInventory", {});
}

$.profileIcon.text = Alloy.Globals.icomoon.icon("main-profile");
$.policyIcon.text = Alloy.Globals.icomoon.icon("main-policies");
$.paybillIcon.text = Alloy.Globals.icomoon.icon("main-paybill");
$.maintenanceIcon.text = Alloy.Globals.icomoon.icon("main-maintenance");
$.inventoryIcon.text = Alloy.Globals.icomoon.icon("main-inventory");
$.alertsIcon.text = Alloy.Globals.icomoon.icon("main-alerts");
$.autoIcon.text = Alloy.Globals.icomoon.icon("main-auton-no-rule");
