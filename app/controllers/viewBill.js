var args = arguments[0] || {};

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("paybill", {});
}

function formatVehicle(vehicle) {
	var formattedVehicle = vehicle.toJSON();
	formattedVehicle.display = formattedVehicle.make + " " + formattedVehicle.model + " " + formattedVehicle.year;
	return formattedVehicle;
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
}

init();