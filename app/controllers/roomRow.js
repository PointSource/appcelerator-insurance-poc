var roomList = Alloy.Collections.room;
var id;

if ($model) {
	id = $model.id;
}

function editRoom () {
	Alloy.Globals.Navigator.open("editRoom", {roomId: id});
}