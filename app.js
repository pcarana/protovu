const global_messages = {
		en: {
			modules: {
				register: 'Register',
				search: 'Search',
				request: 'API Request',
				stats: 'Stats'
			}
		},
		es: {
			modules: {
				register: 'Alta',
				search: 'Consulta',
				request: 'Petición API',
				stats: 'Estadísticas'
			}
		}
};

if ( typeof(messages_es) === "undefined" || messages_es === null ) {
	var messages_es = { es: {} };
}
if ( typeof(messages_en) === "undefined" || messages_en === null ) {
	var messages_en = { en: {} };
}
Object.assign(messages_es, global_messages.es);
Object.assign(messages_en, global_messages.en);

const messages = {
		es: messages_es,
		en: messages_en
};

const i18n = new VueI18n({
	locale: localStorage.getItem('lang') !== null && localStorage.getItem('lang') !== '' ?
					localStorage.getItem('lang') : 'es',
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
                    :href="checkSelected(item) ? '#' : item.href"
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
var app_created = function() {};
if ( typeof(created) !== "undefined" && created !== null ) {
	app_created = created;
}
var app_beforeDestroy = function() {};
if ( typeof(beforeDestroy) !== "undefined" && beforeDestroy !== null ) {
	app_beforeDestroy = beforeDestroy;
}

Vue.mixin({
	methods: {
		switchLang(newLang) {
	    	i18n.locale = newLang;
	    	localStorage.setItem('lang', i18n.locale);
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
  i18n,
  created: app_created,
  beforeDestroy: app_beforeDestroy
  /*,
  template: '<App/>',
  components: { App }
  */
});
