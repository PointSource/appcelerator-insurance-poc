var string = require('alloy/string');

function formatPolicy(policy) {
	var transformed = policy.toJSON();

	transformed.minimumDue = string.formatCurrency(policy.getMinimumDue());
	var dueDate = policy.getDueDate();
	transformed.formattedDueDate = dueDate.format("MMMM DD, YYYY").toUpperCase();

	transformed.getFormattedDriver = policy.getFormattedDriver;
	transformed.getFormattedVehicle = policy.getFormattedVehicle;
	transformed.typeIcon = policy.getIcon();

	return transformed;
}

function filterPolicies (policyCollection) {
	return policyCollection.filter(function(policy) {
		return parseFloat(policy.get("billDetails").minimumDue) > 0;
	});
}

function init() {
    // Alloy.Globals.setUpNavBar({
    //     currentWindow: $.billList,
    //     appWrapper: $.AppWrapper
    // });

    Alloy.Collections.policy.fetch({
    	success: function () {

    	},
    	error: function (err) {
    		alert('could not get list of policies');
    	}
    });
	// Alloy.Globals.apm.leaveBreadcrumb("exit init");
}

exports.init = init;
