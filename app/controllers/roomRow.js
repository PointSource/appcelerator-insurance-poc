var roomList = Alloy.Collections.room;
var id;

if ($model) {
	id = $model.id;
}

function editRoom () {
	// alert('id = '+id);
	var room = roomList.get(id);
	// alert('room = '+room.get('name'));
	Alloy.Globals.Navigator.open("editRoom", {roomId: id});
}