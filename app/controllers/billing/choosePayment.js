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

	if (controller.selectedPayment === 0) {
		alert("Please select a payment amount");
	} else {
		Alloy.Globals.Navigator.open("billing/payBill", {
			currentPolicy: args.currentPolicy,
			selectedPayment: controller.selectedPayment,
			onPaymentMade: function(selectedPayment) {
				Ti.Analytics.featureEvent(controller.title+".paymentMade");
				$.paymentOptions.close();

				if (OS_IOS) {
					alert("Payment of $"+selectedPayment+" submitted");
				} else if (OS_ANDROID) {
					var notification = Ti.UI.createNotification({
						message:"Payment of $"+selectedPayment+" submitted",
						duration: Ti.UI.NOTIFICATION_DURATION_LONG
					});
					notification.show();
				}
			}
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