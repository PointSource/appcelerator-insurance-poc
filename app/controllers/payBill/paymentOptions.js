// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var controller = {
	title: "paymentOptions",
	selectedPayment: 0
}

function goToPayBill (event) {
	Ti.Analytics.featureEvent(controller.title+".goToPayBill", {
		plaform: Ti.Platform.osname,
		selectedPayment: controller.selectedPayment
	});

	if (selectedPayment === 0) {
		alert("Please select a payment amount");
	} else {
		var payBillController = Alloy.createController("payBill/payBill", {
			currentPolicy: args.currentPolicy,
			selectedPayment: controller.selectedPayment
		});

		function paymentHandler(e) {
			Ti.Analytics.featureEvent(controller.title+".paymentMade", {
				plaform: Ti.Platform.osname
			});
			alert("Payment of $"+controller.selectedPayment+" submitted");
			$.paymentOptions.close();
			removeListener();
		}
		function removeListener() {
		  	payBillController.off('paymentMade', paymentHandler);
		}
		payBillController.on('paymentMade', paymentHandler);

		Alloy.Globals.Navigator.openWindow(payBillController.getView());
	}
}

function handlePaymentChange (data) {
	console.log('handlePaymentChange');
	if (data.selectedIndex === 0) {
		controller.selectedPayment = args.currentPolicy.get("billDetails").minimumDue;
	} else if (data.selectedIndex === 1) {
		controller.selectedPayment = args.currentPolicy.get("billDetails").totalAmountDue;
	}
}

function init() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".viewed");

    Alloy.Globals.setUpNavBar({
        currentWindow: $.paymentOptions,
        appWrapper: $.AppWrapper
    });	
	
	$.currentPolicy.set(args.currentPolicy.attributes);

	$.paymentOptions.title = "PAY "+args.currentPolicy.get("type");

	$.typeIcon.text = args.currentPolicy.getIcon();

	if (args.currentPolicy.getIsOverdue()) {
		$.minimumDueTitle.color = Alloy.Globals.Colors.primary_accent;
		$.minimumDueTitle.text = "MINIMUM DUE NOW";
		$.minimumDueAmount.color =  Alloy.Globals.Colors.primary_accent;
	}
}

init();