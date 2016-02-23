var roomList = Alloy.Collections.room;
var id;

if ($model) {
	id = $model.id;
}


function saveRoom () {
	var room = roomList.get(id);
	room.set('name', $.nameInput.value);
	room.set('value', parseInt($.valueInput.value, 10));
	room.save();
    $.editRoom.close();
}
