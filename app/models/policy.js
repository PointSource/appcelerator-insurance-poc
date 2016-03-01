var moment = require('alloy/moment');

exports.definition = {
	config: {
		columns: {
		    "policyNumber": "integer",
		    "type": "text",
		    "coverageStartDate": "text",
		    "coverageEndDate": "text",
		    "billDetails": "text"
		},
		adapter: {
			type: "policy_blueoak",
			collection_name: "policy",
			// Endpoint URL to access the BlueOak server
			base_url: "http://10.128.64.179:1337/policies/"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
            idAttribute: "policyNumber",
            transform: function() {
            	var transformed = this.toJSON();
            	transformed.totalAmountDue = "$"+transformed.billDetails.totalAmountDue;
            	var dueDate = moment(transformed.billDetails.dueDate, "MM/DD/YYYY")
            	transformed.formattedDueDate = dueDate.format("MMMM DD, YYYY").toUpperCase();
            	return transformed;
            }
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});

		return Collection;
	}
};