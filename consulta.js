const items = [
//    { isActive: true, flightType: 40, name: 'Dickerson', lastName: 'Macdonald' },
//    { isActive: false, flightType: 21, name: 'Larsen', lastName: 'Shaw' },
//    { isActive: false, flightType: 89, name: 'Geneva', lastName: 'Wilson' },
//    { isActive: true, flightType: 38, name: 'Jami', lastName: 'Carney' },
//    { isActive: true, flightType: 41, name: 'ADickerson', lastName: 'ZMacdonald' },
//    { isActive: false, flightType: 22, name: 'BLarsen', lastName: 'YShaw' },
//    { isActive: false, flightType: 90, name: 'CGeneva', lastName: 'XWilson' },
//    { isActive: true, flightType: 39, name: 'DJami', lastName: 'WCarney' },
//    { isActive: true, flightType: 42, name: 'EDickerson', lastName: 'VMacdonald' },
//    { isActive: false, flightType: 23, name: 'FLarsen', lastName: 'UShaw' },
//    { isActive: false, flightType: 8, name: 'GGeneva', lastName: 'TWilson' },
//    { isActive: true, flightType: 3, name: 'HJami', lastName: 'SCarney' },
//    { isActive: true, flightType: 56, name: 'IDickerson', lastName: 'RMacdonald' },
//    { isActive: false, flightType: 78, name: 'JLarsen', lastName: 'QShaw' },
//    { isActive: false, flightType: 28, name: 'KGeneva', lastName: 'PWilson' },
//    { isActive: true, flightType: 87, name: 'LJami', lastName: 'OCarney' }
	];




const fields = [
	  {
		  key: 'name',
		  sortable: true
	  },
	  {
		  key: 'lastName',
		  sortable: true
	  },
	  {
		  key: 'familySize',
		  sortable: false
	  },
	  {
		  key: 'flightType',
		  sortable: false
	  },
	  {
		  key: 'departure',
		  sortable: false
	  },
	  {
		  key: 'arrival',
		  sortable: false
	  },
	  {
		  key: 'passengerType',
		  sortable: false
	  },
	  {
		  key: 'services',
		  sortable: false
	  }
	];

var data = {
	tableItems: items,
	tableFields: fields,
	tableCurrentPage : 1,
	totalRows: items.length,
	perPage: 4,
	searchFilterOpts: [
		{ text: 'Todos', value: null },
	    { text: 'Nombre', value: 'name' },
	    { text: 'Apellido', value: 'lastName' },
	    { text: 'Tipo de vuelo', value: 'flightType' }
	],
	searchFilter: null,
	filterItem: null
};

var methods = {
		onFiltered (filteredItems) {
		    // Trigger pagination to update the number of buttons/pages due to filtering
		    this.totalRows = filteredItems.length;
		    this.tableCurrentPage = 1;
		},
		customFilter(item) {
			var searchFilterOpt = this.searchFilter === null ? '' : this.searchFilter.trim();
			var filterItemTxt = this.filterItem === null ? '' : this.filterItem.trim();
			try {
				var regexp = new RegExp(filterItemTxt, 'i');
			} catch (e) {
				// Wait until the regexp is valid
				return true;
			}
			switch (searchFilterOpt) {
			case 'name':
				return item.name.match(regexp);
			case 'lastName':
				return item.lastName.match(regexp);
			case 'flightType':
				return item.flightType.toString().match(regexp);
			default:
				return item.name.match(regexp) || item.lastName.match(regexp) || item.flightType.toString().match(regexp);
			}
		}
};


var created = function () {
	var axiosInst = createAxios();

	axiosInst.get('http://localhost:8080/servlet-poc/booking')
	.then(function(response) {
		console.log(response);

		var books = response.data.Books;
		if (books != null) {
			data.tableItems = response.data.Books;
		}
	}).catch(function (error) {
		console.log(error);
//		vm.errorMessage = error;
//		var keys = Object.entries(response.data);
//		for (i = 0; i < keys.length; i++) {
//			vm.apiobject += keys[i][0] + " = " + keys[i][1] + " / ";
//		}
	});
};

var beforeDestroy = function () {
	
	
	
};

function createAxios() {
    const myaxios = axios.create();
//    myaxios.interceptors.request.use(
//        conf => {
//            eventHub.$emit('before-request');
//            return conf;
//        },
//        error => {
//            eventHub.$emit('request-error');
//            return Promise.reject(error);
//        }
//    );
//    myaxios.interceptors.response.use(
//        response => {
//            eventHub.$emit('after-response');
//            return response;
//        },
//        error => {
//            eventHub.$emit('response-error');
//            return Promise.reject(error);
//        }
//    );
    return myaxios;
}