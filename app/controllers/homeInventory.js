var string = require('alloy/string');
var myRooms = Alloy.Collections.room;

var room = Alloy.createModel('room', { 
   name : 'BEDROOM', 
   value: 1250 
});
var room2 = Alloy.createModel('room', { 
   name : 'KITCHEN', 
   value: 525 
});

var room3 = Alloy.createModel('room', { 
   name : 'LIVING ROOM', 
   value: 1250 
});
var room4 = Alloy.createModel('room', { 
   name : 'DINING ROOM', 
   value: 525 
});

var room5 = Alloy.createModel('room', { 
   name : 'BEDROOM 1', 
   value: 525 
});
var room6 = Alloy.createModel('room', { 
   name : 'BEDROOM 2', 
   value: 1250 
});
var room7 = Alloy.createModel('room', { 
   name : 'BEDROOM 3', 
   value: 1250 
});
var room8 = Alloy.createModel('room', { 
   name : 'ATTIC', 
   value: 525 
});
var room9 = Alloy.createModel('room', { 
   name : 'BASEMENT', 
   value: 525 
});
var room10 = Alloy.createModel('room', { 
   name : 'GARAGE', 
   value: 525 
});


myRooms.add(room);
myRooms.add(room2);
myRooms.add(room3);
myRooms.add(room4);
myRooms.add(room5);
myRooms.add(room6);
myRooms.add(room7);
myRooms.add(room8);
myRooms.add(room9);
myRooms.add(room10);
// room.save();
// room2.save();


var sum = myRooms.reduce(function(memo, room) {
	return memo + room.get('value');
}, 0);

$.totalValue.text = "$"+sum;


Alloy.Globals.setUpNavBar({
	currentWindow: $.index,
	appWrapper: $.AppWrapper
});

function goToAddRoom () {
	Alloy.Globals.Navigator.open("addRoom", {});
}