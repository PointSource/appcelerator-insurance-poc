var string = require('alloy/string');
var homeInventoryPage = {
	roomList: Alloy.Collections.room
};


function formatRoom (room) {
	var formattedRoom = room.toJSON();
	formattedRoom.value = string.formatCurrency(formattedRoom.value);
	formattedRoom.numItems = "("+4+" items)";
	formattedRoom.name = formattedRoom.name.toUpperCase();
	return formattedRoom;
}

function getTotalEstimate () {
	var sum = homeInventoryPage.roomList.getSum();
	$.totalValue.text = string.formatCurrency(sum);
}

function goToAddRoom () {
	Alloy.Globals.Navigator.open("addRoom", {});
}


function init() {
	Alloy.Globals.setUpNavBar({
		currentWindow: $.homeInventory,
		appWrapper: $.AppWrapper
	});
	
	homeInventoryPage.roomList.fetch();

	// Add event listeners
	homeInventoryPage.roomList.on("change", getTotalEstimate);

	getTotalEstimate();
	$.houseIcon.text = Alloy.Globals.icomoon.icon("main-home");
}

// Initialize page
init();