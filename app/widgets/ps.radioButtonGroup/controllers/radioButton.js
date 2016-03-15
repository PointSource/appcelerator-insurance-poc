// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var controller = {
	selected: false
}

function unselect () {
	var style = $.createStyle({
		classes: ["radio-unselected"]
	});
	$.radio.applyProperties(style);

	controller.selected = false;
}

function select () {
	var style = $.createStyle({
		classes: ["radio-selected"]
	});
	$.radio.applyProperties(style);

	controller.selected = true;
}

function handleClick () {
	$.trigger('click', {});
}

function init () {
	if ($.args.selected === true || $.args.selected === 'true') {
		select();
	} else if ($.args.selected === false || $.args.selected === 'false') {
		unselect();
	}

	_.each($.args.children || [], function(child) {
		$.radioContent.add(child);
	});

	$.radioContent.height = Ti.UI.SIZE;
	
}

init();

exports.select = select;
exports.unselect = unselect;
