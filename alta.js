const eventHub = new Vue();

var data = {
    form: {
      name: '',
      lastName: '',
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
      { text: 'Seleccione un valor', value: null },
      { text: 'Infante (< 2 años)', value: 'Infante' },
      { text: 'Niño (2 a 17 años)', value: 'Niño' },
      { text: 'Adulto (> 18 años)', value: 'Adulto' }
    ],
	serviceTypes: [
	  { text: 'Mascota', value: 'pet'},
	  { text: 'Equipaje extra', value: 'extra'},
	  { text: 'Seguro de viaje', value: 'protection'},
	  { text: 'Carreola', value: 'stroller'}
	],
	tripTypes: [
		{ text: 'Simple', value: 'simple' },
		{ text: 'Redondo', value: 'round' },
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
    	form.passengerType = 'Adulto';
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
      }
};

var computed = {
	  nameState() {
			var nameLength = this.form.name.length;
			return nameLength >= 2 && nameLength <= 50 ? true : false;
		},
		nameMessage() {
			var nameLength = this.form.name.length;
			if (nameLength < 2 || nameLength > 50) {
				return nameLength < 2 ? 'at least 2 characters' : 'at most 50 characters';
			}
			return '';
		},
		lastNameState() {
			var lastNameLength = this.form.lastName.length;
			if (this.form.lastName === null || lastNameLength === 0) {
				return null;
			}
			return lastNameLength >= 2 && lastNameLength <= 50 ? true : false;
		},
		lastNameMessage() {
			var lastNameLength = this.form.lastName.length;
			if (lastNameLength > 0 && (lastNameLength < 2 || lastNameLength > 50)) {
				return lastNameLength < 2 ? 'at least 2 characters' : 'at most 50 characters';
			}
			return '';
		},
		arrivalDisabled() {
			return this.form.tripType === 'simple';
		},
		familySizeState() {
			if (this.form.familySize === null) {
				return null;
			}
			return !isNaN(this.form.familySize) && this.form.familySize >= 0 && this.form.familySize <= 30;
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