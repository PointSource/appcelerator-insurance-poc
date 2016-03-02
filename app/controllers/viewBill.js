var args = arguments[0] || {};
var policyCollection = {};
var currentPolicy = {};

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("paybill", {currentPolicy: currentPolicy});
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

function updatePolicyData() {
	currentPolicy = policyCollection.get(12345678);
	$.currentPolicy.set(currentPolicy.attributes);
}

function init() {
    Alloy.Globals.setUpNavBar({
        currentWindow: $.viewBill,
        appWrapper: $.AppWrapper
    });

	$.autoIcon.text = Alloy.Globals.icomoon.icon("main-auto");

	policyCollection = args.policyCollection;
	updatePolicyData(policyCollection);

	policyCollection.on('change', updatePolicyData);

	var vehicleCollection = Alloy.Collections.vehicles;
	vehicleCollection.reset(currentPolicy.get('vehicles'));

	var driverCollection = Alloy.Collections.drivers;
	driverCollection.reset(currentPolicy.get('drivers'));

	$.viewBill.addEventListener('close', function() {
	    $.destroy();
	});

}

init();