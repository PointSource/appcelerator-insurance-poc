var args = $.args;
var cardio = require('com.pointsource.card.io');
var controller = {
	title: "payBill",
	policyCollection: Alloy.Collections.instance('policy')
}

function handleScan(e) {
	$.cardNumberField.value = e.cardNumber;
	$.cardholderNameField.value = e.cardholderName;
	$.postalCodeField.value = e.postalCode;
	$.cvvField.value = e.cvv;
	var cardType = e.cardType;
	var cvv = e.cvv;
	var expiryMonth = e.expiryMonth;
	var expiryYear = e.expiryYear;
	removeListeners();
}

function handleCancel(e) {
	removeListeners();
}

function removeListeners() {
	cardio.removeEventListener("scan", handleScan);
	cardio.removeEventListener("cancel", handleCancel);
}

function submit() {

	var payment = Alloy.createModel('payment');

	payment.set("policyNumber", args.currentPolicy.get("policyNumber"));
	payment.set("paymentAmount", args.selectedPayment);

	payment.save({}, {
		success: function () {
			controller.policyCollection.fetch({
				success: function() {
					$.trigger('paymentMade');
					$.payBillWindow.close();
				}, error: function() {
					alert('could not submit payment');
				}
			});
		}, error: function () {
			alert('could not submit payment');
		}
	});


}

function openCardIO() {

	cardio.addEventListener("scan", handleScan);
	cardio.addEventListener("cancel", handleCancel);

	cardio.scanCard({
		languageOrLocale: "en",
		collectPostalCode: true,
		collectCardholderName: true,
		guideColor: "white",
		navigationBarTintColor: "#eeeeee",
		restrictPostalCodeToNumericOnly: true
	});
}

function closeKeyboard(e) {
	$[e.source.currentField].blur();
}

function focusNextField(e) {
	$[e.source.nextField].focus();
}


function init () {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".viewed");
	
	Alloy.Globals.setUpNavBar({
		currentWindow: $.payBillWindow,
		appWrapper: $.AppWrapper
	});	

    $.cameraIcon.text = Alloy.Globals.icomoon.icon("camera");

    $.cardholderNameField.addEventListener("return", function() {
        $.postalCodeField.focus();
    });

    $.cvvField.addEventListener("return", function() {
        submit();
    });
}

init();