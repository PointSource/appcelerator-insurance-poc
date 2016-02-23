var roomList = Alloy.Collections.room;

function addRoom() {
    var room = Alloy.createModel('room', {
        name : $.nameInput.value,
        value : parseInt($.valueInput.value, 10)
    });
    roomList.add(room);
    room.save();

    // Close the window.
    $.addRoom.close();
}

function onPictureTaken(event) {
    console.log(event.image); // the taken photo

    var imageView = Ti.UI.createImageView({
        width:70,
        image:event.image
    });
    $.imagePreview.add(imageView);
}

function takePicture() {
    $.camera.snapPicture();
}


function init() {
    Alloy.Globals.setUpNavBar({
        currentWindow: $.addRoom,
        appWrapper: $.AppWrapper
    });
}

// Initialize Page
init();