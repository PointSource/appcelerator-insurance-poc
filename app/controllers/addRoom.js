Alloy.Globals.setUpNavBar({
	currentWindow: $.addRoom,
	appWrapper: $.AppWrapper
});

var myRooms = Alloy.Collections.room;

function addRoom() {
    var room = Alloy.createModel('room', {
        name : $.nameInput.value,
        value : $.valueInput.value
    });
    myRooms.add(room);
    room.save();

    // Close the window.
    $.addRoom.close();
}