var args = arguments[0] || {};
var policyCollection = {};
var currentPolicy = {};

function goToPayBill (event) {
	var payment = Alloy.createModel('payment', {
		policyNumber: currentPolicy.get("policyNumber"),
		paymentAmount: 50
	});

	payment.save();

	policyCollection.fetch({
		success: function (policyCollection) {
			updatePolicyData(policyCollection);
		}
	})
	// Alloy.Globals.Navigator.open("paybill", {});
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

function updatePolicyData(policyCollection) {
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

	var vehicleCollection = Alloy.Collections.vehicles;
	vehicleCollection.reset(currentPolicy.get('vehicles'));

	var driverCollection = Alloy.Collections.drivers;
	driverCollection.reset(currentPolicy.get('drivers'));

	$.viewBill.addEventListener('close', function() {
	    $.destroy();
	});

}

init();