var addRoomPage = {
    roomCollection: Alloy.Collections.room,
    imageCollection: Alloy.Collections.instance('image'),
    images: []
}

function submit() {
    if ($.valueInput.value.length === 0) {
        alert("Please fill out all fields");
        return;
    }
    var parsedValue = parseInt($.valueInput.value, 10);
    if (isNaN(parsedValue)) {
        alert("Invalid estimated value. Please only enter numbers.");
        return;
    }
    else {
        var room = Alloy.createModel('room', {
            name : $.nameInput.value,
            value : parsedValue
        });

        if (room.isValid()) {
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
            Alloy.Globals.close();
        } else {
            alert("Please fill out all fields");
        }
    }
}

function closeKeyboard () {
    $.valueInput.blur();
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
        left: 3,
        right: 3,
        top: 5
    });

    // Add the image to the crop-view.
    // Position it left and above origin.
    cropView.add(baseImage);
    baseImage.left=0;
    baseImage.top="-30";

    $.imagePreview.add(cropView);
    $.imagePreview.scrollToBottom();

    addRoomPage.images.push(event.image);
}

function takePicture() {
    $.camera.snapPicture();
}


function init() {
    $.cameraIcon.text = Alloy.Globals.icomoon.icon("camera");

    $.nameInput.addEventListener("return", function() {
        $.valueInput.focus();
    });

    $.valueInput.addEventListener("return", function() {
        submit();
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

    $.imagePreview.addEventListener("swipe", function(e) {
        e.cancelBubble = true;
    })
}

exports.id = 'homeInventory/addRoom';
exports.title = 'Add Room';
exports.init = init;