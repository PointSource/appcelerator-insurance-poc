// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var selected = false;

function unselectRadio () {
	var style = $.createStyle({
		classes: ["radio-unselected"]
	});
	$.radio.applyProperties(style);

	selected = false;
	$.trigger('change', {
		selected: selected
	});
}

function selectRadio () {
	var style = $.createStyle({
		classes: ["radio-selected"]
	});
	$.radio.applyProperties(style);

	selected = true;
	$.trigger('change', {
		selected: selected
	});
}

function toggleSelected () {
	if (!selected) {
		selectRadio();
	} else {
		unselectRadio();
	}
}

function init () {
	if ($.args.selected === true || $.args.selected === 'true') {
		selectRadio();
	} else if ($.args.selected === false || $.args.selected === 'false') {
		unselectRadio();
	}

	_.each($.args.children || [], function(child) {
		$.radioContent.add(child);
	});

	$.radioContent.height = Ti.UI.SIZE;
	
}

init();
