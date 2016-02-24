var addRoomPage = {
    roomCollection: Alloy.Collections.room,
    imageCollection: Alloy.Collections.instance('image'),
    images: []
}

function addRoom() {
    var room = Alloy.createModel('room', {
        name : $.nameInput.value,
        value : parseInt($.valueInput.value, 10)
    });
    addRoomPage.roomCollection.add(room);
    room.save();

    for (i in addRoomPage.images) {
        var image = Alloy.createModel('image', {
            path: addRoomPage.images[i],
            room_id: room.id
        });

        addRoomPage.imageCollection.add(image);
        image.save();
    }

    // Close the window.
    $.addRoom.close();
}

function onPictureTaken(event) {
    var baseImage = Titanium.UI.createImageView({
        image:event.image,
        height: 120
    });

    // Here's the view we'll use to do the cropping. 
    var cropView = Titanium.UI.createView({
        width:60, 
        height:60,
        backgroundColor: 'blue',
        left: 5,
        top: 5
    });

    // Add the image to the crop-view.
    // Position it left and above origin.
    cropView.add(baseImage);
    baseImage.left=0;
    baseImage.top="-30";

    $.imagePreview.add(cropView);

    addRoomPage.images.push(event.image);
}

function takePicture() {
    $.camera.snapPicture();
}


function init() {
    Alloy.Globals.setUpNavBar({
        currentWindow: $.addRoom,
        appWrapper: $.AppWrapper
    });

    $.cameraIcon.text = Alloy.Globals.icomoon.icon("camera");

    if (!Ti.Media.getIsCameraSupported()) {
        alert("No camera is available on this device");
    }

    // If rear camera is not available, and front camera is available,
    // switch to front camera
    if (Ti.Media.availableCameras.indexOf(Ti.Media.CAMERA_REAR) === -1 &&
        Ti.Media.availableCameras.indexOf(Ti.Media.CAMERA_FRONT) !== -1) {
        $.camera.switchCamera();
    }
}

// Initialize Page
init();