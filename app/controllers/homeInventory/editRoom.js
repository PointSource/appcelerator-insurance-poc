var args = arguments[0] || {};
var controller = {
	title: "editRoom",
	imageCollection: Alloy.Collections.image
}


function filterImages (collection) {
	return args.room.getImagesForRoom(collection);
}


function saveRoom () {
	Ti.Analytics.featureEvent(controller.title+".saveRoom");

	var room = args.room;
	room.set('name', $.nameInput.value);
	room.set('value', parseInt($.valueInput.value, 10));
	room.save();

	$.editRoom.close();
}

function deleteRoom () {
	Ti.Analytics.featureEvent(controller.title+".deleteRoom");

	var room = args.room;
	var imagesForRoom = args.room.getImagesForRoom(controller.imageCollection);

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
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".viewed");

    Alloy.Globals.setUpNavBar({
        currentWindow: $.editRoom,
        appWrapper: $.AppWrapper
    });	

	$.roomDetail.set(args.room.attributes);

	controller.imageCollection.fetch();
}

// Initialize Page
init()