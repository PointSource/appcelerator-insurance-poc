// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var selectedPayment = 0;

function goToPayBill (event) {
	if (selectedPayment === 0) {
		alert("Please select a payment amount");
	} else {
		var payBillController = Alloy.createController("payBill/payBill", {
			currentPolicy: args.currentPolicy,
			selectedPayment: selectedPayment
		});

		function paymentHandler(e) {
			alert("Payment of $"+selectedPayment+" submitted");
			Alloy.Globals.close();
			removeListener();
		}
		function removeListener() {
		  	payBillController.off('paymentMade', paymentHandler);
		}
		payBillController.on('paymentMade', paymentHandler);

		Alloy.Globals.Navigator.openController(payBillController);
	}
}

function handlePaymentChange (data) {
	if (data.selectedIndex === 0) {
		selectedPayment = args.currentPolicy.get("billDetails").minimumDue;
	} else if (data.selectedIndex === 1) {
		selectedPayment = args.currentPolicy.get("billDetails").totalAmountDue;
	}
}

function init() {

	$.currentPolicy.set(args.currentPolicy.attributes);

	$.typeIcon.text = args.currentPolicy.getIcon();

	if (args.currentPolicy.getIsOverdue()) {
		$.minimumDueTitle.color = Alloy.Globals.Colors.primary_accent;
		$.minimumDueTitle.text = "MINIMUM DUE NOW";
		$.minimumDueAmount.color =  Alloy.Globals.Colors.primary_accent;
	}
}

exports.id = 'payBill/paymentOptions';
exports.title = 'Payment '+args.currentPolicy.get("type");
exports.init = init;