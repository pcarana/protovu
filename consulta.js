var data = {
    form: {
        name: '',
        lastName: ''
    },
	tableItems: [
      { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
      { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
	],
	tableFields: [
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
	],
	tableCurrentPage : 1
};

var methods = {
    onSubmit (evt) {
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      }
};