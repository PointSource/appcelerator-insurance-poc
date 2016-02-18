// function onPictureTaken(event) {
//     console.log(event.image); // the taken photo

//     var imageView = Ti.UI.createImageView({
// 		width:70,
// 		image:event.image
// 	});
// 	$.imagePreview.add(imageView);
// }

// function switchCamera() {
// 	$.camera.switchCamera();
// }
// function takePicture() {
// 	$.camera.snapPicture();
// }

function close () {
	$.index.close();
}

function toggleMenu () {
	$.menu.toggleMenu();
}

Alloy.Globals.setUpNavBar({
	currentWindow: $.index, 
	menu: $.menu,
	appWrapper: $.AppWrapper,
	menuIcon: $.menuIcon2,
	backIcon: $.backIcon
});
