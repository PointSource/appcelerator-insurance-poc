var string = require('alloy/string');
var homeInventoryPage = {
	roomCollection: Alloy.Collections.room,
	imageCollection: Alloy.Collections.instance('image')
};

function formatRoom (room) {
	var formattedRoom = room.toJSON();
	formattedRoom.value = string.formatCurrency(formattedRoom.value);
	formattedRoom.name = formattedRoom.name.toUpperCase();

	var imagesForRoom = homeInventoryPage.imageCollection.where({room_id: room.id});
	formattedRoom.numItems = "("+imagesForRoom.length+" items)";

	return formattedRoom;
}

function getTotalEstimate () {
	var sum = homeInventoryPage.roomCollection.getSum();
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
	
	homeInventoryPage.imageCollection.fetch();
	homeInventoryPage.roomCollection.fetch();

	// Add event listeners
	homeInventoryPage.roomCollection.on("change", getTotalEstimate);
	homeInventoryPage.imageCollection.on("change", redrawRoomList);

	getTotalEstimate();
	$.houseIcon.text = Alloy.Globals.icomoon.icon("main-home");
}

// Initialize page
init();