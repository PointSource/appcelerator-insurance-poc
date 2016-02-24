var args = arguments[0] || {};

function filterRooms (collection) {
	return collection.filter(function (room) {
		return room.id === args.roomId;
	});
}

function saveRoom () {
	var room = args.room;
	room.set('name', $.nameInput.value);
	room.set('value', parseInt($.valueInput.value, 10));
	room.save();

	$.editRoom.close();
}

function init () {

    Alloy.Globals.setUpNavBar({
        currentWindow: $.editRoom,
        appWrapper: $.AppWrapper
    });	

	$.roomDetail.set(args.room.attributes);
}

// Initialize Page
init()