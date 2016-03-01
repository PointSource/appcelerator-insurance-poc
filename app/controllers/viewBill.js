var args = arguments[0] || {};

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("paybill", {});
}

function init() {
    Alloy.Globals.setUpNavBar({
        currentWindow: $.viewBill,
        appWrapper: $.AppWrapper
    });

	$.autoIcon.text = Alloy.Globals.icomoon.icon("main-auto");

	var policyCollection = args.policyCollection;

	console.log('policyCollection on viewBill', JSON.stringify(policyCollection));

	console.log('get policy by id', JSON.stringify(policyCollection.get(12345678)));
	console.log('billDetails', JSON.stringify(policyCollection.at(0).get('billDetails')));
	console.log('bill dueDate', JSON.stringify(policyCollection.at(0).get('billDetails').dueDate));


}

init();