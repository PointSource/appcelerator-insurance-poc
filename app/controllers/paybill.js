var args = arguments[0] || {};
var camera;

if (OS_ANDROID) {

	$.payBillWindow.orientationModes = [Ti.UI.LANDSCAPE];

	if( Ti.Media.isCameraSupported ) {
	    var androidcamera = require("pw.custom.androidcamera");
	    camera = androidcamera.createCameraView({
	        save_location: "my_app",
	        pictureTimeout: 0,
	        resolutionNamed: androidcamera.RESOLUTION_480
	    });

	    camera.addEventListener("picture_taken", function(event){
	        alert("Image saved to "+event.path);
	    });

	    $.cameraView.addEventListener("close", function(){
	        camera = null;
	    });

	    $.cameraView.add(camera);
	} else {
	    alert("No camera found!");
	}

}


function takePicture() {

	if(OS_IOS){
		Titanium.Media.showCamera({
			success:function(event) {
				// called when media returned from the camera
				Ti.API.debug('Our type was: '+event.mediaType);
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					var imageView = Ti.UI.createImageView({
						width:win.width,
						height:win.height,
						image:event.media
					});
					win.add(imageView);
				} else {
					alert("got the wrong type back ="+event.mediaType);
				}
			},
			cancel:function() {
				// called when user cancels taking a picture
			},
			error:function(error) {
				// called when there's an error
				var a = Titanium.UI.createAlertDialog({title:'Camera'});
				if (error.code == Titanium.Media.NO_CAMERA) {
					a.setMessage('Please run this test on device');
				} else {
					a.setMessage('Unexpected error: ' + error.code);
				}
				a.show();
			},
			saveToPhotoGallery:true,
		    // allowEditing and mediaTypes are iOS-only settings
			allowEditing:true,
			mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}

	else if (OS_ANDROID) {
		if( Ti.Media.isCameraSupported ) {
	        camera.snapPicture();
	    }	else {
	    	alert("No camera found!");
		}

	}
}