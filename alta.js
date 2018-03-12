var data = {
    form: {
      name: '',
      lastName: '',
      number: null,
      tripType: 'simple',
      departure: '',
      arrival: '',
      passengerType: null,
      services: []
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
	]
};

var methods = {
    onSubmit (evt) {
        evt.preventDefault();
        alert(JSON.stringify(this.form));
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
		numberState() {
			if (this.form.number === null) {
				return null;
			}
			return !isNaN(this.form.number) && this.form.number >= 0 && this.form.number <= 30;
		}
};