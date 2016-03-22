// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var controller = {
	title: "paymentOptions"
}

function init() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".viewed");

    Alloy.Globals.setUpNavBar({
        currentWindow: $.paymentOptions,
        appWrapper: $.AppWrapper
    });	
	
	$.currentPolicy.set(args.currentPolicy.attributes);


	var choosePaymentController = Alloy.createController("billing/choosePayment",
	{
		currentPolicy: args.currentPolicy,
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
	});

	$.card.add(choosePaymentController.getView());
}

init();