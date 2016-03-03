// This sync adapter makes HTTP requests to the BookService to manage data

// Global URL variables
var BASE_URL;

// Override the Backbone.sync method with the following
module.exports.sync = function(method, model, options) {

	var payload = model.toJSON();
	var error;

	switch(method) {

		// This case is called by the Model.fetch and Collection.fetch methods to retrieve data.
		case 'read':
			break;

		// This case is called by the Model.save and Collection.create methods
		// to initialize a model if the IDs are not set.
		case 'create':
			if (payload.paymentAmount && payload.policyNumber) {
				http_request('PUT', BASE_URL + payload.policyNumber, {
					paymentAmount: payload.paymentAmount
				}, callback);
			} else {
				error = 'ERROR: Cannot create model without payment amount and policy number!';
			}
			break;

		// This case is called by the Model.destroy method to delete the model from storage.
		case 'delete':
			break;

		// This case is called by the Model.save and Collection.create methods
		// to update a model if they have IDs set.
		case 'update':
			break;

		default :
			error = 'ERROR: Sync method not recognized!';
	};

	if (error) {
		options.error(model, error, options);
		Ti.API.error(error);
		model.trigger('error');
	}

	// Simple default callback function for HTTP request operations.
	function callback(error, response) {
		var res = response ? JSON.parse(response) : null;
		if (error) {
			// Calls the default Backbone error callback
			// and invokes a custom callback if options.error was defined.
			var err = res.error || error;
			Ti.API.error('ERROR: ' + err);
			options.error(model, error, options);
			model.trigger('error');
		} else {
			// Calls the default Backbone success callback
			// and invokes a custom callback if options.success was defined.
			if (res && res.key) {
				// Get only the model(s)
				res = res[res.key];
			}
			options.success(res, response, options);
		}
	};
};

// Helper function for creating an HTTP request
function http_request(method, url, payload, callback) {
		var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			if (callback) {
				var resource = this.getResponseHeader('Location') || null;
				if (resource) {
					// Arrow applications do not return a payload response for non-GET methods.
					// Need to retrieve the model to pass to Backbone APIs
					resource = resource.slice(resource.lastIndexOf('/') + 1);
					http_request('GET', BASE_URL + resource, null, callback);
				} else {
					callback(null, this.responseText);
				}
			}
		},
		onerror: function(e) {
			if (callback) {
				callback(e.error, this.responseText);
			}
		},
		timeout : 5000
	});
		
	xhr.open(method, url);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(payload));
};

// Perform some actions before creating the Model class
module.exports.beforeModelCreate = function(config, name) {
	config = config || {};
	// Set configuration settings
	BASE_URL = config.adapter.base_url || 'http://localhost:1337/policies';
	return config;
};

// Perform some actions after creating the Model class
module.exports.afterModelCreate = function(Model, name) {
	// Nothing to do
};