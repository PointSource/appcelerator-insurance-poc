var roomList = Alloy.Collections.room;
var id;

if ($model) {
	id = $model.id;
}

function editRoom () {
	var room = roomList.get(id);
	Alloy.Globals.Navigator.open("editRoom", {roomId: id});
}