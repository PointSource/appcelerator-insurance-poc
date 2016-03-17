var string = require('alloy/string');

var controller = {
	title: "viewBills"
}

function formatPolicy(policy) {
	var transformed = policy.toJSON();
	var lastPolicyNumber = Alloy.Collections.policy.last()
							.get("policyNumber");
	var dueDate = policy.getDueDate();
	transformed.bottom = 0;

	// Add padding to the last element in the list
	if (policy.get("policyNumber") === lastPolicyNumber) {
		transformed.bottom = 15;
		transformed.backgroundColor = "red";
	}

	transformed.minimumDue = string.formatCurrency(policy.getMinimumDue());
	transformed.formattedDueDate = dueDate.format("MMMM DD, YYYY").toUpperCase();

	transformed.getFormattedDriver = policy.getFormattedDriver;
	transformed.getFormattedVehicle = policy.getFormattedVehicle;
	transformed.typeIcon = policy.getIcon();

	return transformed;
}

function filterPolicies (policyCollection) {
	var filteredPolicies =  policyCollection.filter(function(policy) {
		return parseFloat(policy.get("billDetails").minimumDue) > 0;
	});
	if (filteredPolicies.length === 0) {
		$.noBillsMessage.text = "There are currently no bills on your account";
	} else {
		$.noBillsMessage.text = "";
	}

	return filteredPolicies;
}

function init() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".viewed");

	Alloy.Globals.apm.leaveBreadcrumb("enter init: "+controller.title);
    Alloy.Globals.setUpNavBar({
        currentWindow: $.viewBills,
        appWrapper: $.AppWrapper
    });

    Alloy.Collections.policy.fetch({
    	success: function () {
    	},
    	error: function (err) {
    		alert('could not get list of policies');
		    Alloy.Globals.apm.logHandledException(err);
    	}
    });
	Alloy.Globals.apm.leaveBreadcrumb("exit init: "+controller.title);

}

init();