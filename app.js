Vue.component('top-menu', {
  template: `
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="index.html">VUE Proto</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item v-for="item in navItems"
                    :href="item.href"
                    :key="item.id"
                    :active=checkSelected(item)>
          {{ item.content }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  `,
  data() {
    return {
      navItems: [
        {href: "alta.html", id: "alta", content: "Alta"},
        {href: "consulta.html", id: "consulta", content: "Consulta"},
        {href: "peticion.html", id: "peticion", content: "Petición API"},
        {href: "estadisticas.html", id: "estadisticas", content: "Estadísticas"}
      ]
    }
  },
  props: {
    selected: { }
  },
  methods: {
    checkSelected: function(item) {
      return this.selected == item.id;
    }
  }
});

Vue.component('line-chart', {
  extends: VueChartJs.Line,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
});

new Vue({
  el: '#app',
  data: {
    form: {
      name: '',
      lastName: '',
      number: null,
      tripType: 'simple',
      departure: '',
      arrival: '',
      passengerType: null,
      services: [],
      domain: 'whiterabbit.com',
      apiresponse: ''
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
	tableCurrentPage : 1,
    apiresponse: null
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onSubmitDomain(evt) {
      const vm = this;
      evt.preventDefault();
      //axios.get('http://localhost:8080/rdap-server/domain/whiterabbit.com')
      axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
          console.log(response.data);
          //vm.apiresponse = JSON.stringify(JSON.parse(response.data), null, 2);
          vm.apiresponse = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
	showGraphLine() {
		
	}
  },
  computed: {
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
  }
  /*,
  template: '<App/>',
  components: { App }
  */
});
