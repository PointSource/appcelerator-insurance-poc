// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;
var controller = {
	radioButtonList: []
}

function init () {

	_.each($.args.children || [], function(child, i) {
		var radioButton = Widget.createController("radioButton", {
			children:[child]
		});

		radioButton.on("click", function () {
			_.each(controller.radioButtonList, function(radioButtonSibling) {
				radioButtonSibling.unselect();
			});
			radioButton.select();
			$.trigger('change', {
				selectedIndex: i
			});
		});

		controller.radioButtonList.push(radioButton);

		if ($.args.selectedIndex && parseInt($.args.selectedIndex, 10) === i) {
			radioButton.select();
			setTimeout(function () {
				$.trigger('change', {
					selectedIndex: i
				})
			}, 10);
		}

		$.radioButtonGroup.add(radioButton.getView());
	});
	
}

init();