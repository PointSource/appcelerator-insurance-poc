var args = arguments[0] || {};
var moment = require('alloy/moment');
var string = require('alloy/string');

function formatPolicy(policy) {
	var transformed = policy.toJSON();
	transformed.minimumDue = string.formatCurrency(transformed.billDetails.minimumDue);
	var dueDate = moment(transformed.billDetails.dueDate, "MM/DD/YYYY")
	transformed.formattedDueDate = dueDate.format("MMMM DD, YYYY").toUpperCase();

	transformed.formatDriver = function (item) {
		return item.firstName + " " + item.lastName
	}
	transformed.formatVehicle = function (item) {
		return item.make + " " + item.model + " " + item.year
	}

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