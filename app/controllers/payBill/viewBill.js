function goToPayBill (event) {
	var billingService = require("/lib/billing-service");
	billingService.setCurrentPolicy($model);
	Alloy.Globals.Navigator.open("payBill/paymentOptions");
}

function init() {
	if ($model.getIsOverdue()) {
		$.payNowButton.color = Alloy.Globals.Colors.primary_accent;
		$.payNowButton.borderColor = Alloy.Globals.Colors.primary_accent;

		$.dueLabel.color =  Alloy.Globals.Colors.primary_accent;
	}
}

init();