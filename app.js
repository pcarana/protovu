const messages = {
		en: {
			line: 'Line',
			bar: 'Bar',
			pie: 'Pie',
			modules: {
				register: 'Register',
				search: 'Search',
				request: 'API Request',
				stats: 'Stats'
			}
		},
		es: {
			line: 'Líneas',
			bar: 'Barra',
			pie: 'Pay',
			modules: {
				register: 'Alta',
				search: 'Consulta',
				request: 'Petición API',
				stats: 'Estadísticas'
			}
		}
}

const i18n = new VueI18n({
	locale: 'es',
	messages
});

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
          {{ $t(item.label) }}
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item right v-for="item in langItems"
          					href="#"
          					@click="switchLang(item.id)"
          					:key="item.id"
          					:active="isActiveLang(item.id)">
        	{{item.lang}}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  `,
  data() {
    return {
      navItems: [
        {href: "alta.html", id: "register", label: "modules.register"},
        {href: "consulta.html", id: "search", label: "modules.search"},
        {href: "peticion.html", id: "request", label: "modules.request"},
        {href: "estadisticas.html", id: "stats", label: "modules.stats"}
      ],
      langItems: [
    	  {href: "#", id: "en", lang: "EN"},
    	  {href: "#", id: "es", lang: "ES"}
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

var app_data = {};
if ( typeof(data) !== "undefined" && data !== null ) {
	app_data = data;
}
var app_methods = {};
if ( typeof(methods) !== "undefined" && methods !== null ) {
	app_methods = methods;
}
var app_computed = {};
if ( typeof(computed) !== "undefined" && computed !== null ) {
	app_computed = computed;
}
var app_mounted = function() {};
if ( typeof(mounted) !== "undefined" && mounted !== null ) {
	app_mounted = mounted;
}

Vue.mixin({
	methods: {
		switchLang(newLang) {
	    	i18n.locale = newLang;
	    },
	    isActiveLang(langId) {
	    	return i18n.locale === langId;
	    }
	}
});

var app = new Vue({
  el: '#app',
  data : app_data,
  methods: app_methods,
  computed: app_computed,
  mounted: app_mounted,
  i18n
  /*,
  template: '<App/>',
  components: { App }
  */
});
