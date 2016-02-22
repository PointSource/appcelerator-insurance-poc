var string = require('alloy/string');

Alloy.Globals.setUpNavBar({
	currentWindow: $.homeInventory,
	appWrapper: $.AppWrapper
});

var myRooms = Alloy.Collections.room;
myRooms.fetch();

function formatRoom (room) {
	var formattedRoom = room.toJSON();
	formattedRoom.value = string.formatCurrency(formattedRoom.value);
	formattedRoom.numItems = "("+4+" items)";
	formattedRoom.name = formattedRoom.name.toUpperCase();
	return formattedRoom;
}

function getTotalEstimate () {
	var sum = myRooms.getSum();
	$.totalValue.text = string.formatCurrency(sum);
}

function goToAddRoom () {
	Alloy.Globals.Navigator.open("addRoom", {});
}

// Add event listeners
myRooms.on("change", getTotalEstimate);

// Initialize page
getTotalEstimate();
$.houseIcon.text = Alloy.Globals.icomoon.icon("main-home");
