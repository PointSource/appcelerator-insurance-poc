var title = "viewBill";
Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".viewed");

function goToPayBill (event) {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".goToPayBill");
	Alloy.Globals.Navigator.open("payBill/paymentOptions", {currentPolicy: $model});
}

function init() {
	Alloy.Globals.apm.leaveBreadcrumb("enter init: viewBill");
	if ($model.getIsOverdue()) {
		$.payNowButton.color = Alloy.Globals.Colors.primary_accent;
		$.payNowButton.borderColor = Alloy.Globals.Colors.primary_accent;

		$.dueLabel.color =  Alloy.Globals.Colors.primary_accent;
	}
	Alloy.Globals.apm.leaveBreadcrumb("exit init: viewBill");
}

init();
