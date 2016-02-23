var cardio = require('com.pointsource.card.io');

function handleScan(e) {
	console.log('scan event', e);
	var cardNumber = e.cardNumber;
	var cardType = e.cardType;
	var cardholderName = e.cardholderName;
	var cvv = e.cvv;
	var expiryMonth = e.expiryMonth;
	var expiryYear = e.expiryYear;
	var postalCode = e.postalCode;
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


function openCardIO() {

	cardio.addEventListener("scan", handleScan);
	cardio.addEventListener("cancel", handleCancel);

	console.log("Opening Card.io");
	cardio.scanCard({
		languageOrLocale: "fr",
		collectPostalCode: true,
		collectCardholderName: true,
		guideColor: "yellow",
		navigationBarTintColor: "green",
		restrictPostalCodeToNumericOnly: true
	});
}
