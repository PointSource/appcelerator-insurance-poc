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
		// , { 
		//    name : 'LIVING ROOM', 
		//    value: 1250 
		// }, { 
		//    name : 'DINING ROOM', 
		//    value: 525 
		// }, { 
		//    name : 'BEDROOM 1', 
		//    value: 525 
		// }, { 
		//    name : 'BEDROOM 2', 
		//    value: 1250 
		// }, { 
		//    name : 'BEDROOM 3', 
		//    value: 1250 
		// }, { 
		//    name : 'ATTIC', 
		//    value: 525 
		// }, { 
		//    name : 'BASEMENT', 
		//    value: 525 
		// }, { 
		//    name : 'GARAGE', 
		//    value: 525 
		// }
	]);
}

function getTotalEstimate () {
	var sum = myRooms.getSum();

	$.totalValue.text = "$"+sum;
}

function goToAddRoom () {
	Alloy.Globals.Navigator.open("addRoom", {});
}

// Add event listeners
myRooms.on("change", getTotalEstimate);

// Initialize page
getTotalEstimate();
$.houseIcon.text = Alloy.Globals.icomoon.icon("main-home");
