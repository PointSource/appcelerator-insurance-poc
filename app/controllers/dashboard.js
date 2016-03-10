var args = arguments[0] || {};

function goToViewBill (event) {
	Alloy.Globals.Navigator.open("payBill/billList", {});
}

function goToHomeInventory (event) {
	Alloy.Globals.Navigator.open("homeInventory/homeInventory", {});
}

function resetBills () {
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			alert('reset bills');
		},
		onerror: function(e) {
			alert("could not reset bills")
		},
		timeout : 5000
	});
		
	xhr.open("POST", "http://10.128.64.179:1337/payment/reset");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
}

function init() {

	Alloy.Globals.setUpNavBar({
		currentWindow: $.dashboard,
		appWrapper: $.AppWrapper,
		leftButtonImage: "/images/point-insurance-logo.png",
		androidMenu: true
	});

	$.profileIcon.text = Alloy.Globals.icomoon.icon("main-profile");
	$.policyIcon.text = Alloy.Globals.icomoon.icon("main-policies");
	$.paybillIcon.text = Alloy.Globals.icomoon.icon("main-paybill");
	$.maintenanceIcon.text = Alloy.Globals.icomoon.icon("main-maintenance");
	$.inventoryIcon.text = Alloy.Globals.icomoon.icon("main-inventory");
	$.alertsIcon.text = Alloy.Globals.icomoon.icon("main-alerts");
	$.autoIcon.text = Alloy.Globals.icomoon.icon("main-auton-no-rule");
}


init();