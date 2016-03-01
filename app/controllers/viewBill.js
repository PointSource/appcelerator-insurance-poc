var args = arguments[0] || {};
var policyCollection = Alloy.Collections.instance('policy');

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("paybill", {});
}

function init() {
    Alloy.Globals.setUpNavBar({
        currentWindow: $.viewBill,
        appWrapper: $.AppWrapper
    });

	$.autoIcon.text = Alloy.Globals.icomoon.icon("main-auto");

	policyCollection.fetch({
		success: function (successCollection) {
			console.log('success', JSON.stringify(successCollection.toJSON()));
		},
		error: function (errorCollection) {
			console.log('ERROR', JSON.stringify(errorCollection.toJSON()));
		}
	});

}

init();