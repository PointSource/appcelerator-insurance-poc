var args = arguments[0] || {};
var policyCollection = {};
var currentPolicy = {};

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("payBill/payBill", {currentPolicy: $model});
}

function formatVehicle(vehicle) {
	var formatted = vehicle.toJSON();
	formatted.display = formatted.make + " " + formatted.model + " " + formatted.year;
	return formatted;
}

function formatDriver(driver) {
	var formatted = driver.toJSON();
	formatted.display = formatted.firstName + " " + formatted.lastName;
	return formatted;
}

function init() {

	$.autoIcon.text = Alloy.Globals.icomoon.icon("main-auto");

	var vehicleCollection = Alloy.Collections.vehicles;
	if ($model.has('vehicles')) {
		vehicleCollection.reset($model.get('vehicles'));
	}

	var driverCollection = Alloy.Collections.drivers;
	if ($model.has('drivers')) {
		driverCollection.reset($model.get('drivers'));
	}

}

init();