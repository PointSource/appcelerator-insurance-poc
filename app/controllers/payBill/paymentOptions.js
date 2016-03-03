// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;

function goToPayBill (event) {
	Alloy.Globals.Navigator.open("payBill/payBill", {currentPolicy: args.currentPolicy});
}

function init() {

    Alloy.Globals.setUpNavBar({
        currentWindow: $.paymentOptions,
        appWrapper: $.AppWrapper
    });	
	
	$.currentPolicy.set(args.currentPolicy.attributes);

	$.paymentOptions.title = "PAY "+args.currentPolicy.get("type");

	switch (args.currentPolicy.get("type")) {
		case "AUTO":
			$.typeIcon.text = Alloy.Globals.icomoon.icon("main-auto");
			break;
		case "RENTERS":
		case "HOME":
			$.typeIcon.text = Alloy.Globals.icomoon.icon("main-home");
			break;
		default:
			$.typeIcon.text = Alloy.Globals.icomoon.icon("main-auto");
	}

	if (args.currentPolicy.getIsOverdue()) {
		$.minimumDueTitle.color = Alloy.Globals.Colors.primary_accent;
		$.minimumDueTitle.text = "MINIMUM DUE NOW";
		$.minimumDueAmount.color =  Alloy.Globals.Colors.primary_accent;
	}
}

init();