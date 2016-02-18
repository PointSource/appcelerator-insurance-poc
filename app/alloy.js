// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//


var IconicFont = require('/lib/IconicFont');
Alloy.Globals.icomoon = new IconicFont({
    font: '/lib/icomoon'
});

Alloy.Globals.findChildrenByClass = function (parent, className) {
	var matchingChildren = []
	for (i in parent.children) {
		var child = parent.children[i];
		if (child.classes.indexOf(className) !== -1) {
			matchingChildren.push(child);
		}
	}
	return matchingChildren;
}
