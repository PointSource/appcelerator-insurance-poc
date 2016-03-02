var args = arguments[0] || {};
var imageCollection = Alloy.Collections.image;


function filterImages (collection) {
	return args.room.getImagesForRoom(collection);
}


function saveRoom () {
	var room = args.room;
	room.set('name', $.nameInput.value);
	room.set('value', parseInt($.valueInput.value, 10));
	room.save();

	$.editRoom.close();
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

    Alloy.Globals.setUpNavBar({
        currentWindow: $.editRoom,
        appWrapper: $.AppWrapper
    });	

	$.roomDetail.set(args.room.attributes);

	imageCollection.fetch();
}

// Initialize Page
init()