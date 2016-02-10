var args = arguments[0] || {};

function goToPayBill (event) {
	var payBillView = Alloy.createController("paybill", {}).getView();

    if (OS_IOS) {
        $.nav.openWindow(payBillView);
    }
    if (OS_ANDROID) {
        payBillView.open();
    }
}
