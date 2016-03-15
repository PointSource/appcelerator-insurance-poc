var string = require('alloy/string');

var controller = {
	title: "viewRooms",
	roomCollection: Alloy.Collections.room,
	imageCollection: Alloy.Collections.instance('image')
};

function formatRoom (room) {
	var formattedRoom = room.toJSON();
	formattedRoom.value = string.formatCurrency(formattedRoom.value);
	formattedRoom.name = formattedRoom.name.toUpperCase();

	var imagesForRoom = room.getImagesForRoom(controller.imageCollection);
	formattedRoom.numItems = "("+imagesForRoom.length+" items)";

	return formattedRoom;
}

function getTotalEstimate () {
	var sum = controller.roomCollection.getSum();
	$.totalValue.text = string.formatCurrency(sum);
}

function goToAddRoom () {
	Ti.Analytics.featureEvent(controller.title+".select.addRoom");
	Alloy.Globals.Navigator.open("homeInventory/addRoom", {}, controller.title);
}

function onSelectRoom (event) {
	Ti.Analytics.featureEvent(controller.title+".select.editRoom");
	
	var item = event.section.getItemAt(event.itemIndex);
	var room = controller.roomCollection.get(item.properties.room_id);

	Alloy.Globals.Navigator.open("homeInventory/editRoom", {room: room});
}


function init() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".viewed");

	Alloy.Globals.setUpNavBar({
		currentWindow: $.homeInventory,
		appWrapper: $.AppWrapper
	});
	
	controller.imageCollection.fetch();
	controller.roomCollection.fetch();

	// Add event listeners
	controller.roomCollection.on("change", getTotalEstimate);
	controller.roomCollection.on("destroy", getTotalEstimate);

	getTotalEstimate();
	$.houseIcon.text = Alloy.Globals.icomoon.icon("main-home");
}

// Initialize page
init();