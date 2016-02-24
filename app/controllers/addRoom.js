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
}

// Initialize Page
init();