var args = arguments[0] || {};
var moment = require('alloy/moment');
var string = require('alloy/string');

function formatPolicy(policy) {
	var transformed = policy.toJSON();
	transformed.totalAmountDue = string.formatCurrency(transformed.billDetails.totalAmountDue);
	transformed.minimumDue = string.formatCurrency(transformed.billDetails.minimumDue);
	var dueDate = moment(transformed.billDetails.dueDate, "MM/DD/YYYY")
	transformed.formattedDueDate = dueDate.format("MMMM DD, YYYY").toUpperCase();

	var labelStyle = $.createStyle({
		classes: ['card-label', 'header-2']
	});	
	var smallLabelStyle = $.createStyle({
		classes: ['card-label', 'small']
	});

	// Child views for vehicles
	transformed.vehicle_data = [];
	var vehicleView = Ti.UI.createView({
		layout: 'vertical',
		height: Ti.UI.SIZE
	});
	if (policy.has("vehicles")) {
		var label = Ti.UI.createLabel(smallLabelStyle);
		label.text = "Vehicle(s)"
		vehicleView.add(label);
	}
	_.each(policy.get("vehicles"), function (vehicle) {
		var label = Ti.UI.createLabel(labelStyle);
		label.text = vehicle.make + " " + vehicle.model + " " + vehicle.year
		vehicleView.add(label);
	});
	transformed.vehicle_data.push(vehicleView);

	// Child views for drivers
	transformed.driver_data = [];
	var driverView = Ti.UI.createView({
		layout: 'vertical',
		height: Ti.UI.SIZE
	});
	if (policy.has("drivers")) {
		var label = Ti.UI.createLabel(smallLabelStyle);
		label.text = "Driver(s)"
		vehicleView.add(label);
	}

	_.each(policy.get("drivers"), function (driver) {
		var label = Ti.UI.createLabel(labelStyle);
		label.text = driver.firstName + " " + driver.lastName;
		driverView.add(label);
	});
	transformed.driver_data.push(driverView);

	return transformed;
}


function init() {
    Alloy.Globals.setUpNavBar({
        currentWindow: $.billList,
        appWrapper: $.AppWrapper
    });

    Alloy.Collections.policy.fetch();
}

init();