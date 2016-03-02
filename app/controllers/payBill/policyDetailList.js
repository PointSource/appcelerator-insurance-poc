// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;

function init () {
	// Styles for child views
	var labelStyle = $.createStyle({
		classes: ['card-label', 'header-2']
	});	
	
	var smallLabelStyle = $.createStyle({
		classes: ['card-label', 'small']
	});

	if (args.items && args.title) {
		var label = Ti.UI.createLabel(smallLabelStyle);
		label.text = args.title;
		$.itemList.add(label);
	}

	_.each(args.items, function (item) {
		var label = Ti.UI.createLabel(labelStyle);
		label.text = args.format(item)
		$.itemList.add(label);
	});

}

init();