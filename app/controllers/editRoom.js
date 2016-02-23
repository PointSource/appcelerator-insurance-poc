var args = arguments[0] || {};
var roomList = Alloy.Collections.room;


function filterRooms (collection) {
	return collection.filter(function (room) {
		return room.id === args.roomId;
	});
}

function init () {

    Alloy.Globals.setUpNavBar({
        currentWindow: $.editRoom,
        appWrapper: $.AppWrapper
    });	

	roomList.fetch();
}

// Initialize Page
init()