const items = [
    { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
    { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
    { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
    { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
    { isActive: true, age: 41, first_name: 'ADickerson', last_name: 'ZMacdonald' },
    { isActive: false, age: 22, first_name: 'BLarsen', last_name: 'YShaw' },
    { isActive: false, age: 90, first_name: 'CGeneva', last_name: 'XWilson' },
    { isActive: true, age: 39, first_name: 'DJami', last_name: 'WCarney' },
    { isActive: true, age: 42, first_name: 'EDickerson', last_name: 'VMacdonald' },
    { isActive: false, age: 23, first_name: 'FLarsen', last_name: 'UShaw' },
    { isActive: false, age: 8, first_name: 'GGeneva', last_name: 'TWilson' },
    { isActive: true, age: 3, first_name: 'HJami', last_name: 'SCarney' },
    { isActive: true, age: 56, first_name: 'IDickerson', last_name: 'RMacdonald' },
    { isActive: false, age: 78, first_name: 'JLarsen', last_name: 'QShaw' },
    { isActive: false, age: 28, first_name: 'KGeneva', last_name: 'PWilson' },
    { isActive: true, age: 87, first_name: 'LJami', last_name: 'OCarney' }
	];

const fields = [
	  {
		  key: 'first_name',
		  sortable: true
	  },
	  {
		  key: 'last_name',
		  sortable: true
	  },
	  {
		  key: 'age',
		  sortable: true
	  }
	];

var data = {
	tableItems: items,
	tableFields: fields,
	tableCurrentPage : 1,
	totalRows: items.length,
	perPage: 4,
	filter: null
};

var methods = {
		onFiltered (filteredItems) {
		    // Trigger pagination to update the number of buttons/pages due to filtering
		    this.totalRows = filteredItems.length
		    this.tableCurrentPage = 1
		}
};