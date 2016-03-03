// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var radioButtonList = [];
var selectedIndex = null;

function init () {

	_.each($.args.children || [], function(child, i) {
		var radioButton = Alloy.createController("radioButton", {
			children:[child]
		});

		radioButton.on("click", function () {
			_.each(radioButtonList, function(radioButtonSibling) {
				radioButtonSibling.unselect();
			});
			radioButton.select();
			$.trigger('change', {
				selectedIndex: i
			});
		});

		radioButtonList.push(radioButton);

		if ($.args.selectedIndex && parseInt($.args.selectedIndex, 10) === i) {
			radioButton.select();
		}

		$.radioButtonGroup.add(radioButton.getView());
	});
	
}

init();