function goToPayBill (event) {
	var payBillView = Alloy.createController("paybill", {}).getView();

    if (OS_IOS) {
        $.index.openWindow(payBillView);
    }
    if (OS_ANDROID) {
        payBillView.open();
    }
}

$.index.open();
