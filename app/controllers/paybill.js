var cardio = require('com.pointsource.card.io');

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
	console.log("Canceled scan");
	removeListeners();
}

function removeListeners() {
	cardio.removeEventListener("scan", handleScan);
	cardio.removeEventListener("cancel", handleCancel);
}

function submit() {
	alert("submit payment");
}

function openCardIO() {

	cardio.addEventListener("scan", handleScan);
	cardio.addEventListener("cancel", handleCancel);

	console.log("Opening Card.io");
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