var controller = {
	title: "dashboard"
}

function onSelectIcon(event) {
	if (this.controllerLink) {
		Ti.Analytics.featureEvent(controller.title+".select."+this.controllerLink);
		Alloy.Globals.Navigator.open(this.controllerLink, {}, controller.title);
	}
}

function resetBills () {
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			alert('reset bills');
		},
		onerror: function(e) {
			alert("could not reset bills")
		},
		timeout : 5000
	});
		
	xhr.open("POST", Alloy.Globals.url+"/payment/reset");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
}

function init() {
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+controller.title+".viewed");

	Alloy.Globals.setUpNavBar({
		currentWindow: $.dashboard,
		appWrapper: $.AppWrapper,
		iosBackButton: false,
		androidMenu: true
	});

	var dashboardSectionHeight = "130";
	if (Alloy.Globals.aspectRatio > 1.7) {
		dashboardSectionHeight = "25%";
	}
	$.agentSection.height = dashboardSectionHeight;
	$.launchPadSection.top = dashboardSectionHeight;
	$.launchPadSection.bottom = dashboardSectionHeight;
	$.autoSection.height = dashboardSectionHeight;
}


init();