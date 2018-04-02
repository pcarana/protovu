import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueRouter from "vue-router"
import VueI18n from "vue-i18n"
import Axios from "axios"
// import Chartjs from "chartjs"
// import VueChartjs from "vue-chartjs"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import home from './components/home.vue';
import register from './components/register.vue';
import search from './components/search.vue';
import stats from './components/stats.vue';


Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueI18n);
// Vue.use(Axios);
// Vue.use(Chartjs);
// Vue.use(VueChartjs);

const messages = {
  en: {
    modules: {
      register: 'Register',
      search: 'Search',
      stats: 'Stats'
    },
    register: {
			name: {
				label: 'Name',
				hint: 'Enter your name'
			},
			lastName: {
				label: 'Last name',
				hint: 'Enter your last name'
			},
			tripType: {
				label: 'Trip type'
			},
			travelDate: {
				label: 'Travel date',
				departure: 'Departure',
				arrival: 'Arrival'
			},
			familySize: {
				label: 'Companion',
				hint: 'Number of people accompanying'
			},
			passengerType: {
				label: 'Passenger type',
				hint: 'Choose an option'
			},
			services: {
				label: 'Additional services'
			},
			bar: {
				loading: 'Sending...',
				ok: 'Sent!',
				error: 'Error'
			},
			button: {
				fill: 'Quick fill',
				clear: 'Clean',
				submit: 'Send'
			},
			modal: {
				title: 'Booking',
				close: 'Close'
			},
			errors: {
				name: {
					minLength: 'Enter at least {min} characters',
					maxLength: 'Enter at most {max} characters'
				},
				travelDate: {
					departure: 'Required, must be at least today\'s date',
					arrival: 'Must be greater than or equal to arrival date'
				},
				familySize: {
					range: 'Must be a value between {min} and {max}'
				}
			}
    },
    stats: {
			line: 'Line',
			bar: 'Bar',
			pie: 'Pie',
			thanks: 'Special thanks to'
    },
    catalogs: {
      tripType: {
        simple: 'Simple',
				round: 'Round'
      },
      passengerType: {
        baby: 'Baby (< 2 yrs)',
        kid: 'Kid (from 2 to 17 yrs)',
        adult: 'Adult (> 18 yrs)'
      },
      serviceType: {
        pet: 'Pet',
        extra: 'Extra luggage',
        protection: 'Travel insurance',
        stroller: 'Stroller'
      }
    },
    errors: {
      noDataFound: 'No data found'
    },
    date: {
      format: 'mm/dd/yyyy'
    }
  },
  es: {
    modules: {
      register: 'Alta',
      search: 'Consulta',
      stats: 'Estadísticas'
    },
    register: {
			name: {
				label: 'Nombre(s)',
				hint: 'Ingrese su(s) nombre(s)'
			},
			lastName: {
				label: 'Apellido(s)',
				hint: 'Ingrese su(s) apellido(s)'
			},
			tripType: {
				label: 'Tipo de viaje'
			},
			travelDate: {
				label: 'Fecha(s) de viaje',
				departure: 'Fecha de salida',
				arrival: 'Fecha de regreso'
			},
			familySize: {
				label: 'Total de acompañantes',
				hint: 'Número de personas acompañantes'
			},
			passengerType: {
				label: 'Tipo de pasajero',
				hint: 'Seleccione un valor'
			},
			services: {
				label: 'Servicios adicionales'
			},
			bar: {
				loading: 'Enviando...',
				ok: '¡Enviado!',
				error: 'Error'
			},
			button: {
				fill: 'Llenado rápido',
				clear: 'Limpiar',
				submit: 'Enviar'
			},
			modal: {
				title: 'Reservando',
				close: 'Cerrar'
			},
			errors: {
				name: {
					minLength: 'Ingrese al menos {min} letras',
					maxLength: 'Ingrese máximo {max} letras'
				},
				travelDate: {
					departure: 'Requerido, debe ser mayor o igual al día de hoy',
					arrival: 'Debe ser mayor o igual a la fecha de salida'
				},
				familySize: {
					range: 'Debe ser un valor entre {min} y {max}'
        }
			}
    },
    stats: {
			line: 'Líneas',
			bar: 'Barra',
			pie: 'Pay',
			thanks: 'Gracias a'
		},
    catalogs: {
      tripType: {
        simple: 'Simple',
				round: 'Redondo'
      },
      passengerType: {
        baby: 'Infante (< 2 años)',
        kid: 'Niño (2 a 17 años)',
        adult: 'Adulto (> 18 años)'
      },
      serviceType: {
        pet: 'Mascota',
        extra: 'Equipaje extra',
        protection: 'Seguro de viaje',
        stroller: 'Carreola'
      }
    },
    errors: {
      noDataFound: 'No se encontraron datos'
    },
    date: {
      format: 'dd/mm/yyyy'
    }
  }
};

const dateTimeFormats = {
  en: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    }
  },
  es: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    }
  }
}

const i18n = new VueI18n({
	locale: localStorage.getItem('lang') !== null && localStorage.getItem('lang') !== '' ?
					localStorage.getItem('lang') : 'es',
  messages,
  dateTimeFormats
});

Vue.mixin({
  methods: {
    switchLang(newLang) {
      i18n.locale = newLang;
      localStorage.setItem('lang', i18n.locale);
    },
    isActiveLang(langId) {
      return i18n.locale === langId;
    },
    getActiveLang() {
      return i18n.locale;
    }
  }
});

const routes = [
  { path: '/home', component: home },
  { path: '/register', component: register },
  { path: '/search', component: search },
  { path: '/stats', component: stats }
];

const router = new VueRouter({
  routes: routes, // short for `routes: routes`
  mode : 'history'
})

new Vue({
  el: '#app',
  i18n,
  render: h => h(App),
  router
})
