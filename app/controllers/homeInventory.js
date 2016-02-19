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

var pageInfo = {
	totalValue: 175
}



myRooms.add(room);
myRooms.add(room2);
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