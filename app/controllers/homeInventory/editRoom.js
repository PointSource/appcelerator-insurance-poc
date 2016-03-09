var args = $.args;
var imageCollection = Alloy.Collections.image;


function filterImages (collection) {
	return args.room.getImagesForRoom(collection);
}


function saveRoom () {
	var room = args.room;
	room.set('name', $.nameInput.value);
	room.set('value', parseInt($.valueInput.value, 10));
	room.save();

	Alloy.Globals.close($.editRoom);
}

function deleteRoom () {
	var room = args.room;
	var imagesForRoom = args.room.getImagesForRoom(imageCollection);

	// Delete room
	room.destroy();

	// Remove all images for this room, once this page closes
	$.editRoom.addEventListener("close", function () {
		imagesForRoom.forEach(function(imageModel) {
			imageModel.destroy();
		});
	})

	$.editRoom.close();
}

function init () {
	$.roomDetail.set(args.room.attributes);

	imageCollection.fetch();
}


exports.id = 'homeInventory/editRoom';
exports.title = 'Edit Room';
exports.init = init;