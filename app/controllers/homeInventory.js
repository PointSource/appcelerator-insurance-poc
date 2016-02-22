var string = require('alloy/string');

Alloy.Globals.setUpNavBar({
	currentWindow: $.homeInventory,
	appWrapper: $.AppWrapper
});


var myRooms = Alloy.Collections.room;

// Initialize collection if it's empty
if (myRooms.length === 0) {
	myRooms.add([{ 
		   name : 'BEDROOM', 
		   value: 1250 
		}, { 
		   name : 'KITCHEN', 
		   value: 525 
		}
	]);
}

function formatRoom (room) {
	var formattedRoom = room.toJSON();
	formattedRoom.value = string.formatCurrency(formattedRoom.value);
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
