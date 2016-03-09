var string = require('alloy/string');
var homeInventoryPage = {
	roomCollection: Alloy.Collections.room,
	imageCollection: Alloy.Collections.instance('image')
};

function formatRoom (room) {
	var formattedRoom = room.toJSON();
	formattedRoom.value = string.formatCurrency(formattedRoom.value);
	formattedRoom.name = formattedRoom.name.toUpperCase();

	var imagesForRoom = room.getImagesForRoom(homeInventoryPage.imageCollection);
	formattedRoom.numItems = "("+imagesForRoom.length+" items)";

	return formattedRoom;
}

function getTotalEstimate () {
	var sum = homeInventoryPage.roomCollection.getSum();
	$.totalValue.text = string.formatCurrency(sum);
}

function goToAddRoom () {
	Alloy.Globals.Navigator.open("homeInventory/addRoom", {});
}


function init() {	
	homeInventoryPage.imageCollection.fetch();
	homeInventoryPage.roomCollection.fetch();

	// Add event listeners
	homeInventoryPage.roomCollection.on("change", getTotalEstimate);
	homeInventoryPage.roomCollection.on("destroy", getTotalEstimate);
	homeInventoryPage.imageCollection.on("change", redrawRoomList);

	getTotalEstimate();
	$.houseIcon.text = Alloy.Globals.icomoon.icon("main-home");
}

exports.id = 'homeInventory/homeInventory';
exports.title = 'Home Inventory';
exports.init = init;