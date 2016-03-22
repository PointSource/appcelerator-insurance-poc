var args = $.args;

var controller = {
	title: "billInfo"
};

function goToPaymentOptions (event) {
	Ti.Analytics.featureEvent(controller.title+".goToPaymentOptions");
	Alloy.Globals.Navigator.open("billing/paymentOptions", {currentPolicy: $model});
}

function init() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".viewed");
	Alloy.Globals.apm.leaveBreadcrumb("enter init: viewBill");

	// Style overdue bills
	if ($model.getIsOverdue()) {
		$.payNowButton.color = Alloy.Globals.Colors.primary_accent;
		$.payNowButton.borderColor = Alloy.Globals.Colors.primary_accent;
		$.dueLabel.color =  Alloy.Globals.Colors.primary_accent;
	}
	Alloy.Globals.apm.leaveBreadcrumb("exit init: viewBill");
}

init();
