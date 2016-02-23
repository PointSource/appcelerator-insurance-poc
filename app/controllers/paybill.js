var cardio = require('com.pointsource.card.io');
function openCardIO() {

	console.log("Opening Card.io");
	cardio.addEventListener("scan", function(e) {
		console.log('scan event', e);
		var cardNumber = e.cardNumber;
		var cardType = e.cardType;
		var cardholderName = e.cardholderName;
		var cvv = e.cvv;
		var expiryMonth = e.expiryMonth;
		var expiryYear = e.expiryYear;
		var postalCode = e.postalCode;
	});

	cardio.addEventListener("cancel", function(err, res) {
		console.log("Canceled scan");
	});

	cardio.scanCard({
		languageOrLocale: "fr",
		collectPostalCode: true,
		collectCardholderName: true,
		guideColor: "yellow",
		navigationBarTintColor: "green",
		restrictPostalCodeToNumericOnly: true
	});
}
