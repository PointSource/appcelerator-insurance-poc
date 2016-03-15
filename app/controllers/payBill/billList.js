var string = require('alloy/string');

var controller = {
	title: "billList"
}

function formatPolicy(policy) {
	Alloy.Globals.apm.leaveBreadcrumb("enter formatPolicy: billList");
	var transformed = policy.toJSON();

	transformed.minimumDue = string.formatCurrency(policy.getMinimumDue());
	var dueDate = policy.getDueDate();
	transformed.formattedDueDate = dueDate.format("MMMM DD, YYYY").toUpperCase();

	transformed.getFormattedDriver = policy.getFormattedDriver;
	transformed.getFormattedVehicle = policy.getFormattedVehicle;
	transformed.typeIcon = policy.getIcon();

	Alloy.Globals.apm.leaveBreadcrumb("exit formatPolicy: billList");
	return transformed;
}

function filterPolicies (policyCollection) {
	return policyCollection.filter(function(policy) {
		return parseFloat(policy.get("billDetails").minimumDue) > 0;
	});
}

function init() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".viewed");

	Alloy.Globals.apm.leaveBreadcrumb("enter init: billList");
    Alloy.Globals.setUpNavBar({
        currentWindow: $.billList,
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
	Alloy.Globals.apm.leaveBreadcrumb("exit init: billList");
}

init();