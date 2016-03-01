var args = arguments[0] || {};

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("paybill", {});
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
    Alloy.Globals.setUpNavBar({
        currentWindow: $.viewBill,
        appWrapper: $.AppWrapper
    });

	$.autoIcon.text = Alloy.Globals.icomoon.icon("main-auto");

	var policyCollection = args.policyCollection;

	var currentPolicy = policyCollection.get(12345678)
	$.currentPolicy.set(currentPolicy.attributes);

	var vehicleCollection = Alloy.Collections.vehicles;
	vehicleCollection.reset(currentPolicy.get('vehicles'));

	var driverCollection = Alloy.Collections.drivers;
	driverCollection.reset(currentPolicy.get('drivers'));

}

init();