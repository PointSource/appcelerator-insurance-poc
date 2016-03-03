// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var selected = false;

function toggleSelected () {
	if (!selected) {
		var style = $.createStyle({
			classes: ["radio-selected"]
		});
		$.radio.applyProperties(style);
	} else {
		var style = $.createStyle({
			classes: ["radio-unselected"]
		});
		$.radio.applyProperties(style);
	}
	selected = !selected;

	$.trigger('change', {
		selected: selected
	});
}

_.each($.args.children || [], function(child) {
	$.radioContent.add(child);
});

$.radioContent.height = Ti.UI.SIZE;

