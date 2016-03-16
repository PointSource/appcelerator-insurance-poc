var moment = require('alloy/moment');
var string = require('alloy/string');

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
			base_url: Alloy.Globals.url + "/policies/"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
            idAttribute: "policyNumber",
            transform: function() {
            	var transformed = this.toJSON();
            	transformed.totalAmountDue = string.formatCurrency(transformed.billDetails.totalAmountDue);
            	transformed.minimumDue = string.formatCurrency(transformed.billDetails.minimumDue);
            	var dueDate = moment(transformed.billDetails.dueDate, "MM/DD/YYYY")
            	transformed.formattedDueDate = dueDate.format("MMMM DD, YYYY").toUpperCase();
            	return transformed;
            },

            getMinimumDue: function () {
            	return this.get('billDetails').minimumDue;
            },

            getDueDate: function() {
            	var transformed = this.toJSON();
            	return moment(transformed.billDetails.dueDate, "MM/DD/YYYY");
            },

            getIsOverdue: function () {
            	return moment().isAfter(this.getDueDate());
            },

            getFormattedDriver: function (item) {
				return item.firstName + " " + item.lastName
			},

            getFormattedVehicle: function (item) {
				return item.make + " " + item.model + " " + item.year
			},

			getIcon: function () {
				switch (this.get('type')) {
					case "AUTO":
						return Alloy.Globals.Icomoon.charcode.main_auto;
						break;
					case "RENTERS":
					case "HOME":
						return Alloy.Globals.Icomoon.charcode.main-home;
						break;
					default:
						return Alloy.Globals.Icomoon.charcode.main-auto;
				}
			}
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			
		});

		return Collection;
	}
};