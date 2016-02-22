var args = arguments[0] || {};
var selectedRoom = Alloy.Models.room;

selectedRoom.set('id', args.roomId);
selectedRoom.fetch();

function saveRoom () {
	selectedRoom.set('name', $.nameInput.value);
	selectedRoom.set('value', parseInt($.valueInput.value, 10));
	selectedRoom.save();
    $.editRoom.close();
}