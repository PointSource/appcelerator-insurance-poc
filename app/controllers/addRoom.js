var roomList = Alloy.Collections.room;
var imageCount = 0;

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
    imageCount++;
}

function takePicture() {
    $.camera.snapPicture();
}


function init() {
    Alloy.Globals.setUpNavBar({
        currentWindow: $.addRoom,
        appWrapper: $.AppWrapper
    });

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