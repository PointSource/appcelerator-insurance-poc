var string = require('alloy/string');
exports.definition = {
	config: {
		columns: {
		    "name": "TEXT",
		    "value": "INTEGER",
            "room_id": "INTEGER PRIMARY KEY AUTOINCREMENT"
		},
		adapter: {
			type: "sql",
			collection_name: "room",
            idAttribute: "room_id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
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

			getSum: function () {
				var sum = this.reduce(function(memo, room) {
					return memo + room.get('value');
				}, 0);

				return sum;
			}
		});

		return Collection;
	}
};