const eventHub = new Vue();

var data = {
    form: {
      name: null,
      lastName: null,
      familySize: null,
      tripType: 'simple',
      departure: null,
      arrival: null,
      passengerType: null,
      services: [],
    },
    bar: {
    	animated: true,
    	text: 'loading'
    },
    passengerTypes: [
      { label: 'register.passengerType.hint', value: null },
      { label: 'register.passengerType.types.baby', value: 'baby' },
      { label: 'register.passengerType.types.kid', value: 'kid' },
      { label: 'register.passengerType.types.adult', value: 'adult' }
    ],
	serviceTypes: [
	  { label: 'register.services.types.pet', value: 'pet'},
	  { label: 'register.services.types.extra', value: 'extra'},
	  { label: 'register.services.types.protection', value: 'protection'},
	  { label: 'register.services.types.stroller', value: 'stroller'}
	],
	tripTypes: [
		{ label: 'register.tripType.simple', value: 'simple' },
		{ label: 'register.tripType.round', value: 'round' },
	],
	modalText: null,
	apiobject: null,
	errorMessage: ''
};

var methods = {
	showSpinner() {
        console.log('show spinner');
        this.bar.animated = true;
        this.bar.text = 'loading';
    },
    hideSpinner() {
        console.log('hide spinner');
        this.bar.animated = false;
        this.bar.text = 'done!';
    },
    quickFill() {
    	var form = this.form;
    	form.name = 'John';
    	form.lastName = 'Snow';
    	form.familySize = 2;
    	form.tripType = 'round';
    	form.departure = '2018-11-01';
    	form.arrival = '2018-12-01';
    	form.passengerType = 'adult';
    	form.services = ['pet', 'protection'];
    },
    onSubmit (evt) {
        evt.preventDefault();
    	const vm = this;
        vm.apiobject = '';
        vm.errorMessage = '';
        vm.showModal();
        var axiosInst = createAxios();
        axiosInst.post('http://localhost:8080/servlet-poc/booking', vm.form)
          .then(function (response) {
            console.log(response);
            vm.modalText = vm.form.name + " " + vm.form.lastName + " booked";
          })
          .catch(function (error) {
            console.log(error);
            vm.errorMessage = error;
            var keys = Object.entries(response.data);
            for (i = 0; i < keys.length; i++) {
            	vm.apiobject += keys[i][0] + " = " + keys[i][1] + " / ";
            }
          });
      },
      showModal () {
    	  this.$refs.myModalRef.show();
      },
      hideModal () {
    	  this.$refs.myModalRef.hide();
    	  this.clearForm();
    	  //beforeDestroy();
      },
      clearForm() {
    	var form = this.form;
      	form.name = null;
      	form.lastName = null;
      	form.familySize = null;
      	form.tripType = 'simple';
      	form.departure = null;
      	form.arrival = null;
      	form.passengerType = null;
      	form.services = [];
      }
};

var computed = {
	  nameState() {
			var nameLength = this.form.name === null ? 0: this.form.name.length;
			return nameLength >= 2 && nameLength <= 50 ? true : false;
		},
		nameMessage() {
			var nameLength = this.form.name === null ? 0: this.form.name.length;
			if (nameLength < 2 || nameLength > 50) {
				return nameLength < 2 ? 'register.errors.name.minLength' : 'register.errors.name.maxLength';
			}
			return '';
		},
		lastNameState() {
			var lastNameLength = this.form.lastName === null ? 0: this.form.lastName.length;
			if (this.form.lastName === null || lastNameLength === 0) {
				return null;
			}
			return lastNameLength >= 2 && lastNameLength <= 50 ? true : false;
		},
		lastNameMessage() {
			var lastNameLength = this.form.lastName === null ? 0: this.form.lastName.length;
			if (lastNameLength > 0 && (lastNameLength < 2 || lastNameLength > 50)) {
				return lastNameLength < 2 ? 'register.errors.name.minLength' : 'register.errors.name.maxLength';
			}
			return '';
		},
		departureState() {
			var departure = this.form.departure;
			if (departure === null || departure.length === 0) {
				return false;
			}
			var now = new Date();
			now.setHours(0);
			now.setMinutes(0);
			now.setSeconds(0);
			now.setMilliseconds(0);
			var departureDate = new Date(departure + "T00:00:00" + now.toString().match(/([-\+][0-9]+)\s/)[1]);
			return departureDate >= now;
		},
		arrivalState() {
			var arrival = this.form.arrival;
			var departure = this.form.departure;
			var tripType = this.form.tripType;
			if (tripType === 'round' && (departure === null || departure.length === 0)) {
				return false;
			}
			if (arrival === null || departure === null || arrival.length === 0 || departure.length === 0) {
				return null;
			}
			var departureDate = new Date(departure);
			var arrivalDate = new Date(arrival);
			return arrivalDate >= departureDate;
		},
		arrivalDisabled() {
			return this.form.tripType === 'simple';
		},
		familySizeState() {
			if (this.form.familySize === null) {
				return null;
			}
			return !isNaN(this.form.familySize) && this.form.familySize >= 0 && this.form.familySize <= 30;
		},
		disableSubmit() {
			var nameState = this.nameState;
			var lastNameState = this.lastNameState === null ? true : this.lastNameState;
			var familySizeState = this.familySizeState === null ? true : this.familySizeState;
			var departureState = this.departureState === null ? true : this.departureState;
			var arrivalState = this.arrivalState === null ? true : this.arrivalState;
			return !(nameState && lastNameState && familySizeState && departureState && arrivalState);
		}
};


var created = function () {
    eventHub.$on('before-request', this.showSpinner);
    eventHub.$on('request-error',  this.hideSpinner);
    eventHub.$on('after-response', this.hideSpinner);
    eventHub.$on('response-error', this.hideSpinner);
};

var beforeDestroy = function () {
    eventHub.$off('before-request', this.showSpinner);
    eventHub.$off('request-error',  this.hideSpinner);
    eventHub.$off('after-response', this.hideSpinner);
    eventHub.$off('response-error', this.hideSpinner);
};

function createAxios() {
    const myaxios = axios.create();
    myaxios.interceptors.request.use(
        conf => {
            eventHub.$emit('before-request');
            return conf;
        },
        error => {
            eventHub.$emit('request-error');
            return Promise.reject(error);
        }
    );
    myaxios.interceptors.response.use(
        response => {
            eventHub.$emit('after-response');
            return response;
        },
        error => {
            eventHub.$emit('response-error');
            return Promise.reject(error);
        }
    );
    return myaxios;
}