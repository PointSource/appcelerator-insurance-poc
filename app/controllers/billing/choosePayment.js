// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var controller = {
	selectedPayment: 0
}

function goToPayBill (event) {
	Ti.Analytics.featureEvent(controller.title+".goToPayBill", {
		plaform: Ti.Platform.osname,
		selectedPayment: controller.selectedPayment
	});

	if (controller.selectedPayment === 0) {
		alert("Please select a payment amount");
	} else {
		Alloy.Globals.Navigator.open("billing/payBill", {
			currentPolicy: args.currentPolicy,
			selectedPayment: controller.selectedPayment,
			onPaymentMade: args.onPaymentMade
		}, controller.title);
	}
}

function handlePaymentChange (data) {
	if (data.selectedIndex === 0) {
		controller.selectedPayment = args.currentPolicy.get("billDetails").minimumDue;
	} else if (data.selectedIndex === 1) {
		controller.selectedPayment = args.currentPolicy.get("billDetails").totalAmountDue;
	}
}

function init() {
	$.currentPolicy.set(args.currentPolicy.attributes);

	$.cardHeader.text = "PAY "+args.currentPolicy.get("type");

	$.typeIcon.text = args.currentPolicy.getIcon();

	if (args.currentPolicy.getIsOverdue()) {
		$.minimumDueTitle.color = Alloy.Globals.Colors.primary_accent;
		$.minimumDueTitle.text = "MINIMUM DUE NOW";
		$.minimumDueAmount.color =  Alloy.Globals.Colors.primary_accent;
	}

}

init();