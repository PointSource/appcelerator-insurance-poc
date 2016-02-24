var args = arguments[0] || {};
var imageCollection = Alloy.Collections.image;


function filterImages (collection) {
	return collection.filter(function (image) {
		return image.get("room_id") === args.room.id;
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

	imageCollection.fetch();
}

// Initialize Page
init()