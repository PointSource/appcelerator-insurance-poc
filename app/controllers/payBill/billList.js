var args = arguments[0] || {};
var moment = require('alloy/moment');
var string = require('alloy/string');
var policyCollection = Alloy.Collections.policy;
var roomCollection = Alloy.Collections.room;

function formatPolicy(policy) {
	var transformed = policy.toJSON();
	transformed.totalAmountDue = string.formatCurrency(transformed.billDetails.totalAmountDue);
	transformed.minimumDue = string.formatCurrency(transformed.billDetails.minimumDue);
	var dueDate = moment(transformed.billDetails.dueDate, "MM/DD/YYYY")
	transformed.formattedDueDate = dueDate.format("MMMM DD, YYYY").toUpperCase();
	return transformed;

}


function init() {
    Alloy.Globals.setUpNavBar({
        currentWindow: $.billList,
        appWrapper: $.AppWrapper
    });

 	policyCollection.fetch();
 	roomCollection.fetch();

}

init();